# Web Scraper With Residential Proxy Support

Extract clean text from web pages using `requests` + `BeautifulSoup`, with optional residential proxy routing (Webshare, BrightData, or any HTTP proxy).

Built from a prompt contract. The contract defined every edge case before a single line of code was written.

## Quick start

```bash
pip install requests beautifulsoup4

# Single URL
python web_scraper.py "https://example.com"

# Batch mode
python web_scraper.py --batch urls.txt

# With Webshare residential proxy (bypasses IP blocks)
python web_scraper.py --proxy "http://USER:PASS@p.webshare.io:80" --batch urls.txt

# Rate-limited scraping (2s between requests)
python web_scraper.py --batch urls.txt --delay 2
```

## What it does

1. Fetches pages with a realistic User-Agent header
2. Strips scripts, styles, nav, footer, header, aside elements
3. Extracts clean body text with page title
4. Saves one `.txt` file per URL in `output/`
5. Handles 403/429/timeouts gracefully — logs and continues

## Options

| Flag | Default | Description |
|------|---------|-------------|
| `--batch FILE` | — | Text file with one URL per line |
| `--proxy URL` | `$PROXY_URL` | HTTP proxy (Webshare, BrightData, etc.) |
| `--delay N` | `0` | Seconds between requests |
| `--output DIR` | `output/` | Output directory |
| `--overwrite` | `false` | Overwrite existing files |

## Why a proxy?

Running scrapers from a VPS or datacenter IP? Most sites block you. Residential proxies route requests through real consumer IP addresses, making them look like normal browser traffic.

- **Webshare** — $2.80/GB residential. Budget-friendly for testing and small batches.
- **BrightData** — Enterprise-grade with dedicated endpoints and browser fingerprinting.

See [resources/stack.md](../../resources/stack.md) for setup links and comparison.

## For YouTube specifically

This scraper is for general web pages. For YouTube transcripts, use **yt-dlp** instead — it extracts subtitles directly without downloading video:

```bash
pip install yt-dlp

# Extract English auto-generated subtitles
yt-dlp --write-auto-subs --skip-download --sub-lang en -o "%(id)s" "https://youtube.com/watch?v=VIDEO_ID"

# With proxy (same Webshare credentials work)
yt-dlp --proxy "http://USER:PASS@p.webshare.io:80" --write-auto-subs --skip-download "URL"
```

## The contract

Read [`prompt-contract.md`](prompt-contract.md) to see the specification that produced this code.

## Run tests

```bash
bash test.sh
```

Requires internet access. Downloads text only. Uses minimal bandwidth.

---

From *[Prompt Contracts](https://www.amazon.com/dp/PLACEHOLDER)* — Chapter 6 covers automation patterns including scraping workflows with proxy infrastructure.
