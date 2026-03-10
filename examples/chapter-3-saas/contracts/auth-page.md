# Prompt Contract: Authenticated Page Component

## Inputs
- Auth provider: Clerk (useUser hook)
- Page type: protected route — only signed-in users can view
- Data: will display user-specific content (reports list)

## Expected Output
- File: src/app/report/page.tsx
- Default export: ReportPage
- Type: Next.js client component ("use client")

## Constraints
- MUST use Clerk's useUser() hook for auth state
- MUST handle three states: loading, not signed in, signed in
- MUST show loading indicator while auth state resolves (isLoaded === false)
- MUST show sign-in prompt if user is not authenticated
- MUST NOT redirect programmatically — show a message instead
  (Clerk middleware handles route protection, this is the fallback UI)
- MUST NOT call any data-fetching hooks until auth is confirmed

## Edge Cases
- Auth provider slow to load: show "Loading..." not a flash of content
- User signs out while on page: useUser updates reactively, shows sign-in prompt
- User object loaded but firstName is null: handle gracefully (use "there" or email)

## Acceptance Criteria
- [ ] Loading state prevents flash of unauthenticated content
- [ ] Unauthenticated users see a clear sign-in message
- [ ] Authenticated users see their name in the greeting
- [ ] No data queries fire before auth is confirmed

---
**Output:** See `../src/app/report/page.tsx` for the code this contract produced.
