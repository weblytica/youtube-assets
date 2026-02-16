# Build a Claude Code Task Manager

You are building a JSON-based task management system that runs entirely through Claude Code. The system lives in a Git repo, uses natural language commands, and stores everything as JSON files.

## What to Build

A task management system with these capabilities:

- Task CRUD (create, read, update, delete/cancel) via natural language
- Daily review flow that surfaces overdue items, groups by status, and prompts for updates
- Automatic archival of completed/cancelled tasks to monthly files
- Smart sorting (overdue first, then priority, then due date)
- Recurring task support with automatic re-creation on completion
- Priority drift detection and stale task alerts
- First-run setup wizard that configures the system through an interactive interview

## File Structure to Generate

```
/
├── CLAUDE.md                          # System prompt (auto-loaded by Claude Code)
├── README.md                          # Documentation
├── config.json                        # User preferences (created during setup)
├── config.example.json                # Example config for reference
├── .gitignore                         # Excludes config.json
├── builder.md                         # Interactive builder wizard
├── skill.md                           # Claude Code skill for quick task actions
├── tasks/
│   ├── tasks.json                     # Active tasks + recent archive
│   └── archived/
│       └── archived-YYYY-MM.json      # Monthly archive files (created as needed)
```

## File 1: `CLAUDE.md` — The System Prompt

This is the brain of the system. Claude Code auto-loads it when entering the repo. It must contain everything Claude needs to manage tasks without any external dependencies.

### First-Run Setup Wizard

If `config.json` does not exist, Claude walks the user through setup before doing anything else. Ask these questions one at a time, waiting for each answer:

1. "What's your name?" → `config.user_name`
2. "What's your business or organization name?" (optional, Enter to skip) → `config.organization`
3. "What task categories do you want to use?" — Suggest defaults: `client`, `internal`, `personal`. Let them add, remove, or rename. → `config.categories`
4. "What priority levels do you want?" — Suggest defaults: `urgent`, `high`, `medium`, `low`. → `config.priorities`
5. "Default priority for new tasks?" → `config.default_priority` (default: `medium`)
6. "Do you want automatic monthly archiving?" (yes/no) → `config.auto_archive` (default: `true`)

Save answers to `config.json`. Create `tasks/tasks.json` from the empty template if it doesn't exist. Confirm: "Setup complete. You can reconfigure anytime by deleting config.json and running setup again."

### Quick Commands

| Say this | Claude does this |
|----------|-----------------|
| `add task` or `new task` | Create a task (prompts for details) |
| `tasks` or `show tasks` | Display all active tasks, sorted |
| `update task` or `edit task` | Modify a task by ID or number |
| `complete [id/number]` | Mark done, move to archive |
| `cancel [id/number]` | Mark cancelled, preserve in archive |
| `review` or `daily review` | Full task review flow |
| `overdue` | Show only overdue tasks |
| `search [term]` | Search across all task fields |
| `archive` or `flush archive` | Move archived items to monthly file |
| `setup` or `reconfigure` | Re-run the setup wizard |

Also accept natural language: "What's due this week?", "Move the landing page task to on-hold", "Add a note to task 3", "Show me everything for Acme Corp".

### Task Review Flow

When the user says "review" or "daily review":

**Step 1 — Display tasks** grouped in this order:

1. **Overdue** (due date passed, still active/waiting)
2. **Due Today**
3. **Upcoming** (due within 7 days)
4. **Waiting** (blocked on something)
5. **On Hold** (intentionally paused)
6. **Backlog** (no due date or due later than 7 days)

Show as a numbered table:

| # | ID | Task | Due | Priority | Status | Contact | Notes |
|---|-----|------|-----|----------|--------|---------|-------|

Number tasks sequentially across all groups so the user can reference by number.

**Step 2 — Prompt for updates:** "Any updates or new tasks? (reference by number, or 'add' for new, 'done' to finish)"

**Step 3 — Save and summarize:** "X active tasks (Y overdue). Z completed today."

### Creating Tasks

Collect these fields. Only `description` is required. Use smart defaults for everything else.

| Field | Prompt | Default |
|-------|--------|---------|
| description | "What needs to be done?" | Required |
| due | "Due date? (YYYY-MM-DD or 'none')" | `null` |
| priority | "Priority? (urgent/high/medium/low)" | `config.default_priority` |
| category | "Category?" | First in `config.categories` |
| contact | "Who is this for? (person name or skip)" | `null` |
| client | "Client/company? (or skip)" | `null` |
| recurring | "Is this recurring? (yes/no)" | `false` |
| notes | "Any notes?" | `""` |

For rapid entry, accept one-liner format:
- `add task: Build landing page, due 2026-02-15, high priority, client work`
- Parse what you can, prompt for anything ambiguous.

**ID generation:** `t-YYYYMMDD-NNN` — date portion is creation date, sequential number (001, 002, 003) resets daily, must be unique across both `tasks` and `archived` arrays.

### Updating Tasks and Status Changes

Always update the `updated` field on any modification.

| From | To | Action |
|------|----|--------|
| any | `waiting` | Require a note explaining the blocker |
| any | `completed` | Set `completed` date, move to `archived` array |
| any | `cancelled` | Set `completed` date (records decision date), move to `archived` array |
| `waiting` | `active` | Note that the blocker is resolved |
| `on-hold` | `active` | Resume the task |

**Completing recurring tasks:** Archive the current instance, create a new task with same details, set next due date based on the recurrence pattern in `notes`, reset status to `active`.

### Task Schema

Root object in `tasks/tasks.json` has two arrays:

- `tasks` — All active, waiting, or on-hold items
- `archived` — Completed or cancelled items (flushed monthly to separate files)

#### Field Definitions

| Field | Format | Rules |
|-------|--------|-------|
| `id` | `t-YYYYMMDD-NNN` | Unique across tasks + archived. Date = creation date. |
| `description` | String | Action-oriented, starts with a verb. Keep contact/client names out (use their fields). |
| `created` | `YYYY-MM-DD` | Set once. Never modified. |
| `due` | `YYYY-MM-DD` or `null` | Nullable for no deadline. Used for overdue detection and sorting. |
| `priority` | `urgent`/`high`/`medium`/`low` | Default from config. `urgent` = today, `high` = this week, `medium` = scheduled, `low` = no pressure. |
| `status` | `active`/`waiting`/`on-hold`/`completed`/`cancelled` | `waiting` requires blocker note. `completed`/`cancelled` move to archived. |
| `category` | String | From `config.categories`. One per task. |
| `contact` | String or `null` | Person associated with the task. |
| `client` | String or `null` | Paying client or company name. |
| `recurring` | Boolean | Default `false`. When completed, archive + recreate with next due date. |
| `updated` | `YYYY-MM-DD` | Set on any modification. |
| `notes` | String | Freeform. Must explain blocker when status is `waiting`. |
| `completed` | `YYYY-MM-DD` or `null` | Set when completed/cancelled. |

#### Task Lifecycle

```
Creation → active
              │
              ├──→ waiting (blocked) ──→ active (unblocked)
              │
              ├──→ on-hold (paused) ──→ active (resumed)
              │
              ├──→ completed ──→ archived
              │
              └──→ cancelled ──→ archived
```

#### Sorting Rules

1. Overdue tasks first (due date passed, not completed/cancelled)
2. Then by priority: urgent > high > medium > low
3. Then by due date ascending (soonest first)
4. No due date sorts to bottom of its priority group

### Archival Strategy

- Completed/cancelled tasks move to `archived` array immediately
- On "archive"/"flush archive" command, OR at start of new month if `config.auto_archive` is true:
  - Write `archived` array to `tasks/archived/archived-YYYY-MM.json`
  - Clear the `archived` array in `tasks/tasks.json`

### Guardrails

- Never delete a task without user confirmation. Always offer "cancel" as an alternative to preserve history.
- When >30% of active tasks are `high` or `urgent`, flag it: "X of Y active tasks are high/urgent priority. Want to reprioritize?"
- Flag tasks in `waiting` for 7+ days during review.
- Flag tasks in `on-hold` for 14+ days during review.
- Always validate task ID uniqueness before creating.
- When `archived` array exceeds 50 items, suggest flushing to monthly file.

---

## File 2: `builder.md` — Interactive Builder Wizard

This is a separate file that walks the user through an 8-section multiple-choice interview to customize the system before generating files. Each section presents 3-5 options where Option A is the recommended/full-featured answer.

### Section 1: Identity & Context
"What kind of work will this system track?"
- A) Client/freelance work
- B) Internal operations
- C) Personal productivity
- D) Mixed

Follow up: name and business/org name.

### Section 2: Categories
"Which category set fits your workflow?"
- A) Freelancer/Consultant: `client`, `internal`, `marketing`, `personal`
- B) Small Business: `client`, `operations`, `biz-dev`, `admin`
- C) Developer: `feature`, `bug`, `infra`, `docs`
- D) Simple: `work`, `personal`
- E) Custom

Confirm and let them add/remove/rename before finalizing.

### Section 3: Priorities
"Which priority scale do you want?"
- A) Four-tier: `urgent`, `high`, `medium`, `low` (with time-horizon definitions)
- B) Three-tier: `high`, `medium`, `low`
- C) Two-tier: `now`, `later`
- D) Custom

Follow up: which level is default for new tasks.

### Section 4: Task Fields
"Which optional fields do you want?" (beyond the automatic id, description, dates, priority, status, category, notes)
- A) All: `contact`, `client`, `recurring`
- B) `contact` and `recurring` only
- C) `recurring` only
- D) None
- E) Custom pick

### Section 5: Status Workflow
"Which status model do you want?"
- A) Full: `active`, `waiting`, `on-hold`, `completed`, `cancelled`
- B) Standard: `active`, `waiting`, `completed`, `cancelled`
- C) Simple: `active`, `completed`
- D) Custom

If they pick anything with `waiting`, note the system requires a blocker note.

### Section 6: Review Flow
"How do you want your review organized?"
- A) Full grouping: Overdue → Due Today → Upcoming → Waiting → On Hold → Backlog
- B) Priority-first: Urgent → High → Medium → Low
- C) Simple list: all active sorted by due date then priority
- D) Custom

Follow up: how far ahead should "upcoming" look (default 7 days).

### Section 7: Archival
"How do you want archiving to work?"
- A) Automatic monthly
- B) Manual only
- C) Never archive
- D) Custom threshold (ask for number)

### Section 8: Guardrails & Alerts
"Which alerts should the system flag during reviews?"
- A) All: priority drift, stale waiting (7d), stale on-hold (14d), archive size (50), no-delete safety
- B) Priority drift and stale tasks only
- C) Minimal: no-delete safety only
- D) None
- E) Custom pick

### Output Generation

After all 8 sections, display a summary table of all choices and ask for confirmation. Then generate all files (CLAUDE.md, skill.md, tasks/tasks.json, config.json, config.example.json, .gitignore, README.md) customized to their answers. Only include the fields, statuses, priorities, guardrails, and archival strategy they selected.

---

## File 3: `skill.md` — Claude Code Skill

This file registers a `/tasks` slash command as a Claude Code skill. When the user types `/tasks` in Claude Code, it triggers a quick task review without needing to say "review" or "show tasks" in conversation.

The skill should:

1. Read `tasks/tasks.json`
2. Display all active tasks in the standard sorted, grouped table format (same as the review flow Step 1)
3. Show a one-line summary: "X active tasks (Y overdue, Z due today)"
4. Prompt: "Any updates? (reference by number, 'add' for new, 'done' to close)"

### `skill.md` Content

```markdown
---
name: tasks
description: Quick task review — shows active tasks grouped by status and prompts for updates
```

The skill acts as a shortcut into the review flow defined in CLAUDE.md. It does not duplicate logic — it triggers the same review sequence.

---

## File 4: `tasks/tasks.json` — Starter Tasks

Pre-populate with 7 sample website management tasks so the system has data to work with immediately. Use today's date as the creation date. Spread due dates across the next 3 weeks with a mix of priorities and statuses.

```json
{
  "tasks": [
    {
      "id": "t-20260216-001",
      "description": "Audit homepage for broken links and outdated content",
      "created": "2026-02-16",
      "due": "2026-02-18",
      "priority": "high",
      "status": "active",
      "category": "internal",
      "contact": null,
      "client": null,
      "recurring": false,
      "updated": "2026-02-16",
      "notes": "",
      "completed": null
    },
    {
      "id": "t-20260216-002",
      "description": "Update SSL certificate before expiration",
      "created": "2026-02-16",
      "due": "2026-02-20",
      "priority": "urgent",
      "status": "active",
      "category": "internal",
      "contact": null,
      "client": null,
      "recurring": true,
      "updated": "2026-02-16",
      "notes": "Renews annually. Current cert expires Feb 20.",
      "completed": null
    },
    {
      "id": "t-20260216-003",
      "description": "Optimize image compression on product pages",
      "created": "2026-02-16",
      "due": "2026-02-25",
      "priority": "medium",
      "status": "active",
      "category": "internal",
      "contact": null,
      "client": null,
      "recurring": false,
      "updated": "2026-02-16",
      "notes": "PageSpeed score dropped to 62. Images are the main culprit.",
      "completed": null
    },
    {
      "id": "t-20260216-004",
      "description": "Write and publish blog post on spring product launch",
      "created": "2026-02-16",
      "due": "2026-03-01",
      "priority": "medium",
      "status": "waiting",
      "category": "client",
      "contact": "Sarah Mitchell",
      "client": null,
      "recurring": false,
      "updated": "2026-02-16",
      "notes": "Waiting on product photos from Sarah before drafting.",
      "completed": null
    },
    {
      "id": "t-20260216-005",
      "description": "Set up Google Analytics 4 event tracking for contact forms",
      "created": "2026-02-16",
      "due": "2026-02-28",
      "priority": "high",
      "status": "active",
      "category": "internal",
      "contact": null,
      "client": null,
      "recurring": false,
      "updated": "2026-02-16",
      "notes": "Current tracking only captures pageviews. Need form submit and click events.",
      "completed": null
    },
    {
      "id": "t-20260216-006",
      "description": "Review and update privacy policy for compliance",
      "created": "2026-02-16",
      "due": "2026-03-07",
      "priority": "low",
      "status": "on-hold",
      "category": "internal",
      "contact": null,
      "client": null,
      "recurring": false,
      "updated": "2026-02-16",
      "notes": "Paused until legal review of new cookie consent requirements is finished.",
      "completed": null
    },
    {
      "id": "t-20260216-007",
      "description": "Run monthly uptime and performance report",
      "created": "2026-02-16",
      "due": "2026-03-01",
      "priority": "medium",
      "status": "active",
      "category": "internal",
      "contact": null,
      "client": null,
      "recurring": true,
      "updated": "2026-02-16",
      "notes": "First of each month. Pull from UptimeRobot and PageSpeed Insights.",
      "completed": null
    }
  ],
  "archived": []
}
```

---

## File 5: `config.example.json` — Example Config

```json
{
  "user_name": "Your Name",
  "organization": "Your Business Name",
  "categories": ["client", "internal", "personal"],
  "priorities": ["urgent", "high", "medium", "low"],
  "default_priority": "medium",
  "auto_archive": true
}
```

---

## File 6: `.gitignore`

```
config.json
```

This keeps user-specific config out of the repo while the example file serves as documentation.

---

## File 7: `README.md` — Documentation

Write a practical README covering:

- **What this is:** A lightweight, JSON-based task manager powered by Claude Code. No apps, no databases, no subscriptions. Just a Git repo and Claude.
- **How it works:** Claude Code auto-loads CLAUDE.md, you talk in plain English, it handles the JSON.
- **Quick start:** Fork/clone → open in Claude Code → setup wizard runs → start managing tasks.
- **Commands table** (same as the quick commands from CLAUDE.md)
- **Natural language examples:** "What's due this week?", "Move the landing page task to on-hold", etc.
- **File structure** diagram
- **Task schema** table (all fields with types and descriptions)
- **Customization notes** for categories, priorities, and archiving
- **Requirements:** Claude Code CLI + Git

---

## Build Instructions

Generate all 7 files above. The CLAUDE.md is the most critical — it needs to be complete and self-contained so Claude Code can manage tasks with zero external dependencies. The builder.md should be a standalone wizard that regenerates the other files based on user preferences.

Test that the system handles these scenarios:
- First run with no config.json triggers the setup wizard
- Adding tasks with full details and one-liner rapid entry
- Daily review with overdue, waiting, and upcoming tasks
- Completing a recurring task creates a new instance
- Archiving flushes to monthly file and clears the array
- Priority drift alert triggers when threshold is exceeded
- Stale task alerts during review
