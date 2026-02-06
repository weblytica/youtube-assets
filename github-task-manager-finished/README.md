# Claude Code Task Manager

A lightweight, JSON-based task management system powered by [Claude Code](https://docs.anthropic.com/en/docs/claude-code). No apps, no databases, no subscriptions. Just a Git repo and Claude.

## What This Is

A ready-to-use task management system that runs entirely through Claude Code's CLI. Tasks are stored as JSON, managed through natural language, and version-controlled with Git.

Works for freelancers, solo operators, small teams, or anyone who lives in the terminal and wants task management without the overhead.

## How It Works

Claude Code automatically loads `CLAUDE.md` when you open a terminal in this repo. That file contains the full task schema, management rules, and command definitions. You talk to Claude in plain English, and it handles the JSON.

### What You Get

- **Task CRUD** with structured fields (priority, status, category, contact, client, due dates)
- **Daily review flow** that surfaces overdue items, groups by status, and prompts for updates
- **Automatic archival** of completed/cancelled tasks to monthly files
- **Smart sorting** (overdue first, then priority, then due date)
- **Recurring task support** with automatic re-creation on completion
- **Priority drift detection** (flags when too many tasks are urgent/high)
- **Stale task alerts** for items stuck in waiting or on-hold

## Quick Start

1. **Fork or clone this repo**

2. **Open the repo in Claude Code**
   ```
   cd task-manager
   claude
   ```

3. **Claude runs the setup wizard** on first launch (no `config.json` exists yet). It asks for your name, categories, priorities, and preferences. Takes 30 seconds.

4. **Start managing tasks**
   ```
   > add task: Build client onboarding flow, due 2026-02-15, high priority
   > tasks
   > complete 1
   > review
   ```

## Commands

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

You can also use natural language. Claude parses intent from context:
- "What's due this week?"
- "Move the landing page task to on-hold"
- "Add a note to task 3: waiting on client approval"
- "Show me everything for Acme Corp"

## File Structure

```
/
├── CLAUDE.md                          # System prompt (auto-loaded)
├── README.md                          # This file
├── config.json                        # Your preferences (created during setup)
├── config.example.json                # Example config for reference
├── tasks/
│   ├── tasks.json                     # Active tasks + recent archive
│   └── archived/
│       └── archived-YYYY-MM.json      # Monthly archive files
```

## Task Schema

Each task has these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `t-YYYYMMDD-NNN` | Auto | Unique ID based on creation date |
| `description` | String | Yes | Action-oriented, starts with a verb |
| `created` | `YYYY-MM-DD` | Auto | Set once at creation |
| `due` | `YYYY-MM-DD` or `null` | No | Deadline |
| `priority` | String | Auto | `urgent`, `high`, `medium`, `low` |
| `status` | String | Auto | `active`, `waiting`, `on-hold`, `completed`, `cancelled` |
| `category` | String | No | From your configured categories |
| `contact` | String or `null` | No | Person associated with the task |
| `client` | String or `null` | No | Company or client name |
| `recurring` | Boolean | Auto | `false` by default |
| `updated` | `YYYY-MM-DD` | Auto | Last modification date |
| `notes` | String | No | Freeform context |
| `completed` | `YYYY-MM-DD` or `null` | Auto | Set when completed/cancelled |

## Customization

### Categories

Default: `client`, `internal`, `personal`

Change them in `config.json` or re-run setup. Use whatever makes sense for your workflow. Some ideas:
- Freelancer: `client`, `admin`, `marketing`, `personal`
- Agency: `client`, `internal`, `biz-dev`, `ops`
- Developer: `feature`, `bug`, `infra`, `docs`

### Priorities

Default: `urgent`, `high`, `medium`, `low`

The definitions in `CLAUDE.md` map to time horizons (today, this week, scheduled, whenever). Adjust if you need different granularity.

### Archiving

Completed and cancelled tasks stay in `tasks.json` until you flush them. Monthly archives go to `tasks/archived/archived-YYYY-MM.json`. Toggle auto-archiving in `config.json`.

## Requirements

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed
- Git (for version control of your task data)

## License

MIT. Use it however you want.
