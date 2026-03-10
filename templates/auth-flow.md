# Prompt Contract: [Auth Flow Name]

## Inputs
- Framework: Next.js 14+ (App Router)
- Auth provider: Clerk
- Route to protect: [e.g., /dashboard, /settings, /admin]
- OAuth providers: [e.g., Google, GitHub, or "email only"]
- Redirect after login: [e.g., /dashboard]
- Redirect after logout: [e.g., /]
- Existing files: [list any layout.tsx, middleware.ts, or providers already in the project]

## Expected Output
- File: `middleware.ts` — Clerk auth middleware with public/protected route config
- File: `app/layout.tsx` — Root layout with `<ClerkProvider>` wrapping the app
- File: `app/[route]/page.tsx` — Protected page using `useUser()` with loading/signed-out/signed-in states
- File: `app/sign-in/[[...sign-in]]/page.tsx` — Sign-in page with `<SignIn />` component
- File: `app/sign-up/[[...sign-up]]/page.tsx` — Sign-up page with `<SignUp />` component

## Constraints
- MUST use `clerkMiddleware()` from `@clerk/nextjs/server` (not the deprecated `authMiddleware`)
- MUST use `useUser()` hook for client-side user data, NOT `useAuth()` alone
- MUST handle three states in protected pages: loading, signed-out (redirect), signed-in (render content)
- MUST show a loading skeleton while auth state resolves — never a blank screen
- MUST NOT redirect inside a component body — use `redirect()` from `next/navigation` in server components or `useRouter` in client components
- MUST NOT hardcode redirect URLs — use environment variables or Clerk dashboard config
- MUST include `publicRoutes` in middleware for sign-in, sign-up, and any public pages
- MUST wrap the app in `<ClerkProvider>` at the root layout level

## Edge Cases
- Token expired mid-session: Clerk handles refresh automatically, but the protected page must not crash if `user` is briefly `null` during refresh
- OAuth provider returns error (user denies permission): `<SignIn />` handles this, but verify the error is visible to the user, not swallowed
- User signs up with OAuth but has no email (e.g., GitHub with private email): handle gracefully — show a "complete your profile" prompt or accept username as identifier
- User hits a protected route directly (no prior navigation): middleware redirects to sign-in, sign-in redirects back to original URL after auth
- Multiple tabs open: signing out in one tab should not leave other tabs in a stale signed-in state

## Acceptance Criteria
- [ ] Unauthenticated user visiting a protected route gets redirected to `/sign-in`
- [ ] After sign-in, user is redirected to the originally requested route
- [ ] Protected page shows a loading skeleton while auth state loads — never a white flash
- [ ] Signing out redirects to the public homepage
- [ ] `middleware.ts` correctly marks public routes as accessible without auth
- [ ] `useUser()` returns user data on protected pages after successful auth
- [ ] Auth flow works with both OAuth and email/password (if both are configured)
