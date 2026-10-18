# Weblytica Make Co-Builder

A free Claude Skill that teaches you Make.com by building real scenarios with you, one step at a time, inside your own Make account. It can also document any scenario you already have.

Claude builds a few modules at a time while you watch them appear in your Make editor. After each step it explains what it added, gives each module a clear name, pins a note to it, and waits for you before moving on. You finish with a working scenario, notes on every module, and a Markdown guide you keep.

Formerly the Unsubby Digest Builder. Unsubby is still here, now one of three workflows.

| Workflow | What you get | Video |
|---|---|---|
| **Unsubby** | A daily digest of your newsletters, each with a one-line AI summary and an unsubscribe link, while the originals leave your inbox | [Free Claude Skill That Teaches Make.com While It Builds]([YOUTUBE LINK]) |
| **Calendly bookings** | Every booking and cancellation written to a Google Sheet (that Claude creates for you) or to another system you choose | [Don't Learn Make.com Alone - Use This Free Claude Skills to Co-Build]([YOUTUBE LINK]) |
| **Document a scenario** | Any existing scenario named, noted, and explained in a guide, without changing how it works | [YOUTUBE LINK] |

## What you need

- **A Make.com account.** Free or paid. Get one at [weblytica.com/start](https://weblytica.com/start).
- **Claude connected to the Make MCP server.** This is how Claude builds inside your account.
- **A willingness to learn.** These are lessons, not downloads.

Recommended: Claude in Chrome or Claude's built-in browser, so Claude can reload your Make editor after each step and you can watch the modules appear. Without a browser tool, you press F5 after each step.

Per workflow:

| Workflow | Also needs |
|---|---|
| Unsubby | A Gmail account. Make's AI Provider connection (no key needed). |
| Calendly bookings | A Calendly account and a Google account. Calendly's webhooks may require a paid Calendly plan; check Calendly's current plans. |
| Document a scenario | A scenario in the Make account Claude is connected to. |

## Install

1. Download this repository (Code → Download ZIP), or clone it.
2. Add the whole folder to Claude as a custom skill. See Anthropic's current documentation for where to add skills in your Claude app, since the steps vary by app and plan.
3. Connect the Make MCP server to Claude, using Make's current MCP setup instructions.

## Use

Open your Make account in a browser tab, then tell Claude one of these:

> Build Unsubby with me.

> Send my Calendly bookings to a Google Sheet.

> Document my scenario: https://us1.make.com/123/scenarios/456/edit

Claude asks a few setup questions in one message, then offers a step-by-step walkthrough (recommended) or a build all at once. Ask questions at any check-in: why an iterator, what a router does, what a webhook is.

The only things you do in Make yourself are sign in when a connection needs it. Claude never asks for passwords, tokens, or API keys in chat.

## The workflows

### Unsubby: Daily Unsubscribe Digest

Every day, Unsubby checks the Gmail tabs you ignore (Promotions, Social, Updates, Forums), finds each newsletter's unsubscribe link, writes a one-line AI summary, archives the email, and sends you one digest grouped by sender. Built in nine steps. The test run is capped at five emails and asks first.

### Calendly bookings to Google Sheets (or another system)

The moment someone books or cancels on your Calendly, Make writes it into four tabs: **Users**, **Event Types**, **Scheduled Events**, **Invitees**. Each tab searches before writing, so there are never duplicates; a cancellation updates the same row.

- **Claude creates the spreadsheet for you**, with every tab and header in place, and hands you the link. It does this directly when a Google Sheets or Drive tool that can create files is connected to Claude, and otherwise through a one-time Make scenario that it builds, runs, and cleans up.
- **Want it somewhere else?** Airtable, Notion, a CRM, a database: Claude keeps the Calendly half and swaps the spreadsheet steps for your system's, using a destination-neutral data model. That path is adapted live rather than pre-tested, and Claude tells you so.
- Built in six steps. You test it by booking, then canceling, a meeting on your own calendar.

### Document any scenario

Point Claude at a scenario and it reads it, writes a short name and a note for every module, applies them (with your OK), and writes a guide. It never changes how the scenario works. If it spots something worth fixing, like a filter that is always true or a hard-coded email address, it lists it under "Things I noticed" and offers to fix it separately.

## What you keep

- **A working scenario** (build workflows), active and running.
- **Notes pinned to every module** in Make, explaining what each one does and how it connects to its neighbors.
- **A Markdown guide** listing every module, its name, purpose, settings, and connections.

## What's in this repository

| Path | Purpose |
|---|---|
| `SKILL.md` | The instructions Claude follows: picks the workflow, shared rules |
| `references/co-building.md` | The six beats of every step, and how Claude drives the Make editor |
| `references/make-mcp-playbook.md` | Shared tool call order, verified behavior, fallbacks |
| `references/chrome-fallback.md` | Building through the browser when Make MCP is not connected |
| `scripts/outline_scenario.py` | Maps any scenario into an outline and a notes file |
| `scripts/apply_names.py` | Applies module names, refusing if anything else would change |
| `scripts/add_notes.py` | Optional: pins notes through Make's API when `MAKE_API_TOKEN` is set |
| `scripts/make_guide.py` | Writes the Markdown guide |
| `workflows/unsubby/` | Unsubby: template, module notes, build and guide scripts, walkthrough, troubleshooting |
| `workflows/calendly-sheets/` | Calendly: template, data model, module notes, build script (including spreadsheet setup), troubleshooting |
| `workflows/document-scenario/` | The documentation workflow |
| `vendor/make-skills/` | Make's official scenario-building and module-configuring skills, bundled unmodified |

## Good to know

- **Test runs are real.** Unsubby's archives real emails and sends a real digest. Calendly's test is a real booking on your calendar.
- **Operations.** Each module run is one Make operation. Rough estimates: Unsubby about seven per newsletter; Calendly about 14 per booking or cancellation. Check your plan's allowance on Make's pricing page.
- **Nothing runs until it's tested.** Build workflows stay off during the build. Claude asks before every test run and before switching a scenario on.
- **Hands off the editor during a build.** If you edit and save in Make mid-build, Claude's next update overwrites your change.
- **Pausing.** Turn any scenario off with its toggle in Make. Check the History tab if something didn't happen.

## Help

If a build gets stuck, start with the workflow's `troubleshooting.md`.

These scenarios were designed by Andy O'Neil of Weblytica, who builds Make.com automations for businesses.

- Book a free 45-minute call: [weblytica.com/youtube-calendly](https://weblytica.com/youtube-calendly/)
- Email: andy@weblytica.com
- Web: [weblytica.com](https://weblytica.com)

## License

MIT License. Copyright (c) 2026 Weblytica, LLC. See [LICENSE](LICENSE) for the full text.

The folders in `vendor/make-skills/` are Make's official skills, used under the MIT License, Copyright (c) 2026 Make. See [vendor/make-skills/LICENSE](vendor/make-skills/LICENSE).
