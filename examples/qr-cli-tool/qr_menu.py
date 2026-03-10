"""Batch QR code generator for restaurant menus.

Reads a CSV file with location_name and menu_url columns,
generates one QR code PNG per row.

Usage:
    python qr_menu.py menu.csv --size 300 --output-dir ./codes
"""

import argparse
import csv
import os
import re
import sys

import qrcode


def sanitize(name: str) -> str:
    """Convert location name to a safe filename slug."""
    return re.sub(r"[^a-z0-9_]", "", name.lower().replace(" ", "_"))


def main():
    parser = argparse.ArgumentParser(
        description="Generate QR codes in batch from a CSV of restaurant locations"
    )
    parser.add_argument("csv_file", help="CSV file with location_name, menu_url columns")
    parser.add_argument("--size", type=int, default=400, help="QR code size in pixels (default: 400)")
    parser.add_argument("--output-dir", default="./qr_output", help="Output directory (default: ./qr_output)")
    args = parser.parse_args()

    os.makedirs(args.output_dir, exist_ok=True)
    seen: dict[str, int] = {}
    generated = 0

    with open(args.csv_file, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = row.get("menu_url", "").strip()
            name = row.get("location_name", "").strip()
            if not url.startswith("https://"):
                print(f"WARN: skipping '{name}' — invalid URL: {url}")
                continue
            if not name:
                print(f"WARN: skipping row — missing location_name")
                continue

            slug = sanitize(name)
            seen[slug] = seen.get(slug, 0) + 1
            if seen[slug] > 1:
                slug = f"{slug}_{seen[slug]}"

            img = qrcode.make(url, box_size=args.size // 40)
            path = os.path.join(args.output_dir, f"{slug}_qr.png")
            img.save(path)
            print(f"OK: {path}")
            generated += 1

    if generated == 0:
        print("ERROR: no valid rows found", file=sys.stderr)
        sys.exit(1)

    print(f"\nDone: {generated} QR codes in {args.output_dir}")


if __name__ == "__main__":
    main()
