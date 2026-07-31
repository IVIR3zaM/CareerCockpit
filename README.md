# CareerCockpit

A Markdown-based, agent-driven system for running your whole job search from one place —
your CV, your applications, and your interview prep — with **Claude Code** as the interface.

Instead of maintaining one static résumé and scattered notes, you keep your career as
**structured source data** once, and the agent generates a *tailored* CV and interview
prep for each role you apply to. No database, no build step. Git is the source of truth
and the audit log.

It's built for **any tech professional** — software, design, product, data, infra — at any
level from **junior through senior, staff, EM, and head/director**. The onboarding flow
adapts the structure, CV style, and interview questions to *your* title and level.

---

## Getting started

> **Make your OWN private copy first — do NOT just clone and work in place.** This template
> is public and safe to share, but the moment you onboard, your copy fills with personal
> data (your CV, comp, application notes). That data must live in a **private repository
> that belongs to you.** So the very first thing you do is create your own private copy.

### Step 1 — Create your own private copy

Pick whichever route you prefer. Either way, the result is a **new private repo under your
own account** — not a fork (a fork of a public repo can't be made private).

**Route A — GitHub "Use this template" (easiest, gives a clean history):**
1. On this repo's GitHub page, click **"Use this template" → "Create a new repository."**
2. Choose **your** account as the owner, give it a name (e.g. `my-career-cockpit`), and set
   visibility to **Private**.
3. Clone *your new private repo* to your machine:
   ```bash
   git clone git@github.com:<your-username>/my-career-cockpit.git
   ```

**Route B — Clone this template, then push to a new private repo you create:**
```bash
# 1. Create an EMPTY private repo on github.com first (e.g. <you>/my-career-cockpit).
# 2. Then locally:
git clone https://github.com/<template-owner>/CareerCockpit.git my-career-cockpit
cd my-career-cockpit
git remote set-url origin git@github.com:<your-username>/my-career-cockpit.git
git push -u origin main
```
(With the GitHub CLI, one command does it: `gh repo create my-career-cockpit --private
--source=. --remote=origin --push`.)

> ⚠️ **Do not "clone and later flip this public template to private."** That would make the
> shared template disappear for everyone else. You always create a *separate* private repo
> of your own — that's what the steps above do.

### Step 2 — Confirm it's private

Open your new repo on GitHub → **Settings → General** and check the visibility says
**Private**. This is where all your personal data will live, so get it right before you
onboard.

### Step 3 — Onboard

1. **Open your private copy in Claude Code** and say:

   > **onboard me**

2. The agent walks you through onboarding **one step at a time**, ticking a checkbox after
   each step. To keep each step focused and cheap on context, it does a single step and then
   asks you to re-prompt with **"continue onboarding"** for the next one.

That's the whole setup. You don't need to learn the repo layout — you talk in natural
language and the agent files everything in the right place.

### What onboarding covers

Each of these is a checkbox in `onboarding/CHECKLIST.md`; you can stop and resume any time.

1. **Your CV** — you provide your current CV; the agent reconciles it against the default
   structure and negotiates the layout that fits your title/level.
2. **CV style** — pick the look: the built-in **default Blue theme**, or have the agent
   **extract the style from your own CV** (fonts, colors, spacing) so generated PDFs match it.
3. **Profile population** — everything on your CV is filed into `profile/` (basics,
   summary, one file per role, projects, skills, education, certifications).
4. **Email access** *(optional)* — decide whether to let the agent read your job-search
   email; your choice is recorded so future sessions know.
5. **LinkedIn import** — export your LinkedIn and the agent reconciles it into `profile/`.
6. **What you want** — a short, targeted interview (one question at a time) about your
   culture must-haves and deal-breakers.
7. **Interview question set** — the agent generates a *complete* question list for your
   title and level (not a fixed canned list), then works through your answers iteratively.
8. **Story bank** — from those answers it builds STAR stories and maps them to questions.
9. **Saving your work** — choose whether the agent should **auto-commit and push** your
   changes to git. It's **on by default** (recommended for non-technical users — designers,
   PMs — so nothing is ever lost); before each commit the agent shows a plain-English
   summary of what it's about to save and waits for your OK.
10. **House rules** — you review the agent's operating rules and keep, drop, or customize
   them for your clone.

The agent asks **targeted questions, one at a time** — a single wide-open "tell me
everything" question never captures what a focused prompt does.

---

## Once you're onboarded — what to say

- **"status"** → where every application stands, what's next, what's missing.
- **"Is this JD a match? [link or pasted text]"** → fit check against what you want.
- **"I'm applying to <company> for <role> — here's the JD."** → creates the application, and
  checks first whether you've applied there before.
- **"Make a CV for this one."** → a tailored, PDF-ready CV.
- **"I have a new story to tell."** → routed into your profile / story bank.
- **"Get me ready for the upcoming <round> interview."** → a time-boxed prep plan + mocks.
- **"I got emails about application X — update it and tell me what to do."**
- **"Here's how the interview went…"** / **"I got rejected."** → a debrief and a root-cause
  post-mortem that feed every gap back into the system.
- **"Update CareerCockpit."** → pulls the latest product improvements into your private copy
  **without touching your data** (see below).

The agent's full operating rules live in [CLAUDE.md](CLAUDE.md).

---

## Staying up to date

Your copy is a **private, detached** repo (that's what keeps your data yours), so it doesn't
auto-pull from the template. When the product ships improvements — new templates, better
onboarding, rule fixes — just say:

> **update CareerCockpit**

The agent checks the latest version, tells you in plain English what changed, and refreshes
only the **engine** (templates, rules, styles, onboarding logic). It **never overwrites your
career data** — your `profile/`, applications, stories, and answers are left exactly as they
are. If you'd customized something the update also changes (your CV theme, a house rule),
it asks you one question at a time instead of clobbering your version. Nothing is saved
until you confirm. The mechanics live in [UPDATE.md](UPDATE.md); the release history is in
[CHANGELOG.md](CHANGELOG.md).

---

## Layout

| Path | Purpose |
|---|---|
| `profile/` | Source-of-truth career data (populated during onboarding) |
| `applications/` | One folder per job application + a master index |
| `interviews/` | Question banks, prepared answers, company research |
| `styles/` | CV styling + the Markdown→PDF pipeline |
| `templates/` | Reusable templates (CV, cover letter, prep plan) |
| `onboarding/` | The onboarding flow and its checklist/state |
| `.claude/skills/` | The agent's workflow procedures (applications, CVs, prep, debriefs) |

---

## Principles

- **Your profile is the single source of truth.** Every claim in a tailored CV traces back
  to a file in `profile/`. The agent never invents facts, metrics, dates, or titles.
- **Tailor, don't rewrite history.** CVs are re-ordered, condensed, or expanded to match a
  JD — never falsified.
- **Privacy by default.** No third-party real names and no employer-confidential specifics
  are ever written to the repo. Impact is kept generic or ratioed.
- **The repo is the memory.** Everything durable is a committed Markdown file — versioned,
  auditable, and yours.

> **Keep your own clone private.** This template ships empty and carries no personal data.
> Once you onboard, your clone fills with personal data, compensation details, and
> application notes — so make **your** copy a private repository.
