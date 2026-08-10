# Step 8 — Generate the interview question set

**Purpose:** produce a **complete, discipline/level-aware** candidate question list for the
user, so Step 9 elicits stories against the questions they'll actually face — not a generic
list. The shipped `interviews/hiring-manager/question-bank.md` is a **seed, not the ceiling**.

**This step delegates to the `interview-question-generator` skill** — invoke it and follow its
generation procedure. The skill is the single home for the theme blocks and the
people-leadership gate; this doc only adds what onboarding needs.

**Inputs:** **Discipline / level**, **Manages people** and the **target-role filter** from
`profile/preferences.md` (Step 2), the *Target roles* line in `profile/basics.md`, and
`profile/` from Step 4.

## What onboarding adds to the generation pass

1. **Confirm the coordinates first (one question, only if unclear).** The skill needs
   discipline, level, and round type. Onboarding has no specific round yet, so generate for
   the **round types the user expects to face** in their search — ask once:
   > "For the question set: which rounds do you expect — recruiter screen, hiring-manager /
   > behavioral, a technical round (system design, coding, design critique, product case), and
   > anything else your target companies run?"
2. **Generate broad, not narrow.** With no specific company in play, this is the *baseline*
   bank — take the full breadth for their coordinates rather than cutting to a time-boxed
   subset (that cutting happens later, per application, in `interview-prep`).
3. **Append the reusable questions** to `interviews/hiring-manager/question-bank.md` with
   their theme tags, so the bank compounds from here on.
4. **Mark evidence gaps, don't fill them.** Map each question to a `profile/` story where one
   exists; everything unmapped becomes the **input queue for Step 9**. Do not elicit stories
   here — that's the next step, and it runs one story per re-prompt.
5. **Respect the people-leadership gate — and read it off the TARGET roles.** The gate keys on
   the roles the user is **pursuing**, not the one they hold (`CLAUDE.md` preamble). There's no
   `application.md` yet, so the target comes from *Target roles* in `profile/basics.md` and the
   target-role filter in `preferences.md` — if those are unset or ambiguous, **ask once**:
   > "Are you targeting management/lead roles, individual-contributor roles, or both?"
   - Targeting **management/lead roles** → generate the ⟨manages-people⟩ blocks **in full**,
     even if *Manages people* = no. This is exactly the user who needs them most, and skipping
     them here means Step 9 never elicits a single leadership story.
   - Targeting **IC roles only** → skip those blocks; no hiring/firing/PIP questions.
   - **Both** → generate both sets and say which questions belong to which track.
   Where the user has no management experience to answer a generated question, that is an
   **evidence gap for Step 9**, not a reason to drop the question (step 4 above).

## Record

- `interviews/hiring-manager/question-bank.md` → the generated reusable questions, tagged.
- `profile/decisions.md` → `## Question set (Step 8)`: date, the coordinates used, how many
  questions were generated, and how many are still unmapped to a story (the Step 9 backlog).

## Done when

- [ ] A **complete** question set exists for the user's discipline/level and expected rounds —
      generated, not just the shipped seed bank.
- [ ] People-leadership questions are included **only if** the user manages people.
- [ ] Reusable questions are appended to `question-bank.md` with theme tags.
- [ ] Each question is mapped to a `profile/` story or marked as an evidence gap for Step 9.

Tick Step 8 in [`../CHECKLIST.md`](../CHECKLIST.md) noting the count and the biggest uncovered
themes → next is **Step 9 (story elicitation loop)**.
