# UPDATE.md — How the agent updates a CareerCockpit clone

This is **instructions for the agent** (Claude Code), not a form the user fills in. When
the user says **"update CareerCockpit"**, **"pull the latest version"**, **"is there an
update?"**, or anything equivalent, run the flow below.

> **Why this file exists.** A CareerCockpit clone is created from a GitHub *template*, so it
> has **no shared git history** with the product — a plain `git pull` is impossible, and
> even if it worked it would collide with the files onboarding fills in (your CV data, your
> theme, your house-rule tweaks). This flow updates the **engine** (templates, rules,
> onboarding logic, styles) while **never touching your personal data**, doing any real
> reconciliation **one question at a time**, the same way onboarding does.

- **Canonical upstream (the product):** `https://github.com/IVIR3zaM/CareerCockpit`
- **Local release marker:** [`VERSION`](VERSION) (a plain semver string).
- **What each release changed:** [`CHANGELOG.md`](CHANGELOG.md).

---

## The two hard rules (never violated)

1. **Your data is untouchable.** Nothing in the **"Yours"** tier below is ever read for
   overwrite, moved, or deleted by an update. If in doubt about a file's tier, treat it as
   Yours and leave it alone.
2. **Never clobber a customization silently.** For any file you *did* change (your theme,
   your house-rule edits, your extended question bank), the update **re-applies the new
   engine changes on top of your version** and surfaces anything it can't reconcile as a
   **single, plain-English question** — it never overwrites your edits without a yes.

Everything an update does is shown as a plain-English summary and confirmed before it is
written, per the Git-save policy in `CLAUDE.md` §4 (confirm-before-save, both modes).

---

## The engine-vs-data manifest (three tiers)

Every path falls into exactly one tier. The tier decides how an update treats it.

### Tier A — **Engine** (refresh: adopt the new version after showing the diff)
Pure product files the user is not expected to edit. On update, if upstream differs, show a
one-line summary of what changed and — on confirmation — overwrite with the new version.

- `README.md`, `LICENSE`, `.gitignore`
- `package.json`, `package-lock.json`
- `VERSION`, `CHANGELOG.md`, `UPDATE.md` *(the flow updates these itself)*
- `styles/README.md`, `styles/cv-build.mjs`
- `.claude/skills/**` (the workflow skills — pure engine; a user who edits one is on
  Tier B terms for that file: preserve their edit and ask)
- `templates/cv-template.md`, `templates/cover-letter-template.md`
- `applications/_TEMPLATE/**` (all template files)
- `profile/**/_TEMPLATE.md` (`work-experience`, `projects`, `stories` templates)
- `interviews/README.md`
- `interviews/technical/README.md`, `interviews/company-research/_TEMPLATE.md`
- `onboarding/ONBOARDING.md`, `onboarding/CHECKLIST.md` header/protocol *(the tick state is
  Tier B — see below)*, `onboarding/steps/*.md`

> **Moved/removed in 1.1.0:** `interviews/question-generator.md` became the
> `interview-question-generator` **skill**. On update, if the clone still has the old file
> **and the user never edited it**, delete it and say so; if they *did* edit it, keep it,
> point out the skill now owns that logic, and ask whether to migrate their additions.

### Tier B — **Shared** (engine base + your layer: merge, ask on conflict)
Files that ship as engine but that onboarding or normal use **mutates with your choices**.
Never overwrite. Re-apply the upstream change *around* your edits; if the upstream change
and your edit touch the same thing, ask one targeted question.

| Path | Your layer (preserve) | How to merge |
|---|---|---|
| `CLAUDE.md` | your house-rule keep/drop/customize edits (onboarding Step 10), banned-phrase / date / comp tweaks | apply new/changed engine rules; keep every user customization; if a new engine rule contradicts a user customization, ask |
| `styles/cv.css` | your extracted theme, if you chose "extract from my CV" (Step 3) | if still the default Blue → treat as Tier A; if customized → **do not overwrite**; only offer structural fixes (e.g. a heading→CSS contract change) and let the user accept |
| `onboarding/CHECKLIST.md` | your tick state | **re-key by step number**, not by row text — the table's columns can change between releases. Carry each step's tick **and** its notes cell onto the new row; append genuinely new steps as unchecked; never re-open a completed box |
| `interviews/hiring-manager/question-bank.md` | questions you added | **additive** — add new upstream seed questions that aren't present; keep all of yours. **Exception:** pointer/reference lines a release rewrites (e.g. a renamed file) are updated in place, or they dangle — see *Migrations* |
| `interviews/hiring-manager/prep-checklist.md` | rows you added from debriefs | **additive** — same as above, same pointer-line exception |

### Tier C — **Yours** (never touch)
Everything containing your career data. An update never reads these for overwrite.

- `profile/basics.md`, `summary.md`, `skills.md`, `education.md`, `certifications.md`,
  `company-fit.md`, `preferences.md`, `decisions.md`
- `profile/work-experience/*.md` (real roles — every non-`_TEMPLATE` file)
- `profile/projects/*.md`, `profile/stories/*.md`, `profile/stories/_index.md`
- `applications/_index.md` and every real `applications/<company-role>/**`
- `interviews/company-research/*.md` (real research — every non-`_TEMPLATE` file)
- `interviews/hiring-manager/answers.md` (your prepared answers)

> **The overarching rule that resolves any ambiguity:** an update auto-refreshes only a file
> the user has **not changed since they received it**. Compare the user's file against the
> upstream version *at the release the clone is currently on* (the "base"). If they match,
> the user never touched it → safe to refresh (Tier A behavior). If they differ, the user
> edited it → preserve it and merge/ask (Tier B behavior) or leave it (Tier C). This is why
> the flow fetches the upstream tree at **both** the current and the latest version.

---

## Migrations (release-specific steps the tiers can't express)

The three tiers handle *content* changes. They do **not** handle **structural** ones — a file
that splits in two, a Tier-C file that gains required fields, a rename that leaves pointers
dangling, or an ordering dependency between two writes. Those need explicit, per-release
instructions, and they live here.

**Rules for every migration:**
- **A migration may touch a Tier-C file only to restructure it — never to change a value.**
  Moving the user's own text into a new file, or adding an empty `TODO(onboarding)` row, is
  restructuring. Rewriting what a setting *says* is not, ever.
- **Show it in the confirmation summary as its own line item** and get an explicit yes. A
  migration is the one part of an update that changes the *shape* of the user's data.
- **Idempotent.** Re-running an update that already migrated must detect the finished state
  and do nothing.
- **If a migration can't complete** (an ambiguous file, a user who says no), **stop and say
  so plainly** — leave the clone on the old version rather than half-migrated.

### 1.0.0 → 1.1.0

Run these **in order**, before the per-tier pass:

1. **`.gitignore` FIRST — ordering matters.** 1.0.0 ignores `.claude/` wholesale; 1.1.0 ships
   the workflow skills in `.claude/skills/`. Refresh `.gitignore` **before** writing any
   skill file, or the skills land on disk invisible to git — absent from your confirmation
   summary, never committed, and gone on the next fresh clone. If the user **customized**
   `.gitignore` (so the overarching rule protects it), don't skip this: add the two lines
   (`.claude/*` and `!.claude/skills/`) around their edits and say what you changed.
2. **Split `profile/preferences.md` → `preferences.md` + `decisions.md`.** In 1.0.0 that one
   file held both a *Current settings* table and a *Decision log*; 1.1.0 keeps settings there
   (read every session) and moves rationale to `profile/decisions.md`. **This is Tier C, so
   confirm before writing** — but it is not optional: skipping it leaves the refreshed
   `CLAUDE.md` and the new skills reading fields that aren't there.
   - Create `profile/decisions.md` from the 1.1.0 skeleton and **move** the user's entire
     *Decision log* section into it verbatim — every dated section, unedited. Then delete
     only that section from `preferences.md`.
   - Keep every existing settings row and its value **exactly as-is**.
   - **Append the new rows as unset:** *Discipline / level*, *Manages people*, *Comp floor*,
     *Target-role filter*, *Banned phrases* — each `TODO(onboarding)` / `TODO(user)`.
   - Drop the now-unused *Set by* notes column only if it's empty; never drop a note the user
     wrote.
   - **Tell the user which new settings are unset and which workflow each one gates** (comp
     floor and target-role filter → the pre-apply checks; manages-people → every
     people-leadership question and story theme). Offer to fill them now in a few questions,
     or leave them as TODOs the cockpit will ask about on first use.
   - *Already split (has a `decisions.md` and no Decision-log section)? Do nothing.*
3. **Retire `interviews/question-generator.md`.** Its logic is now the
   `interview-question-generator` skill. If the file is **unmodified**, delete it and say so.
   If the user **edited** it, keep it, say the skill now owns that logic, and ask whether to
   migrate their additions into the skill or into `question-bank.md`.
4. **Repoint the links to it** in `interviews/README.md`, `interviews/technical/README.md`,
   `interviews/hiring-manager/question-bank.md`, and
   `interviews/hiring-manager/prep-checklist.md`. The last two are Tier B *additive*, which
   would otherwise leave their pointer lines aimed at a deleted file — update those lines in
   place while keeping every question and row the user added.
5. **Merge `CLAUDE.md` across a restructure — map the moved sections.** 1.1.0 moved whole
   workflows out of the manual into skills, so a naive 3-way merge will strand the user's
   Step-10 customizations (they're marked with
   `<!-- customized during onboarding (house-rules, …) -->`). Carry each one to its new home:

   | 1.0.0 location | 1.1.0 home |
   |---|---|
   | §2.1 create an application | `new-application` skill |
   | §2.2 build a tailored CV · §3 PDF pipeline | `tailored-cv` skill |
   | §2.3 interview prep · §2.5 behavioral prep | `interview-prep` skill |
   | §2.6 interview debrief | `interview-debrief` skill |
   | §2.0 status · §2.4 router · §4 conventions · Golden Rules | unchanged, still in `CLAUDE.md` |

   Most Step-10 customizations live in §4 (banned phrases, date format) and Golden Rule #9
   (privacy strictness) — **both unmoved**, so they merge cleanly. The one to watch is a
   recorded *"§2.5 dormant"* (the not-a-manager gate): §2.5 no longer exists, so restate it
   as the **Manages people = no** setting from migration 2, and say you did.
6. **Tell `cv:pdf` users what changed** (no action needed, but it looks like lost work
   otherwise): 1.0.0's `styles/README.md` told Linux/Windows users to hard-code their Chrome
   path into `package.json`. The Tier-A refresh replaces that script — **their edit is now
   obsolete, not discarded**: `styles/cv-build.mjs` detects Chrome per platform and honors
   `PUPPETEER_EXECUTABLE_PATH`. Note that the `cv:pdf:raw` fallback still hard-codes the
   macOS path.
7. **Flag the page budget for extracted themes.** If `preferences.md` says **CV theme =
   `extracted-from-cv`**, `PAGE_PX` in `styles/cv-build.mjs` is calibrated for the default
   Blue theme, so its "cut ~N bullet lines" advice will be off until re-calibrated. Record a
   `TODO(user)` and offer to re-calibrate on the next CV render (the constant is commented
   with how).

---

## The flow

### 1. Check the version
- Read the local [`VERSION`](VERSION).
- Fetch the upstream `VERSION` from the canonical repo (e.g. shallow-fetch or read the raw
  file at the default branch).
- If they're equal → tell the user **"You're on the latest version (`X.Y.Z`)."** and stop.
- If local is newer than upstream → say so and stop (nothing to do).

### 2. Show what changed (plain English)
- Read the upstream [`CHANGELOG.md`](CHANGELOG.md) and summarize the entries **between** the
  local version and the latest — grouped as *new capabilities*, *changes to review*, and
  *fixes*. This is the user's chance to say "not now."

### 3. Fetch both trees
- Shallow-clone the canonical repo into a scratch directory (outside the user's repo).
- Materialize two snapshots: the upstream tree **at the local VERSION** (the *base*) and
  **at the latest VERSION** (the *new*). Use the release tags (`vX.Y.Z`) if present; else the
  matching commits. Never add the product as a permanent remote of the user's private repo.

### 4. Check for migrations — BEFORE the tier pass
Read the **Migrations** section above for every release between the local version and the
latest. A release with a migration block has **structural** changes the tiers can't express
(a file that splits, a rename that leaves pointers dangling, an ordering dependency). Skipping
them leaves the clone in a broken half-state: refreshed engine files reading data that isn't
where they expect it.

- Fold each migration into the confirmation summary in step 5 **as its own named line item** —
  especially any that restructures a Tier-C file, which is the only time an update changes the
  shape of the user's own data.
- Run them **in the order listed**, before the per-tier pass, unless the block says otherwise.
- Each is **idempotent** — detect an already-migrated clone and skip it silently.
- **Multi-release jumps** (e.g. 1.0.0 → 1.3.0) run every intervening block in version order.
- If a migration can't complete, **stop and say so** — leave the clone on its old version
  rather than half-migrated, and don't bump `VERSION`.

### 5. Apply per tier (one confirmation summary, then reconcile)
Build a single plain-English summary of the whole plan — migrations included — then work
through it:
- **Tier A:** for each engine file where `new` ≠ local, show the one-line change and, on the
  user's OK, overwrite. Batch the OK for the whole Tier-A set (it's non-destructive to data).
- **Tier B:** for each shared file, do the 3-way reconcile (`base` → `new` vs the user's
  file). Apply cleanly-mergeable engine changes; for any true conflict, **ask one targeted
  question at a time** ("Upstream changed the date-format rule to X; you'd customized it to
  Y — keep yours, take theirs, or combine?"). Write only after the answer.
- **Tier C:** skip entirely — **except** for a migration that explicitly restructures one
  (see above), which still never changes a value. If an upstream *skeleton* improved (e.g. a
  new field in `basics.md`'s template), you may **mention** it as an optional manual
  adoption, but never edit the file.

### 6. Bump the version and record it
- Set local `VERSION` to the new version.
- The upstream `CHANGELOG.md` is adopted as part of Tier A (so the user's log now shows the
  release they moved to).

### 7. Save per the user's git-save preference
- Read the mode from `profile/preferences.md` (auto-commit-and-push vs manual).
- In **both** modes: show the final plain-English summary of every file the update wrote,
  and **wait for confirmation** before any commit/push. Commit as one coherent unit, e.g.
  `Update CareerCockpit engine to vX.Y.Z`. Never push silently.

### 8. Clean up
- Remove the scratch clone. Tell the user the new version and, if any Tier-B conflicts were
  deferred, what's left as a `TODO(user)`.

---

## Notes
- **Resumable & safe:** the flow writes nothing until a confirmation, so an interrupted
  update leaves the clone untouched. Re-running it just re-computes the diff from `VERSION`.
- **No login, no scraping:** it only reads the public product repo. It never authenticates
  to anything on the user's behalf.
- **Downgrades:** not automatic. If a user needs to pin an older version, they check out the
  matching tag manually; the flow only moves forward.
