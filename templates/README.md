# Prompt Contract Templates

Copy a template, replace the `[placeholders]` with your specifics, hand it to Claude Code.

```bash
cp templates/api-route.md my-feature-contract.md
# Edit the placeholders
claude "Read my-feature-contract.md and implement it."
```

## All Templates

| Template | What it's for | When to use it |
|----------|---------------|----------------|
| [`api-route.md`](api-route.md) | REST API endpoints, webhook handlers | Building any backend route |
| [`auth-flow.md`](auth-flow.md) | Clerk auth with Next.js App Router | Adding login/signup to a Next.js app |
| [`convex-mutation.md`](convex-mutation.md) | Convex database mutations with validation | Writing to a Convex database |
| [`convex-query.md`](convex-query.md) | Paginated Convex queries with React component | Reading from a Convex database with Load More |
| [`react-component.md`](react-component.md) | React components with loading/error states | Building any UI component |
| [`database-schema.md`](database-schema.md) | Database schemas with types and indexes | Designing a new database |
| [`full-saas.md`](full-saas.md) | Complete AI-powered feature contract | Planning a full feature end-to-end |
| [`debugging.md`](debugging.md) | Systematic bug investigation and fix | Fixing a bug without guessing |
| [`ascii-wireframe.md`](ascii-wireframe.md) | Visual planning before coding | Planning UI, schemas, or flows visually |
| [`contract-generator.md`](contract-generator.md) | Meta-prompt that generates contracts for you | When you don't know where to start |

## The Five Sections

Every template follows the same structure:

1. **Inputs** — What the AI needs to know before writing code
2. **Expected Output** — What files and exports to produce
3. **Constraints** — MUST / MUST NOT rules (this is where 80% of the value comes from)
4. **Edge Cases** — What could go wrong and how to handle it
5. **Acceptance Criteria** — Binary pass/fail checks

The `debugging.md` and `contract-generator.md` templates add extra sections (Context, Examples) but still follow the core five.

## Tips

- **Start with Constraints.** Write the MUST NOTs first — what should the code never do? This prevents the most common AI mistakes.
- **Be specific in Edge Cases.** "Handle errors" is useless. "Return 400 with `{ error: 'Email already exists' }` if the email is taken" is useful.
- **Keep Acceptance Criteria testable.** Each one should be a yes/no check that anyone can verify without reading source code.
- **Don't over-specify.** Let the AI decide variable names, internal helpers, and import paths. Specify *behavior*, not *implementation*.
