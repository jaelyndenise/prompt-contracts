# Prompt Contract: [Mutation Name]

## Inputs
- Schema: [table name with fields and types]
- Index: [relevant indexes]
- Business rule: [non-obvious rules]

## Expected Output
- File: convex/[filename].ts
- Named export: [mutation name]
- Type: Convex mutation with args validation

## Constraints
- MUST use v.string(), v.number(), v.union(v.literal()) for args validation
- MUST check for duplicates using indexed queries (not .filter())
- MUST return the new document ID on success
- MUST NOT use raw string comparison for lookups
- MUST NOT import external validation libraries

## Edge Cases
- Duplicate entry: throw descriptive Error
- Missing fields: Convex args validation handles automatically
- Empty string values: [specify per field — allow or reject]
- Invalid enum value: Convex v.union() rejects automatically

## Acceptance Criteria
- [ ] Inserting valid data returns a document ID
- [ ] Duplicate check uses index, not filter
- [ ] Args validation rejects invalid types
- [ ] Timestamps set automatically where needed
