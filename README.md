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

## Getting started (2 minutes)

1. **Clone this repo** somewhere private (it will hold personal data — keep it a private
   repository).
2. **Open it in Claude Code** and say:

   > **onboard me**

3. The agent walks you through onboarding **one step at a time**, ticking a checkbox after
   each step. To keep each step focused and cheap on context, it will do a single step and
   then ask you to re-prompt with **"continue onboarding"** for the next one.

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
- **"I'm applying to <company> for <role> — here's the JD."** → creates the application.
- **"Make a CV for this one."** → a tailored, PDF-ready CV.
- **"I have a new story to tell."** → routed into your profile / story bank.
- **"Get me ready for the upcoming <round> interview."** → a time-boxed prep plan + mocks.
- **"I got emails about application X — update it and tell me what to do."**
- **"Here's how the interview went…"** → a debrief that feeds every gap back into the system.

The agent's full operating rules live in [CLAUDE.md](CLAUDE.md).

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
