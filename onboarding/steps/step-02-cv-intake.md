# Step 2 — CV intake & template reconciliation

**Purpose:** get the CV in, parse it, and **negotiate the section structure** that fits *this*
user's discipline and level. This step does **not** populate `profile/` — that's Step 4.

**Inputs:** the user's current CV — pasted text, a file path (`.md`/`.txt`/`.docx`), a **PDF**
path (read it with the `pdf` skill), or "I don't have one" (see the fallback below). Don't
require a particular format.

## 1. Get the CV (one question)

> "To start, share your current CV — paste it here, give me a file or PDF path, or tell me
> you don't have one and we'll build from a short interview."

Stash the raw text to `onboarding/cv-source.md` for Step 4 (the user's own clone — runtime
personal data is fine there; it never ships). Don't parse facts into `profile/` yet.

## 2. Parse the *shape*, not the facts

- **Discipline** — software, design (product/UX/brand), product, data, infra/platform/SRE,
  QA, research, other.
- **Level / track** — junior · mid · senior · staff/principal IC · **people manager** (lead /
  EM / director / head / VP). IC-vs-manager matters as much as level.
- **Which sections the CV already uses**, mapped to the canonical template.
- **Chronology** — dates in reverse-chronological order, and any **gaps or out-of-order
  roles**. Flag them now (deep resolution is Step 4) so the user isn't surprised — see the
  career-gap block in [`../ONBOARDING.md`](../ONBOARDING.md).

If discipline or level is ambiguous, ask **one** targeted question ("Your CV reads as a senior
IC — do you also manage people directly, or is this a pure IC track?").

## 3. Compare against [`templates/cv-template.md`](../../templates/cv-template.md)

Canonical spine: `Name | Headline` → `Personal Summary` → **highlight band** (`Leadership
Focus` / `Selected Work` / `Highlights`) → `Work Experience` → `Professional Development` →
`Skills` → `Education`.

Decide per section: **keep · rename · add · drop** — driven by the user's real
discipline/level, never by what some future JD might want.

## 4. Discipline/level → sections (a proposal to confirm, not a rule)

**Never hard-code "Engineering Manager."** Leadership content is gated on *"do you manage
people."*

| Discipline / track | Highlight band | Leadership content | Discipline-specific | Notes |
|---|---|---|---|---|
| **People manager** (any discipline) | **Leadership Focus** | Yes — team size, hiring, delivery, org impact | — | Band leads with people/delivery outcomes. |
| **Senior / staff IC — software / data / infra** | **Highlights** or **Selected Work** | Only if they led without a manager title (tech lead) | Optional **Selected Projects** | Emphasis: technical depth, scope, impact. |
| **Junior / mid IC** | **Highlights** (optional) | No | — | Keep tight; the band may be skipped. |
| **Design (product/UX/brand)** | **Selected Work** | Only if they lead a design team | **Portfolio** (link + 2–3 pieces) | The portfolio link is load-bearing — ask for it. |
| **Product management** | **Highlights** / **Selected Work** | Only if they manage PMs | Optional **Selected Launches / Outcomes** | Emphasis: outcomes, metrics, discovery→delivery. |
| **Research / academic-leaning** | **Highlights** | If they lead a lab/group | **Publications / Talks** | Map Professional Development → publications if richer. |

- **Leadership sections appear only if the user manages (or has led) people** — don't rename
  one into existence.
- **`Work Experience`, `Skills`, `Education`** stay for everyone (Work Experience always
  reverse-chronological, no gaps).
- **`Professional Development`** can become *Publications/Talks*, *Certifications*, or be
  dropped if empty — ask.
- Target ~1–2 pages of content; the section set should serve that.

## 5. Confirm (the one place batching is allowed)

> "Here's the CV structure I'd use for you — a **senior IC, data engineering** profile:
> Personal Summary → Highlights → Work Experience → Selected Projects → Skills → Education
> (no Leadership Focus, since you're not managing people; Professional Development dropped —
> your CV had none). Good, or want to change any section?"

## Record

- `profile/preferences.md` → fill **CV structure**, **Discipline / level**, and **Manages
  people**.
- `profile/decisions.md` → `## CV structure (Step 2)` with why sections were added/dropped.

**No-CV fallback:** get discipline/level from a couple of targeted questions, propose a
structure from the table, confirm it, and note in `decisions.md` that `profile/` will be built
from interview + LinkedIn (Steps 4/6). Tick the box — a no-CV user has still completed intake.

## Done when

- [ ] The CV was provided (or the no-CV path taken) and parsed for discipline/level.
- [ ] The structure was proposed from the guide and **confirmed by the user**.
- [ ] Structure, discipline/level, and manages-people are in `preferences.md`; the raw CV is
      stashed for Step 4.

Tick Step 2 in [`../CHECKLIST.md`](../CHECKLIST.md) noting the confirmed discipline/level →
next is **Step 3 (CV style choice)**.
