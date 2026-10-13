# Process Outline Builder

**A free Claude skill that turns what you do into SOPs you can hand off.**

You know how your business runs. The problem is that the steps only live in your head. This skill interviews you about one task, one step at a time, and turns your answers into a written SOP that someone else can follow.

Built by [Andy O'Neil](https://weblytica.com) of Weblytica, from over 1,100 co-building calls with small business owners.

---

## Why this exists

Most owners can write down what happens on a normal day. That's not why handoffs fail.

Handoffs fail on the odd days. The "oh, sometimes we do it differently" cases. Those live only in your head, so the person you hand the work to hits a case your SOP doesn't cover. They come back with questions, or they guess. Either way, the work lands back on your plate.

This skill is built to catch those odd days **before** you hand the work off, not after.

## What it does for you

- **Gets the process out of your head.** You talk. Claude asks the questions and writes it down.
- **Catches the steps you'd skip.** Every vague step gets a follow-up: which tool, and what exactly happens?
- **Finds the odd days.** Any time you say "if," "unless," or "sometimes," it stops and maps both routes.
- **Writes it in plain language.** The way you'd explain it to a new hire, not the way a software manual reads.
- **Gives you something you can hand off today.** A clean outline a team member or VA can follow without calling you.

It works whether or not you ever automate anything. If you do want to automate later, the outline doubles as the plan.

---

## How the interview works

1. **It asks where the task starts.** What's the first thing that happens?
2. **It asks what happens before that.** Not just "a form comes in," but who fills it out and why.
3. **It walks forward one step at a time.** After each step, it repeats it back and asks if it got it right.
4. **It pushes back on vague steps.** Say "then I let them know," and it asks how: email, phone call or text? What do you say?
5. **It catches the forks.** When the route depends on something, it asks what decides it and what happens each way.
6. **It catches where routes meet back up,** so shared steps are written once.
7. **It asks one last question:** "Is there any other situation where this goes differently?"
8. **It asks how you want the result:** one outline, one page per tool, or both.

If you paste in the whole process at once, it still walks through it step by step to confirm each part.

If you use the same words every time, like an email template or a prompt, it keeps your exact words.

---

## What the SOP looks like

Every step names **where** it happens and **what** to do. Odd days split off at the exact step where things change.

```
# Process: New client onboarding

## Before the trigger
The client signs the proposal sent from PandaDoc.

## Trigger
PandaDoc, document completed

## Steps

### QuickBooks
1. QuickBooks, create an invoice
   Client name, the package they signed for, and the deposit amount from the proposal.

### HubSpot
2. HubSpot, update the deal to Closed Won

### Break point
3. Break point: Did they pick the monthly retainer?
    - **3.1 Use Case 1: Monthly retainer**
        - 3.11 QuickBooks, set up a recurring invoice for the monthly amount
        - 3.12 Google Calendar, schedule the kickoff call
    - **3.2 Use Case 2: One-time project**
        - 3.21 Google Calendar, Go to Step 3.12
```

A few things to notice:

- **Steps outside software still count.** A phone call or pulling stock off a shelf gets a plain label like "Phone Call" or "Stock Adjustment."
- **Automatic results are notes, not steps.** If dropping a file in a folder kicks off an upload, that's one step with a note, not two steps.
- **Ideas for improving the process get saved separately.** The SOP records how the work runs today. Changes you mention go in a short list at the end.

### Optional: one page per tool

If your team works across several web apps, the skill can split the SOP into one file per stop. Each file starts where the person is working, lists the steps for that tool, and ends with where to go next. That way the right steps can sit next to the screen they're using.

---

## Installation

The skill lives in the `weblytica-process-outline-builder` folder in this repo. The only file it needs is `SKILL.md`.

**Claude app (web or desktop):** download this repo as a zip and add the skill folder in your Claude skills settings. Skills need to be enabled on your plan. Check Claude's help center for the current steps.

**Claude Code:** copy the `weblytica-process-outline-builder` folder into your skills folder (`~/.claude/skills/`).

## How to use it

Start a new chat and say something like:

- "Outline this process for me."
- "Walk me through documenting how we handle new orders."
- "Map my workflow for sending invoices."

Then answer one question at a time. Talking it through in voice mode works well.

## Tips for getting the most out of it

- **Pick one task you do every week** that someone else should be doing. Start there.
- **Rename the Claude chat to the process name.** Then you can find it in six months and update it when things change.
- **Have someone run the SOP once while you watch.** Every question they ask is a missing step. Add it.
- **Keep it as the record of how the work gets done,** even if the person doing it changes.

---

## Want help?

If you're losing hours every week to work you can't hand off, I'd like to help. [Book a free 45-minute call](https://weblytica.com/youtube-calendly/) and we'll look at it together.

Watch the walkthrough video: [VIDEO LINK]

---

*Created by Andy O'Neil, Weblytica LLC.*
