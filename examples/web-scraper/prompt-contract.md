# Prompt Contract: Web Scraper With Residential Proxy Support

## Inputs

- Python 3.10+
- `requests` library (PyPI)
- `beautifulsoup4` library (PyPI)
- Optional: HTTP proxy credentials (format: `http://user:pass@host:port`)
- Input: a text file with one URL per line, or a single URL via CLI argument

## Expected Output

- File: `web_scraper.py`
- Type: CLI tool (argparse)
- Produces: one `.txt` file per URL in `output/` directory
- Each file: page title on first line, blank line, then clean body text (no HTML tags, no scripts, no nav)
- Filename format: `{domain}_{path_slug}.txt`
- Prints a summary table to stdout: URL, status code, word count, status

## Constraints

- MUST NOT use Selenium, Playwright, or any browser automation — requests only
- MUST NOT install dependencies beyond `requests` and `beautifulsoup4`
- MUST NOT hardcode proxy credentials — read from `--proxy` flag or `PROXY_URL` env var
- MUST work without a proxy (proxy is optional)
- MUST handle rate limiting — configurable delay between requests (`--delay`)
- MUST send a realistic User-Agent header (Chrome on macOS)
- MUST strip scripts, styles, nav, footer, header elements before extracting text
- MUST respect HTTP status codes — log 403/429/5xx, don't crash

## Edge Cases

- URL returns 403 Forbidden: log "blocked", continue batch — this is the use case for proxies
- URL returns 429 Too Many Requests: log warning with Retry-After header if present, continue
- URL times out: retry once after 5 seconds, then skip
- URL redirects: follow redirects (default requests behavior), log final URL
- URL file has blank lines or comments (lines starting with `#`): skip silently
- SSL certificate error: skip with warning, don't disable SSL verification
- Response is not HTML (PDF, image): skip with warning
- Output file already exists: skip unless `--overwrite` flag is set

## Acceptance Criteria

- [ ] `python web_scraper.py "https://example.com"` produces a `.txt` with page content
- [ ] `python web_scraper.py --batch urls.txt` processes multiple URLs
- [ ] `python web_scraper.py --proxy "http://user:pass@host:port" URL` routes through proxy
- [ ] 403 response logs a warning and doesn't crash the batch
- [ ] Output contains zero HTML tags
- [ ] `--delay 2` waits 2 seconds between URLs in batch mode
- [ ] Without proxy, scraping example.com works (no proxy needed for unblocked sites)
