#!/usr/bin/env bash
# Test the web scraper. Requires internet access. No proxy needed.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"
OUTPUT_DIR="$SCRIPT_DIR/output"

echo "=== Web Scraper Test ==="

# Setup venv
if [ ! -d "$VENV_DIR" ]; then
    echo "Creating virtual environment..."
    python3 -m venv "$VENV_DIR"
fi
source "$VENV_DIR/bin/activate"
pip install -q -r "$SCRIPT_DIR/requirements.txt"

# Fix macOS SSL certificates in venv
CERT_SCRIPT="$(python -c 'import os, certifi; print(os.path.join(os.path.dirname(certifi.__file__), "cacert.pem"))' 2>/dev/null)"
if [ -n "$CERT_SCRIPT" ]; then
    export SSL_CERT_FILE="$CERT_SCRIPT"
    export REQUESTS_CA_BUNDLE="$CERT_SCRIPT"
fi

# Clean previous output
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Test 1: Single URL
echo ""
echo "--- Test 1: Single URL (example.com) ---"
python "$SCRIPT_DIR/web_scraper.py" "https://example.com" --output "$OUTPUT_DIR"

FILE=$(ls "$OUTPUT_DIR"/*.txt 2>/dev/null | head -1)
if [ -z "$FILE" ]; then
    echo "FAIL: No output file"
    exit 1
fi

# No HTML tags in output
if grep -q "<html\|<div\|<script" "$FILE"; then
    echo "FAIL: HTML tags found in output"
    exit 1
fi
echo "OK: Clean text, no HTML"

WORDS=$(wc -w < "$FILE" | tr -d ' ')
echo "OK: $WORDS words extracted"

# Test 2: Batch mode
echo ""
echo "--- Test 2: Batch mode ---"
python "$SCRIPT_DIR/web_scraper.py" --batch "$SCRIPT_DIR/urls.txt" --output "$OUTPUT_DIR" --delay 1 --overwrite

FILE_COUNT=$(ls "$OUTPUT_DIR"/*.txt 2>/dev/null | wc -l | tr -d ' ')
echo ""
echo "--- Results ---"
echo "Output files: $FILE_COUNT"

if [ "$FILE_COUNT" -lt 2 ]; then
    echo "FAIL: Expected at least 2 output files"
    exit 1
fi

echo "All tests passed."

deactivate
