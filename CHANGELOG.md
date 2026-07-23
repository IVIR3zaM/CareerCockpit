# Changelog

All notable changes to the **CareerCockpit product** (the engine — not your personal
data) are recorded here. The agent reads this file during an update to tell you, in plain
English, what a new release changes before it touches anything. See
[`UPDATE.md`](UPDATE.md) for how updates are applied.

Versioning is [semantic](https://semver.org/): `MAJOR.MINOR.PATCH`.
- **MAJOR** — a change that may need your attention when updating (a moved file, a rule you
  should re-review, a template restructure).
- **MINOR** — new capability, backward-compatible (a new onboarding step, a new template).
- **PATCH** — fixes and wording, no structural change.

> This log is about the **shipped product**. Your own career data (`profile/`,
> `applications/`, your stories) is never listed here and is never changed by an update.

---

## [1.0.0] — 2026-07-23

First public release.

- **Agent-driven job-search cockpit** — CV, applications, and interview prep as structured
  Markdown, with Claude Code as the interface. Git is the source of truth.
- **Role/level-agnostic** — works for software, design, product, data, and infra people
  from junior through senior, staff, EM, and head/director. People-leadership content is
  gated behind "if you manage people."
- **Golden Rules + privacy/GDPR/confidentiality rules** baked into `CLAUDE.md` (source of
  truth, never fabricate, tailor-don't-rewrite, no third-party names, no employer
  confidentials).
- **Default Blue CV theme** with a Markdown→PDF pipeline; onboarding can extract your own
  CV's style instead.
- **Onboarding engine** — an 11-step, resumable, one-step-per-re-prompt flow
  (`onboarding/`) that populates `profile/`, captures what you want from an employer,
  generates a role/level-aware interview question set, and builds a STAR story bank.
- **Update mechanism** — this file, `VERSION`, and [`UPDATE.md`](UPDATE.md): the agent can
  pull product improvements into your private copy **without touching your data**.
