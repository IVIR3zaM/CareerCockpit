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
- `styles/README.md`, `styles/cv-build.mjs`, `styles/slides-build.mjs`
- `styles/cover-letter.css` *(theme-neutral prose overrides — carries no colors or fonts, so
  it is safe to refresh even when `cv.css` is customized)*
- `.claude/skills/**` (the workflow skills — pure engine; a user who edits one is on
  Tier B terms for that file: preserve their edit and ask)
- `templates/cv-template.md`, `templates/cover-letter-template.md`,
  `templates/slides-template.html`
- `applications/_TEMPLATE/**` (all template files)
- `profile/**/_TEMPLATE.md` (`work-experience`, `projects`, `stories` templates)
- `interviews/README.md`
- `interviews/technical/README.md`, `interviews/company-research/_TEMPLATE.md`
- `interviews/technical/language-warmup-TEMPLATE.md` *(the per-language copies the user makes
  from it are **Tier C**)*
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
| `interviews/hiring-manager/sharpness-probes.md` | probes you added from debriefs, your `→ **Yours:**` lines, your §8 recall card, your §9 gap **table** | **additive** — add new upstream probes that aren't present; **never touch §8, and never remove or reword a `→ **Yours:**` line**. §9 is mixed: its explanatory prose is engine and merges; its table rows are yours and never do |

> **⚠️ The additive rule matches on MEANING, never on an identifier.** These three files are
> numbered (`Q44`, row `21`, probe `§5.6`) and users add their own entries using the next free
> number — so an upstream release and a user's own additions **routinely claim the same id for
> different content**. Matching by id silently drops the upstream entry or creates a duplicate.
> For every incoming entry: find the existing one that **asks the same thing**, whatever its id,
> and merge into it; if there is none but the id is taken, append under the next free id and leave
> a one-line comment recording the mapping. **Never renumber a user's entry** — `answers.md`,
> prep plans and debriefs in `applications/` all cite these numbers, and a renumber orphans every
> one of those references.
| `applications/_archive/_index.md` | every archived row and every ledger entry | **header/scaffolding only** — refresh the intro, the warning block and the column headers; the rows and the ledger are your data and are never rewritten, reordered, or condensed |
| `applications/_shortlist.md` | your market-sweep rows and your ⛔ do-not-source rows | **header/scaffolding only** — same treatment as the archive index. Every row is a real company and a real outcome; a refresh never rewrites, reorders or drops one. If the clone doesn't have the file, offer it as a new empty template |
| `interviews/technical/system-design-checklist.md`, `coding-round-playbook.md` | anything you folded in from your own debriefs (§6 design pockets, extra anti-patterns, domain notes) | **additive** — merge upstream's new method content around your additions; **never delete a section a debrief created.** If untouched since you received it, treat as Tier A |
| `profile/published-writing.md` | everything in it | **header/scaffolding only.** The "already spent" entries, the unpublished list and the voice calibrations are your data. Refresh the explanatory blocks and the standing-rules list; never touch an entry |
| `upstream-sync/UPSTREAM-QUEUE.md` | your queued entries | **scaffolding only** — refresh the scrub-gate checklist and the status vocabulary; never touch a queued row |
| `styles/slides.css` | your theme tokens, if you copied them from a customized `cv.css` | same rule as `cv.css`: still the default Blue → Tier A; customized → do not overwrite, offer structural changes only |

### Tier C — **Yours** (never touch)
Everything containing your career data. An update never reads these for overwrite.

- `profile/basics.md`, `summary.md`, `skills.md`, `education.md`, `certifications.md`,
  `company-fit.md`, `preferences.md`, `decisions.md`
- `profile/work-experience/*.md` (real roles — every non-`_TEMPLATE` file)
- `profile/projects/*.md`, `profile/stories/*.md`, `profile/stories/_index.md`
- `applications/_index.md` and every real `applications/<company-role>/**`
- `applications/_archive/<company-role>/**` — archived applications are **read-only history**;
  an update never touches them, not even to repair a link
- `interviews/company-research/*.md` (real research — every non-`_TEMPLATE` file)
- `interviews/hiring-manager/answers.md` (your prepared answers)
- `interviews/technical/<language>-coding-warmup.md` (your filled copies of the warmup
  template — the `-TEMPLATE` file itself is Tier A)
- `applications/_shortlist.md` **rows** (the file's scaffolding is Tier B — see above)

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

### 1.1.0 → 1.2.0

One migration, and it restructures Tier-C data — so it is **shown as its own line item and
run only after an explicit yes.** If the user declines, the engine refresh still applies; say
plainly that the archive stays empty and every history check will keep reading only the active
index until they migrate.

1. **Archive the closed applications** (Golden Rule #14, `CLAUDE.md` §2.5).
   - *Already migrated?* If `applications/_archive/` exists **and** no row in
     `applications/_index.md` carries a terminal status, do nothing and say so.
   - Create `applications/_archive/_index.md` from the 1.2.0 skeleton if it isn't there.
   - **Identify** every row in `applications/_index.md` whose status is `rejected`,
     `withdrawn`, or `not applied — skipped`. **List them for the user before moving
     anything** — company, role, status, date. This is their data changing shape.
   - **Move each folder with `git mv`** (never copy-and-delete — `git mv` preserves history):
     `git mv applications/<slug> applications/_archive/<slug>`.
   - **Move each row verbatim** into the archive table. **Do not condense, re-word, trim or
     re-order a row** — the row *is* the record. Rows with no folder (applications that
     pre-date the repo) move too; there is simply nothing to `git mv`.
   - **Repair links, mechanically only:** bump repo-relative links *inside* a moved row and
     inside `applications/_archive/_index.md` by one level (`../profile/…` →
     `../../profile/…`), and repoint inbound links from `profile/`, `interviews/` and the
     skills (`applications/<slug>/…` → `applications/_archive/<slug>/…`). Do **not** edit any
     other content of an archived file — it is read-only history from now on.
   - **Seed the failure-class ledger** at the top of the archive index **only from post-mortems
     already written**. A rejection with no diagnosis on file is listed as *undiagnosed* —
     **never guess a class retroactively.**
   - **Do not mark anything `ghosted` during the migration.** Ghosting is inferred, so it needs
     the user's confirmation per application; instead, report which live rows are 45+ days
     silent and offer to close them out afterwards, one at a time.
2. **Add the `Target track` row to `profile/preferences.md`.** Tier C, so **confirm before
   writing** — but it is a restructure (a new empty row), never a value change:
   - Append `| **Target track** | TODO(onboarding): management/lead \| IC \| both | Step 7 |`
     after the *Comp floor* row. Leave every existing row exactly as-is.
   - **Do not infer the value from their current title or from *Manages people*.** That is the
     precise mistake this setting exists to prevent — an IC targeting their first manager role
     and a manager returning to IC work both get the wrong preparation when it's assumed.
   - **Tell the user what it gates and offer to set it now in one question:** *"Are you
     targeting management/lead roles, individual-contributor roles, or both?"* If they'd
     rather not decide now, leave the `TODO` — the workflows ask on first use. Record the
     answer and the reasoning in `profile/decisions.md`.
   - *Already has a `Target track` row? Do nothing.*
3. **Mention the two new/tightened gates** so the user isn't surprised on their next CV or
   application (no action needed, nothing of theirs changes): `cv.notes.md` must now carry the
   written #11 squint-test sections or the PDF render is blocked (`tailored-cv` step 6b), and
   `new-application` gained the core-capability gate (step 6b) before a CV is built.
4. **Point out that §8/§9 of `sharpness-probes.md` start empty** — the recall card and gap list
   are per-user and get filled during the next `interview-prep` run. Nothing to do now. If the
   user's **Target track is `IC`**, say plainly that this file is for management/lead rounds
   only and will simply never load for them.

### 1.2.0 → 1.3.0

1.3.0 adds **content** to three Tier-B files, so the additive rules mostly carry it. The one
thing they **cannot** express is the hazard that makes this release worth a migration block:

> 🚨 **Identifier collisions.** 1.3.0 ships **Q14b, Q14c, Q34b, Q44–Q50**, **prep-checklist rows
> 21–23** and **sharpness-probe §5.6, §5.7, §6.6**. A user who has been logging real interviews
> has **almost certainly used those same ids for different questions** — the bank tells them to
> add questions as they come up, and the obvious next id after Q43 is Q44. So a plain additive
> merge does the wrong thing twice: it either sees "Q44 exists" and **silently drops upstream's
> Q44**, or it writes a **second Q44** and leaves the file with two.

**The rule: match on the question's MEANING, never on its id — and never renumber the user's.**
`interviews/hiring-manager/answers.md` is Tier C and keyed by `Q#`; renumbering a user's question
silently orphans their prepared answer. So:

1. **Reconcile the question bank by meaning.**
   - For each 1.3.0 question, look for an existing entry **asking the same thing**, whatever its
     id. Found → the user already has it: **keep their id, their wording and their notes**, and
     only fold in the parts of the upstream note they don't have (the trap, the level split).
     Say which of their questions you matched to which upstream one.
   - Not found, and the upstream id is **free** → add it as shipped.
   - Not found, but the upstream id is **taken by a different question** → keep the user's entry
     untouched and add the upstream one under the **next free suffixed id** (`Q44` taken →
     `Q44a`/`Q51`, following whatever suffix style the file already uses). **Record the mapping
     in one line at the end of the section** so a later release can still find it, e.g.
     `<!-- upstream 1.3.0 Q44 (bar calibration) lives here as Q51 — id was taken -->`.
   - Add the header's **applicability-marker legend** (`⟨senior IC and up⟩`, the lead/staff+ marker,
     *conditional*) if absent — the new questions reference it, and without it the markers read
     as noise.
2. **Same treatment for `prep-checklist.md` rows 21–23** (delivery predictability · AI ROI &
   measurement · the delivery gate) **and for probes §5.6, §5.7, §6.6.** Match by subject, keep
   the user's numbering, append under a free number when theirs is taken. Prep plans and debriefs
   cite these by number — a renumber breaks every back-reference in `applications/`.
3. **Do NOT write the new §8 recall-card rows into a filled §8.** §8 and §9 stay untouchable
   (Tier B). Upstream's four new rows are `TODO(prep)` placeholders, and pasting placeholders into
   a card the user has armed is a regression. Instead **say which new probes are unarmed** (§5.6
   ambiguity, §5.7 upward pushback, §6.6 AI) so the next `interview-prep` run fills them.
   - §9 is mixed and the distinction matters: the **explanatory prose** above its table is engine
     — 1.3.0 adds a third kind of gap (**missing story types**) and that paragraph should be
     merged in. The **table rows** are the user's and are never rewritten.
4. **`profile/work-experience/_TEMPLATE.md` gains `## Distributed / ways of working`.** The
   template is Tier A, so it refreshes on its own — but the template is not where the answer
   lives, and **Q49 is unanswerable until the fact is in the real role files**, which are Tier C.
   - **Offer**, as its own confirmation line item, to append the empty section with a
     `TODO(user)` to each `profile/work-experience/<role>.md`. That is a permitted Tier-C
     restructure: **a new empty section only — never infer or write a site, a timezone or a
     working practice.** The user answers per role, or declines.
   - Declined, or left as TODOs → say plainly that Q49 will surface as a `TODO(user)` at the next
     prep rather than an improvised answer. That is the intended behaviour, not a failure.
   - *Already has the section in every role file? Do nothing.*
5. **Nothing else moves.** No file is renamed, split or deleted in 1.3.0, and no Tier-C **value**
   changes. If the user declines every optional step above, the engine refresh is still complete
   and correct — bump `VERSION` and say which offers they passed on.

### 1.3.0 → 1.4.0

1.4.0 is mostly **additive** — seven new files and a set of rule/gate additions — so the tier
rules carry most of it. Four things they cannot express:

> 🚨 **1. `styles/cv.css` has a real BUG FIX that a customized theme will otherwise miss.**
> Up to 1.3.0 the stylesheet ended with `h3, h3 + p, h4, h4 + ul { break-inside: avoid; }`.
> The `h4 + ul` clause makes an entire bullet list atomic, so a list starting near the bottom
> of a page is moved wholesale to the next one — stranding ~8 blank lines and pushing an
> otherwise 2-page CV onto a nearly-empty third page. The page-budget reporter then calls the
> CV "over budget" and sends the user trimming real content to fix a stylesheet bug.
>
> `cv.css` is **Tier B**, so a clone with an extracted theme is not overwritten — and that is
> exactly the clone that keeps the bug. **Apply this fix specifically, even to a customized
> theme.** It is structural, not cosmetic: it touches no color, font or size.
> ```css
> /* replace the single old rule with: */
> h3, h3 + p, h4 { break-inside: avoid; }
> h3, h4 { break-after: avoid; }
> li { break-inside: avoid; }
> ul { orphans: 2; widows: 2; }
> ```
> Say plainly that this changes page breaks, so an existing `cv.md` may re-render one line
> differently. **Never re-render a CV that has already been sent** — sent CVs are read-only.

**2. `profile/preferences.md` gains a row — and it is Tier C, so the update must ASK.**
1.4.0 introduces Golden Rule #15 (contribute engine learnings upstream), which reads a new
setting: **Upstream contributions** — `ask` (default) · `yes` · `no`.
- `preferences.md` is Tier C. **Do not write the row silently.** Ask the onboarding Step-10
  question (see `onboarding/steps/step-10-house-rules.md` → *upstream contributions*), then
  record the answer.
- If the user defers, say the default `ask` is in force — which is the safe behaviour anyway.
- ⛔ **Make sure the user hears that even `yes` never authorizes a PR on its own.** Every
  contribution still requires an explicit per-entry yes with the scrubbed text shown first.
  This is the one place a misunderstanding would publish something private to a public repo.

**3. Seven new files. All are additive; none replaces anything.**
| New file | Tier | Note |
|---|---|---|
| `styles/cover-letter.css` | A | makes `npm run cv:pdf` work on `cover-letter*.md`; theme-neutral |
| `styles/slides-build.mjs` + `styles/slides.css` | A / B | new `npm run slides:pdf`; `slides.css` duplicates the theme tokens — **if the clone has a customized `cv.css`, offer to copy its `:root` values into `slides.css`**, or decks render blue while the CV doesn't |
| `templates/slides-template.html` | A | |
| `applications/_shortlist.md` | B | if absent, offer as an empty template; if the user already keeps a shortlist under another name, **merge into theirs — don't create a second one** |
| `profile/published-writing.md` | B | if absent, offer as an empty template |
| `interviews/technical/system-design-checklist.md`, `coding-round-playbook.md`, `language-warmup-TEMPLATE.md` | A/B | 1.3.0's `technical/README.md` listed the first of these as a *"build this over time"* suggestion. **A clone that already built its own is Tier B: merge upstream's method around their content, never overwrite** — theirs encodes real debrief feedback |
| `upstream-sync/UPSTREAM-QUEUE.md` | B | new; scaffolding only on later updates |

Also add the new `package.json` script (`slides:pdf`). `package.json` is Tier A, so this
refreshes on its own — but **if the user added their own scripts, merge rather than overwrite.**

**4. Rule and gate additions — no identifier collisions this time.**
Unlike 1.3.0, nothing here is numbered in a user-extensible file except **one** row:
- `interviews/hiring-manager/prep-checklist.md` gains **row 22b** (timed cognitive/aptitude
  screening) and a **banner block** above the table. The row is deliberately suffixed rather
  than numbered `24` precisely so it cannot collide with a row the user added. **The
  match-by-meaning rule still applies** — if the clone already has an aptitude-test row under
  any number, keep theirs and merge upstream's content into it.
- `CLAUDE.md` (Tier B) gains **Golden Rule #15**, a rewritten **TODO-markers** convention, a
  **§2.5 step 6** (write the company into the shortlist's do-not-source table), and two repo-map
  lines. The TODO rewrite **replaces** the old one-line bullet — if the user customized that
  bullet, ask before replacing.
- `.claude/skills/interview-prep/SKILL.md` gains **step 1c** (re-read the sent CV) and **step
  5a** (banned ⏭ justifications). `.claude/skills/new-application/SKILL.md` gains the
  company-specific comp-lookup rule in step 6 and a shortlist line in step 0.
- `profile/stories/_TEMPLATE.md` gains a first-class `## Learning` section. **Existing story
  files are Tier C and are NOT restructured** — but say plainly that stories written before
  1.4.0 keep their learning folded into `## Result`, and offer to split them **one at a time,
  with the user confirming each**, since that means re-reading their own words.
- `profile/stories/_index.md` theme vocabulary gains `product-influence` and
  `stakeholder-management`. The vocabulary comment is scaffolding; **story rows are Tier C and
  are never re-tagged automatically.**

**5. Nothing is renamed, split or deleted in 1.4.0**, and no Tier-C value changes. If the user
declines every optional step above, the engine refresh is still complete and correct — bump
`VERSION` and say which offers they passed on.

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

## Contributing back — the PR-body contract (Golden Rule #15)

This section governs traffic in the **opposite direction**: a clone sending an engine
improvement **up** to [`IVIR3zaM/CareerCockpit`](https://github.com/IVIR3zaM/CareerCockpit).

### Before anything is written

1. **The entry is in `upstream-sync/UPSTREAM-QUEUE.md` and passes its scrub gate.** No company
   names, no comp figures, no story contents, no third-party details, no hardcoded
   user-specific values.
2. **The user has given an explicit yes to THIS entry**, having seen the exact scrubbed text.
   `profile/preferences.md` → *Upstream contributions* records willingness, **never
   authorization** — even `yes` means ask each time. No blanket approval, no consent carried
   over from a different entry.
3. **One PR per coherent entry.** Two unrelated fixes in one PR cannot be accepted or rejected
   independently, and the migration note below becomes unwritable.

### The contract — the PR body is written FOR AN AI AGENT

The reader that matters is not a human reviewer skimming a diff. It is **the agent running
`UPDATE.md` in someone else's clone**, six months later, that has to apply this change to a
repo full of a stranger's data without breaking any of it. That agent has the diff and the PR
body and nothing else. **A PR body that only explains the change to a human is incomplete.**

Every PR body MUST contain all seven sections, in this order:

```markdown
## What this changes
One paragraph, plain English. What behaviour is different after this merges.

## Why — the failure it prevents
The evidence, as an ANONYMOUS PATTERN. What went wrong, what it cost, and why the
existing rules did not catch it. Never drop this to make the PR shorter: a rule
with no evidence is the bare principle Golden Rule #13 says will not hold, and the
next maintainer will not know what they are protecting.

## Files touched, with their TIER
| File | Tier | Change |
|---|---|---|
| path | A / B / C | one line |
Tier is not decoration — it is the instruction for how a clone must apply this.
Anything touching a Tier-C path needs an explicit justification here, and Tier-C
VALUES are never changed by an update under any circumstances.

## New settings / variables
Any user-specific value this introduces, and the `profile/preferences.md` row that
holds it: name, allowed values, default. "None" if none. A rule that hardcodes a
level, a number, a currency or a country instead of reading a variable is not ready.

## Identifier impact
Does this add a numbered entry to question-bank.md, prep-checklist.md, or
sharpness-probes.md? If yes: state the ids, and state that the receiving clone must
match BY MEANING and never renumber the user's entries. If no: say "none" explicitly
— its absence is otherwise ambiguous.

## UPDATE.md migration note — COPY THIS VERBATIM INTO THE RELEASE
The exact prose to paste into UPDATE.md's `### X.Y.Z → X.Y.Z+1` block. Write it as
instructions to the updating agent, covering:
  - what to do when the target file is UNCHANGED in the clone (usually: refresh);
  - what to do when the user has CUSTOMIZED it (usually: merge around, ask on conflict);
  - what to do when the target file DOESN'T EXIST in the clone (offer it, or skip);
  - anything the agent must ASK the user rather than decide;
  - anything it must NOT do (never re-render a sent CV, never restructure Tier-C
    content, never renumber).
If this section is missing, the change ships into a release that cannot be safely
applied to an existing clone — which is the whole failure mode this contract exists
to prevent.

## Verification
How the change was actually tested, with the real output. For pipeline changes: the
render command and its result. For rule changes: the artifact that was produced under
the new rule. "Looks right" is not verification.
```

### After it merges

Update the queue entry's status to `merged` with the PR link, and — when the change lands in a
release — confirm the migration note actually made it into that release's `UPDATE.md` block.
**A merged PR whose migration note was dropped is worse than an unmerged one:** every clone
that updates into that release now has an engine change with no instructions for reconciling
it against the user's own layer.

---

## Notes
- **Resumable & safe:** the flow writes nothing until a confirmation, so an interrupted
  update leaves the clone untouched. Re-running it just re-computes the diff from `VERSION`.
- **No login, no scraping:** it only reads the public product repo. It never authenticates
  to anything on the user's behalf.
- **Downgrades:** not automatic. If a user needs to pin an older version, they check out the
  matching tag manually; the flow only moves forward.
