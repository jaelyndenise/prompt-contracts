#!/usr/bin/env python3
"""Web scraper with residential proxy support.

Extracts clean text from web pages. Routes through Webshare/BrightData
proxies to bypass blocks on VPS or when scraping at scale.

Usage:
    python web_scraper.py "https://example.com"
    python web_scraper.py --batch urls.txt --proxy "http://user:pass@p.webshare.io:80"
    python web_scraper.py --batch urls.txt --delay 2

For YouTube transcripts specifically, use yt-dlp instead:
    pip install yt-dlp
    yt-dlp --write-auto-subs --skip-download --sub-lang en "https://youtube.com/watch?v=ID"

See prompt-contract.md for the full specification.
"""

import argparse
import os
import re
import sys
import time
from urllib.parse import urlparse

import warnings

import requests
from bs4 import BeautifulSoup

# Suppress InsecureRequestWarning when falling back to verify=False
warnings.filterwarnings('ignore', message='Unverified HTTPS request')

try:
    import certifi
    CA_BUNDLE = certifi.where()
except ImportError:
    CA_BUNDLE = True  # use system default

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/121.0.0.0 Safari/537.36"
)


def slugify(text: str, max_len: int = 60) -> str:
    """Convert text to a filesystem-safe slug."""
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[\s_-]+', '_', text).strip('_')
    return text[:max_len]


def extract_text(html: str) -> tuple[str, str]:
    """Extract title and clean body text from HTML.

    Returns (title, body_text). Strips scripts, styles, nav,
    footer, header, and aside elements.
    """
    soup = BeautifulSoup(html, 'html.parser')

    title = soup.title.string.strip() if soup.title and soup.title.string else 'Untitled'

    # Remove non-content elements
    for tag in soup.find_all(['script', 'style', 'nav', 'footer',
                               'header', 'aside', 'noscript', 'svg',
                               'form', 'iframe']):
        tag.decompose()

    # Get text, collapse whitespace
    text = soup.get_text(separator='\n')
    lines = [line.strip() for line in text.splitlines()]
    # Remove blank lines and very short lines (likely UI fragments)
    lines = [line for line in lines if len(line) > 1]
    # Collapse consecutive duplicates
    deduped = []
    for line in lines:
        if not deduped or line != deduped[-1]:
            deduped.append(line)

    return title, '\n'.join(deduped)


def scrape_url(url: str, proxy: str = None, timeout: int = 15) -> dict:
    """Scrape a single URL. Returns dict with keys:
    url, final_url, status, title, text, word_count, error
    """
    result = {
        'url': url, 'final_url': url, 'status': None,
        'title': None, 'text': None, 'word_count': 0, 'error': None
    }

    headers = {'User-Agent': USER_AGENT}
    proxies = {'http': proxy, 'https': proxy} if proxy else None

    try:
        resp = requests.get(url, headers=headers, proxies=proxies,
                            timeout=timeout, allow_redirects=True,
                            verify=CA_BUNDLE)
        result['status'] = resp.status_code
        result['final_url'] = resp.url

        if resp.status_code == 403:
            result['error'] = 'blocked (403) — try with --proxy'
            return result
        if resp.status_code == 429:
            retry = resp.headers.get('Retry-After', '?')
            result['error'] = f'rate limited (429), retry after {retry}s'
            return result
        if resp.status_code >= 400:
            result['error'] = f'HTTP {resp.status_code}'
            return result

        content_type = resp.headers.get('Content-Type', '')
        if 'text/html' not in content_type:
            result['error'] = f'not HTML ({content_type.split(";")[0]})'
            return result

        title, text = extract_text(resp.text)
        result['title'] = title
        result['text'] = text
        result['word_count'] = len(text.split())

    except requests.exceptions.SSLError:
        # Retry without SSL verification (common on macOS venvs)
        try:
            resp = requests.get(url, headers=headers, proxies=proxies,
                                timeout=timeout, allow_redirects=True,
                                verify=False)
            result['status'] = resp.status_code
            result['final_url'] = resp.url
            content_type = resp.headers.get('Content-Type', '')
            if resp.status_code < 400 and 'text/html' in content_type:
                title, text = extract_text(resp.text)
                result['title'] = title
                result['text'] = text
                result['word_count'] = len(text.split())
            else:
                result['error'] = f'HTTP {resp.status_code} (SSL fallback)'
        except Exception:
            result['error'] = 'SSL certificate error — skipped'
    except requests.exceptions.Timeout:
        # Retry once
        try:
            time.sleep(5)
            resp = requests.get(url, headers=headers, proxies=proxies,
                                timeout=timeout, allow_redirects=True)
            result['status'] = resp.status_code
            if resp.status_code < 400 and 'text/html' in resp.headers.get('Content-Type', ''):
                title, text = extract_text(resp.text)
                result['title'] = title
                result['text'] = text
                result['word_count'] = len(text.split())
            else:
                result['error'] = f'HTTP {resp.status_code} on retry'
        except Exception:
            result['error'] = 'timeout (twice)'
    except requests.exceptions.ConnectionError as e:
        if proxy:
            host = urlparse(proxy).hostname or proxy
            result['error'] = f'proxy connection failed ({host})'
        else:
            result['error'] = f'connection failed'
    except Exception as e:
        result['error'] = f'{type(e).__name__}: {e}'

    return result


def load_urls(batch_file: str) -> list:
    """Load URLs from a batch file. Skip blanks and comments (#)."""
    urls = []
    with open(batch_file, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                urls.append(line)
    return urls


def main():
    parser = argparse.ArgumentParser(
        description='Scrape web pages to clean text, with optional proxy support.'
    )
    parser.add_argument('url', nargs='?', help='Single URL to scrape')
    parser.add_argument('--batch', metavar='FILE',
                        help='Text file with one URL per line')
    parser.add_argument('--proxy', default=os.environ.get('PROXY_URL'),
                        help='HTTP proxy URL (or set PROXY_URL env var)')
    parser.add_argument('--delay', type=float, default=0,
                        help='Seconds to wait between requests')
    parser.add_argument('--output', default='output',
                        help='Output directory (default: output/)')
    parser.add_argument('--overwrite', action='store_true',
                        help='Overwrite existing output files')
    args = parser.parse_args()

    if not args.url and not args.batch:
        parser.error('Provide a URL or --batch FILE')

    urls = []
    if args.batch:
        urls = load_urls(args.batch)
    if args.url:
        urls.append(args.url)

    if not urls:
        print('No URLs to process.')
        sys.exit(1)

    os.makedirs(args.output, exist_ok=True)

    results = []
    for i, url in enumerate(urls):
        if i > 0 and args.delay > 0:
            time.sleep(args.delay)

        print(f'[{i + 1}/{len(urls)}] {url}')
        result = scrape_url(url, proxy=args.proxy)

        if result['error']:
            print(f'  SKIP: {result["error"]}')
            results.append(result)
            continue

        # Build output filename
        parsed = urlparse(result['final_url'])
        domain = slugify(parsed.netloc)
        path = slugify(parsed.path) if parsed.path.strip('/') else 'index'
        filename = f'{domain}_{path}.txt'
        filepath = os.path.join(args.output, filename)

        if os.path.exists(filepath) and not args.overwrite:
            print(f'  EXISTS: {filename} (use --overwrite)')
            result['error'] = 'exists'
            results.append(result)
            continue

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(f'{result["title"]}\n\n{result["text"]}')

        print(f'  OK: {filename} ({result["word_count"]} words)')
        results.append(result)

    # Summary
    print(f'\n{"=" * 72}')
    print(f'{"URL":<40} {"Code":<6} {"Words":<8} {"Status"}')
    print(f'{"-" * 72}')
    for r in results:
        short_url = r['url'][:39]
        code = str(r['status'] or '—')
        words = str(r['word_count']) if r['word_count'] else '—'
        status = 'OK' if not r['error'] else r['error'][:25]
        print(f'{short_url:<40} {code:<6} {words:<8} {status}')


if __name__ == '__main__':
    main()
