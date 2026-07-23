# ONBOARDING.md — The onboarding flow the agent follows

This is the **master flow** for turning a fresh, empty clone into a populated cockpit. The
agent (you, Claude Code) drives it; the human just talks in natural language. Live state
lives in [`CHECKLIST.md`](CHECKLIST.md) — one checkbox per step, resumable across sessions.

> **This file is instructions for the agent, not a form the user fills in.** Read it, then
> run the protocol below.

---

## The one-step-per-re-prompt protocol (non-negotiable)

When the user says **"onboard me"**, **"continue onboarding"**, or anything equivalent:

1. **Open [`CHECKLIST.md`](CHECKLIST.md)** and find the **first unchecked step**.
2. **Do ONLY that step.** Never run two steps in one turn, even if the user seems eager and
   even if you have enough info — batching burns context and breaks resumability.
3. **Ask one targeted question at a time.** Never open with a single wide-open "tell me
   everything about your career." Each step below lists focused questions; ask them
   sequentially, waiting for the answer before the next. The *only* place batching is
   allowed is a final confirmation list at the end of a step ("here's what I captured —
   correct?").
4. **Write the step's outputs** to the files named in that step.
5. **Tick the step's checkbox** in `CHECKLIST.md` (and fill its "notes" cell) once its
   done-criteria are met.
6. **Stop and tell the user to re-prompt** with **"continue onboarding"** for the next step.
   Name which step is next so they know what's coming.

### Resume from anywhere
State is entirely in `CHECKLIST.md`. A new session (or a crash mid-flow) just re-reads it
and continues from the first unchecked box — no memory of the previous session required
(and per Golden Rule #8, no career facts may live in agent memory anyway).

### Redo a step
If the user wants to revisit a completed step ("change my CV style", "re-do company fit"),
**un-tick that box** in `CHECKLIST.md`, re-run the step, and re-tick it. Later steps that
depend on it may need a light re-check — call that out to the user.

### A note on when steps can be skipped or deferred
Some steps are optional (email access) or depend on an artifact the user may not have yet
(LinkedIn export). If the user wants to skip or defer, **record that decision** (a
`TODO(user)` or a "declined" note in the relevant file) and tick the box as *handled* — a
skipped-on-purpose step is done, not pending. Never silently leave it unchecked.

---

## Career-gap & chronology sensitivity (applies across the CV/profile steps)

Whenever you ingest the CV (Step 2), populate `profile/` (Step 4), or reconcile LinkedIn
(Step 6), **watch the dates**. The visible timeline in a CV must be strictly
**reverse-chronological and unbroken** (CLAUDE.md §2.2, Golden Rule #3). During onboarding:

- If two roles leave a **date gap** ("role X ended 2021-03, role Y started 2022-06"), **ask
  the user one targeted question**: *"There's a gap between <role X> (ended YYYY-MM) and
  <role Y> (started YYYY-MM) — what were you doing then?"* Capture the answer in the right
  `profile/` file (a break, study, caregiving, contracting, etc.), or record a
  `TODO(user)` if they defer. Never paper over it and never reorder roles to hide it.
- If roles appear **out of chronological order** on the source CV, don't just copy the
  order — file them by real date and confirm the sequence with the user.
- Prefer the plainly-honest version of a gap over an inferred one. If you don't know, ask.

This is a *sensitivity baked into the flow*, not a separate step — it fires wherever dates
are involved.

---

## The ordered steps

Each step below is a stub: **purpose · inputs · questions (one at a time) · outputs ·
done-criteria**. The *deep* logic for each is fleshed out in its own iteration/step doc
(linked); until that doc exists, follow the stub here.

> **Ordering note.** The **git-save preference (Step 1) comes first on purpose** so every
> commit made during the *rest* of onboarding already respects the user's choice
> (auto-commit-and-push vs manual, always confirm-before-push). The public README lists
> saving-your-work later in its feature summary; the *execution order* here is authoritative.

### Step 1 — Git-save preference *(do this first)*
- **Purpose:** decide how the agent saves work to git for the whole rest of onboarding and
  beyond.
- **Inputs:** none (a conversation).
- **Questions (one at a time):**
  1. "Should I **auto-commit and push** your changes as we go (recommended — nothing gets
     lost), or only commit **when you explicitly ask**?" — explain the default is **auto**,
     and that in *both* modes I always show a plain-English "here's what I'm about to save"
     summary and wait for your OK before any commit/push.
  2. Only if needed: "Is there a **git remote** set up yet? If not, I'll commit locally
     until you add one."
- **Outputs:** write the chosen mode + remote situation into **`profile/preferences.md`**
  (the *Current settings* table — the single home for durable values). `CLAUDE.md` §4 holds
  the git-save *rule* and reads the mode from there; you don't edit `CLAUDE.md` for this.
- **Done when:** `profile/preferences.md` records auto vs manual and the remote situation; the
  user confirmed.
- **Deep logic:** iteration I14.

### Step 2 — CV intake & template reconciliation
- **Purpose:** get the user's current CV and negotiate the CV *structure* that fits their
  title/level/discipline.
- **Inputs:** the user's current CV (pasted text, a file, or a PDF path).
- **Questions (one at a time):** ask for the CV first; then, based on what you parse, ask
  targeted structure questions (e.g. IC vs manager sections, "Portfolio" for designers,
  "Leadership Focus" for EMs). Confirm level and discipline.
- **Outputs:** a confirmed target CV structure recorded for later steps; the parsed CV held
  for Step 4.
- **Done when:** the CV is parsed and the target structure is confirmed with the user.
- **Deep logic:** [`steps/step-02-cv-intake.md`](steps/step-02-cv-intake.md) (iteration I05).

### Step 3 — CV style choice (Blue vs extract-from-your-CV)
- **Purpose:** pick the PDF look.
- **Inputs:** the CV from Step 2 (if extraction is chosen).
- **Questions (one at a time):** "Keep the built-in **Blue** theme, or should I **extract
  the style from your own CV** (fonts, colors, spacing) so PDFs match it?"
- **Outputs:** the decision recorded; if extraction, `styles/cv.css` is rewritten to match
  (default stays Blue otherwise).
- **Done when:** the choice is recorded and `styles/cv.css` reflects it.
- **Deep logic:** [`steps/step-03-style-choice.md`](steps/step-03-style-choice.md) (iteration I06).

### Step 4 — Populate `profile/` from the CV
- **Purpose:** route every fact from the CV into the right `profile/` file.
- **Inputs:** the parsed CV (Step 2).
- **Questions (one at a time):** clarifications only — quantify-or-ask on vague impact
  ("improved performance → by how much?"), fill each role's "How success was measured",
  resolve gaps/ordering (see career-gap sensitivity above). Alias any third-party names.
- **Outputs:** populated `profile/` (`basics`, `summary`, one file per role in
  `work-experience/`, `projects/`, `skills`, `education`, `certifications`); `TODO(user)`
  markers for every gap.
- **Done when:** `profile/` reflects the CV and open gaps are surfaced as `TODO(user)`.
- **Deep logic:** [`steps/step-04-populate-profile.md`](steps/step-04-populate-profile.md) (iteration I07).

### Step 5 — Email access decision *(optional)*
- **Purpose:** decide whether the agent may read the user's job-search email to track
  application replies, and via which tool.
- **Inputs:** none (a decision).
- **Questions (one at a time):** "Do you want me to be able to read your job-search email to
  track replies? If yes, which tool/connector?" — if no, record the decline. **If yes, test
  that email access actually works** (a minimal read-only probe) and record the honest result.
- **Outputs:** the yes/no + method + access-test result written to a durable committed file
  (`profile/preferences.md`) so future sessions don't re-ask.
- **Done when:** the decision (either way) is recorded in a committed file; if yes, the access
  test result is recorded too.
- **Deep logic:** [`steps/step-05-email-access.md`](steps/step-05-email-access.md) (iteration I08).

### Step 6 — LinkedIn export ingest
- **Purpose:** reconcile a LinkedIn export into `profile/` to fill gaps and correct dates.
- **Inputs:** the user's LinkedIn data export.
- **Questions (one at a time):** guide the export first; then ask about any **conflicts**
  between CV and LinkedIn one at a time — never guess which is right.
- **Outputs:** `profile/` updated (roles/projects added, dates corrected); conflicts
  resolved with the user or flagged as `TODO(user)`.
- **Done when:** the export is reconciled and conflicts are handled. (Deferrable — record
  and tick if the user skips.)
- **Deep logic:** [`steps/step-06-linkedin-ingest.md`](steps/step-06-linkedin-ingest.md) (iteration I09).

### Step 7 — Company-fit interview
- **Purpose:** capture what the user wants from an employer.
- **Inputs:** none (a targeted interview).
- **Questions (one at a time):** walk a focused bank — culture must-haves, ways of working,
  comp frame, deal-breakers — one question per turn; never one big open prompt.
- **Outputs:** `profile/company-fit.md`.
- **Done when:** `company-fit.md` captures must-haves and deal-breakers.
- **Deep logic:** [`steps/step-07-company-fit.md`](steps/step-07-company-fit.md) (iteration I10).

### Step 8 — Generate the interview question set
- **Purpose:** produce a **complete**, role/level-aware candidate question list (IC critique
  vs staff system design vs EM/head leadership+behavioral) — the seed bank is a floor, not a
  ceiling.
- **Inputs:** discipline/level from Steps 2 & 7.
- **Questions (one at a time):** confirm the user's target discipline/level for the generated
  set if not already clear.
- **Outputs:** the generated question list saved under `interviews/` (feeds Step 9).
- **Done when:** a complete generated question set exists for the user's discipline/level.
- **Deep logic:** iteration I11 (framework) → used here.

### Step 9 — Story elicitation loop *(iterative)*
- **Purpose:** build a baseline STAR story bank mapped to interview questions.
- **Inputs:** the question set from Step 8; the user's real history in `profile/`.
- **Questions (one at a time, across multiple re-prompts):** ask the user about one
  question/answer at a time; after each, write/update a STAR story and map it.
- **Outputs:** STAR stories in `profile/stories/`; mappings in
  `interviews/hiring-manager/answers.md`; progress tracked so it resumes.
- **Done when:** a baseline set of stories exists and is mapped (the loop can continue later).
- **Deep logic:** [`steps/step-09-story-elicitation.md`](steps/step-09-story-elicitation.md) (iteration I12).

### Step 10 — House-rules confirmation
- **Purpose:** let the user keep/drop/customize the operating rules for their own clone.
- **Inputs:** the rules in `CLAUDE.md` and the various rule files.
- **Questions (one rule cluster at a time):** e.g. banned phrases, date-format convention,
  privacy strictness — keep, drop, or customize each.
- **Outputs:** customizations written back into the clone's `CLAUDE.md`.
- **Done when:** each rule cluster has a keep/drop/customize decision recorded in `CLAUDE.md`.
- **Deep logic:** iteration I13.

### Step 11 — Completion ("you're ready")
- **Purpose:** confirm onboarding is complete and hand the user the ready-to-use prompt menu.
- **Inputs:** all prior boxes checked.
- **Outputs:** a "you're ready" message with the prompt menu (status / JD match / new
  application / make a CV / new story / interview prep / email update / debrief).
- **Done when:** every step above is checked; this completion state is shown.
- **Deep logic:** iteration I15.

---

## Quick reference

| Step | What | Iteration |
|---|---|---|
| 1 | Git-save preference *(first)* | I14 |
| 2 | CV intake & template reconciliation | I05 |
| 3 | CV style choice (Blue vs extract) | I06 |
| 4 | Populate `profile/` from CV | I07 |
| 5 | Email access decision *(optional)* | I08 |
| 6 | LinkedIn export ingest | I09 |
| 7 | Company-fit interview | I10 |
| 8 | Generate interview question set | I11 |
| 9 | Story elicitation loop *(iterative)* | I12 |
| 10 | House-rules confirmation | I13 |
| 11 | Completion / prompt menu | I15 |

Onboarding is complete when every box in [`CHECKLIST.md`](CHECKLIST.md) is ticked.
