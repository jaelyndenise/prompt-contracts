# Prompt Contract: Monitoring & Alerts Workflow

Build an n8n workflow that monitors URLs on a schedule and sends alerts when something is down.

## Inputs
- Trigger: Cron schedule (configurable, default: every 5 minutes)
- URLs to monitor: list of URLs stored in a Supabase table `monitored_urls` (columns: `url`, `name`, `expected_status`, `active`)
- Alert channel: Slack channel or Telegram chat (configurable via credentials)

## Expected Output
- Workflow name: "cron-monitor-urls"
- Nodes: 5-7 nodes in a linear flow with a branch for alert/no-alert
- Result: for each URL that fails, send an alert with URL, status code, response time, and timestamp
- For each URL that recovers (was down, now up), send a recovery notification

## Constraints
- MUST use HTTP Request node to check each URL (HEAD request for speed, fall back to GET if HEAD returns 405)
- MUST set a timeout of 10 seconds per request — don't wait forever
- MUST check against `expected_status` from the database (not hardcoded 200)
- MUST store check results in a Supabase `url_checks` table (columns: `url_id`, `status_code`, `response_time_ms`, `checked_at`, `is_up`)
- MUST compare current status with last check to detect state changes (up→down, down→up)
- MUST NOT alert on every failed check — only on state transitions (prevents alert storms)
- MUST NOT hardcode URLs in the workflow — read from database
- MUST NOT call external APIs inside a loop without rate limiting

## Edge Cases
- URL times out (no response within 10s): treat as down, log `status_code: null`, `response_time_ms: 10000`
- DNS resolution fails: treat as down, include "DNS failure" in alert message
- URL returns 301/302 redirect: follow up to 3 redirects, check final destination status
- Flapping (up→down→up→down in rapid succession): only alert on the first down transition, then suppress for 15 minutes
- All URLs are down simultaneously: likely a network issue on the monitoring side — send a single "monitoring may be impaired" alert instead of N individual alerts
- Supabase is unreachable: log error locally, skip this check cycle, don't crash the workflow
- First run (no previous check data): treat all URLs as "new", check status, store result, don't send alerts

## Acceptance Criteria
- [ ] Cron trigger fires on schedule
- [ ] All active URLs from the database are checked
- [ ] Failed URL triggers a Slack/Telegram alert with URL name, status, and response time
- [ ] Recovered URL triggers a recovery notification
- [ ] Repeated failures for the same URL do NOT send duplicate alerts
- [ ] Check results are stored in the database with timestamps
- [ ] Timeout is enforced at 10 seconds per URL
- [ ] Inactive URLs (`active: false`) are skipped
