# Prompt Contract: QR Code Generator API Route

## 1. Inputs

| Parameter | Source       | Type   | Required | Default |
|-----------|-------------|--------|----------|---------|
| `url`     | query param | string | yes      | —       |
| `size`    | query param | number | no       | 300     |

## 2. Expected Output

- **Success (200):** A PNG image of the QR code encoding the provided URL.
  - `Content-Type: image/png`
  - `Cache-Control: public, max-age=86400`
- **Error (400):** A JSON object with an `error` field describing the problem.
  - `Content-Type: application/json`

## 3. Constraints

- `url` must use `http:` or `https:` scheme. Reject all other schemes (javascript:, data:, ftp:, etc.).
- `url` must be parseable by `new URL()`. If parsing throws, return 400.
- `url` max length: 2048 characters. Longer URLs produce unreadable QR codes at any reasonable size.
- `size` must be an integer between 150 and 1000 (pixels). Values outside this range are clamped silently.
- Use the `qrcode` npm package (`QRCode.toBuffer`).

## 4. Edge Cases

- **Missing `url` param:** Return `400 { "error": "Missing required parameter: url" }`.
- **`javascript:alert(1)` as url:** Return `400 { "error": "URL must use http or https scheme" }`.
- **Malformed URL (e.g., `not a url`):** Return `400 { "error": "Invalid URL format" }`.
- **URL longer than 2048 chars:** Return `400 { "error": "URL exceeds maximum length of 2048 characters" }`.
- **`size=50`:** Clamp to 150. No error.
- **`size=9999`:** Clamp to 1000. No error.
- **`size=abc`:** Ignore, use default 300.

## 5. Acceptance Criteria

- [ ] `GET /api/qr?url=https://menu.example.com` returns a valid PNG with status 200.
- [ ] `GET /api/qr` (no url) returns 400 JSON error.
- [ ] `GET /api/qr?url=javascript:alert(1)` returns 400 JSON error.
- [ ] `GET /api/qr?url=https://example.com&size=500` returns a 500px-wide QR PNG.
- [ ] Response includes `Cache-Control: public, max-age=86400` on success.
- [ ] Response includes `Content-Type: image/png` on success.
- [ ] Response includes `Content-Type: application/json` on error.
- [ ] No unhandled exceptions for any combination of inputs.
