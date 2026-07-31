# Step 8 — Generate the interview question set

**Purpose:** produce a **complete, discipline/level-aware** candidate question list for the
user, so Step 9 elicits stories against the questions they'll actually face — not a generic
list. The shipped `interviews/hiring-manager/question-bank.md` is a **seed, not the ceiling**.

**This step delegates to the `interview-question-generator` skill** — invoke it and follow its
generation procedure. The skill is the single home for the theme blocks and the
people-leadership gate; this doc only adds what onboarding needs.

**Inputs:** **Discipline / level** and **Manages people** from `profile/preferences.md` (Step
2), and `profile/` from Step 4.

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
5. **Respect the people-leadership gate.** If the user doesn't manage people, the
   ⟨manages-people⟩ blocks are skipped entirely — no hiring/firing/PIP questions.

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
