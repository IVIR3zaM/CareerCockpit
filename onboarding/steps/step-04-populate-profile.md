# Step 4 — Populate `profile/` from the CV

**Purpose:** route **every fact** from the CV into the right `profile/` file so that from now
on every tailored CV, cover letter, and interview answer traces back to `profile/` (Golden
Rule #1). This is the moment the cockpit stops being empty.

**Inputs:** the raw CV stashed at `onboarding/cv-source.md` (Step 2 — if missing, ask for the
CV again in one question), plus **CV structure**, **Discipline / level**, and **Manages
people** from `profile/preferences.md`. No CV? Build from a short interview instead — same
routing, every field a targeted question; Step 6 (LinkedIn) fills more later.

## The router — where each CV fact goes

`CLAUDE.md` §2.4 applied to a CV import. Walk the CV top-to-bottom:

| CV element | Route to |
|---|---|
| Name, contact, links, headline, location, work authorization, languages | `profile/basics.md` frontmatter |
| Professional summary / "about me" | `profile/summary.md` |
| Elevator pitch / one-liner (derive if implicit) | `profile/basics.md` → *Elevator pitch* |
| Each employment entry | **one file per role** in `profile/work-experience/` (copy `_TEMPLATE.md`) |
| A named initiative worth its own page (launch, migration, OSS, portfolio piece) | new file in `profile/projects/` |
| Skills / tools / languages-of-craft | `profile/skills.md` (grouped) |
| Degrees · certifications, courses, workshops | `profile/education.md` · `certifications.md` |
| How a team/company was run (OKRs, KPIs, rituals), if hinted | that role's *How success was measured* |
| A behavioral anecdote the CV implies | a `TODO(user)` note — **never fabricate a story**; real ones come in Step 9 |

One CV line often lands in **two** places (a role bullet *and* a skill). That's expected.

## 1. Draft from the CV (no questions yet)

- **`basics.md`** — what the CV states. **Never invent** an email, phone, or
  work-authorization status; absent → `TODO(user)`.
- **`summary.md`** — the CV's summary in the user's own voice + 3–5 focus bullets (leadership
  focus only if they manage people; otherwise craft/technical).
- **One `work-experience/<company>-<role>.md` per role** — frontmatter (company, title, level,
  location, work_mode, start/end, `team_size` **only if they managed people**, scope, tags)
  and the impact-bullet pool. Architecture/craft lines → *Technical / craft*;
  people/hiring/growth lines → *Leadership & people* **only for roles where they managed or
  mentored** (delete that section for pure-IC roles rather than leaving an empty prompt).
- **`projects/`, `skills.md`, `education.md`, `certifications.md`** — as routed.

Every unfilled field becomes `TODO(user): <what's missing>`.

## 2. Privacy fires **on write**, not after

Golden Rule #9 is already in context — the parts that bite here: alias third-party names
immediately (in contents **and** filenames/slugs), keep no sensitive personal attributes, and
generalize employer-confidential specifics (ratioed impact, not internal figures). **If the
CV itself contains a third-party name or a confidential figure, alias/generalize it on the way
in** — the CV text is the user's, but `profile/` must already be clean.

## 3. Chronology check (mandatory)

Read the role dates top to bottom (see the career-gap block in
[`../ONBOARDING.md`](../ONBOARDING.md)). **Every role stores its real dates** — never reorder
by relevance, never paper over a hole. Roles listed out of order on the CV get filed by real
date, with the sequence confirmed. A gap becomes a question below, not a silent fill.

## 4. Ask the gaps — one targeted question at a time

Priority order, sequentially:

1. **Date gaps / ordering** — *"There's a gap between `<role X>` (ended YYYY-MM) and `<role
   Y>` (started YYYY-MM) — what were you doing then?"* Capture the honest answer (break,
   study, caregiving, contracting, job search); if they defer, `TODO(user): explain
   YYYY-MM–YYYY-MM gap`. Never guess.
2. **Quantify vague impact** — for "improved performance" / "grew the team" / "increased
   revenue", ask *"by how much, and measured how?"* If they don't know, keep it qualitative
   and mark `TODO(user): quantify`.
3. **"How success was measured" per role** — the most-probed interview area. Ask what the
   company-wide goals, team metrics, and review cadence were. If there were **no** formal
   OKRs/KPIs (early startup, pre-PMF), record that honestly plus how they steered instead —
   that framing *is* the interview answer.
4. **Missing basics** that matter for applications (a portfolio/GitHub link, work
   authorization if relevant). Don't interrogate for fields clearly left off on purpose.

If the gap list is long, it's fine to spread answers across **multiple re-prompts** — record
what you have and continue next turn rather than blocking on a full set.

## 5. Confirm (the one place batching is allowed)

> "Here's what I routed into `profile/` from your CV: **Basics** · **Summary** · **N roles**
> (most recent → oldest, dates continuous) · **M projects** · **Skills** · **Education** ·
> **Certifications**. Still open as `TODO(user)`: `<the gap explanation>`, metrics for
> `<role>`, the number behind `<vague bullet>`. Anything wrong or to add?"

Remaining TODOs do **not** block the tick — they're the system working as designed, and get
surfaced later per `CLAUDE.md` §2.0. Nothing is written to `profile/stories/` here — stories
are Step 9, elicited rather than inferred.

## Done when

- [ ] Every CV fact is routed per the table above.
- [ ] Third-party names aliased, no employer-confidential specifics, real dates with any gap
      **surfaced to the user**.
- [ ] Vague impact quantified-or-asked; open gaps captured as `TODO(user)`.
- [ ] The routing was **confirmed** in an end-of-step summary.

Tick Step 4 in [`../CHECKLIST.md`](../CHECKLIST.md) noting how many roles were imported and
the biggest open TODO → next is **Step 5 (email access — optional)**.
