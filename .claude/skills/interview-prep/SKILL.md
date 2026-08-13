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
1c. **🔴 RE-READ THE SENT CV AGAINST THE JD'S LEVEL — every round, not just round 1.**
   Open `applications/<...>/cv.md` beside `jd.md` and run the **15-line squint test** from the
   `tailored-cv` skill on the CV **as it was actually sent**. Record the verdict as a line in
   the plan: *"sent CV opens on ⟨facet⟩; JD asks for ⟨level⟩ → ✅ on-target / ⚠️ over-leveled."*

   **Why this is a prep step and not only a build-time step.** The CV is not read once and
   retired — it is **re-read at every downstream decision point, by people who never met the
   user**: the hiring manager before their round, a senior leader or panel at an internal
   shortlist review the candidate does not attend, the debrief that decides whether to advance.
   A CV built *before* a positioning fix shipped keeps walking into those rooms unchanged,
   because **a sent `cv.md` is read-only and cannot be corrected** (`CLAUDE.md` §4). The
   `tailored-cv` gates (Golden Rule #7's JD-echo read-back, #11's role-fit squint test) all run
   **once, at build time** — they protect the *next* application, and nothing protects the
   applications already in flight.

   ⇒ When the verdict is ⚠️, it becomes a **prep item, not a note**: the user opens the round by
   grounding in the on-target facet **in their own words** — *"I directly manage N engineers on
   one team"* — before the interviewer's read of the CV sets the frame. **Name which phrase in
   the CV is doing the damage**, so the user knows exactly what they are speaking over. This is
   the only remedy available; the artifact itself cannot be edited.

   > ⭐ **The general principle, worth applying beyond CVs: a correction shipped into a
   > build-time gate is retroactive to nothing.** Any repo that learns from rejections
   > accumulates artifacts built under older, weaker rules. "We fixed it" is only ever true of
   > future work unless something explicitly reaches back into the live pipeline. So when a
   > positioning gate is **tightened**, run the second half of this step: **sweep the live
   > applications in `applications/_index.md` for the pattern the fix targets, and flag any that
   > are carrying a pre-fix CV into a scheduled round.** Neither half edits anything — both
   > convert an uncorrectable artifact into something the candidate can speak over.

   <!-- The pattern this rule came from, told anonymously: a candidate cleared a recruiter
   screen comfortably, then was rejected days later at an internal shortlist review they did
   not attend, decided by a senior leader who had never met them. The artifacts in front of
   that decision-maker were the CV exactly as sent, plus a recruiter's write-up of a 30-minute
   call. The CV had been built before the repo's role-fit positioning fix existed, and opened
   on a broader scope than the role was hiring for — while the application's own notes had
   scored the role a bullseye. No gate had missed it: the gate did not yet exist when the CV
   was built, and once sent the CV could not be corrected. -->

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

   ### 🚫 5a. BANNED JUSTIFICATION — "it's only round 1 / the recruiter won't ask that"
   **The round's POSITION IN THE LOOP IS NEVER a valid reason to mark an area ⏭.** Writing
   *"deferred to the hiring-manager round"*, *"out of scope for a recruiter screen"*, *"a talent
   screen rarely probes this"*, or any equivalent is **a coverage failure, not a coverage
   decision** — delete it and cover the area.

   This exists because the gate above, on its own, does not hold. It accepts *any* one-line
   reason for a ⏭, and the cheapest passing reason is always "they won't ask it yet" — which
   produces a round-1 plan that walks the whole checklist, looks fully compliant, and still
   leaves most areas uncovered, while the interviewer asks them anyway.

   **This is an evidenced failure mode, not a theoretical one.** Questions actually asked in
   first-round and recruiter screens: full manager-calibration probes; *"why did you choose to
   be a manager?"*; *"what does product engineering mean to you?"*; *"what's the most complex
   event-driven project you've worked on?"*; *"tell me about an underperformer you handled"*;
   *"how is AI being adopted on your team?"*; *"how do you run the team and know they're
   performing?"*; *"what would you add to us?"*; *"how do you run security-first without
   blocking engineers?"*; *"what's your experience with distributed teams?"* — plus one screen
   where **AI-ROI measurement consumed the entire hour**. Round 1 is routinely run by an **EM, a
   senior director, or a talent partner trained to probe** — not an admin gatekeeper.

   **The two mechanical rules:**
   1. **Every ⏭ needs a reason that is TRUE OF THE AREA, not of the round.** Legitimate:
      *"IC target role, so people-management is off-target"* · *"the user genuinely has no such
      experience — flagged as a gap"* · *"already fully covered in §X of this plan"*.
      Illegitimate: anything whose reasoning reduces to *"they won't ask it yet."*
   2. **Anything not covered in depth still gets a ONE-LINE landing spot** — the question, the
      best story, and a hook to say. A prep artifact must let the user answer **any** checklist
      area from the page in front of them, even where the deep-dive is genuinely deferred.
      **Depth may be prioritized; coverage may not be skipped.**

   ⇒ In practice: **every round-1 plan carries a complete question→story lookup**, and the
   time-box decides how much rehearsal each row gets — never whether the row exists.
6. Offer **mock interviews** and update the answers based on how the user responds.

## Behavioral / leadership prep

**Applies when the round probes people-leadership or general behavior.** People-management
questions are gated on the **target role**, not the user's current job (`CLAUDE.md` preamble):
prep them in full whenever the role being interviewed for manages people — **including when
the user doesn't manage people yet and this is their first such round.** For an **IC target
role**, lean on technical judgment, ownership, influence-without-authority, and craft instead;
never assume a management frame. With no specific application in play (a general "get me
ready"), read `profile/preferences.md` → *Target track* instead.

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
