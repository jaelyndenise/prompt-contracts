#!/usr/bin/env bash
# Quick smoke test for qr_menu.py
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR=$(mktemp -d)
VENV_DIR=$(mktemp -d)/venv

echo "=== Creating virtual environment ==="
python3 -m venv "$VENV_DIR"
source "$VENV_DIR/bin/activate"

echo "=== Installing dependencies ==="
pip install -q -r "$SCRIPT_DIR/requirements.txt"

echo "=== Running qr_menu.py ==="
python "$SCRIPT_DIR/qr_menu.py" "$SCRIPT_DIR/sample-menu.csv" --output-dir "$OUT_DIR"

echo ""
echo "=== Checking output ==="
COUNT=$(ls "$OUT_DIR"/*.png 2>/dev/null | wc -l | tr -d ' ')
echo "Generated $COUNT PNG files"

if [ "$COUNT" -lt 1 ]; then
  echo "FAIL: no PNG files generated"
  deactivate 2>/dev/null || true
  exit 1
fi

# Verify files are valid PNGs (check magic bytes)
for f in "$OUT_DIR"/*.png; do
  HEADER=$(xxd -l 4 -p "$f")
  if [ "$HEADER" != "89504e47" ]; then
    echo "FAIL: $f is not a valid PNG"
    deactivate 2>/dev/null || true
    exit 1
  fi
done

echo "PASS: all $COUNT files are valid PNGs"
echo "Output dir: $OUT_DIR"
deactivate 2>/dev/null || true
