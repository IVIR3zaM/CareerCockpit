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

## [1.1.0] — 2026-07-31

**New capabilities**

- **Workflow skills** (`.claude/skills/`) — the heavy procedures moved out of the always-on
  manual into six on-demand skills that load only when their task starts:
  `new-application`, `tailored-cv`, `interview-prep`, `interview-question-generator`,
  `story-elicitation`, `interview-debrief`.
- **Four new Golden Rules**, each backed by a mechanical gate rather than a principle to
  remember: **#10** answer-intent (every application/screening answer must hit the signal the
  reader is fishing for), **#11** role-fit positioning (lead with what the role is about, not
  your most impressive work — enforced by a 15-line squint test), **#12** the
  repeat-applicant gate (never re-apply into a prior rejection blind), **#13** a mandatory
  root-cause post-mortem on **every** rejection, including silent CV-screen ones.
- **CV page-budget renderer** (`styles/cv-build.mjs`, now behind `npm run cv:pdf`) — reports
  the PDF's true page count plus exactly how many bullet lines to cut and where the weight
  is, so a long CV is fixed in one pass instead of a dozen render-and-guess rounds. Finds
  system Chrome automatically on macOS/Linux/Windows. `npm run cv:pdf:raw` is the old bare
  command.
- **New settings** captured during onboarding: comp floor, target-role filter, discipline/
  level, and whether you manage people — read by the application and prep workflows.

**Changes to review**

- **`profile/preferences.md` is now settings only**, and the reasoning moved to a new
  **`profile/decisions.md`**. Preferences is loaded every session, so keeping it to a
  scannable table (and the growing rationale out of it) keeps every prompt cheaper. Your
  existing values are untouched; the update only adds the new file.
- **`interviews/question-generator.md` became the `interview-question-generator` skill.**
  If you edited that file, the update keeps it and asks before migrating your additions.
- **Onboarding is ~45% smaller and much cheaper per turn.** `CHECKLIST.md` is now the entry
  point (state + protocol in one place), `ONBOARDING.md` holds only the rationale, and the
  step docs no longer restate the Golden Rules or the protocol — so a normal onboarding turn
  reads roughly a third of what it used to. Step 8 gained its own doc; Steps 8 and 9 now
  delegate to the skills. **Your tick state is preserved.**

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
