# Contributing

Got a prompt contract that works? Share it.

## Submit a template

1. Fork this repo
2. Create your template in `templates/your-template-name.md`
3. Follow the five-section format:
   - **Inputs** — what the AI needs to know before writing code
   - **Expected Output** — file type, structure, exports
   - **Constraints** — MUST / MUST NOT rules
   - **Edge Cases** — what could go wrong and how to handle it
   - **Acceptance Criteria** — binary pass/fail checks
4. Open a PR with a one-sentence description of what the template covers

## Share your results

Built something using a prompt contract from this repo? Open an issue with:
- Which template you used
- What you built
- What you'd change about the template

## Ground rules

- One template = one concern. Don't bundle three features into one contract.
- Keep templates stack-agnostic where possible. If your template requires a specific framework, say so in the Inputs section.
- Use `[placeholders]` for anything the user needs to customize.
- No affiliate links in templates.

## Code examples

If you want to add a code example (contract + generated output):
1. Create a directory under `examples/`
2. Include the prompt contract (`.md`) and the code it produced
3. Add a `README.md` explaining what the example demonstrates
4. Make sure it runs (or clearly document what's needed to run it)
