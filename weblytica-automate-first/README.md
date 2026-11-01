# Weblytica: Automate First

**Find the one thing your business should automate first.**

Weblytica: Automate First is a Claude skill that helps small business owners identify, evaluate, and prioritize their first business automation.

Instead of generating a generic list of AI ideas or recommending automation for everything, it conducts a guided business interview, identifies operational bottlenecks, evaluates lost revenue and wasted time, and recommends **one high-impact automation to implement first.**

The goal is simple: help business owners make a better automation decision before spending money on tools, software, or development.

## Who Is This For?

Designed primarily for small business owners, including:

- **Home services & trades:** Plumbers, electricians, HVAC, contractors, and other dispatch-based businesses.
- **Appointment-based businesses:** Salons, med spas, fitness studios, dance studios, and other service providers.
- **Project-based businesses:** Agencies, consultants, contractors, and businesses that generate estimates and proposals.
- **Recurring service businesses:** Memberships, subscriptions, and businesses with recurring payments.
- **Online service businesses:** Coaches, consultants, freelancers, agencies, and bookkeepers.
- **Restaurants & retail:** Businesses managing staff, inventory, customer transactions, and reviews.

You don't need to understand AI or already use automation software. The skill is designed to work with businesses starting from scratch.

## What It Does

The skill walks business owners through a structured discovery process.

### 1. Understands Your Business

Identifies:
- What your business does and who your customers are.
- How customers buy from you.
- Your team size.
- The software and tools you already use.
- Your primary business operating model.

### 2. Identifies Operational Friction

Looks for repetitive tasks, bottlenecks, delays, and missed opportunities.

It can optionally incorporate data from Weblytica's **Friction List and Team Interview Guide** to identify problems reported by both leadership and frontline employees.

[Download the Friction List and Team Interview Guide](https://github.com/weblytica/youtube-assets/blob/main/dont-buy-ai-yet/Video_3_-_Friction_List_and_Team_Interview_Guide_-_Weblytica%20LLC.pdf)

### 3. Evaluates Business Functions

Examines the functions most relevant to the business model, including:

- Lead intake and customer acquisition
- Sales and follow-up
- Scheduling and appointments
- Customer communication
- Payments and collections
- Onboarding
- Invoicing
- Reviews and reputation
- Staff scheduling
- Inventory
- Administrative tasks

Rather than asking vague questions about how much time something wastes, the skill asks for actual counts and measurable activity.

### 4. Separates Process Problems from Automation Opportunities

Not every problem needs software.

Before recommending an automation, the skill considers whether the problem could be solved by:

- Changing a business policy.
- Improving employee training.
- Changing payment terms or requiring deposits.
- Eliminating unnecessary work.
- Simplifying an existing process.

These become immediate action items that don't require purchasing or building anything.

### 5. Scores Automation Opportunities

The skill evaluates the top candidates using a structured scoring rubric.

The scoring model considers three areas:

| Category | What It Evaluates |
|---|---|
| Value | Time savings, revenue at risk, customer-facing delays, and independent confirmation of the problem |
| Feasibility | Rule clarity, exceptions, process stability, and available digital tools |
| Adoption | Owner willingness, required staff behavior changes, and reversibility |

**Priority Score = (Time + Revenue + Bonuses) × Feasibility × Adoption**

The scoring system is a set of practical design heuristics, not a validated scientific instrument. Its purpose is to make the decision transparent and help rank opportunities.

### 6. Recommends One First Automation

The final recommendation includes:

1. **Your first automation:** The single recommended opportunity.
2. **Why this one:** The reasoning based on the owner's answers and business data.
3. **Do this week, no tool needed:** Immediate process improvements.
4. **30-day success metric:** A measurable way to evaluate results.
5. **Runner-up:** The second-best opportunity and what would make it the better choice.
6. **What we are assuming:** Estimates and information worth verifying.
7. **Where to build it:** Preferably using software the business already owns.

## How It Works

The skill follows a seven-step process:

| Step | Process |
|---|---|
| 1 | Identify the business type and operating model |
| 2 | Collect optional friction-list data |
| 3 | Identify problems that should be fixed without automation |
| 4 | Walk through relevant business functions |
| 5 | Distinguish revenue leaks from time-consuming tasks |
| 6 | Score and rank automation candidates |
| 7 | Deliver one prioritized recommendation |

The interview is conversational and intentionally asks one question at a time. Owners can also choose a faster interview path when they are short on time.

## Design Principles

The skill is built around several important principles:

- **Automate the right thing, not everything.** Start with the highest-value opportunity.
- **Measure instead of guessing.** Use actual business counts wherever possible.
- **Fix the process before automating it.** Software cannot compensate for a broken business process.
- **Revenue leaks matter.** Missed calls, unanswered leads, no-shows, and unpaid invoices can be more important than administrative time savings.
- **Use what you already own.** A native feature in existing software is usually preferable to adding another platform.
- **Start with deterministic automation.** Simple rules, reminders, payment links, and notifications are often better first projects than complicated generative AI workflows.
- **Make results visible.** Choose an automation with a measurable result within 30 days.

## Repository Structure

```text
weblytica-automate-first/
│
├── SKILL.md
│
└── references/
    ├── evidence.md
    ├── friction-worksheet.md
    ├── functions-and-counts.md
    ├── operating-models.md
    └── scoring.md
```

**SKILL.md** contains the main instructions, interview process, decision logic, and recommendation format.

**references/** contains supporting research, business operating models, diagnostic questions, worksheet guidance, and the scoring methodology.

## Installation

This repository contains a packaged Claude skill.

1. Download the `weblytica-automate-first.skill` file from the repository's Releases or source files.
2. Open Claude.
3. Navigate to Claude's Customize/Skills area.
4. Upload the `.skill` file to install it.
5. Enable the skill for your conversations.

Once enabled, Claude can use the skill when you ask questions such as:

- What should I automate first in my business?
- Where am I wasting the most time?
- How can I use AI to make my business more efficient?
- I'm missing calls and losing customers. What should I fix first?
- I know I should automate something, but I don't know where to start.

The skill can also activate when you describe operational problems without explicitly mentioning automation.

## Example Outcome

For a small plumbing company, the skill might identify missed calls as the highest-priority opportunity.

Rather than immediately recommending a complicated AI receptionist, it might recommend:

**First automation:** Automatically text customers when their calls go unanswered.

**Why:** Missed calls represent potential lost jobs, customers are waiting for a response, and the business already has a phone system with text capabilities.

**Do this week:** Establish a clear callback policy and make sure every missed call has an assigned follow-up owner.

**30-day metric:** Percentage of missed calls receiving a response within five minutes.

The recommendation is based on the business's actual numbers, available tools, and operational circumstances rather than a generic AI automation checklist.

## About Weblytica

[Weblytica](https://weblytica.com) helps businesses understand where AI and automation actually belong in their workflows.

The goal isn't to find more ways to use AI. It's to identify where technology solves a real business problem, where a simpler process change is better, and where automation can produce measurable results.

**Don't buy AI yet. Figure out what needs fixing first.**

---

## License

See the repository's license information for terms of use and distribution.
