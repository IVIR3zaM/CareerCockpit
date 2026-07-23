# Step 4 — Populate `profile/` from the CV (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 4); this is the full logic the agent follows. Obey the global onboarding
> invariants: **one step per re-prompt · one targeted question at a time · state in
> [`../CHECKLIST.md`](../CHECKLIST.md)**. This step turns the CV that Step 2 parsed into a
> fully-routed, source-of-truth `profile/`. It is the moment the cockpit stops being empty.

---

## Purpose

Route **every fact** from the user's CV into the right `profile/` file, per the router table
in [`../../CLAUDE.md`](../../CLAUDE.md) §2.4, so that from now on every tailored CV, cover
letter, and interview answer can trace back to `profile/` (Golden Rule #1: **`profile/` is the
single source of truth**). Along the way, enforce **quantify-or-ask**, the **privacy/GDPR
rule** (alias every third-party name; strip employer-confidential specifics), and the
**career-gap & chronology** sensitivity. Everything you cannot verify becomes a
`TODO(user)` — never a guess (Golden Rule #2: **never fabricate**).

This step **writes real user content into `profile/`**. That content is the user's own
runtime data in their own clone — it never ships back to the product. This step doc and the
`profile/` *skeletons* are the generic parts; the facts the user adds are theirs.

---

## Inputs

- The **parsed CV** from Step 2 — the raw text stashed at `onboarding/cv-source.md` (user's
  clone only). If that stash is missing (e.g. a fresh session), re-read it from wherever
  Step 2 recorded it, or ask the user for the CV again (one question).
- The **confirmed target CV structure** recorded in `profile/preferences.md` (Step 2) —
  discipline, level/track, whether they manage people, and the section set. Use it to decide
  which optional `profile/` sections apply (e.g. skip `Leadership & people` for a pure IC).
- If the user had **no CV** (Step 2 no-CV fallback), build `profile/` from a short interview
  instead — same routing, but every field starts as a targeted question. LinkedIn (Step 6)
  will fill more later.

---

## The router — where each CV fact goes

This is [`../../CLAUDE.md`](../../CLAUDE.md) §2.4 applied to a CV import. Walk the CV
top-to-bottom and route:

| CV element | Route to | Skeleton |
|---|---|---|
| Name, contact, links, headline, location, work authorization, languages | `profile/basics.md` frontmatter | [`basics.md`](../../profile/basics.md) |
| Professional summary / "about me" paragraph | `profile/summary.md` | [`summary.md`](../../profile/summary.md) |
| Elevator pitch / one-liner (derive if implicit) | `profile/basics.md` → *Elevator pitch* | — |
| Each employment entry | **one file per role** in `profile/work-experience/` (copy `_TEMPLATE.md`) | [`_TEMPLATE.md`](../../profile/work-experience/_TEMPLATE.md) |
| A named initiative worth its own page (launch, migration, OSS, portfolio piece) | new file in `profile/projects/` (copy `_TEMPLATE.md`) | [`_TEMPLATE.md`](../../profile/projects/_TEMPLATE.md) |
| Skills / tools / languages-of-craft | `profile/skills.md` (grouped) | [`skills.md`](../../profile/skills.md) |
| Degrees | `profile/education.md` | [`education.md`](../../profile/education.md) |
| Certifications, courses, workshops | `profile/certifications.md` | [`certifications.md`](../../profile/certifications.md) |
| How a team/company was run (OKRs, KPIs, rituals) — if the CV hints at it | that role's *How success was measured* section | (work-experience template) |
| A behavioral anecdote the CV implies (a turnaround, a conflict, a rescue) | a `TODO(user)` note — **do not fabricate a story**; real stories come in Step 9 | — |

One CV line often lands in **two** places (a role bullet **and** a skill, or a role **and** a
project). That is expected (Golden Rule #4: one fact, one home — but a fact may legitimately
be a bullet in one file and a data point in another).

> **Never source facts from a previous application's `cv.md`/cover letter** (CLAUDE.md §2.2).
> Here there are none yet — but the rule is why we build `profile/` as the clean origin.

---

## The flow: draft → gap-check → ask → confirm

### 1. Draft `profile/` from the CV (no questions yet)
Fill what the CV states plainly, into the right files:

- **`basics.md`** — name, headline, location, contact, links, languages, work mode/relocation
  if stated. Leave anything absent as `TODO(user)`. **Do not invent** an email, phone, or
  work-authorization status.
- **`summary.md`** — the CV's summary paragraph in the user's own voice; pull 3–5 focus-area
  bullets. If the user manages people, the focus bullets may include leadership focus; for an
  IC, use craft/technical focus (per the skeleton's own note).
- **One `work-experience/<company>-<role>.md` per role** — kebab-case filename, copied from
  the template. Fill frontmatter (company, title, level, location, work_mode, start/end,
  team_size **only if they managed people**, scope, tags) and the **Impact bullets** pool
  from the CV's bullets. Put architecture/craft lines under *Technical / craft*; put
  people/hiring/growth lines under *Leadership & people* **only for roles where they managed
  or mentored** (delete that section for pure-IC roles — don't leave an empty prompt).
- **`projects/`, `skills.md`, `education.md`, `certifications.md`** — as routed above.

Keep every unfilled field as `TODO(user): <what's missing>` so it surfaces later.

### 2. Enforce privacy **as you write** (not after)
The privacy/GDPR/confidentiality rule (CLAUDE.md §0.9) fires on write:

- **Third-party names → role-based aliases**, immediately, in contents *and* filenames/slugs
  (`my report`, `a peer PM`, `the Staff Engineer`, `the skip-level`). The user's own name is
  fine (it's their CV). If two people must be distinguished, use role/relationship, never
  names.
- **No sensitive personal attributes** of third parties (health, religion, ethnicity, age,
  family status, …). Keep only the neutral, tellable version if load-bearing.
- **Protect each employer's confidentiality** — no unreleased products/roadmaps, internal
  architecture/security specifics, real revenue/contract figures the user wasn't cleared to
  share, or customer names. Keep impact **generic or ratioed** ("cut p99 ~40%", "a
  low-seven-figure renewal"), not internal numbers verbatim. When unsure a detail is
  shareable, **ask** before writing it.

If the CV itself contains a third-party name or a confidential figure, alias/generalize it on
the way in — the CV text is the user's, but `profile/` must already be clean.

### 3. Career-gap & chronology check (mandatory)
Read the role dates **top to bottom** (see the *Career-gap & chronology sensitivity* block in
[`../ONBOARDING.md`](../ONBOARDING.md) and CLAUDE.md §2.2 / Golden Rule #3):

- **Every role stores its real dates.** Do **not** reorder roles by relevance and do **not**
  paper over a hole. `profile/` records true history; the reverse-chronological, gap-aware
  *presentation* is a CV concern, but the honest dates must live here first.
- If two roles leave a **date gap**, that's a question for step 4 below — flag it, don't
  silently fill it.
- If the CV lists roles **out of order**, file them by real date and confirm the sequence.

### 4. Ask the gaps — one targeted question at a time
Now, and only now, ask. **Never a wide-open "tell me everything."** Ask focused questions
sequentially, waiting for each answer. Priority order:

1. **Date gaps / ordering** — *"There's a gap between `<role X>` (ended YYYY-MM) and
   `<role Y>` (started YYYY-MM) — what were you doing then?"* Capture the honest answer (a
   break, study, caregiving, contracting, job search) in the adjacent role file or a short
   note; if the user defers, record `TODO(user): explain YYYY-MM–YYYY-MM gap`. Never guess.
2. **Quantify vague impact** — for any bullet like "improved performance" / "grew the team" /
   "increased revenue", ask *"by how much, and measured how?"* before writing a number
   (Golden Rule #2). If they don't know, keep the bullet qualitative and mark
   `TODO(user): quantify`.
3. **"How success was measured" per role** — the most-probed interview area (CLAUDE.md §2.3
   step 5). For each substantial role, ask what the company-wide goals, team/project metrics,
   and review cadence were. If there were **no** formal OKRs/KPIs (early startup, pre-PMF),
   record that honestly and how they steered instead — that framing *is* the interview
   answer. Leave `TODO(user)` where unknown.
4. **Missing basics** — only the ones that matter for applications and are absent (e.g. a
   portfolio/GitHub link for a designer/IC; work authorization if relevant). Don't
   interrogate for fields the user clearly left off on purpose.

Batch nothing except the final confirmation (below). If the list of gaps is long, it is fine
to surface them and let the user answer across **multiple re-prompts** — record what you have,
tick nothing yet, and continue next turn. (Deep clarification can span turns; the *step* isn't
done until the confirm passes, but you never block on getting every answer at once.)

### 5. Confirm (the one place batching is allowed)
Present a compact end-of-step summary — the batch the protocol permits:

> "Here's what I routed into `profile/` from your CV:
> **Basics** (name, headline, links) · **Summary** · **N roles** in `work-experience/`
> (most recent → oldest, dates continuous) · **M projects** · **Skills** (grouped) ·
> **Education** · **Certifications**.
> Still open as `TODO(user)`: `<the gap explanation>`, metrics for `<role>`, the number
> behind `<vague bullet>`. Anything wrong or to add before I move on?"

Fix on feedback. When `profile/` reflects the CV and the open items are honestly captured as
`TODO(user)`, the step is done — remaining TODOs do **not** block the tick (they're the
system working as designed; the agent surfaces them later, per CLAUDE.md §2.0).

---

## Outputs

- **`profile/basics.md`** — filled frontmatter + elevator pitch + target-roles (as far as the
  CV supports; rest `TODO(user)`).
- **`profile/summary.md`** — positioning paragraph + focus areas.
- **`profile/work-experience/<company>-<role>.md`** — one per role, real dates, impact pool,
  leadership section only where they managed people, *How success was measured* started.
- **`profile/projects/<name>.md`** — one per named initiative worth it.
- **`profile/skills.md`**, **`education.md`**, **`certifications.md`** — routed and grouped.
- **`TODO(user)` markers** throughout for every gap — especially each role's *How success was
  measured* and any un-quantified impact.

Nothing is written to `profile/stories/` here — stories are Step 9 (elicited, not inferred).

---

## Done-criteria (tick the box when all true)

- [ ] Every fact on the CV is routed into the correct `profile/` file (basics, summary, one
      file per role, projects, skills, education, certifications), following the router table.
- [ ] Third-party names are aliased and no employer-confidential specifics were written;
      the chronology has real dates with any gap **surfaced to the user**, not hidden.
- [ ] Vague impact was quantified-or-asked, and open gaps (metrics, gap explanations, missing
      numbers) are captured as `TODO(user)`.
- [ ] The routing was **confirmed with the user** in an end-of-step summary.

Then tick Step 4 in [`../CHECKLIST.md`](../CHECKLIST.md), note in its cell how many roles were
imported and the biggest open `TODO(user)`, and tell the user to re-prompt with **"continue
onboarding"** — next is **Step 5 (email access decision — optional)**.
