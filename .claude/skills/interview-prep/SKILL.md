---
name: interview-prep
description: Prepare the user for an interview round — company/interviewer research, a time-boxed prep plan, and behavioral/discipline-specific preparation with the mandatory coverage gate. Use when the user asks to get ready for an interview, mentions an upcoming round, or says how many days they have to prepare.
---

# Interview preparation

**All Golden Rules in `CLAUDE.md` still apply.**

Trigger: *"help me get ready for the X interview"*, *"I have Y days"*.

1. Read the application, the JD, and the interview process steps.
   🗄️ **Check `applications/_archive/` too** (Golden Rule #14): a **prior application to this
   same company** — and its `interview-prep/` plans and debriefs — is archived there, not in
   `applications/`. Those are the highest-value prep input available (their real questions,
   their real bar, what lost last time), and the active index will not show them. The same
   goes for a debrief of an **earlier round of a similar loop elsewhere** (system design,
   coding, hiring-manager).
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
   prep, not optional. For a **management/lead round only**, the coverage section also lists
   any **unarmed sharpness probe** (step 1b, §9) — an open one-fact gap is a coverage item,
   not a footnote. For an IC round there is no such row; don't add one.
6. Offer **mock interviews** and update the answers based on how the user responds.

## Behavioral / leadership prep

**Applies when the round probes people-leadership or general behavior.** People-management
questions are gated on the **target role**, not the user's current job (`CLAUDE.md` preamble):
prep them in full whenever the role being interviewed for manages people — **including when
the user doesn't manage people yet and this is their first such round.** For an **IC target
role**, lean on technical judgment, ownership, influence-without-authority, and craft instead;
never assume a management frame.

**First-time manager?** Prep the full leadership set, then do one extra pass: for each
question the user can't answer from real management experience, prep the **honest adjacent
answer** — mentoring, tech leadership, leading without authority, the parts of a manager's job
they *have* done — and name what's genuinely missing so they can say it plainly in the room.
Never invent a report, a hire, or a PIP (Golden Rules #2/#7). "I haven't run a PIP; here's the
closest thing I've done and how I'd approach it" is a strong answer; a fabricated one ends the
process.

1. `interviews/hiring-manager/question-bank.md` holds the master list of likely questions
   (conflict, difficult feedback, raising the quality bar, hiring, disagreement with
   leadership, failure, prioritization, …). Keep it comprehensive — the
   `interview-question-generator` skill appends to it every prep.
1b. **Sharpness probes — MANAGEMENT / LEAD ROUNDS ONLY
   (`interviews/hiring-manager/sharpness-probes.md`).**
   ⛔ **Check the target role first.** Open that file **only if the role being interviewed for
   is a people-management or lead role** (EM, team/tech lead, head of, director, or the
   equivalent lead title in another discipline). For an **IC round** — any level, any
   discipline — **skip this step entirely and don't mention the probes**: they assume
   accountability for a team's headcount, incidents, debt and cycle time, so they are
   off-target for an IC and prepping them pulls the user toward leading with management scope
   (the Golden Rule #11 failure). Gate on the **target role in `application.md`/the JD**, not
   on whether the user currently manages people — an IC going for their first lead role *does*
   get probed; a manager going for an IC role does not. Ambiguous ("lead" with no reports and
   no technical authority in the JD)? **Ask the user.**

   When it does apply: the question bank holds the deep STAR questions; that file holds the
   30–90-second probes an interviewer or recruiter uses early and cheaply to gauge how real a
   manager or lead is — *"how many people are on your team?"*, *"when did you last…?"*, *"how
   long from merge to production?"*. They fail for a different reason than STAR questions:
   **you cannot prepare a narrative, only a fact.** Then:
   - Walk the probe list for the round type and fill in the user's own answers where the file
     leaves blanks — the §8 recall card (question → which story) and the §9 gap list are
     **per-user and start empty**; filling them is part of prep, not optional.
   - Any probe with **no fact behind it** is a `TODO(user)` in §9, surfaced to the user. Some
     gaps are **recency** gaps that no wording fixes — say so plainly rather than drafting a
     smoother answer around them.
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
