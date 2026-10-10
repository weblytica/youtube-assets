# Unsubby Digest Builder

A free Claude Skill that teaches you Make.com by building a real scenario with you, one step at a time, inside your own Make account.

Claude builds the **Daily Unsubscribe Digest (Unsubby)** scenario in nine short stages. After each stage it explains what it added, pins a note to every new module, gives each module a clear name, and waits for you before moving on. You finish with a working scenario, notes on every module, and a Markdown guide you keep.

Video walkthrough: https://youtu.be/BQWkzwtzdIo

## What the scenario does

Every day, Unsubby:

1. Checks the Gmail tabs you ignore: Promotions, Social, Updates, and Forums.
2. Finds the unsubscribe link in each newsletter.
3. Writes a one-line AI summary of each email.
4. Archives the email.
5. Sends you one digest, grouped by sender, with a summary and an unsubscribe link for each.

One email a day. You decide what stays.

```
Gmail: Watch emails (Promotions/Social/Updates/Forums)
  → Array aggregator (collect the batch)
  → Iterator (one email at a time, sorted by Gmail category)
      → Regex: find the unsubscribe link in the HTML
      → Iterator over the email's labels → Text aggregator (label list)
      → Code: clean the email text  [paid plans; skipped on Free]
      → Make AI Toolkit: 190-character summary
      → Gmail: remove INBOX label (archive)
      → Text aggregator: one HTML block per email, grouped by sender
  → Router
      ├─ Route 1: build the sender index → Set variable "TopLinks"
      └─ Route 2: build the body → Get variable → Gmail: send the digest
```

## What you need

- **A Make.com account.** Free or paid. On the Free plan the skill skips the Code module and adjusts the build. Get an account at [weblytica.com/start](https://weblytica.com/start).
- **Claude connected to the Make MCP server.** This is how Claude builds inside your account.
- **A willingness to learn.** This is a lesson, not a download.

Recommended: Claude in Chrome or Claude's built-in browser, so Claude can reload your Make editor after each stage and you can watch the modules appear. Without a browser tool, you press F5 after each stage.

## Install

1. Download this repository (Code → Download ZIP), or clone it.
2. Add the skill folder to Claude as a custom skill. See Anthropic's current documentation for where to add skills in your Claude app, since the steps vary by app and plan.
3. Connect the Make MCP server to Claude, using Make's current MCP setup instructions.

## Use

Open your Make account in a browser tab, then tell Claude:

> Build Unsubby with me.

Claude asks four setup questions in one message:

- Which Gmail account to watch
- Where to send the digest (default: the same address)
- What time each day (default: 7:00 AM in your Make organization's timezone)
- Which Gmail tabs to include (default: Promotions, Social, Updates, Forums)

Then it builds in nine stages. Ask questions at any check-in: why an iterator, what an aggregator does, what a bundle is.

The only things you do in Make yourself are sign in to Gmail and add the AI connection. Claude never asks for passwords, tokens, or API keys in chat.

## The test run

Before anything goes live, Claude asks permission to run a real test capped at five emails. The test archives up to five newsletters and sends you one real digest. Once you confirm the digest looks right, Claude raises the limit, sets the daily schedule, and turns the scenario on.

## What you keep

- **A working scenario**, active in your account and running daily.
- **Notes pinned to every module**, explaining what each one does and how it connects to its neighbors.
- **A Markdown guide** (`Unsubby-Digest-Guide.md`) listing every module, its name, purpose, settings, and connections.

## What's in this repository

| Path | Purpose |
|---|---|
| `SKILL.md` | The skill instructions Claude follows |
| `assets/unsubby-digest.template.json` | The scenario blueprint template |
| `assets/module-notes.json` | Names and note text for every module |
| `scripts/build_blueprint.py` | Fills the template, stage by stage |
| `scripts/add_notes_api.py` | Optional: adds notes through Make's API when `MAKE_API_TOKEN` is set |
| `scripts/make_guide.py` | Writes the closing Markdown guide |
| `references/co-building.md` | The stage table and the six beats of every stage |
| `references/module-walkthrough.md` | What each module does and how it is taught |
| `references/make-mcp-playbook.md` | Tool call order per stage and fallbacks |
| `references/chrome-fallback.md` | Building through the browser when Make MCP is not connected |
| `references/troubleshooting.md` | Execution errors by module and their fixes |

## Good to know

- **The test run is real.** It archives real emails and sends a real digest. Archived emails stay in All Mail.
- **Operations.** Each module run is one operation. The skill estimates roughly seven operations per email. Check your plan's allowance on Make's pricing page.
- **AI model on the Free plan.** The default AI model setting is labeled for paid plans. If the test run fails on the AI module, open that module in Make, pick an available model, and save. Claude picks up the change.
- **Hands off the editor during the build.** If you edit and save in Make mid-build, Claude's next update overwrites your change.
- **Pausing.** Turn the scenario off with its toggle in Make at any time. Check the History tab if a digest is missing.

## Help

If the build gets stuck, start with `references/troubleshooting.md`.

This scenario was designed by Andy O'Neil of Weblytica, who builds Make.com automations for businesses.

- Book a free 45-minute call: [weblytica.com/youtube-calendly](https://weblytica.com/youtube-calendly/)
- Email: andy@weblytica.com
- Web: [weblytica.com](https://weblytica.com)

## License

MIT License. Copyright (c) 2026 Weblytica, LLC. See [LICENSE](LICENSE) for the full text.
