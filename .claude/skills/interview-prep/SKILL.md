---
name: interview-prep
description: Prepare the user for an interview round — company/interviewer research, a time-boxed prep plan, and behavioral/discipline-specific preparation with the mandatory coverage gate. Use when the user asks to get ready for an interview, mentions an upcoming round, or says how many days they have to prepare.
---

# Interview preparation

**All Golden Rules in `CLAUDE.md` still apply.**

Trigger: *"help me get ready for the X interview"*, *"I have Y days"*.

1. Read the application, the JD, and the interview process steps.
   **Generate the round's question set FIRST** via the `interview-question-generator` skill
   (discipline/level/round-aware) — the saved bank is a seed, not the ceiling — then cut to a
   focused subset for the time available.
2. **Research** (use web tools): the company (product, mission, recent news, funding, tech
   stack, values), the specific interviewer(s) if named (background, focus areas), the team,
   and any public interview guidelines or review-site signals. Save to
   `interviews/company-research/<company>.md` and link it from `application.md`.
   *(Privacy: never store a real interviewer's name — alias by role, e.g. "the hiring
   manager", "the panel's staff engineer".)*
3. Build a **time-boxed plan** from how many days/hours the user has. Write it to
   `applications/<...>/interview-prep/<round>-plan.md` (template:
   `applications/_TEMPLATE/interview-prep/_plan-TEMPLATE.md`). Front-load the
   highest-leverage prep.
4. Prep to the **round type**:
   - **Behavioral / leadership round** → the behavioral prep below.
   - **Discipline-technical round** → prep to the discipline (system design, coding, design
     critique, product sense, data case) using the generated question set.
5. **Coverage gate (MANDATORY):** before presenting any prep plan, walk
   `interviews/hiring-manager/prep-checklist.md` and append a **"Coverage"** section to the
   plan marking every area ✅ (covered, where) or ⏭ (skipped, why). Pay special attention to
   **metrics/OKRs per past role** — pull each role's "How success was measured" section from
   `profile/work-experience/`; if it's still `TODO`, eliciting it from the user is part of the
   prep, not optional.
6. Offer **mock interviews** and update the answers based on how the user responds.

## Behavioral / leadership prep

**Applies when the round probes people-leadership or general behavior.** People-management
questions apply **only if the user manages people** (`profile/preferences.md` → *Manages
people*). For an IC, lean on technical judgment, ownership, influence-without-authority, and
craft instead — never assume a management frame.

1. `interviews/hiring-manager/question-bank.md` holds the master list of likely questions
   (conflict, difficult feedback, raising the quality bar, hiring, disagreement with
   leadership, failure, prioritization, …). Keep it comprehensive — the
   `interview-question-generator` skill appends to it every prep.
2. During a mock, map each question to the user's real history (`profile/`, especially
   `profile/stories/`). If a story is missing or is still an unconfirmed skeleton, make it
   solid via the **`story-elicitation`** skill and save it to `profile/stories/`.
3. Fill the prepared, STAR-structured answer under each question in
   `interviews/hiring-manager/answers.md` (keyed to the question bank), citing which
   experience it draws from.
4. To make the user "ready": produce a focused subset + a rehearsal plan for the specific
   company/round — gated by the coverage checklist (step 5 above).

> **Answering interview questions?** The answer-intent gate (`CLAUDE.md` §2.2b, Golden Rule
> #10) applies to prepared interview answers too — name the signal, pick the strongest
> evidence, read the draft back against the signal.
