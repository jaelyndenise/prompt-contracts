# n8n Workflow Examples

Prompt contracts for automation workflows — because the same discipline that prevents vibe coding also prevents vibe-clicking.

## The n8n-MCP Approach

Instead of static JSON workflow files, this directory contains **prompt contracts** for workflows. Combined with [n8n-mcp](https://github.com/czlonkowski/n8n-mcp), Claude Code can build and modify n8n workflows directly from these contracts.

Why contracts instead of JSON exports?

- **JSON workflow files age badly.** n8n updates node versions, changes schemas, deprecates parameters. A JSON export from 6 months ago may not import cleanly.
- **Contracts are durable.** They describe *what* the workflow does, not *how* it's wired. n8n-mcp + Claude Code rebuilds the workflow using current node versions every time.
- **Contracts are readable.** A team member can understand a contract in 2 minutes. A 500-line JSON file? Good luck.

### What is n8n-mcp?

n8n-mcp is an MCP server that gives Claude Code direct access to your n8n instance. It can:
- Create, update, and delete workflows
- Configure nodes and connections
- Activate/deactivate workflows
- Read execution logs

### Setup

1. Install n8n-mcp: `claude mcp add n8n-mcp -- npx -y n8n-mcp`
2. Configure your n8n instance URL and API key in the MCP settings
3. Pick a prompt contract from the table below
4. Ask Claude Code: "Build this workflow from the contract"

### What's here

| File | Description |
|------|-------------|
| `content-pipeline-contract.md` | Content pipeline: raw draft → Medium + Twitter variants via Claude API |
| `monitoring-alerts-contract.md` | URL monitoring: cron check → Slack/Telegram alert on state change |
| `cross-platform-syndication-contract.md` | Article syndication: webhook → Claude API → Medium + Twitter + LinkedIn |
