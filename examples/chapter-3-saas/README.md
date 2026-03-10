# Chapter 4 — Ship a SaaS in a Weekend (DreamMiner)

Code excerpts **and the prompt contracts that produced them** from the DreamMiner build described in Chapter 4 of *Prompt Contracts*.

DreamMiner is an AI-powered Dream 100 report generator. Users submit a product description and target market, pay via Stripe, and receive a ranked list of 100 influencers, newsletters, podcasts, and communities relevant to their niche.

## The point

Each code file has a matching prompt contract in `contracts/`. Read the contract first, then look at the code Claude Code generated from it. That's the whole method — specify precisely, get correct code on the first try.

## Prompt Contracts (reusable)

| Contract | What it specifies | Reuse it for |
|----------|-------------------|--------------|
| `contracts/database-schema.md` | Convex schema with typed fields, indexes, relations | Any Convex/database project |
| `contracts/report-generator.md` | AI action: API call + JSON parsing + storage | Any AI-powered feature |
| `contracts/stripe-webhook.md` | Webhook verification + event routing + error handling | Any Stripe integration |
| `contracts/auth-page.md` | Protected page with loading/auth/content states | Any Clerk-protected route |

**Copy these contracts, change the specifics, use them for your project.**

## Code Output

| File | Generated from |
|------|----------------|
| `convex/schema.ts` | `contracts/database-schema.md` |
| `convex/reports.ts` | `contracts/report-generator.md` |
| `app/api/webhooks/stripe/route.ts` | `contracts/stripe-webhook.md` |
| `src/app/report/page.tsx` | `contracts/auth-page.md` |

## Setup

This is production code from a real project. The contracts are immediately reusable. The code shows what those contracts produce — to build your own version, read Chapter 4.

To run this locally, you need:

1. **Convex** — Create a project at [convex.dev](https://www.convex.dev), run `npx convex dev` to start the local backend
2. **Clerk** — Create an app at [clerk.com](https://clerk.com), enable Google OAuth (or your preferred provider)
3. **Anthropic** — Get an API key at [console.anthropic.com](https://console.anthropic.com)
4. **Stripe** — Create products and a webhook endpoint at [dashboard.stripe.com](https://dashboard.stripe.com)

```bash
npm install

# Create .env.local with:
# NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
# CLERK_SECRET_KEY=sk_test_...
# ANTHROPIC_API_KEY=sk-ant-...
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...

npx convex dev   # Start Convex backend
npm run dev      # Start Next.js frontend
```

This is not plug-and-play — you need real accounts and API keys. But the contracts (`contracts/`) work standalone: copy one, fill in your specifics, hand it to Claude Code.

## Stack

- Next.js 14 (App Router)
- Convex (backend + database)
- Clerk (authentication)
- Anthropic Claude API (report generation)
- Stripe Checkout (payments)
- Tailwind CSS (styling)

## Next steps

- Browse the [prompt contract templates](../../templates/) for more patterns
- Check [resources/stack.md](../../resources/stack.md) for tool links and setup guides
- Read the book for the full build story, failures included
