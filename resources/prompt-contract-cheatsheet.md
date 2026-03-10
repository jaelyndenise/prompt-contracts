# Prompt Contract Cheatsheet

One page. Five sections. The difference between code that works on
the demo and code that survives production.

## The Format

```
# Prompt Contract: [Feature Name]

## Inputs
What Claude Code needs to know BEFORE writing code.
- Existing files to read
- Database schema / tables
- Business rules that aren't obvious from the code
- Stack and framework versions

## Expected Output
What Claude Code should produce.
- File path and name
- Type (mutation / query / component / route / action)
- Exports (named / default)
- High-level structure

## Constraints
What the code MUST and MUST NOT do.
- MUST: [non-negotiable requirements]
- MUST NOT: [things that will break production]
- USE: [specific patterns, libraries, APIs]
- AVOID: [anti-patterns, unwanted dependencies]

## Edge Cases
What happens when things go wrong.
- [Scenario]: [expected behavior]
- [Scenario]: [expected behavior]
- [Scenario]: [expected behavior]

## Acceptance Criteria
How you'll know it's correct.
- [ ] [Testable condition]
- [ ] [Testable condition]
- [ ] [Testable condition]
```

## Section-by-Section

### Inputs — "What do you already know?"

Skip this and Claude Code invents your schema. It will guess
your table names, your field types, your auth setup. It will
guess wrong.

**Always include:**
- Files Claude Code should read first (`schema.ts`, `layout.tsx`)
- The actual field names and types from your database
- Business rules that aren't in the code ("emails must be unique",
  "free tier users can't access this endpoint")

### Expected Output — "What are you handing me?"

Be specific about the file path. Claude Code defaults to
creating new files instead of editing existing ones. If you
want it to modify `src/components/Dashboard.tsx`, say so.

**Always include:**
- Exact file path
- Whether it's a named or default export
- The general shape (not pseudocode — just "a React component
  with three states" or "a Convex mutation that returns a doc ID")

### Constraints — "The guardrails"

This is where you prevent the expensive mistakes.

**Common MUST NOTs:**
- MUST NOT install new dependencies (Claude Code loves `npm install`)
- MUST NOT use `any` type
- MUST NOT skip error handling
- MUST NOT hardcode values that belong in env vars
- MUST NOT use `.filter()` when an index exists

**Common MUSTs:**
- MUST use existing utility functions from `src/lib/`
- MUST handle loading and error states
- MUST return 200 on webhook handlers even if processing fails
- MUST validate inputs before database operations

### Edge Cases — "What breaks at 2 AM?"

Every edge case you skip is a bug you'll find in production.
Think about:
- **Zero values** — `0` is falsy in JavaScript. Your code will
  treat it like `undefined` unless you check explicitly.
- **Empty strings** — is `""` a valid input or an error?
- **Missing data** — what if the API returns `null`? What if the
  database query returns no results?
- **Duplicates** — what happens if this function runs twice with
  the same input?
- **Large inputs** — 1 item works. Does 10,000?

### Acceptance Criteria — "Pass or fail?"

Write these FIRST. If you can't define what success looks like,
you don't understand the feature well enough to delegate it.

**Good criteria are:**
- Binary (passes or fails, no "looks good")
- Testable (you can verify in under 60 seconds)
- Specific ("returns document ID" not "works correctly")

## Quick Reference

| Section | Answers | Skip it and... |
|---------|---------|----------------|
| Inputs | "What exists?" | Claude invents your schema |
| Output | "What do I get?" | Wrong file, wrong exports |
| Constraints | "What's forbidden?" | 3 new npm packages arrive |
| Edge Cases | "What breaks?" | Production breaks at 2 AM |
| Criteria | "How do I know?" | "Looks good" becomes the test |

## Examples

Full contract examples with matching code output:
- [DreamMiner SaaS contracts](../examples/chapter-3-saas/contracts/)
- [QR code API route](../examples/qr-before-after/contract-first/prompt-contract.md)
- [Batch QR CLI tool](../examples/qr-cli-tool/prompt-contract.md)
- [n8n workflow contract](../examples/n8n-workflows/content-pipeline-contract.md)

Reusable templates:
- [All templates](../templates/)

---

From *[Prompt Contracts](https://www.amazon.com/dp/PLACEHOLDER)* — the
full framework with war stories, real builds, and everything that went
wrong along the way.
