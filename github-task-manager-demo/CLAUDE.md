# Task Manager System

> **This file is automatically loaded by Claude Code when entering this repository.**

## First-Run Setup

If `config.json` does not exist in the repo root, run the setup wizard before doing anything else.

### Setup Wizard

Walk the user through these questions one at a time. Wait for each answer before asking the next.

1. **"What's your name?"** → `config.user_name`
2. **"What's your business or organization name?"** (optional, press Enter to skip) → `config.organization`
3. **"What task categories do you want to use?"**
   - Suggest defaults: `client`, `internal`, `personal`
   - Let them add, remove, or rename categories
   - Store as `config.categories` array
4. **"What priority levels do you want?"**
   - Suggest defaults: `urgent`, `high`, `medium`, `low`
   - They can keep defaults or customize
   - Store as `config.priorities` array with the default noted
5. **"Default priority for new tasks?"** → `config.default_priority` (default: `medium`)
6. **"Do you want automatic monthly archiving?"** (yes/no) → `config.auto_archive` (default: `true`)

Save answers to `config.json` in the repo root. Then create `tasks/tasks.json` from the empty template if it doesn't already exist.

Confirm: **"Setup complete. You can reconfigure anytime by deleting config.json and running setup again. Ready to manage tasks."**

---

## Quick Commands

When the user says:            | Do this:
-------------------------------|------------------------------------------
"add task" or "new task"       | Create a new task (prompt for details)
"tasks" or "show tasks"        | Display all active tasks, sorted properly
"update task" or "edit task"   | Modify an existing task by ID or number
"complete [id/number]"         | Mark task completed, move to archived
"cancel [id/number]"          | Mark task cancelled, move to archived
"review" or "daily review"     | Run the full task review flow (Step 4 below)
"archive" or "flush archive"   | Move archived array to monthly file
"overdue"                      | Show only overdue tasks
"search [term]"                | Search tasks by description, notes, contact, or client
"setup" or "reconfigure"       | Re-run the setup wizard

---

## Data Files

- **Active Tasks**: `tasks/tasks.json`
- **Monthly Archives**: `tasks/archived/archived-YYYY-MM.json`
- **User Config**: `config.json`

---

## Task Review Flow

When the user says "review" or "daily review", run through this sequence:

### Step 1: Display Tasks

Read `tasks/tasks.json` and display all non-archived tasks grouped by:

1. **Overdue** (due date has passed, still active/waiting)
2. **Due Today**
3. **Upcoming** (due within 7 days)
4. **Waiting** (blocked on something)
5. **On Hold** (intentionally paused)
6. **Backlog** (no due date or due later than 7 days)

Show as a numbered table:

| # | ID | Task | Due | Priority | Status | Contact | Notes |
|---|-----|------|-----|----------|--------|---------|-------|

Number tasks sequentially across all groups so the user can reference them by number.

If no tasks: **"No outstanding tasks."**

### Step 2: Prompt for Updates

Ask: **"Any updates or new tasks? (reference by number, or 'add' for new, 'done' to finish)"**

The user can:
- Reference a number to update that task
- Say "add" to create new tasks
- Say "done" or "skip" to end the review

### Step 3: Save

After all updates, save the modified JSON back to `tasks/tasks.json`.

Display a summary: **"X active tasks (Y overdue). Z completed today."**

---

## Creating Tasks

When adding a new task, collect these fields. Only `description` is required. Use smart defaults for everything else.

| Field | Prompt | Default |
|-------|--------|---------|
| description | "What needs to be done?" | Required |
| due | "Due date? (YYYY-MM-DD or 'none')" | `null` |
| priority | "Priority? (urgent/high/medium/low)" | Value from `config.default_priority` |
| category | "Category?" | First category in `config.categories` |
| contact | "Who is this for? (person name or skip)" | `null` |
| client | "Client/company? (or skip)" | `null` |
| recurring | "Is this recurring? (yes/no)" | `false` |
| notes | "Any notes?" | `""` |

For rapid entry, accept one-liner format:
- "add task: Build landing page, due 2026-02-15, high priority, client work"
- Parse what you can, prompt for anything ambiguous.

### ID Generation

1. Use today's date in `YYYYMMDD` format
2. Check existing IDs in both `tasks` and `archived` arrays for today's date
3. Increment the sequence number (001, 002, 003...)
4. Format: `t-YYYYMMDD-NNN`

---

## Updating Tasks

When modifying a task, the user can change any field. Always update the `updated` field to today's date on any modification.

### Status Changes

| From | To | Action |
|------|----|--------|
| any | `waiting` | Require a note explaining the blocker |
| any | `completed` | Set `completed` date, move to `archived` array |
| any | `cancelled` | Set `completed` date (records decision date), move to `archived` array |
| `waiting` | `active` | Note that the blocker is resolved |
| `on-hold` | `active` | Resume the task |

### Completing Recurring Tasks

When a recurring task is completed:
1. Archive the current instance normally
2. Create a new task with the same details
3. Set the new due date based on the recurrence pattern in `notes`
4. Reset the new task's status to `active`

---

## Task List Schema

### File Structure

The root object in `tasks/tasks.json` contains two arrays:

- `tasks` — All active, waiting, or on-hold items
- `archived` — Completed or cancelled items (flush monthly to separate files)

### Field Definitions

#### id
- **Format**: `t-YYYYMMDD-NNN`
- **Example**: `t-20260204-001`
- **Rules**: Date portion reflects creation date. Sequential number resets daily. Must be unique across both `tasks` and `archived` arrays.

#### description
- **Type**: String
- **Rules**: Action-oriented, starts with a verb. Keep the contact/client name out of this field when possible since they have dedicated fields. Should be scannable in a list view.
- **Good**: "Build Calendly Automation + Knack Storage"
- **Avoid**: "Build Calendly Automation + Knack Storage for Edward Blythe" (use the `contact` field instead)

#### created
- **Format**: `YYYY-MM-DD`
- **Rules**: Set once at creation. Never modified.

#### due
- **Format**: `YYYY-MM-DD` or `null`
- **Rules**: Nullable for tasks with no deadline. Used for overdue detection and sorting.

#### priority
- **Values**: `urgent`, `high`, `medium`, `low` (or user-configured values from `config.priorities`)
- **Definitions**:
  - `urgent` — Needs attention today, something is broken or a hard deadline is imminent
  - `high` — Must be completed this week, client-facing or revenue-impacting
  - `medium` — Should be completed within the scheduled timeframe
  - `low` — Nice to have, no immediate pressure
- **Rules**: Default to `config.default_priority` on creation. Reassess when a task becomes overdue. If more than 30% of active tasks are `high` or `urgent`, suggest the user reprioritize.

#### status
- **Values**: `active`, `waiting`, `on-hold`, `completed`, `cancelled`
- **Definitions**:
  - `active` — Currently being worked on or next up
  - `waiting` — Blocked on an external dependency. Document the blocker in `notes`.
  - `on-hold` — Captured but intentionally paused. Not blocked, just not prioritized.
  - `completed` — Done. Move to `archived` array and set `completed` date.
  - `cancelled` — Dropped intentionally. Move to `archived` array. Preserves decision history.
- **Rules**: When changing status to `waiting`, always update `notes` to explain the blocker. When changing to `completed` or `cancelled`, move the task to the `archived` array.

#### category
- **Values**: User-configured via `config.categories`
- **Rules**: Every task gets exactly one category. If a task spans categories, assign based on the primary beneficiary.

#### contact
- **Type**: String or `null`
- **Rules**: The person associated with this task. Nullable when no specific person is involved.

#### client
- **Type**: String or `null`
- **Rules**: The paying client or company name. Nullable for non-client tasks. Can overlap with `contact` for solo operators.

#### recurring
- **Type**: Boolean
- **Default**: `false`
- **Rules**: Set to `true` for tasks that repeat. When completed, archive the current instance and create a new one with the next due date. Pattern details go in `notes` (e.g., "Weekly on Monday", "First of each month").

#### updated
- **Format**: `YYYY-MM-DD`
- **Rules**: Set to current date on any modification including status changes, priority changes, note edits, or any field update.

#### notes
- **Type**: String
- **Rules**: Freeform context, blockers, links. When status is `waiting`, this must explain what you're waiting on.

#### completed
- **Format**: `YYYY-MM-DD` or `null`
- **Rules**: `null` while active/waiting/on-hold. Set to the date when status changes to `completed` or `cancelled`. Task moves to `archived` array when this is set.

### Task Lifecycle

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

### Sorting Rules (for display)

1. Overdue tasks first (due date has passed, status is not completed/cancelled)
2. Then by priority: urgent > high > medium > low
3. Then by due date ascending (soonest first)
4. Tasks with no due date sort to the bottom of their priority group

### Archival Strategy

- Completed and cancelled tasks move to the `archived` array immediately
- When the user says "archive" or "flush archive", OR at the start of a new month if `config.auto_archive` is true:
  - Write the `archived` array to `tasks/archived/archived-YYYY-MM.json`
  - Clear the `archived` array in `tasks/tasks.json`
  - This keeps the main task file lightweight

---

## Guardrails

- Never delete a task without user confirmation. Always offer "cancel" as an alternative to preserve history.
- When more than 30% of active tasks are `high` or `urgent`, flag it: **"X of Y active tasks are high/urgent priority. Want to reprioritize?"**
- When a task has been `waiting` for more than 7 days, flag it during review.
- When a task has been `on-hold` for more than 14 days, flag it during review.
- Always validate that task IDs are unique before creating a new task.
- When the `archived` array exceeds 50 items, suggest flushing to a monthly file.
