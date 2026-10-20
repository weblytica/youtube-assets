# Calendly Side Panel: a Chrome Extension That Tells You When Clients Go Quiet

A Chrome side panel that shows your Calendly calls in one click and flags the clients who are drifting or have ghosted you. It reads from your own Google Sheet and judges each client against their own booking rhythm, not a fixed 30-day rule.

You build it yourself with a free Claude skill, `weblytica-calendly-sidepanel-builder`, in Claude Code. No coding experience needed.

Built by Andy O'Neil, [Weblytica](https://weblytica.com).

---

## The problem it solves

**1. Seeing today's calls takes too many clicks.**
To check Calendly you open a new tab, type the URL, log in, and find your schedule. That's around six clicks. Your regular calendar doesn't help much if it's full of family and personal events, and meetings get buried. The cost is real: showing up late, or missing a client who already left the call.

**2. Nothing tells you when a client stops booking.**
Your calendar pings you when a client books. Your CRM pings you when a client books. Nothing pings you when a client stops. Clients rarely cancel. They go quiet, and quiet is invisible because there's no event for any tool to react to. That's how good clients slip away.

**The fix:** one click opens a side panel next to whatever you're working on, with today's calls and a Follow Up list of clients who need a check-in.

---

## What it does

### Four tabs
| Tab | Shows |
|---|---|
| **Upcoming** | Today's calls and the rest of the week, soonest first. Canceled calls stay visible (struck through) so you know the slot opened up. |
| **Recent** | The last 30 days (adjustable), newest first, with No-show and Canceled badges. |
| **Bookings** | Every booking, newest first, loaded 50 at a time. |
| **Follow Up** | Clients sorted into **Ghosted**, **Drifting**, and **Watch**, each with how often they usually book and how long they've been quiet. |

### On every tab
- **Search** filters as you type (3+ letters): name, email, event type, or company.
- **+ Book** opens your Calendly booking link so you can book a call by hand.
- **Synced X ago** shows when data last refreshed. Click it to refresh now.
- **Company tags** come from the email domain. `billy@revivalhome.com` shows `revivalhome.com`. Gmail, Outlook, iCloud, Yahoo, and other free email addresses never get a tag. You can rename any domain (for example `revivalhome.com` to "Revival Home").

### Demo mode
Built-in sample data with made-up people at made-up businesses. Use it for screen recordings, training, or testing, without showing real client names. The demo people are designed to land in every Follow Up group.

---

## How Follow Up works

Most tools use one rule for everyone, like "no contact in 30 days." That rule is wrong for almost everyone. A client who books every two weeks is in trouble after a month. A client who books every three months is fine after a month.

So the extension learns each client's own rhythm from their past meetings.

1. **Usual gap.** For each client, it takes the days between their past meetings and uses the middle value (the median), not the average. One long vacation doesn't throw off what "normal" means for that client.
2. **Days quiet.** Days since their last meeting.
3. **Overdue ratio.** Days quiet divided by usual gap.

| Group | Who | Default rule |
|---|---|---|
| **Drifting** | 3+ meetings | Quiet longer than 1x their usual gap |
| **Ghosted** | 3+ meetings | Quiet longer than 2x their usual gap |
| **Watch** | Exactly 2 meetings | Quiet longer than 2x the typical gap across all your clients |
| Not judged | 1 meeting | Never flagged |
| Left off every list | Anyone | Already has a meeting booked |

**Example:** if you usually meet someone every 30 days, they show as Drifting on day 31 and Ghosted on day 61. If they already have a call on the calendar, they don't show at all, because they don't need chasing.

Ghosted and Drifting are ranked by how often the client meets per year (your most active clients first). Watch is ranked by days quiet.

---

## Settings

Open Settings from the gear icon.

- **Connection:** test or change how the extension reads your Sheet.
- **Columns:** match your Sheet's column headers to what the extension needs. Headers are auto-matched on first sync, so you don't need to rename anything.
- **Look:** a text heading (default "My Meetings") or your own logo, plus five color schemes. Every scheme passes WCAG contrast checks.
  - Midnight Orange (default)
  - Slate Sky
  - Graphite Lime
  - Daylight Blue (light mode)
  - High Contrast
- **Follow Up thresholds:**

  | Setting | Default | Range |
  |---|---|---|
  | Drifting after x usual gap | 1.0 | 1.0 to 3.0 |
  | Ghosted after x usual gap | 2.0 | 1.25 to 6.0 (always above Drifting) |
  | Watch (2-meeting clients) after x typical gap | 2.0 | 1.0 to 6.0 |
  | Meetings needed to judge a client's own rhythm | 3 | 3 to 8 |
  | Ranking span floor (Advanced) | 90 days | 30 to 365 |

  Optional: merge people with the same name (off by default), and hide people quiet longer than a set number of days (off by default). Every setting has a **Reset** button, so you can't really break it.
- **Company tags:** rename domains, or add a free email provider that's missing from the built-in list.
- **General:** Calendly booking link, Recent window, Bookings page size.

---

## What you need

1. **Your Calendly bookings in a Google Sheet.** One row per booking. The previous Weblytica video shows how to do this with a Make.com scenario. Required columns: start time, event type, name, email, and status (`active` or `canceled`). Optional: event ID, end time, no-show, booked date.
2. **Claude Code.** The Claude desktop app works.
3. **Google Chrome** (recent version; the Side Panel API arrived around Chrome 114).

---

## How you build it

1. Call the skill `weblytica-calendly-sidepanel-builder` in Claude Code.
2. Pick a folder for the extension.
3. The skill builds a starter extension in that folder.
4. Load it in Chrome: open `chrome://extensions`, turn on **Developer mode**, click **Load unpacked**, and choose the folder.
5. Click the extension icon. Your own side panel opens. That's your first win, before any setup.

Then choose how hands-on you want to be:
- **Done For You:** Claude writes everything and gives you a finished product.
- **Done With You:** the build goes step by step and shows you the result of each stage.

The build runs in eight stages. Each one ends with you reloading the extension and seeing the new piece working.

| Stage | Adds |
|---|---|
| 1 | Hello, side panel |
| 2 | The look (heading and color scheme) |
| 3 | Booking cards from sample data |
| 4 | Search and company tags |
| 5 | Connect your Google Sheet |
| 6 | Follow Up tab |
| 7 | Settings |
| 8 | Polish, accessibility, and the final check |

Stages 1 to 4 use sample data, so you see real progress before you touch Google at all.

---

## Connecting to Google Sheets

You pick one of two routes during setup.

| | **Simple: Apps Script bridge** | **Google sign-in: Sheets API** |
|---|---|---|
| Google Cloud Console | Not needed | Needed |
| Setup time | About 10 minutes | About 20 to 30 minutes |
| What protects the data | A secret token | Google sign-in |
| Who can read the data | Anyone with both the script URL and the token | Only Google accounts with access to the Sheet |
| Best for | One-person tool | Teams, where each person signs in as themselves |
| Browsers | Any Chromium browser | Chrome only |

**Simple route, in short:** paste a small Apps Script into your Sheet, run it once to create a secret token, deploy it as a web app, and paste the URL and token into the extension.

Google screens change often. If a label in either setup doesn't match, check Google's current documentation.

---

## Privacy and security

- Your Google Sheet stays private on both routes.
- The extension only reads the columns you map. Notes, booking-question answers, and payment fields never leave the Sheet.
- The token, your logo, and cached data are stored locally in your browser. Settings sync through your Chrome profile.
- No remote code. Everything runs from the folder on your computer.
- **Honest note on the Simple route:** the token is a shared secret, not a real sign-in. Anyone with both the script URL and the token could read the mapped columns. For a one-person tool, that's usually fine, but you should know it. To rotate the token, run `setupToken` again and old copies stop working immediately. For a team, use the Google sign-in route.

---

## Accessibility

- All text meets 4.5:1 contrast, and interface parts meet 3:1, in every color scheme.
- Full keyboard use: arrow keys move between tabs, Esc closes Settings and clears search.
- Visible focus rings, screen-reader labels on icon buttons, and status never shown by color alone.
- Works at 200% zoom in a narrow panel, and respects reduced-motion settings.

---

## Troubleshooting

| Message | Fix |
|---|---|
| `unauthorized` | The token doesn't match. Re-copy it from Apps Script, or run `setupToken` again. |
| `missing_columns` | A required column wasn't found. Check the column mapping in Settings. |
| `sheet_not_found` | No tab by that name. Check the tab name in Settings. |
| `signin_expired` | Click Sign in again (Google sign-in route). |
| Panel won't open | Update Chrome, then reload the extension. |
| Sign-in broke after moving the folder | On the Google sign-in route, the extension ID depends on the folder path. Move it back, or ask Claude to add a fixed `key` to the manifest. |

If a sync fails, the panel keeps showing your last data with a "Sync failed" note.

---

## Need help?

If we haven't met yet, my name is Andy O'Neil. I help business owners stop losing 15+ hours a week to busywork they can't hand off. Book a free 45-minute call at [calendly.com/weblytica](https://calendly.com/weblytica).
