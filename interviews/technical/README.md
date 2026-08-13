# Discipline-Technical Interview Prep

For technical/craft rounds: system design, coding, architecture discussion, technical
deep-dives on past work, design critiques, product/analytics cases, and "technical leadership"
behavioral questions — **whatever the user's discipline demands** (software, design, product,
data, infra). Always **generate the full candidate question list first** via
the `interview-question-generator` skill, then build the plan.

Create one file per application/round as needed, e.g. `<company>-system-design.md` or
`<company>-portfolio-round.md`, using the plan template in
`applications/_TEMPLATE/interview-prep/_plan-TEMPLATE.md`.

## Reusable prep material — shipped with the product

- **[`system-design-checklist.md`](system-design-checklist.md)** — the 60-minute design-round
  framework: numbers on the board by minute 12, **API/user contract before any service box**,
  commit to one architecture, then storage and scale deep. Carries a **mandatory timed dry-run
  gate** — reading it is provably not the fix, because this round is lost to habit under time
  pressure.
- **[`coding-round-playbook.md`](coding-round-playbook.md)** — how to run a live coding round:
  rehearse the **hardest level first**, run code at every level boundary, take the
  interviewer's steer, and the hard rules that bind the *agent* running the prep (never tell
  the user a topic won't come up).
- **[`language-warmup-TEMPLATE.md`](language-warmup-TEMPLATE.md)** — copy per language. The
  morning-of de-rust for someone who is language-agnostic in practice: the surface a console
  program actually touches, plus a skeleton to type cold.

## Build these here over time
- `deep-dive-projects.md` — 2–3 projects from `profile/projects/` you can discuss in depth,
  with architecture/decisions and trade-offs.
- Discipline-specific framings — e.g. a designer's critique framework, a PM's case-interview
  structure (market sizing → prioritization → success metrics), a data case's correctness/
  drift checklist.
- Common technical-leadership questions (e.g. "how do you evaluate technical decisions your
  team makes without doing the work yourself?").

> ⚠️ **When a rejection prescribes an artifact, build it immediately.** "I'll build the
> system-design checklist when a design round is actually scheduled" is how a failure class
> recurs: the round gets scheduled at short notice, the artifact still doesn't exist, and the
> same feedback arrives twice. A correction deferred is a correction not shipped (Golden Rule
> #13 — *a principle by itself is not a fix*).
