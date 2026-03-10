# Prompt Contract: [Schema Name]

## Inputs
- Database: [Convex / Supabase / Postgres / etc.]
- Domain: [what the app does — 1-2 sentences]
- Entities: [list the main entities/tables needed]
- Auth provider: [Clerk / Supabase Auth / etc.]

## Expected Output
- File: [convex/schema.ts or migrations/xxx.sql]
- Type: schema definition with types and indexes
- Tables: [list table names]

## Constraints
- MUST define strict types for all fields (no `any` or loose types)
- MUST add indexes on fields used in queries
- MUST use union types for status/enum fields (not raw strings)
- MUST include timestamp fields (createdAt) where appropriate
- MUST NOT nest large arrays inside documents (use separate tables)
- MUST NOT store raw API responses without parsing into typed fields
- Foreign keys: use typed ID references (v.id("tableName") in Convex)

## Edge Cases
- User with no related records: queries return empty arrays, not errors
- Concurrent writes to same record: [specify — last-write-wins or conflict detection]
- Soft delete vs hard delete: [specify approach]
- Data migration from previous schema: [specify if applicable]

## Acceptance Criteria
- [ ] All tables have defined indexes for their primary query patterns
- [ ] No field uses `any` or untyped validators
- [ ] Status fields use union/enum types
- [ ] ID references are typed to their target table
- [ ] Schema supports all planned queries without table scans
