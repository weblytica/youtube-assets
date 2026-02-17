# Task Manager Builder Wizard

This wizard customizes the task management system to fit your workflow. Answer 8 short sections (pick a letter for each), then I'll generate all the files tailored to your choices.

**Option A is the recommended / full-featured answer for each section.**

Let's begin!

---

## Section 1: Identity & Context

**What kind of work will this system track?**

- **A) Client/freelance work** — You manage tasks for clients, track contacts and companies
- **B) Internal operations** — Team or business operations, no external clients
- **C) Personal productivity** — Personal to-dos, goals, and projects
- **D) Mixed** — A combination of client work, internal ops, and personal tasks

*Follow-up: What's your name? What's your business or organization name (optional)?*

---

## Section 2: Categories

**Which category set fits your workflow?**

- **A) Freelancer/Consultant:** `client`, `internal`, `marketing`, `personal`
- **B) Small Business:** `client`, `operations`, `biz-dev`, `admin`
- **C) Developer:** `feature`, `bug`, `infra`, `docs`
- **D) Simple:** `work`, `personal`
- **E) Custom** — Tell me what categories you want

*After your pick, you can add, remove, or rename categories before I finalize them.*

---

## Section 3: Priorities

**Which priority scale do you want?**

- **A) Four-tier:** `urgent`, `high`, `medium`, `low`
  - `urgent` = needs attention today
  - `high` = this week
  - `medium` = scheduled, has a deadline
  - `low` = no time pressure
- **B) Three-tier:** `high`, `medium`, `low`
- **C) Two-tier:** `now`, `later`
- **D) Custom** — Define your own levels

*Follow-up: Which level should be the default for new tasks?*

---

## Section 4: Task Fields

**Which optional fields do you want?** (Beyond the automatic fields: id, description, dates, priority, status, category, notes)

- **A) All:** `contact`, `client`, `recurring`
- **B) Contact & Recurring:** `contact`, `recurring` (no separate client field)
- **C) Recurring only:** just `recurring`
- **D) None** — Keep it minimal with only the core fields
- **E) Custom pick** — Tell me which optional fields you want

---

## Section 5: Status Workflow

**Which status model do you want?**

- **A) Full:** `active`, `waiting`, `on-hold`, `completed`, `cancelled`
- **B) Standard:** `active`, `waiting`, `completed`, `cancelled`
- **C) Simple:** `active`, `completed`
- **D) Custom** — Define your own statuses

*Note: If your model includes `waiting`, the system will require a blocker note when setting a task to waiting.*

---

## Section 6: Review Flow

**How do you want your daily review organized?**

- **A) Full grouping:** Overdue → Due Today → Upcoming → Waiting → On Hold → Backlog
- **B) Priority-first:** Urgent → High → Medium → Low
- **C) Simple list:** All active tasks sorted by due date, then priority
- **D) Custom** — Describe how you want tasks grouped

*Follow-up: How far ahead should "upcoming" look? (default: 7 days)*

---

## Section 7: Archival

**How do you want archiving to work?**

- **A) Automatic monthly** — Completed/cancelled tasks flush to monthly files at the start of each month
- **B) Manual only** — You say "archive" or "flush archive" when you want it
- **C) Never archive** — Everything stays in the main file forever
- **D) Custom threshold** — Auto-archive when the archived array reaches N items (tell me the number)

---

## Section 8: Guardrails & Alerts

**Which alerts should the system flag during reviews?**

- **A) All alerts:**
  - Priority drift warning (>30% of tasks are high/urgent)
  - Stale waiting alert (tasks waiting 7+ days)
  - Stale on-hold alert (tasks on hold 14+ days)
  - Archive size warning (50+ items in archived array)
  - No-delete safety (always offer cancel instead of delete)
- **B) Priority drift + stale tasks only**
- **C) Minimal:** No-delete safety only
- **D) None** — No alerts or guardrails
- **E) Custom pick** — Tell me which alerts you want

---

## Summary & Confirmation

After you answer all 8 sections, I'll display a summary table of your choices:

| Section | Your Choice |
|---------|-------------|
| Work type | ... |
| Categories | ... |
| Priorities | ... |
| Optional fields | ... |
| Status workflow | ... |
| Review flow | ... |
| Archival | ... |
| Guardrails | ... |

Once you confirm, I'll generate all files customized to your answers:

- `CLAUDE.md` — System prompt tailored to your workflow
- `skill.md` — `/tasks` slash command
- `tasks/tasks.json` — Empty starter file
- `config.json` — Your configuration
- `config.example.json` — Example config for reference
- `.gitignore` — Excludes config.json
- `README.md` — Documentation

Only the fields, statuses, priorities, guardrails, and archival strategy you selected will be included.
