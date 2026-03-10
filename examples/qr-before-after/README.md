# QR Code Generator: Before & After

**Same AI. Same feature. Different instructions.**

This example accompanies **Chapter 1** of *Prompt Contracts: How I Stopped Vibe Coding and Started Shipping Real Software With AI*. It demonstrates a single feature — a QR code API for restaurant menus — built two ways:

1. **`vibe-coded/route.ts`** — what you get when you tell the AI *"make me a QR code endpoint"* and accept the first output.
2. **`contract-first/route.ts`** — what you get when you hand the AI a one-page prompt contract (`contract-first/prompt-contract.md`) before it writes a single line.

The code is identical in purpose. The difference is entirely in the input the developer provided.

## What breaks without the contract

| Scenario | Vibe-coded | Contract-first |
|---|---|---|
| Missing `url` param | Crashes (unhandled null) | 400 JSON error |
| `javascript:alert(1)` | Generates an XSS QR code | 400 — scheme rejected |
| URL > 2048 chars | Unreadable QR or crash | 400 — length rejected |
| Cache headers | None | `Cache-Control: public, max-age=86400` |
| Error responses | Stack trace or 500 | Structured JSON with message |

## Running the tests

The test script sends `curl` requests against both versions. Because these are Next.js API routes, you would need to drop each `route.ts` into a Next.js project at `app/api/qr/route.ts` and run it. For illustration purposes you can read through `test.sh` to see the five test cases and their expected results.

```bash
# Make the test script executable
chmod +x test.sh

# Review the test cases
cat test.sh
```

> **Note:** This is an illustrative example, not a standalone runnable app. The route files use Next.js 14 App Router conventions and the `qrcode` npm package. Install dependencies with `npm install` if you want to check TypeScript compilation.

## The prompt contract

The key artifact is `contract-first/prompt-contract.md`. It follows the five-section template from the book:

1. **Inputs** — what the function receives, with types and defaults
2. **Expected Output** — success and error response shapes
3. **Constraints** — validation rules, allowed values, limits
4. **Edge Cases** — specific scenarios and their expected behavior
5. **Acceptance Criteria** — checkboxes you can verify after generation

The contract is 40 lines. Writing it takes about 5 minutes. The code it produces handles every case on the first generation.

## Book reference

This example is discussed in Chapter 1: *The Prompt That Saved My Weekend*. For the full prompt contract template and more examples, see the `/templates/` directory in this repo.
