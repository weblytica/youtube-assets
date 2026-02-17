---
name: tasks
description: Quick task review — shows active tasks sorted by date then priority and prompts for updates
---

When the user runs `/tasks`, perform a quick task review:

1. Read `tasks/tasks.json`
2. Display all active tasks sorted by **date first, then priority**:
   - Overdue first (flag with "OVERDUE")
   - Due today
   - Upcoming (due within 7 days)
   - Due later than 7 days
   - No due date at the bottom
   - Within each date group, sort by priority: urgent > high > medium > low

   Use a two-row-per-task Markdown table:
   - Row 1: Number in col 1, **bold task name** in col 2, remaining cols empty
   - Row 2: Empty col 1, then ID, Due (🔴 if overdue), Priority, Status, Contact

   | # | Task / Details | | | | |
   |---|----------------|---|---|---|---|
   | **1** | **Task name here** | | | | |
   | | t-20260216-001 | 2026-02-18 🔴 | high | active | — |

3. Show a one-line summary: "X active tasks (Y overdue, Z due today)"
4. Prompt: "Any updates? (reference by number, 'add' for new, 'done' to close)"

This skill is a shortcut into the review flow defined in CLAUDE.md. It triggers the same review sequence — no duplicated logic.
