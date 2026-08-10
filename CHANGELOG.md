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

## [1.2.0] — 2026-08-10

**New capabilities**

- **An archive for closed applications** (`applications/_archive/`) and **Golden Rule #14**.
  When an application ends — rejected, withdrawn, ghosted, or skipped before applying — its
  folder and its index row **move** to the archive (never deleted, never condensed), so
  `applications/` and a "status" read show only what's actually live. The close-out procedure
  is the new always-on **§2.5** in `CLAUDE.md`.
  - The archive index carries a **failure-class ledger** — class → occurrences → correction
    shipped — which is now the answer surface for the Golden Rule #13 recurrence check.
  - **The dangerous half, wired everywhere it matters:** rules #12 (never re-apply blind) and
    #13 (recurrence) run entirely on past rejections, and after archival those all live in the
    archive. **Every history check now reads both indexes** — enforced in `new-application`
    step 0, `interview-debrief`, `interview-prep`, `tailored-cv`, and §2.0/§2.2b.
  - New status **`ghosted`** = 45+ days silent, nothing scheduled, nothing pending. It is
    *inferred, never received*, so the agent always asks before setting it. A ghosted role
    that comes back is **un-archived**, not re-created.
- **Sharpness probes** (`interviews/hiring-manager/sharpness-probes.md`) — **for management
  and lead rounds only.** The ~30 short calibration questions an interviewer uses in the first
  minutes (*"how big is your team?"*, *"when did you last give hard feedback?"*, *"how long
  from merge to production?"*). They fail for a different reason than STAR questions: **you
  can't prepare a narrative, only a fact.** Each probe carries the signal behind it plus
  good/bad answer shapes; your own recall card and gap list start empty and are filled during
  prep. `interview-prep` walks them on every lead round, and a probe with no fact behind it
  becomes a visible `TODO(user)` instead of a surprise in the room.
  - **They never surface for an IC round.** The file has a hard applicability gate and both
    `interview-prep` and `interview-question-generator` check the **target role** before
    opening it — every probe assumes accountability for a team, so on an IC round they're
    off-target *and* they'd pull answers toward management scope (the Golden Rule #11
    failure). The gate reads the role being hired for, not your own history: an IC going for
    their first lead role gets them; a manager going for an IC role doesn't.
- **Core-capability gate** (`new-application`, step 6b) — before any CV is built, name the
  req's *core differentiator* and classify your evidence for that one axis 🟢/🟡/🔴. Amber or
  red **on the differentiator itself** stops and asks, because no amount of CV tailoring
  closes it. Not an auto-skip — your call, with the cost stated.

**Changes to review**

- **⭐ Every level gate now reads the role you're GOING FOR, not the one you hold.** Previously
  the `⟨manages-people⟩` markers on question blocks, checklist rows and prep material keyed off
  *"does this user manage people?"* — which meant **an IC preparing for their first engineering
  manager round had every leadership question silently skipped**, in exactly the round where
  they'd be asked. The gate now reads the target role from `application.md` and the JD;
  your own status decides *what evidence exists*, never *what gets prepared*. Applied across
  `CLAUDE.md`, the question bank, the prep checklist, `interview-prep`,
  `interview-question-generator`, and onboarding's question-set step (which reads your target
  roles, and asks if they're unset).
  - **First-time managers get a dedicated pass:** the leadership set is prepped in full, then
    each question you can't answer from real management experience gets the **honest adjacent
    answer** (mentoring, leading without authority, tech leadership) plus a named gap you can
    state plainly in the room. Prep to the target, never fabricate — *"I haven't run a PIP,
    here's the closest thing I've done"* is a strong answer; an invented one ends the process.
  - The reverse also holds: a manager targeting an **IC** role no longer gets management
    material pushed at them, which was quietly feeding the Golden Rule #11 over-leveling
    failure.
- **Golden Rule #11 now gates your written answers too** — `CLAUDE.md` §2.2b gained a sixth
  check. The screener reads your CV *and* your free-text answers in one sitting, so a
  positioning gate that only ran on the CV left the answers as an open door to the same
  reader.
- **The #11 squint test must now leave an artifact** (`tailored-cv`, step 6b). `cv.notes.md`
  has to contain the core-mandate/level-delta lines and the 15-line squint test with your
  current role's first bullet **quoted verbatim** — and the PDF render is blocked without
  them. Previously a *skipped* gate looked exactly like a *passed* one.
- **One-time migration if you already have closed applications.** The update offers to move
  every closed folder and row into the new archive with `git mv` (history preserved) and to
  seed the failure-class ledger from post-mortems already on file. Nothing is rewritten or
  deleted, and it only runs after you say yes.

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
