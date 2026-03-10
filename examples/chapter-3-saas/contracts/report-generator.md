# Prompt Contract: Dream 100 Report Generator

The core AI feature of DreamMiner. This contract defines both the
Convex action AND the system prompt sent to Claude.

## Inputs
- reportId: ID of the report document in Convex
- productDescription: what the user sells (1-3 paragraphs)
- targetMarket: the audience segment to reach
- tier: "standard" or "premium" (premium adds extra fields)

## Expected Output
- File: convex/reports.ts
- Named export: generateReport
- Type: Convex action (not mutation — it calls an external API)
- Behavior: reads inputs, calls Claude API with the prompt contract
  as system message, parses JSON response, stores contacts one by one

## Constraints
- MUST use Anthropic SDK (not raw fetch)
- MUST embed the prompt contract as the system message
- MUST request raw JSON output (no markdown, no preamble)
- MUST parse response with try/catch — AI can return invalid JSON
- MUST store contacts individually via ctx.runMutation (not as a blob)
- MUST mark report as complete with contact count after storage
- MUST NOT store raw AI response — parse into typed contact objects
- MUST NOT use v.any() for contact fields

### AI System Prompt Constraints (embedded in the action)
- Every contact MUST be a real, verifiable person or brand
- Do NOT invent names or generate plausible-sounding URLs
- Do NOT combine traits from multiple people into composites
- Category minimum: 15 per category (influencer, newsletter, podcast,
  community, media)
- Prioritize relevance over follower count
- No accounts inactive for 6+ months
- No duplicates
- Premium tier adds: priority_rank, activation_channel,
  content_frequency, partnership_signals

## Edge Cases
- AI returns invalid JSON: throw Error with first 200 chars of response
- AI returns fewer than 100 contacts: accept it (better than hallucinated ones)
- AI returns contacts with missing fields: let Convex mutation validation catch it
- Premium tier: additional fields are optional — don't crash if AI omits them

## Acceptance Criteria
- [ ] Action calls Claude API with structured system prompt
- [ ] Response is parsed as JSON with error handling
- [ ] Each contact stored as individual Convex document
- [ ] Report marked complete with accurate contact count
- [ ] Premium tier includes additional fields in system prompt
- [ ] No raw AI output stored — everything parsed into typed fields

---
**Output:** See `../convex/reports.ts` for the code this contract produced.
