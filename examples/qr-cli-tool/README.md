# QR Menu CLI Tool

Batch QR code generator for restaurant menus — companion example for **Chapters 1 & 5** of *Prompt Contracts*.

This example demonstrates that prompt contracts work beyond TypeScript and web apps. The same contract structure (input, output, constraints, edge cases, acceptance criteria) produces correct Python CLI code.

## Quick Start

```bash
pip install -r requirements.txt
python qr_menu.py sample-menu.csv --output-dir ./codes
```

## Files

| File | Purpose |
|------|---------|
| `prompt-contract.md` | The prompt contract used to generate the code |
| `qr_menu.py` | The generated CLI tool |
| `sample-menu.csv` | Test data (8 rows including edge cases) |
| `test.sh` | Smoke test that verifies PNG output |
| `requirements.txt` | Python dependencies |

## Usage

```bash
python qr_menu.py <csv_file> [--size 400] [--output-dir ./qr_output]
```

The CSV must have `location_name` and `menu_url` columns. URLs must start with `https://` — invalid rows are skipped with a warning.

## Connection to Chapter 1

Chapter 1 shows a single QR code API route (vibe-coded vs contract-built). This example takes the same concept to batch automation — forty locations, forty QR codes, one command.
