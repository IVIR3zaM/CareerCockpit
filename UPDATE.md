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
- `styles/README.md`
- `templates/cv-template.md`, `templates/cover-letter-template.md`
- `applications/_TEMPLATE/**` (all template files)
- `profile/**/_TEMPLATE.md` (`work-experience`, `projects`, `stories` templates)
- `interviews/README.md`, `interviews/question-generator.md`
- `interviews/technical/README.md`, `interviews/company-research/_TEMPLATE.md`
- `onboarding/ONBOARDING.md`, `onboarding/steps/*.md`

### Tier B — **Shared** (engine base + your layer: merge, ask on conflict)
Files that ship as engine but that onboarding or normal use **mutates with your choices**.
Never overwrite. Re-apply the upstream change *around* your edits; if the upstream change
and your edit touch the same thing, ask one targeted question.

| Path | Your layer (preserve) | How to merge |
|---|---|---|
| `CLAUDE.md` | your house-rule keep/drop/customize edits (onboarding Step 10), banned-phrase / date / comp tweaks | apply new/changed engine rules; keep every user customization; if a new engine rule contradicts a user customization, ask |
| `styles/cv.css` | your extracted theme, if you chose "extract from my CV" (Step 3) | if still the default Blue → treat as Tier A; if customized → **do not overwrite**; only offer structural fixes (e.g. a heading→CSS contract change) and let the user accept |
| `onboarding/CHECKLIST.md` | your tick state | keep all ticks; **append** any new upstream steps as unchecked; never re-open a completed box |
| `interviews/hiring-manager/question-bank.md` | questions you added | **additive** — add new upstream seed questions that aren't present; keep all of yours |
| `interviews/hiring-manager/prep-checklist.md` | rows you added from debriefs | **additive** — same as above |

### Tier C — **Yours** (never touch)
Everything containing your career data. An update never reads these for overwrite.

- `profile/basics.md`, `summary.md`, `skills.md`, `education.md`, `certifications.md`,
  `company-fit.md`, `preferences.md`
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

### 4. Apply per tier (one confirmation summary, then reconcile)
Build a single plain-English summary of the whole plan, then work through it:
- **Tier A:** for each engine file where `new` ≠ local, show the one-line change and, on the
  user's OK, overwrite. Batch the OK for the whole Tier-A set (it's non-destructive to data).
- **Tier B:** for each shared file, do the 3-way reconcile (`base` → `new` vs the user's
  file). Apply cleanly-mergeable engine changes; for any true conflict, **ask one targeted
  question at a time** ("Upstream changed the date-format rule to X; you'd customized it to
  Y — keep yours, take theirs, or combine?"). Write only after the answer.
- **Tier C:** skip entirely. If an upstream *skeleton* improved (e.g. a new field in
  `basics.md`'s template), you may **mention** it as an optional manual adoption, but never
  edit the file.

### 5. Bump the version and record it
- Set local `VERSION` to the new version.
- The upstream `CHANGELOG.md` is adopted as part of Tier A (so the user's log now shows the
  release they moved to).

### 6. Save per the user's git-save preference
- Read the mode from `profile/preferences.md` (auto-commit-and-push vs manual).
- In **both** modes: show the final plain-English summary of every file the update wrote,
  and **wait for confirmation** before any commit/push. Commit as one coherent unit, e.g.
  `Update CareerCockpit engine to vX.Y.Z`. Never push silently.

### 7. Clean up
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
