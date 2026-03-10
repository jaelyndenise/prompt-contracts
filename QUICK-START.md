# Quick Start — 10 Minutes to Your First Prompt Contract

Three things to do right now. No setup. No installs. Just
a terminal and Claude Code.

## Step 1: Copy a template (30 seconds)

Pick the template closest to what you're building:

| Building... | Use this template |
|-------------|-------------------|
| An API endpoint | [`templates/api-route.md`](templates/api-route.md) |
| A database mutation | [`templates/convex-mutation.md`](templates/convex-mutation.md) |
| A paginated query | [`templates/convex-query.md`](templates/convex-query.md) |
| A React component | [`templates/react-component.md`](templates/react-component.md) |
| A database schema | [`templates/database-schema.md`](templates/database-schema.md) |
| An auth flow | [`templates/auth-flow.md`](templates/auth-flow.md) |
| An AI-powered feature | [`templates/full-saas.md`](templates/full-saas.md) |
| A bug to fix | [`templates/debugging.md`](templates/debugging.md) |
| A UI layout | [`templates/ascii-wireframe.md`](templates/ascii-wireframe.md) |
| No idea where to start | [`templates/contract-generator.md`](templates/contract-generator.md) |

```bash
cp templates/api-route.md my-feature-contract.md
```

## Step 2: Fill in the blanks (5-10 minutes)

Open the template. Replace every `[placeholder]` with your specifics.

**The sections that matter most:**

1. **Constraints** — write the MUST NOTs first. What will break
   production? What should the code never do? This is where 80%
   of the value comes from.

2. **Edge Cases** — think like a user who wants to break your app.
   Empty strings. Zero values. Duplicate submissions. Expired tokens.

3. **Acceptance Criteria** — write these as binary pass/fail checks.
   "Returns a 200 with JSON body" not "works correctly."

Don't overthink Inputs and Expected Output. They're usually obvious
once you know what you're building.

## Step 3: Hand it to Claude Code (10 seconds)

```bash
claude "Read my-feature-contract.md and implement it."
```

That's it. Claude Code reads the contract, writes the code, and
the output matches your specification because you defined what
"correct" means before the AI started writing.

## What happens next

**First time:** you'll be surprised how much better the output is
compared to freeform prompting. The code handles edge cases you
forgot existed. The loading states are there. The error handling
is real.

**After a week:** you'll stop iterating. One contract, one output,
move on. The time you used to spend on "actually, can you also..."
is now spent building the next feature.

**After a month:** your CLAUDE.md file (the permanent context file
for your project) will have 15 anti-patterns in it, each one a
scar from a real bug. Claude Code won't make those mistakes again
because you wrote them down.

## See it in action

Want to see what a contract produces before writing your own?

1. Read a contract: [`examples/chapter-3-saas/contracts/database-schema.md`](examples/chapter-3-saas/contracts/database-schema.md)
2. See the output: [`examples/chapter-3-saas/convex/schema.ts`](examples/chapter-3-saas/convex/schema.ts)
3. Notice: every field type, every index, every constraint in the
   code traces back to a line in the contract.

More examples:
- [QR code API: vibe-coded vs contract-first](examples/qr-before-after/)
- [Python CLI tool from a contract](examples/qr-cli-tool/)
- [Full SaaS build contracts](examples/chapter-3-saas/contracts/)

## Go deeper

- **[Cheatsheet](resources/prompt-contract-cheatsheet.md)** — the
  five-section format explained in detail
- **[Vibe coding checklist](resources/vibe-coding-checklist.md)** —
  10 signs your prompts need contracts
- **[Full tool stack](resources/stack.md)** — every tool mentioned
  in the book with setup links
- **[The book](https://www.amazon.com/dp/PLACEHOLDER)** — the
  complete framework with war stories and a full SaaS build
