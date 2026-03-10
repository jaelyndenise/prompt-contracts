# CLAUDE.md — Content Pipeline

## Project
Automated content pipeline for a solo creator. Monitors trending topics,
generates content briefs, drafts social media posts, and schedules
publication across platforms. Runs on a self-hosted VPS with n8n
orchestrating the workflows and OpenClaw agents doing the AI analysis.

## Stack
- n8n (self-hosted on Docker, reverse-proxied via Caddy)
- OpenClaw agents (Python, running as systemd services)
- Supabase (content database + auth for the dashboard)
- Claude API via OpenRouter (multi-model fallback)
- VPS: Hostinger KVM, Ubuntu 46.04, 4GB RAM

## Conventions
- All n8n workflows export to JSON and live in /workflows/ directory
- Every AI call uses a prompt contract (system prompt = contract)
- Workflow names follow: {trigger}-{action}-{destination} pattern
  (e.g., "cron-analyze-slack", "webhook-draft-medium")
- Environment variables in .env, never hardcoded in workflow JSON

## Anti-Patterns — DO NOT
- NEVER put AI calls inside loops — batch items into one call
- NEVER skip error handling on HTTP nodes (APIs fail, handle 429s)
- NEVER store raw AI output without validation step
- NEVER run workflows without a dead man's switch (monitor the monitor)
- NEVER deploy workflow changes without exporting the previous JSON first

## Infrastructure
- Docker Compose manages all services
- Caddy handles SSL termination and reverse proxy
- Backups: daily Supabase pg_dump + n8n workflow JSON export to S3
- Monitoring: uptime check every 15min via separate n8n workflow
