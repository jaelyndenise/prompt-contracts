# Prompt Contract: Stripe Webhook Handler

## Inputs
- Stripe events: checkout.session.completed, invoice.payment_failed
- Convex backend: update payment status in "payments" table
- Environment: Next.js API route, Stripe SDK installed
- Stripe webhook secret in STRIPE_WEBHOOK_SECRET env var

## Expected Output
- File: app/api/webhooks/stripe/route.ts
- Type: Next.js App Router POST handler
- Behavior: verify Stripe signature, parse event, update Convex

## Constraints
- MUST verify webhook signature before processing any event
- MUST return 200 even if processing fails — Stripe retries on non-200,
  which creates retry storms if your handler has an app-level bug
- MUST NOT expose internal errors in the response body
- MUST log errors for debugging but swallow them for the response
- MUST check for missing webhook secret at module load (startup),
  not inside the request handler — fail fast, not fail silently
- Use stripe.webhooks.constructEvent for verification

## Edge Cases
- Invalid signature: return 400, log warning (not error — it's expected noise)
- Unknown event type: return 200, ignore silently (don't crash on new event types)
- Convex mutation fails: log error, still return 200 to Stripe
- Missing signature header: return 400 before attempting verification
- Missing webhook secret env var: throw at startup so deploy fails visibly

## Acceptance Criteria
- [ ] Valid checkout.session.completed updates payment status to "paid"
- [ ] Invalid signature returns 400
- [ ] Unknown event types return 200 without processing
- [ ] Convex failures don't cause 500 response to Stripe
- [ ] Missing env var throws at module load, not per-request

---
**Output:** See `../app/api/webhooks/stripe/route.ts` for the code this contract produced.
The webhook pattern is one of the most reusable contracts in this repo —
adapt it for any payment provider that uses webhook verification.
