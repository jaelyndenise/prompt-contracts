# Prompt Contract: Cross-Platform Content Syndication Workflow

Build an n8n workflow that takes an article and produces platform-specific variants for Medium, Twitter/X, and LinkedIn.

## Inputs
- Trigger: Webhook (receives JSON with `title`, `body`, `author`, `tags`)
- AI provider: Claude API via HTTP Request node (model: claude-sonnet-4-20250514)
- Publishing targets: Medium API, Twitter/X API, LinkedIn API (via HTTP Request nodes with OAuth credentials)

## Expected Output
- Workflow name: "webhook-syndicate-content"
- Nodes: 8-12 nodes with parallel branches for each platform
- Result: article published (or drafted) on all three platforms with platform-appropriate formatting
- Response to webhook caller: JSON with status per platform (`{ medium: "published", twitter: "published", linkedin: "draft" }`)

## Constraints
- MUST use a single AI call to generate all three variants in one response (structured JSON output with `medium`, `twitter`, `linkedin` keys)
- MUST NOT call the AI API three times — one call, three outputs
- MUST validate the AI response is valid JSON before processing
- MUST use platform-specific formatting:
  - Medium: full Markdown article with title, headers, code blocks preserved
  - Twitter/X: thread format, each tweet max 280 characters, max 10 tweets, first tweet hooks the reader
  - LinkedIn: professional tone, 1300 character max, includes hashtags from tags
- MUST include the original `tags` as hashtags on Medium and LinkedIn
- MUST handle each platform publish independently — if Medium fails, still publish to Twitter and LinkedIn
- MUST NOT hardcode API keys — use n8n credentials for each platform
- MUST return a webhook response with per-platform status even if some fail

## Edge Cases
- Article body is empty: return 400 to webhook caller with error message, don't call AI
- Article is over 20,000 characters: warn in response but still process (Medium handles long content, Twitter thread will be long)
- AI returns invalid JSON: retry once with a stricter prompt, then fail with error in webhook response
- Medium API returns 429 (rate limit): queue for retry, return `"medium": "queued"` in response
- Twitter API returns 403 (auth expired): return `"twitter": "auth_error"` in response, still publish to other platforms
- LinkedIn API is unreachable: return `"linkedin": "unreachable"`, still publish to other platforms
- Duplicate detection: check if an article with the same title was published in the last 24h (via Supabase log), skip if duplicate
- Webhook called without auth header: return 401, don't process

## Acceptance Criteria
- [ ] Webhook receives a POST and triggers the workflow
- [ ] AI call returns three formatted variants in a single response
- [ ] Medium post is created with proper Markdown formatting
- [ ] Twitter thread respects 280-character limit per tweet
- [ ] LinkedIn post is under 1300 characters with hashtags
- [ ] Failure on one platform doesn't block the others
- [ ] Webhook response includes status for all three platforms
- [ ] Empty body returns 400 without calling the AI
- [ ] Duplicate articles are detected and skipped
