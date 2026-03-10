# Prompt Contract: DreamMiner Database Schema

## Inputs
- Database: Convex
- Domain: AI-powered Dream 100 report generator. Users pay for
  reports that list 100 relevant influencers/contacts for their niche.
- Entities: users, reports, contacts, payments
- Auth provider: Clerk (clerkId links to external auth)

## Expected Output
- File: convex/schema.ts
- Type: Convex schema definition with defineSchema/defineTable
- Tables: users, reports, contacts, payments

## Constraints
- MUST use v.string(), v.number(), v.id() for all field types
- MUST use v.union(v.literal()) for status/enum fields — never raw strings
- MUST add indexes on fields used in queries (clerkId, userId, reportId, stripeSessionId)
- MUST keep contacts as a separate table (not nested array in reports)
  — each contact is its own document, queryable independently
- MUST include createdAt timestamp on reports
- MUST NOT use v.any() anywhere
- MUST NOT store raw AI responses as untyped blobs

## Edge Cases
- User with zero reports: query returns empty array, not error
- Report with zero contacts (AI call failed): status is "failed", contactCount omitted
- Payment created before report exists: use v.id("reports") to enforce referential integrity

## Acceptance Criteria
- [ ] All 4 tables defined with typed fields
- [ ] Status fields use v.union(v.literal()) not v.string()
- [ ] Every table has at least one index matching its primary query pattern
- [ ] contacts table indexed by reportId for efficient per-report queries
- [ ] payments table indexed by stripeSessionId for webhook lookups

---
**Output:** See `../convex/schema.ts` for the code this contract produced.
