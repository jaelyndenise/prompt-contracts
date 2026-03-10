# CLAUDE.md Examples

Real CLAUDE.md files from production projects. These are the "permanent context" files that tell Claude Code what your project is, what conventions to follow, and what mistakes to never make.

## What's here

| File | Type | Description |
|------|------|-------------|
| `saas-project.md` | SaaS | CLAUDE.md for DreamMiner (Ch.3) — Next.js + Convex + Clerk |
| `automation-project.md` | Automation | CLAUDE.md for a content pipeline project — n8n + OpenClaw + VPS |

## How to use

Copy the one closest to your project, rename it to `CLAUDE.md`, place it at your project root, and customize it. Claude Code reads this file automatically at the start of every session.

Key principles:
- Keep it under 50 lines. Claude Code reads it in 3 seconds — don't waste those seconds.
- Include anti-patterns. "DO NOT" rules prevent the most expensive mistakes.
- Update it every time Claude Code makes a mistake your CLAUDE.md should have caught.
- No secrets. CLAUDE.md is committed to version control.
