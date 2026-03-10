# Prompt Contract: Content Pipeline Workflow

Build an n8n workflow that processes raw article drafts into
platform-specific content variants.

## Inputs
- Trigger: Manual trigger (button click in n8n UI)
- Source: Read a plain text file from a shared folder path
  (configurable via environment variable DRAFTS_DIR)
- The file contains a raw article draft in plain text

## Expected Output
- Workflow name: "manual-process-content"
- Nodes: 6-8 nodes in a linear flow with one branch
- Result: two formatted variants stored in Supabase
  - Medium variant: full article formatted as Markdown
  - Twitter variant: thread format, max 1800 characters total

## Constraints
- MUST use HTTP Request node for Claude API call (not a Code node)
- MUST include the prompt contract as the system message in the API call
- MUST validate response is valid JSON before processing
- MUST store both variants in a Supabase "content_variants" table
- MUST send a Slack notification with the draft title when complete
- MUST NOT call the AI API inside a loop (one call, two outputs)
- MUST NOT hardcode API keys in the workflow JSON — use n8n credentials

## Edge Cases
- Draft file is empty: skip processing, send Slack warning
- Draft is over 15,000 characters: split into sections, process first
  section only, flag as "needs manual split" in Slack notification
- Claude API returns non-JSON: retry once, then fail with error notification
- Supabase insert fails: log error, still send Slack notification with
  the content in the message body as fallback

## Acceptance Criteria
- [ ] Manual trigger fires the workflow successfully
- [ ] Claude API call includes the prompt contract as system message
- [ ] Medium variant is valid Markdown
- [ ] Twitter variant is under 1800 characters
- [ ] Both variants are stored in Supabase with correct metadata
- [ ] Slack notification includes draft title and processing status
- [ ] Empty file input is handled without workflow failure
