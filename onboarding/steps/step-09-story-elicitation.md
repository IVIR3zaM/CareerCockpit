# Step 9 — Story elicitation loop *(iterative)*

**Purpose:** build a **baseline STAR story bank** in `profile/stories/`, mapped to the
questions they answer in `interviews/hiring-manager/answers.md`, so later prep pulls from
confirmed evidence instead of improvising.

**The craft of capturing a story lives in the `story-elicitation` skill** — invoke it for each
story (STAR shaping, quantify-or-TODO, drawing out the **learning**, the write format, the
`answers.md` mapping). This doc carries only what makes it an *onboarding loop*: how to pick
the next story, how to resume, and when the box gets ticked.

**Inputs:** the question set from Step 8 (the menu of what to elicit stories *for*),
`profile/` from Step 4 (many stories are already latent there — a turnaround, a launch, a hard
call), and the existing stories + progress ledger.

> **This is the one step that is explicitly iterative and multi-session.** You do **not**
> finish it in one turn: one story per re-prompt, then stop. The box ticks at a **baseline**;
> the loop keeps running later during real interview prep.

## The loop

### 0. Find your place (resume, don't restart)
Read the `Elicitation progress` block at the top of `profile/stories/_index.md` plus the
existing story files. Determine which themes have a confirmed story and which high-priority
themes from Step 8 are still **uncovered**. Pick the **single most valuable uncovered theme**
for this turn — value = how likely that question is in their rounds × how load-bearing the
story is (conflict, failure, and a signature win are near-universal).

### 1. Ask about ONE experience (anchored, not open-ended)
Never "tell me your best stories." Anchor to a specific question and, where possible, a real
experience you can already see in `profile/`:

> "Behavioral rounds almost always ask about **conflict**. I can see you led the `<role>`
> migration — was there a disagreement there, or another time you clashed with a peer or
> leader and had to work through it? Walk me through what happened."

No hook in `profile/`? Ask cold but still narrow: *"Tell me about a time a project of yours
failed or missed — what happened and what did you do about it?"*

**One question per turn.** Follow-ups that fill STAR gaps are still the same story, not a new
question.

### 2. Run the `story-elicitation` skill on that experience
Shape STAR → quantify-or-TODO → **draw out the learning** (proposed by you, but only recorded
after the user confirms it in their own words) → write `profile/stories/<slug>.md` → map into
`answers.md`. The skill has the full procedure and the write format.

### 3. Update the ledger, confirm, and **stop**
- Add the story's row to the `_index.md` table.
- Update the progress ledger:

```markdown
<!-- Elicitation progress (Step 9 — story loop). Update after each story. -->
**Baseline target:** {N} stories across the core themes below.
**Covered:** conflict ✅ · failure ✅ · turnaround 🟡(unconfirmed) …
**Next up:** disagree-with-leadership, then a signature win.
**Status:** in-progress — {k}/{N} confirmed.
```

- Read the story back in one compact summary and get sign-off (`confirmed: true`).
- **Stop.** Say how many stories the baseline now has and which theme is next, and ask the
  user to re-prompt with **"continue onboarding"**. Do **not** roll into a second story.

## What counts as the baseline

A small, high-coverage set — not every possible story:

- **A signature win** (the achievement they'd lead with).
- **A conflict** (peer or cross-functional) and how it resolved.
- **A failure / miss** and the learning from it.
- **Ambiguity / prioritization** — deciding with incomplete information.
- **Cross-functional influence** — getting something done without authority over the people.

**If the user manages people** (`profile/preferences.md` → *Manages people*), add: **difficult
feedback / a low-performer turnaround**, **hiring or scaling a team**, **mentoring / growing
someone**, and **disagreeing with leadership**. **If they don't manage people, skip these and
don't ask for them** — lean on technical-judgment, ownership, and craft stories instead (a
hard design/architecture call, a quality bar they raised). Never assume a management frame.

Baseline is reached at **one confirmed story per applicable core theme** — roughly 4–6 for an
IC, 6–9 if they manage people. More can always be added later.

## Record

`profile/decisions.md` → `## Story elicitation (Step 9)`: date, `{k}` confirmed stories across
which themes, and what's still uncovered. If the user wants to stop early, record `paused at
{k} stories` and leave the box unchecked — this is the one step where "paused" is legitimate,
because the loop is designed to continue during later prep. Tick only at a genuine baseline
(or when the user explicitly accepts a smaller set as theirs).

## Done when

- [ ] The loop ran **one targeted question at a time, one story per re-prompt** — never a
      single "give me all your stories" prompt, never two stories in one turn.
- [ ] A **baseline** set exists (one confirmed story per applicable core theme;
      people-leadership themes **only if** they manage people), each in its own file.
- [ ] Every story is **mapped** to the question(s) it answers in `answers.md`, citing the story
      file rather than re-deriving facts.
- [ ] Third parties aliased (contents, filenames, slugs, links); no sensitive attributes or
      employer confidentials; unknown metrics are `TODO(user)`, not invented.
- [ ] The `Elicitation progress` ledger reflects coverage and the state is in `decisions.md`.

Tick Step 9 in [`../CHECKLIST.md`](../CHECKLIST.md) noting how many stories the baseline holds
(or "paused at k") → next is **Step 10 (house-rules confirmation)**.
