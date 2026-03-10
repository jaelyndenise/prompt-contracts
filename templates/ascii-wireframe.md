# Prompt Contract: ASCII Wireframe Before Code

Use this template to plan any visual structure — UI, database, API flow, slide deck — before writing a single line of code.

## When to Use

- Before building a new page, component, or dashboard
- Before designing a database schema
- Before creating a presentation or slide deck
- Any time you need to *see* the structure before committing to implementation

## The Prompt Pattern

```
Before writing any code, create an ASCII wireframe of [WHAT YOU'RE BUILDING].

Show:
- [COMPONENT 1] with [DETAILS]
- [COMPONENT 2] with [DETAILS]
- [LAYOUT CONSTRAINT: e.g., "side by side", "stacked", "in a sidebar"]

Do NOT write any code yet. Just the wireframe.
```

## Example 1: SaaS Dashboard

**Prompt:**
```
Before writing any code, create an ASCII wireframe of a SaaS analytics dashboard.
Show a sidebar with navigation, a row of stat cards (users, revenue, conversion rate),
two charts side by side (line chart + pie chart), and a recent activity table below.
Do NOT write any code yet.
```

**Expected output:**
```
+----------------------------------------------------------+
|  LOGO        Dashboard    Settings    Profile    [Logout] |
+----------+-----------------------------------------------+
|          |  +----------+ +----------+ +----------+       |
| SIDEBAR  |  | Users    | | Revenue  | | Conv %   |       |
|          |  | 1,247    | | $48.3K   | | 3.2%     |       |
| Overview |  +----------+ +----------+ +----------+       |
| Reports  |                                               |
| Users    |  +-------------------------+ +------------+   |
| Settings |  |                         | |            |   |
|          |  |    Revenue Over Time    | |  Traffic   |   |
|          |  |    ~~~~/\~~~/\~~~~      | |   Sources  |   |
|          |  |   /        \           | |  [PIE]     |   |
|          |  +-------------------------+ +------------+   |
|          |                                               |
|          |  +--------------------------------------------+
|          |  | Recent Activity                            |
|          |  | - User signed up          2 min ago        |
|          |  | - Report generated        15 min ago       |
|          |  | - Payment received        1 hour ago       |
+----------+-----------------------------------------------+
```

**Then iterate:**
```
Two changes only:
1. Make the line chart wider than the pie chart (roughly 70/30 split)
2. Add a "New Report" button in the top-right corner
Redraw the full wireframe.
```

**When satisfied:**
```
Build this as a React + Tailwind app. Use the wireframe as the exact specification.
```

## Example 2: Database Schema

**Prompt:**
```
Before writing any migrations, create an ASCII diagram of the database schema
for a SaaS app with users, products, purchases, and audit logs.
Show each table with its columns and the relationships between them.
Do NOT write any SQL yet.
```

**Expected output:**
```
+------------------+       +------------------+
|     USERS        |       |    PRODUCTS      |
+------------------+       +------------------+
| PK  id           |       | PK  id           |
|     email         |       |     name         |
|     name          |       |     price        |
|     created_at    |       |     description  |
|     plan          |       |     active       |
+------------------+       +------------------+
        |                          |
        |    +------------------+  |
        +--->|   PURCHASES      |<-+
             +------------------+
             | PK  id           |
             | FK  user_id      |
             | FK  product_id   |
             |     amount       |
             |     status       |
             |     purchased_at |
             +------------------+
                     |
             +------------------+
             |   AUDIT_LOGS     |
             +------------------+
             | PK  id           |
             | FK  user_id      |
             | FK  purchase_id  |
             |     action       |
             |     details      |
             |     timestamp    |
             +------------------+
```

## Example 3: Landing Page

**Prompt:**
```
Before writing any code, create an ASCII wireframe of a landing page for a developer tool.
Show: navbar with logo and CTA, hero section with headline and product screenshot,
social proof bar, 3-column features section, pricing table (3 tiers), and footer.
Do NOT write any code yet.
```

## Why This Works

1. **Cheaper iterations** — Changing an ASCII box costs zero tokens vs. refactoring a component
2. **Universal language** — Non-technical stakeholders can read boxes and arrows
3. **Forces clarity** — You can't draw a wireframe without deciding what goes where
4. **Reduces hallucination** — The AI builds what it drew, not what it assumed you meant

## Tips

- Always include "do NOT write any code yet" — the AI will try to jump ahead
- Iterate 2-3 times on the wireframe before building
- For databases, ask to show relationships (foreign keys, one-to-many)
- For UI, specify responsive behavior: "show mobile version too"
- Works in Claude Code, ChatGPT, Cursor — any AI coding tool
