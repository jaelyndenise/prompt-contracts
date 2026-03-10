# Prompt Contract: qr_menu.py — Batch QR Code Generator

## Input

CSV file with columns: `location_name`, `menu_url`.
Optional CLI flags: `--size` (default 400px), `--output-dir` (default `./qr_output`).

## Output

One PNG file per row, named `{location_name}_qr.png` (spaces replaced with underscores, lowercased).
Print a summary line per file generated.

## Constraints

- Use `qrcode` and `Pillow` libraries only
- Validate that `menu_url` starts with `https://`
- Skip rows with missing or invalid URLs, print a warning, continue processing
- Exit with code 1 if the CSV has zero valid rows
- No network calls — QR generation is local only

## Edge Cases

- Duplicate location names: append `_2`, `_3`, etc.
- CSV with headers but no data rows: exit with error message
- Location name with special characters: strip to alphanumeric and underscores

## Acceptance Criteria

- Each PNG is a valid image file and scannable by a standard QR reader
- The CLI runs with: `python qr_menu.py menu.csv --size 300 --output-dir ./codes`
