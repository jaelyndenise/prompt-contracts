# Prompt Contracts

**A structured way to tell AI exactly what to build — so it writes production code on the first try.**

Prompt contracts replace vague prompts with five-section specs: Inputs, Expected Output, Constraints, Edge Cases, and Acceptance Criteria. Instead of "build me a profile API" and hoping for the best, you define what "done" means before the AI writes a single line. The result: code that handles errors, validates inputs, and works in production — not just in demos.

This repo is the companion to the book *[Prompt Contracts: How I Stopped Vibe Coding and Started Shipping Real Software With AI](https://www.amazon.com/dp/PLACEHOLDER)*. It contains the templates, runnable examples, and full tool stack from the book.

---

## Quick Start

Copy this contract, replace the placeholders, hand it to Claude Code:

```markdown
# Prompt Contract: User Profile API

## Inputs
- Framework: Next.js 14 (App Router)
- Auth: Clerk (useUser hook)
- Database: Convex (users table with name, email, avatarUrl)

## Expected Output
- File: app/api/profile/route.ts
- Type: GET + PUT handler
- Returns: JSON user object

## Constraints
- MUST verify auth via Clerk before any database operation
- MUST return 401 for unauthenticated requests
- MUST validate email format on PUT
- MUST NOT expose internal user ID in response

## Edge Cases
- User not found in database: return 404, not 500
- PUT with empty body: return 400 with specific field errors
- Email already taken by another user: return 409

## Acceptance Criteria
- [ ] GET /api/profile returns user data for authenticated user
- [ ] PUT /api/profile updates name and email
- [ ] Unauthenticated request returns 401
- [ ] Invalid email returns 400
```

```bash
claude "Read profile-contract.md and implement it."
```

That's it. The AI writes code that handles edge cases, validates inputs, and passes every acceptance criterion — because you defined what "correct" means before it started.

**[Full quick start guide](QUICK-START.md)** — write your first contract in 10 minutes.

---

## What is a Prompt Contract?

A structured spec with five sections that turns vague AI prompts into predictable code.

**Without a contract:**
> "Build me a profile API with Clerk auth"
>
> *Result: no error handling, no input validation, hardcoded values, missing edge cases. Works in the demo. Breaks in production.*

**With a contract:**
> Five sections — Inputs, Expected Output, Constraints, Edge Cases, Acceptance Criteria — that tell the AI exactly what "done" means.
>
> *Result: auth checks, validation, proper error codes, edge cases handled. Works in production on the first try.*

---

## Templates

Reusable prompt contract templates. Copy, customize, ship.

| Template | Use case |
|----------|----------|
| [`api-route.md`](templates/api-route.md) | REST API endpoints, webhook handlers |
| [`auth-flow.md`](templates/auth-flow.md) | Clerk auth for Next.js App Router |
| [`convex-mutation.md`](templates/convex-mutation.md) | Convex database mutations with validation |
| [`convex-query.md`](templates/convex-query.md) | Paginated Convex queries with React UI |
| [`react-component.md`](templates/react-component.md) | React components with loading/error states |
| [`database-schema.md`](templates/database-schema.md) | Database schemas with types and indexes |
| [`full-saas.md`](templates/full-saas.md) | Complete AI-powered feature contract |
| [`debugging.md`](templates/debugging.md) | Systematic bug investigation and fix |
| [`ascii-wireframe.md`](templates/ascii-wireframe.md) | Visual planning before coding |
| [`contract-generator.md`](templates/contract-generator.md) | Meta-prompt that writes contracts for you |

**[Template guide](templates/README.md)** — how to fill in the five sections.

## Examples

Real code from the book — each with the prompt contract that produced it.

| Directory | What's inside | Language |
|-----------|---------------|----------|
| [`qr-before-after/`](examples/qr-before-after/) | Vibe-coded vs contract-first API route — side-by-side | TypeScript |
| [`qr-cli-tool/`](examples/qr-cli-tool/) | Batch QR code generator with CSV input | Python |
| [`chapter-3-saas/`](examples/chapter-3-saas/) | DreamMiner: contracts + code for schema, AI action, webhook, auth | TypeScript |
| [`claude-md/`](examples/claude-md/) | Production CLAUDE.md files for different project types | Markdown |
| [`web-scraper/`](examples/web-scraper/) | Web scraper with proxy support | Python |
| [`n8n-workflows/`](examples/n8n-workflows/) | Prompt contracts for n8n automation workflows | Markdown |

## Tools I Use Daily

Building a project and need to pick your stack? **[resources/stack.md](resources/stack.md)** has every tool mentioned in the book — with descriptions, comparisons, and cost breakdown.

## From the Book

**[Prompt Contracts: How I Stopped Vibe Coding and Started Shipping Real Software With AI](https://www.amazon.com/dp/PLACEHOLDER)** is available on Amazon.

- Why vibe coding produces demo-quality code (and what to do instead)
- The five-section contract format that makes AI output predictable
- Building a SaaS in a weekend with contracts — DreamMiner, start to finish
- CLAUDE.md: the permanent memory file that makes your AI assistant smarter over time
- Shipping solo: automation, monitoring, and staying sane as a one-person team

The templates work standalone. The examples run without context. But the book gives you the war stories, the failures, and the framework that ties everything together.

## Contributing

Got a prompt contract that works? **[Submit it](CONTRIBUTING.md).**

## License

Code examples: MIT. Templates: use them however you want.

---

Built with [Claude Code](https://claude.ai/code). Written by [@rentierdigital](https://rentierdigital.xyz).
