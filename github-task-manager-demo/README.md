# Claude Code Task Manager

A lightweight, JSON-based task management system powered by Claude Code. No apps, no databases, no subscriptions. Just a Git repo and Claude.

Built for **client/freelance work** — track tasks, contacts, clients, and recurring work all in one place.

## How It Works

Claude Code automatically loads `CLAUDE.md` when you open this repo. You manage tasks by talking in plain English — Claude handles all the JSON reading, writing, sorting, and archiving behind the scenes.

## Quick Start

1. **Clone the repo** — `git clone <repo-url> && cd task-manager`
2. **Open in Claude Code** — the setup wizard runs automatically on first launch
3. **Answer 6 setup questions** — name, categories, priorities, etc.
4. **Start managing tasks** — use commands or natural language

> Want to customize further? Run the builder wizard: tell Claude to "read builder.md and walk me through it."

## Commands

| Say this | What happens |
|----------|-------------|
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

### Skill Shortcut

Type `/tasks` in Claude Code to trigger a quick task review without typing a full command.

### Natural Language

You can also just talk naturally:

- "What's due this week?"
- "Move the landing page task to on-hold"
- "Add a note to task 3"
- "Show me everything for Acme Corp"
- "What am I waiting on?"
- "Add task: Fix header bug, due Friday, high priority"

### Rapid Entry

Create tasks in a single line:

```
add task: Build landing page, due 2026-02-15, high priority, client work
```

Claude parses what it can and prompts for anything ambiguous.

## File Structure

```
/
├── CLAUDE.md                          # System prompt (auto-loaded by Claude Code)
├── README.md                          # This file
├── config.json                        # User preferences (created during setup, git-ignored)
├── config.example.json                # Example config for reference
├── .gitignore                         # Excludes config.json
├── builder.md                         # Interactive builder wizard for customization
├── skill.md                           # Claude Code /tasks skill
├── tasks/
│   ├── tasks.json                     # Active tasks + recent archive
│   └── archived/
│       └── archived-YYYY-MM.json      # Monthly archive files (created as needed)
```

## Task Schema

Each task in `tasks/tasks.json` has these fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `t-YYYYMMDD-NNN` | Unique ID. Date = creation date, NNN = daily sequence. |
| `description` | String | What needs to be done. Action-oriented, starts with a verb. |
| `created` | `YYYY-MM-DD` | Creation date. Set once, never modified. |
| `due` | `YYYY-MM-DD` or `null` | Deadline. `null` = no deadline. |
| `priority` | `urgent` / `high` / `medium` / `low` | Urgency level. Default from config. |
| `status` | `active` / `waiting` / `on-hold` / `completed` / `cancelled` | Current state. |
| `category` | String | One of: `client`, `internal`, `marketing`, `personal`. |
| `contact` | String or `null` | Person associated with the task. |
| `client` | String or `null` | Company or paying client. |
| `recurring` | Boolean | If `true`, completing creates a new instance. |
| `updated` | `YYYY-MM-DD` | Last modification date. |
| `notes` | String | Freeform notes. Required for `waiting` status (blocker explanation). |
| `completed` | `YYYY-MM-DD` or `null` | Date completed or cancelled. |

### Priority Definitions

| Priority | Meaning |
|----------|---------|
| `urgent` | Needs attention today |
| `high` | This week |
| `medium` | Scheduled, has a deadline |
| `low` | No time pressure |

### Task Lifecycle

```
Creation → active
              │
              ├──→ waiting (blocked) ──→ active (unblocked)
              ├──→ on-hold (paused) ──→ active (resumed)
              ├──→ completed ──→ archived
              └──→ cancelled ──→ archived
```

## Daily Review

Tasks are displayed in a single sorted list — **date first, then priority**:

1. Overdue tasks (flagged)
2. Due today
3. Upcoming (due within 7 days)
4. Due later
5. No due date

Within each date group, tasks are sorted by priority: urgent > high > medium > low.

Tasks are numbered sequentially so you can reference them by number for quick updates.

## Customization

### Categories

Default: `client`, `internal`, `marketing`, `personal`. Change during setup or by editing `config.json`.

### Priorities

Default: `urgent`, `high`, `medium`, `low`. Customize during setup.

### Archiving

Completed/cancelled tasks move to an `archived` array immediately. Automatically at the start of each month, archived items are written to `tasks/archived/archived-YYYY-MM.json` and cleared from the main file. You can also manually run `flush archive` at any time.

### Builder Wizard

For a deeper customization experience, tell Claude to "read builder.md and walk me through it." The wizard covers 8 sections and regenerates all files based on your answers.

## Smart Alerts

During reviews, the system watches for:

- **Priority drift** — warns when >30% of tasks are high/urgent
- **Stale waiting** — flags tasks waiting 7+ days
- **Stale on-hold** — flags tasks on hold 14+ days
- **Archive bloat** — suggests flushing when 50+ items are archived
- **No-delete safety** — always offers cancel as an alternative to delete

## Requirements

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)
- Git
