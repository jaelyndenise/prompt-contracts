# Stack & Tools

Tools mentioned in *Prompt Contracts*, organized by category.
This is the author's actual stack — every tool listed here is
something I use in production, not a sponsored recommendation.

## Development

**[Claude Code](https://claude.ai/code)** — AI coding assistant (CLI)
The core tool this book is about. Write prompt contracts, get
correct code on the first try.

**[Convex](https://convex.dev)** — Reactive backend-as-a-service
Real-time database, server functions, file storage. The backend
for DreamMiner (Ch.3). Type-safe from database to frontend.

**[Clerk](https://clerk.com)** — Authentication
Drop-in auth with social login, MFA, user management. Three
lines to add to your app layout. Used in Ch.3.

**[Next.js](https://nextjs.org)** — React framework
App Router, server components, API routes. The frontend framework
for every project in this book.

**[Vercel](https://vercel.com)** — Deployment platform
`vercel --prod` and you're live. Zero-config deploys for Next.js.
Used in Ch.3 for DreamMiner deployment.

**[Tailwind CSS](https://tailwindcss.com)** — Utility-first CSS
No custom CSS files. Just utility classes. Every component in
this book uses Tailwind.

## AI & APIs

**[Anthropic Claude API](https://docs.anthropic.com)** — LLM for generation
Powers the DreamMiner report generation (Ch.3) and content
pipeline AI calls (Ch.5). Use with prompt contracts.

**[OpenRouter](https://openrouter.ai)** — Multi-model API gateway
Single API, multiple models. Useful for fallback chains and
comparing outputs across providers.

## Automation

**[n8n](https://n8n.partnerlinks.io/zc590xy0ecro)** — Workflow automation (self-hosted)
Visual workflow builder. Self-hosted on Docker. My primary
automation tool (Ch.5). Free, open source, JSON-exportable.

**[n8n-mcp](https://github.com/czlonkowski/n8n-mcp)** — Claude Code + n8n bridge
MCP server that lets Claude Code create and modify n8n workflows
directly. Write a prompt contract, let Claude Code build the
workflow. The automation equivalent of prompt-contract-driven
development.

**[Make](https://www.make.com/en/register?pc=bestof)** — Workflow automation (managed)
The managed alternative to n8n. No Docker, no VPS. Sign up and
start automating. Recommended in Ch.5 for readers who don't
self-host.

### n8n vs Make — which one?

| | n8n (self-hosted) | Make.com (managed) |
|---|---|---|
| Cost | Free (runs on your VPS) | From $9/mo (Core plan) |
| Setup time | 1-2 hours (Docker + reverse proxy) | 10 minutes |
| Control | Full — your server, your data | Their cloud, their rules |
| Best for | Devs already running a VPS | Everyone else |
| Verdict | Use if you're already self-hosting (Ch.4) | Use if you want automation without ops |

## Self-Hosting

**[Hostinger](https://www.hostg.xyz/SHHc5)** — VPS hosting
My $5/month VPS runs n8n, OpenClaw agents, and monitoring.
KVM virtualization, decent performance for the price. Setup
guide in Ch.4.

**[Contabo](https://www.kqzyfj.com/click-100562241-13796481)** — VPS hosting (alternative)
Budget VPS option. I use it as failover. Slightly cheaper than
Hostinger for higher specs, but support is slower.

### Hostinger vs Contabo

| | Hostinger | Contabo |
|---|---|---|
| Cheapest VPS | ~$5/mo (1 vCPU, 4GB RAM) | ~$4.50/mo (2 vCPU, 4GB RAM) |
| Performance | Good for small workloads | More raw specs per dollar |
| Support | Fast, helpful | Slow, minimal |
| Control panel | Clean, modern | Functional, dated |
| My use | Primary — runs everything | Failover only |

### My exact monthly cost

| Service | Cost |
|---------|------|
| Hostinger VPS (KVM 1) | $5/mo |
| Convex (free tier) | $0 |
| Clerk (free tier) | $0 |
| Vercel (free tier) | $0 |
| Claude API (usage-based) | ~$15-20/mo |
| Stripe (2.9% + 30c per transaction) | Variable |
| **Total fixed cost** | **~$22/mo** |

## Content & SEO

**[Wisewand](https://wisewand.ai/?fpr=try)** — AI SEO tool
SEO formatting and multilingual distribution for content.
Widget embeds directly into articles. Has n8n integration.
Part of my content pipeline workflow.

## Data & Scraping

**[BrightData](https://get.brightdata.com/unstoppable)** — Web scraping infrastructure
Proxy network and scraping APIs. Powers data collection for
AI agent workflows on the VPS. Enterprise-grade reliability.

**[Webshare](https://www.webshare.io/?referral_code=dzesm85ssnlr)** — Proxy service (budget)
$2.80/GB residential proxies. The budget alternative to
BrightData for testing scraping workflows before scaling up.

### BrightData vs Webshare

| | BrightData | Webshare |
|---|---|---|
| Price | From $500/mo (enterprise) | From $2.80/GB (pay-as-you-go) |
| Reliability | Enterprise SLA | Best-effort |
| Best for | Production scraping at scale | Testing and small workloads |
| My use | Production data pipelines | Dev/test environment |

## Prototyping

**[Lovable](https://lovable.dev/invite/PH7LRHN)** — AI app builder
Generates full apps from prompts. Good for prototyping and
validating ideas in 20 minutes before building properly with
Claude Code. See Ch.6 for the honest assessment — and why I
still use it for quick validation.

## Project Ideas

**[Ideas.xyz](https://www.bonzai.pro/ideasxyz/shop/63xP_6386/idees?a=t_Gx7p_1295)** — Validated business ideas
Daily business ideas with market analysis and go-to-market
strategy. Filter by SaaS + Developer to find weekend project
candidates. Site is in French — the content is solid regardless
of language if you use browser translation.

## Payments

**[Stripe](https://stripe.com)** — Payment processing
Checkout sessions, webhooks, subscription management. Used
in Ch.3 for DreamMiner's two-tier pricing.

## Audio & Voice

**[ElevenLabs](https://try.elevenlabs.io/v3)** — Text-to-speech API
High-quality voice synthesis. Not used in the book's projects
but part of my broader tool stack for content production.
