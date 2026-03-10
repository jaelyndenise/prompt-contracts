#!/usr/bin/env bash
# -------------------------------------------------------------------
#  QR Before/After — Test Script
#
#  Run both API routes and compare behavior.
#  Default ports: vibe-coded on 3001, contract-first on 3002.
#  (In practice both files are illustrative — you would drop one
#   into a Next.js app at app/api/qr/route.ts and run it.)
#
#  Usage:
#    VIBE_PORT=3001 CONTRACT_PORT=3002 bash test.sh
# -------------------------------------------------------------------

VIBE="http://localhost:${VIBE_PORT:-3001}/api/qr"
CONTRACT="http://localhost:${CONTRACT_PORT:-3002}/api/qr"

divider() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
}

# ---------------------------------------------------------------
# Test 1: Valid URL — both should return a PNG
# ---------------------------------------------------------------
echo "TEST 1 — Valid URL"
echo "  Both versions should return 200 and a PNG image."
divider

echo "→ Vibe-coded:"
curl -s -o /dev/null -w "  HTTP %{http_code}  Content-Type: %{content_type}\n" \
  "${VIBE}?url=https://menu.example.com/restaurant-123"

echo "→ Contract-first:"
curl -s -o /dev/null -w "  HTTP %{http_code}  Content-Type: %{content_type}\n" \
  "${CONTRACT}?url=https://menu.example.com/restaurant-123"

divider

# ---------------------------------------------------------------
# Test 2: Missing URL param — vibe crashes, contract returns 400
# ---------------------------------------------------------------
echo "TEST 2 — Missing URL parameter"
echo "  Vibe-coded: crashes with unhandled error (500 or stack trace)."
echo "  Contract-first: returns 400 with a JSON error message."
divider

echo "→ Vibe-coded:"
curl -s -w "\n  HTTP %{http_code}\n" "${VIBE}"

echo "→ Contract-first:"
curl -s -w "\n  HTTP %{http_code}\n" "${CONTRACT}"

divider

# ---------------------------------------------------------------
# Test 3: javascript: URL — vibe generates XSS QR, contract blocks
# ---------------------------------------------------------------
echo "TEST 3 — javascript: URL (XSS vector)"
echo "  Vibe-coded: happily generates a QR code encoding javascript:alert(1)."
echo "  Contract-first: returns 400, refuses non-http(s) schemes."
divider

echo "→ Vibe-coded:"
curl -s -o /dev/null -w "  HTTP %{http_code}  Content-Type: %{content_type}\n" \
  "${VIBE}?url=javascript:alert(1)"

echo "→ Contract-first:"
curl -s -w "\n  HTTP %{http_code}\n" \
  "${CONTRACT}?url=javascript:alert(1)"

divider

# ---------------------------------------------------------------
# Test 4: URL exceeding 2048 characters
# ---------------------------------------------------------------
HUGE_URL="https://example.com/menu?data=$(python3 -c "print('A' * 2100)")"

echo "TEST 4 — Oversized URL (2100+ chars)"
echo "  Vibe-coded: tries to generate an unreadable QR or crashes on buffer size."
echo "  Contract-first: returns 400 before touching the QR library."
divider

echo "→ Vibe-coded:"
curl -s -o /dev/null -w "  HTTP %{http_code}  Content-Type: %{content_type}\n" \
  "${VIBE}?url=${HUGE_URL}"

echo "→ Contract-first:"
curl -s -w "\n  HTTP %{http_code}\n" \
  "${CONTRACT}?url=${HUGE_URL}"

divider

# ---------------------------------------------------------------
# Test 5: Cache-Control header check
# ---------------------------------------------------------------
echo "TEST 5 — Cache-Control header on success"
echo "  Vibe-coded: no caching header."
echo "  Contract-first: Cache-Control: public, max-age=86400."
divider

echo "→ Vibe-coded (response headers):"
curl -s -I "${VIBE}?url=https://menu.example.com" 2>/dev/null | grep -i cache-control || echo "  (none)"

echo "→ Contract-first (response headers):"
curl -s -I "${CONTRACT}?url=https://menu.example.com" 2>/dev/null | grep -i cache-control || echo "  (none)"

echo ""
echo "Done. See README.md for context."
