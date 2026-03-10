# Prompt Contract: Debug [Bug Description]

## Context
Use this template when you have a bug to investigate and fix. Debugging is the #1 use case for AI coding assistants — more common than writing new code. This contract prevents the AI from guessing at causes and forces a systematic investigation.

## The Contract

### Inputs
- Symptom: [what's happening — exact error message, unexpected behavior, screenshot]
- Expected behavior: [what should happen instead]
- Reproduction steps: [how to trigger the bug — be specific]
- Environment: [dev/staging/prod, browser, OS, relevant versions]
- Recent changes: [what changed since it last worked — commits, deploys, config updates]
- Files likely involved: [your best guess at where the bug lives]
- Logs/stack trace: [paste the actual error output if available]

### Expected Output
- Root cause: [a clear explanation of WHY the bug happens, not just WHERE]
- Fix: [minimal code change that resolves the issue]
- File(s) modified: [list every file touched]
- Regression check: [what else could break from this fix]

### Constraints
- MUST reproduce the bug before proposing a fix
- MUST identify the root cause, not just suppress the symptom
- MUST NOT change code unrelated to the bug
- MUST NOT add dependencies to fix the issue
- MUST NOT refactor surrounding code — fix the bug only
- MUST explain why the fix works, not just what it changes
- If the root cause is unclear after investigation, say so — don't guess

### Edge Cases
- Bug only appears in production: check environment-specific config (env vars, CORS, auth redirects)
- Bug is intermittent: look for race conditions, timing-dependent logic, cache staleness
- Bug appeared after a deploy with no code changes: check dependency updates, infrastructure changes, third-party API changes
- Multiple bugs masquerading as one: fix them separately, one commit each
- Fix introduces a new failure: revert and investigate further

### Acceptance Criteria
- [ ] Root cause identified and explained in plain language
- [ ] Fix is minimal — changes only what's necessary
- [ ] Original reproduction steps no longer trigger the bug
- [ ] No new warnings or errors introduced by the fix
- [ ] Related functionality still works (manual or automated check)

## Example Usage

```
Debug this issue using the debugging prompt contract:

Symptom: Users see a blank white page after logging in on Safari.
The console shows "TypeError: Cannot read properties of undefined
(reading 'id')".

Expected: Dashboard loads with user data after Clerk redirect.

Reproduction: Log in with Google OAuth on Safari 17. Works fine
on Chrome and Firefox.

Recent changes: Updated Clerk SDK from 4.x to 5.x yesterday.

Likely files: src/app/dashboard/page.tsx,
src/middleware.ts, src/providers/ConvexClientProvider.tsx

Logs: TypeError at ConvexClientProvider.tsx:23 —
useAuth() returns { userId: undefined } for ~200ms
after redirect before populating.
```

## Example Output

```typescript
// src/providers/ConvexClientProvider.tsx
// Root cause: Clerk 41.x changed useAuth() behavior on Safari.
// The userId is undefined during the initial hydration window
// after OAuth redirect. The old SDK returned null (falsy but
// defined), the new SDK returns undefined. Our check was:
//   if (!auth.userId) show loading
// which worked for null but also caught the brief undefined
// state on Chrome without issues because Chrome hydrates faster.
// Safari's slower hydration made the undefined window visible.

// Fix: explicitly check for the loading state instead of
// relying on userId truthiness.

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  if (!auth.isLoaded) {
    return <LoadingSkeleton />;
  }

  if (!auth.isSignedIn) {
    redirect("/sign-in");
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
```
