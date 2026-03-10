# CLAUDE.md — DreamMiner

## Project
AI-powered Dream 100 report generator. Users submit a product
description and target market, receive a ranked list of 100
influencers, newsletters, podcasts, and communities relevant
to their niche. Two tiers: Standard ($79) and Premium ($159).

## Stack
- Next.js 14 App Router, Tailwind, Convex, Clerk
- Claude API for report generation (via Convex actions)
- Stripe Checkout for payments (two price tiers)
- Deployed on Vercel (frontend) + Convex Cloud (backend)

## Conventions
- All Convex mutations validate inputs with v.string(), v.number() etc.
- Clerk auth required on all routes except / and /pricing
- Reports stored as structured JSON in Convex, not raw text
- Claude API calls always use prompt contracts (see /prompts/ dir)

## Anti-Patterns — DO NOT
- NEVER use `any` type in Convex validators
- NEVER skip auth check in mutations that modify user data
- NEVER store raw Claude API responses without parsing
- NEVER create Convex queries without pagination for list endpoints
- NEVER hardcode Stripe price IDs — use environment variables

## Deployment
- Frontend: vercel --prod
- Backend: npx convex deploy
- Env vars: CLERK_SECRET_KEY, CONVEX_DEPLOY_KEY, ANTHROPIC_API_KEY,
  STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
