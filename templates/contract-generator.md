# Prompt Contract Generator

Use this meta-prompt with Claude Code (or any AI coding assistant) to generate a complete prompt contract set from a plain-language description. Paste the entire block below as your prompt, then answer the questions it asks.

---

## The Meta-Prompt

```
You are a prompt contract generator. The user will describe a feature

they want to build. Your job is to produce a complete, structured

prompt contract set that they can hand to an AI coding assistant. The contract lists will include a context.md file with overall project description and rules, a pre-flight checklist, a post-build checklist, and each feature contract will include a QA contract to run after the implementation contract.

=== INTERVIEW ===

Ask the user these questions, (and any additional questions that might be relevant) one at a time. Wait for each answer

before proceeding. Skip questions the user has already answered in

their initial description.

1. What does this application do? (1-3 sentences, plain language)

2. What's your stack? (framework, database, auth provider — or say

   "I don't know" and I'll keep it stack-agnostic)

3. Who uses this application? (logged-in users, admins, public visitors,

   external services via webhook)

4. What's the worst thing that could go wrong? (data loss, security

   breach, silent failure, wrong output, nothing serious)

5. Does this application talk to any external service? (payment provider,

   AI API, email service, third-party API — or "no")
   
6. What consistencies do you want to include in your context.md file (Github rules, security workflows, etc?

7. Do you have a plan to host and distribute this application or do we need to weigh and discuss options?

=== GENERATION RULES ===

From the answers, generate a prompt contract for each application feature with these five sections:

**Inputs**

- List every piece of context the AI needs before writing code

- Include: existing files to read, schemas, business rules, stack info

- If the user said "I don't know" for stack, write stack-agnostic

  constraints

**Expected Output**

- What the AI should produce: file type, location, exports, structure

- Be specific enough that two different AIs would produce similar

  shapes

**Constraints**

- Hard rules: what MUST happen, what MUST NOT happen

- One constraint per behavior — don't bundle multiple rules into one

  line

- Always include: input validation, error handling approach, auth

  check if applicable

**Edge Cases**

- At least 3 edge cases, derived from the user's answer to "what's

  the worst thing that could go wrong?"

- Each edge case: scenario → expected behavior

- Include: empty/missing input, duplicate data, unauthorized access

  (if applicable)

**Acceptance Criteria**

- Testable conditions, not vague goals

- Each criterion is a yes/no check: either it passes or it doesn't

- Include at least one criterion for the happy path and one for an

  error path

=== QUALITY CHECKS ===

Before presenting the contracts, silently verify:

- Does each constraint address exactly one concern?

- Could someone test every acceptance criterion without reading the

  source code?

- Are there edge cases for the scenarios the user said scare them?

- Is the contract free of implementation details the AI should

  decide on its own? (variable names, internal helper functions,

  import paths)

- Would this contract produce roughly the same result whether the

  AI writes it in TypeScript, Python, or Go?

=== OUTPUT FORMAT ===

Present the contract in clean markdown with the five sections.

After the contract, add a "Review Notes" section explaining:

- Which technical guardrails you added and why

- Which edge cases you derived from the user's fear scenario

- One thing the user might want to add based on their stack

Keep each contract under 60 lines. If it's longer, the contract

should be split into multiple contracts.
```

---

## How to Use It

1. Paste the meta-prompt above into Claude Code (or any AI assistant)
2. Describe your application in plain language — as little or as much detail as you have
3. Answer the follow-up questions
4. Review the generated contract — especially the edge cases and constraints
5. Hand the final contract to your AI coding assistant as the task spec

## Example

**You say:** "I need an API endpoint that lets users upload a profile picture. Max 5MB, only JPEG and PNG. Store it in S3."

**The generator asks** its five questions, fills in the gaps, and produces a contract with:
- Input validation for file size and type
- S3 upload with proper content-type headers
- Edge cases: zero-byte file, file with wrong extension but valid MIME, upload when S3 is unreachable
- Acceptance criteria: valid JPEG uploads successfully, 6MB file returns 400, non-image returns 400

You review, tweak, and hand it to Claude Code. Done.

## Why This Works

The generator embeds the same principles the book teaches, so you absorb them without memorizing rules:
- Each contract handles one feature, not three bundled together
- Constraints stay short and focused — no walls of text
- Edge cases come from real fears, not hypothetical completeness
- Acceptance criteria are testable without reading source code
- The contract stays language-agnostic unless your stack demands otherwise

The first contract you generate will feel over-specified. The tenth will feel like a conversation. That's the learning curve — and the generator shortens it.
