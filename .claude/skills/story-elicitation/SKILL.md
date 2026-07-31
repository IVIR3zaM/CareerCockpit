---
name: story-elicitation
description: Capture and strengthen a STAR story in profile/stories/. Whenever the user tells a story or mentions an experience worth keeping, ask targeted questions to make it solid — full Situation-Task-Action-Result, quantified — and always draw out the learning (what they'd do differently), even when it went wrong. Use whenever a story comes up or the user wants to add or refine one, and during onboarding's story-elicitation step.
---

# Capture a story well

A CV lists *what* the user did; a **story** proves it. This skill is the structured way to
turn any experience the user brings up into a solid, reusable STAR story in
`profile/stories/`, so interview prep pulls from confirmed evidence instead of improvising.

Trigger: the user tells a story, mentions an experience worth keeping, or asks to add or
refine one. No special command needed — when a story surfaces, make it solid.

> **Never fabricate (Golden Rule #2).** Every Situation, Action, Result, and Learning must be
> something the user actually did or actually concluded. Don't invent a metric, merge two
> events into a cleaner fictional one, or supply a learning the user didn't confirm. Mark a
> missing number `TODO(user)` and move on — a polished lie fails the moment it's probed.

---

## How to make a story solid

Do this in a focused exchange — **ask the gap-filling questions as one batched list**
(`CLAUDE.md` §2.0 house style), not one drip per turn.

> **During onboarding (Step 9)** the rhythm is different and wins: **one story per
> re-prompt**, resumable via the ledger in `profile/stories/_index.md`. See
> `onboarding/steps/step-09-story-elicitation.md` for that loop; the craft below is the same.

1. **Shape it into STAR.** From what the user said, lay out:
   - **Situation** — the context, stakes, and constraints (why it was hard).
   - **Task** — what was *theirs* to own.
   - **Action** — what **they specifically** did. If they were leading, separate the
     leadership calls ("I reframed the goal / coached / escalated") from hands-on work.
   - **Result** — the outcome, **with a number** where one exists.
   Ask targeted questions only for the parts that are genuinely thin — batched together.

2. **Quantify — ask once, then TODO.** If the impact is vague, ask "by how much / measured
   how?" **once.** If it's still unknown, write `TODO(user)`; never invent a figure.

3. **Draw out the learning — this is the point of the skill, not an afterthought.** Every
   story gets a **Learning**: what the user would do differently and what it taught them.
   This matters **even when the story went well, and especially when it went wrong.**
   - If the story is a failure or a mistake, don't just record the damage — the story is only
     complete once it ends on the learning.
   - If the user tells it as an unqualified win, still ask: *"knowing what you know now, what
     would you do differently?"*
   - You may **offer your own read** of what could have been done better — but as a
     **proposal**, not a fact. Put it to the user, and only **after they confirm** (in their
     own words) does it go into the story's `## Learning` section. Never write a learning the
     user hasn't endorsed.

4. **Write it** to `profile/stories/<slug>.md` from `profile/stories/_TEMPLATE.md`:
   - **Slug** = kebab-case, theme/outcome-based (`stalled-migration-turnaround`,
     `missed-launch-estimate`) — **never** a person, company-internal, or product name.
   - Frontmatter: `title`, `themes` (reuse the theme vocabulary at the bottom of `_index.md`),
     `source` (the role/project), `period` (`YYYY-MM`), `confirmed: false` until sign-off.
   - Fill Situation / Task / Action / Result / **Learning** / "Answers well" (the questions
     this story is a strong answer to). Write even if partial — a `TODO(user)` line still
     saves.

5. **Map it into `answers.md`.** For each interview question this story answers, add or
   update its block in `interviews/hiring-manager/answers.md`: set **Source story** to the
   `profile/stories/*.md` file (keep `Q#` ids aligned with `question-bank.md`), and draft the
   STAR answer **from the story** (cite the facts, don't re-derive them). Reuse one strong
   story across related questions rather than padding thin ones.

6. **Confirm, then record.** Read the story back in **one compact summary** — Situation…,
   your Action…, Result…, and the Learning you agreed — and ask "did I get it right, and
   what's the number on the result?" On sign-off, set `confirmed: true` and add the story's
   row to `_index.md`.

---

## Privacy on write (hard — Golden Rule #9)

Golden Rule #9 is always in context; the parts that bite *at story-writing time*:

- **No third-party names — ever.** Substitute a **role-based alias** (`my report`, `a peer
  lead`, `the skip-level`, `a Staff engineer`, `the customer`) *before* writing — in the
  body, the frontmatter, the **filename/slug**, and any `[[links]]`.
- **No sensitive personal attributes** of a third party — record only the neutral, tellable
  version.
- **No employer-confidential specifics** — keep impact generic or ratioed ("cut p99 ~40%",
  "a low-seven-figure renewal"), never internal numbers verbatim. When unsure, ask first.
- The **banned outward-facing phrasing** rule (`CLAUDE.md` §4) bites when a story later feeds
  an interview *answer*, not at intake — capture the real experience plainly here.

## Outputs
- `profile/stories/<slug>.md` — one STAR story with a confirmed **Learning**; third parties
  aliased; unknown metrics `TODO(user)`; `confirmed: true` once the user signs off.
- `profile/stories/_index.md` — the story's row in the table (and, during onboarding, the
  elicitation ledger).
- `interviews/hiring-manager/answers.md` — the story mapped to the question(s) it answers.
