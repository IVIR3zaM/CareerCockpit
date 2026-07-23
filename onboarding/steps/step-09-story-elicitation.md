# Step 9 — Story elicitation loop (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 9); this is the full logic the agent follows. Obey the global onboarding
> invariants: **one step per re-prompt · one targeted question at a time · state in
> [`../CHECKLIST.md`](../CHECKLIST.md)**. This step builds a **baseline STAR story bank** in
> [`../../profile/stories/`](../../profile/stories/) and maps each story to the interview
> questions it answers in
> [`../../interviews/hiring-manager/answers.md`](../../interviews/hiring-manager/answers.md).

---

## Purpose

A CV lists *what* the user did; a **story** proves it. Behavioral / competency rounds are
won with concrete, quantified STAR anecdotes ("tell me about a time you…"), and the same
stories give CV bullets their credibility. This step turns the user's real history into a
reusable **story bank** so later interview prep pulls from confirmed evidence instead of
improvising.

This is the **one onboarding step that is explicitly iterative and multi-session.** You do
**not** finish it in a single turn. You ask about **one** question/experience at a time,
write the story it produces, and stop — the same one-step-per-re-prompt rhythm as the rest
of onboarding, just looped: each re-prompt advances the bank by roughly one story. The box
gets ticked when a **baseline** set exists; the loop can keep running later, outside
onboarding, during real interview prep (CLAUDE.md §2.5).

> **Golden Rule #2: never fabricate.** Every Situation, Action, and Result must be something
> the user actually did. Don't invent a metric to make a story land, don't merge two real
> events into a cleaner fictional one, and don't supply an outcome the user didn't state —
> mark a missing number `TODO(user)` and move on. A polished lie fails the interview the
> moment it's probed.

---

## Inputs

- **The generated question set from Step 8** (`interviews/question-generator.md` output +
  `interviews/hiring-manager/question-bank.md`). This is the menu of what to elicit stories
  *for* — prioritized to the user's discipline and level.
- **The user's real history in `profile/`** (`work-experience/`, `projects/`), populated in
  Step 4. Many stories are already latent there (a turnaround, a launch, a hard call); read
  them so you can *prompt from* a real experience rather than asking cold.
- **Existing stories** in `profile/stories/` and the progress ledger (below) — so a new
  session resumes instead of restarting.

If Step 8 hasn't run yet, you can still start from the seed `question-bank.md`, but prefer to
have the generated set so the elicited stories match the user's actual round types.

---

## How the loop works (resumable, one story per re-prompt)

### 0. On entry, find your place (resume, don't restart)
Read the **progress ledger** at the top of `profile/stories/_index.md` (the
`Elicitation progress` block — see below) plus the existing story files. Determine:
- which **themes** already have a confirmed story, and
- which high-priority themes from Step 8 are still **uncovered**.

Pick the **next single most valuable uncovered theme** to work this turn. Value = how likely
that question is in the user's rounds (Step 8 priority) × how load-bearing the story is
(conflict, failure, and a signature win are near-universal).

### 1. Ask about ONE experience (targeted, not open-ended)
Never say "tell me your best stories." Anchor to a **specific question and, where possible, a
specific real experience** you already see in `profile/`:

> "Behavioral rounds almost always ask about **conflict**. I can see you led the <role>
> migration — was there a disagreement there, or another time you clashed with a peer or
> leader and had to work through it? Walk me through what happened."

If `profile/` gives no hook for the theme, ask cold but still narrow:

> "Tell me about a time a project of yours **failed or missed** — what happened and what did
> you do about it?"

Ask **one question per turn.** If the first answer is thin, follow up to fill the STAR gaps
(see next) — that's still the same story, not a new question.

### 2. Draw out full STAR, then quantify
Shape the user's telling into **Situation · Task · Action · Result**. Probe for whatever's
missing, one prompt at a time:
- **Situation** — the stakes and constraints (why it was hard).
- **Task** — what was *theirs* to own.
- **Action** — what **they specifically** did. If they were leading, separate leadership
  actions ("I reframed the goal / coached / escalated") from hands-on work.
- **Result** — the outcome **with a number** where one exists ("cut p99 ~40%", "shipped 3
  weeks early", "retention held"), **plus what they learned / would do differently.**
  Apply **quantify-or-ask**: if the impact is vague, ask "by how much / measured how?" once;
  if still unknown, write `TODO(user)` rather than inventing a figure.

A great failure/growth story ends on the *learning*, not just the damage — capture it.

### 3. Write the story to `profile/stories/<slug>.md`
Create one file per story from
[`../../profile/stories/_TEMPLATE.md`](../../profile/stories/_TEMPLATE.md):
- **Slug** = kebab-case, theme-or-outcome based (`stalled-migration-turnaround`,
  `missed-launch-estimate`) — **never** a person, company, or product name (privacy §below).
- Fill frontmatter: `title`, `themes` (from the theme vocabulary in `_index.md`), `source`
  (the role/project), `period` (`YYYY-MM`), and `confirmed: false` until the user signs off.
- Fill the four STAR sections and the **"Answers well"** list (the questions this story is a
  strong answer to — this is the map into `answers.md`).
- Write straight away, even if partial — the file *is* the progress marker. A story with a
  `TODO(user)` result is still saved; you're not blocked waiting for the number.

### 4. Map the story into `answers.md`
For each interview question the story answers, add/update its block in
[`../../interviews/hiring-manager/answers.md`](../../interviews/hiring-manager/answers.md):
- Set **Source story** to the `profile/stories/*.md` file (keep the `Q#` ids aligned with
  `question-bank.md`).
- Draft the STAR answer *from the story* (don't re-derive facts — cite them). Status starts
  `drafted`; it becomes `refined`/`rehearsed` during real mocks later.
- One real, numbers-backed STAR per question — not a philosophy. Reuse one strong story
  across several related questions rather than padding thin ones.

### 5. Update the index + progress ledger, then confirm and stop
- Add a row for the new story in the `_index.md` table (file · one-liner · themes ·
  confirmed).
- Update the **`Elicitation progress`** block (covered themes, what's next).
- Read the story back to the user in one compact summary (**the one place batching is
  allowed**): "Here's the story as I have it — Situation…, your Action…, Result… — did I get
  it right, and what's the number on the result?" On sign-off set `confirmed: true` (✅).
- **Stop.** Tell the user how many stories the baseline now has and which theme is next, and
  ask them to re-prompt with **"continue onboarding"** to elicit the next one. Do **not**
  roll into a second story in the same turn.

---

## The progress ledger (how the loop resumes)

Keep a tiny state block at the top of `profile/stories/_index.md` so any session — or a
crash mid-loop — resumes from the right place without agent memory (Golden Rule #8):

```markdown
<!-- Elicitation progress (Step 9 — story loop). Update after each story. -->
**Baseline target:** {N} stories across the core themes below.
**Covered:** conflict ✅ · failure ✅ · turnaround 🟡(unconfirmed) …
**Next up:** disagree-with-leadership, then a signature win.
**Status:** in-progress — {k}/{N} confirmed.
```

The **baseline** is a small, high-coverage set — not every possible story. A sensible floor
for most disciplines/levels:

- **A signature win** (the achievement they'd lead with).
- **A conflict** (peer or cross-functional) and how it resolved.
- **A failure / miss** and the learning from it.
- **Ambiguity / prioritization** — deciding with incomplete information.
- **Cross-functional influence** — getting something done without authority over the people.

**If the user manages people (gate — check Step 2 / `decisions.md`),** add the
people-leadership themes the manager question bank probes: **difficult feedback / a
low-performer turnaround**, **hiring / scaling a team**, **mentoring / growing someone**, and
**disagreeing with leadership**. If the user is an IC who doesn't manage people, **skip these
and don't ask for them** — lean instead on technical-judgment, ownership, and craft stories
(a hard design/architecture call, a quality bar they raised on their own work). Never assume
a management frame.

Baseline is reached when there's **at least one confirmed story for each applicable core
theme** above (roughly 4–6 stories for an IC, 6–9 if they manage people). More can always be
added later — this step ticks at the baseline, it doesn't demand exhaustiveness.

---

## Privacy & house rules on write (hard rules)

- **No third-party names — ever (Golden Rule #9 / CLAUDE.md §0.9).** The moment the user
  names a colleague, report, manager, interviewer, or customer, substitute a **role-based
  alias** (`my report`, `a peer lead`, `the skip-level`, `a Staff engineer`, `the customer`)
  *before* writing — in the story body, the frontmatter, the **filename/slug**, and any
  `[[links]]`. Distinguish two people by role, never by name. (The user's own name is fine.)
- **No sensitive personal attributes of a third party** (health, disability, religion,
  ethnicity, sexuality, age, family/marital status). If such a detail is load-bearing for a
  story, record only the neutral, tellable version ("had some availability constraints we
  accommodated"), never the underlying condition.
- **No employer-confidential specifics.** Describe *what the user did and learned* without
  exposing unreleased products, internal architecture/security detail, real
  revenue/contract figures they weren't cleared to share, or customer names. Keep impact
  **generic or ratioed** ("cut p99 ~40%", "a low-seven-figure renewal") rather than
  reproducing internal numbers verbatim. When unsure whether a detail is shareable, **ask the
  user before writing it.**
- **Banned outward-facing phrasing (CLAUDE.md §4).** Capture the real experience plainly
  here; the trait-claim-as-behaviour wording rule ("credit is shared", "blameless",
  "team-first" instead of self-describing adjectives, and the specific banned phrase) bites
  when a story later feeds an interview *answer*, not at intake.

---

## What to write to `onboarding/decisions.md`

Append a short record so future sessions know the loop's baseline state:

```markdown
## Story elicitation
- **Decision:** baseline in progress / baseline reached — recorded {YYYY-MM-DD}
- **Result:** {k} confirmed stories across {themes}; ledger in `profile/stories/_index.md`.
- **Open:** {TODO(user): themes still uncovered / results still needing a number | none}
```

If the user wants to stop before the baseline, record `Decision: paused at {k} stories` and
leave the box unchecked with a note — this is the one step where "paused" is legitimate,
because the loop is designed to continue during later interview prep. Only tick the box once
the baseline is genuinely reached (or the user explicitly accepts a smaller set as their
baseline).

---

## Outputs

- **`profile/stories/<slug>.md`** — one STAR story per file; third parties aliased; missing
  numbers as `TODO(user)`; `confirmed: true` once the user signs off.
- **`profile/stories/_index.md`** — a row per story **and** the `Elicitation progress`
  ledger, kept current.
- **`interviews/hiring-manager/answers.md`** — each story mapped to the question(s) it
  answers, with a drafted STAR answer citing the story file.
- **`onboarding/decisions.md`** — a short **Story elicitation** record future sessions read.

---

## Done-criteria (tick the box when all true)

- [ ] The loop ran **one targeted question at a time, one story per re-prompt** — never a
      single "give me all your stories" prompt and never two stories batched in one turn.
- [ ] A **baseline** set of stories exists (at least one confirmed per applicable core theme;
      people-leadership themes included **only if** the user manages people), each in its own
      `profile/stories/*.md` file.
- [ ] Every story is **mapped** to the question(s) it answers in
      `interviews/hiring-manager/answers.md`, citing the story file (facts not re-derived).
- [ ] Third-party names are aliased (contents, filenames, slugs, links); no sensitive
      attributes and no employer-confidential specifics were written; unknown metrics are
      `TODO(user)`, not invented.
- [ ] The `Elicitation progress` ledger in `_index.md` reflects coverage, and the state is
      recorded in `onboarding/decisions.md`.

Then tick Step 9 in [`../CHECKLIST.md`](../CHECKLIST.md), note in its cell how many stories
the baseline holds (or "paused at k"), and tell the user to re-prompt with **"continue
onboarding"** — next is **Step 10 (house-rules confirmation)**. The story loop can keep
running later during real interview prep (CLAUDE.md §2.5) to deepen the bank.
