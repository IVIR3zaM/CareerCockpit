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
- `upstream-sync/DEFERRED.md` — **scaffolding only.** Its rows are the user's answers and are
  never rewritten by a refresh; step 6 appends to them
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
| `CLAUDE.md` | your house-rule keep/drop/customize edits (onboarding Step 10), banned-phrase / date / comp tweaks, **and any Golden Rule you wrote yourself** | apply new/changed engine rules; keep every user customization. ⚠️ **Run [Rule reconciliation](#rule-reconciliation--never-let-an-update-duplicate-a-rule-the-user-already-has) first** — an incoming rule and a rule you wrote about the same failure share no wording, so they merge "cleanly" as duplicates under two numbers, and every `#N` citation elsewhere then points at the wrong half. **Never renumber a rule you wrote** |
| `styles/cv.css` | your extracted theme, if you chose "extract from my CV" (Step 3) | ⚠️ **Decide from the FILE'S CONTENT, never from `preferences.md` → CV theme.** The two disagree in practice (a theme extracted after onboarding, or a hand-edit, leaves the table stale), and trusting the table **overwrites a real custom theme**. Compare the `:root` values against `base`: unchanged → treat as Tier A; changed → **do not overwrite**, only offer structural fixes (a heading→CSS contract change, a page-break fix) and let the user accept. If the table and the file disagree, say so and offer to correct the table |
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
- `profile/projects/*.md`, `profile/stories/*.md`
- `profile/stories/_index.md` — **the story ROWS are Tier C and are never rewritten.** Its
  theme-vocabulary comment is engine scaffolding and may be edited **in place**. ⛔ Never
  byte-refresh this file from upstream, even when it currently matches: upstream's copy has an
  empty table, so a wholesale refresh **deletes every story row** the moment the user has one.
  Edit the vocabulary comment; leave everything else alone.
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

## Rule reconciliation — never let an update duplicate a rule the user already has

**The tiers say WHICH files to merge. This says what to do when an incoming rule and a rule the
user already wrote are about the same thing.**

A user who has been running this cockpit for a while writes rules from their own experience: a
Golden Rule after a rejection, a gate in a skill, a convention, a checklist row. The product
independently ships rules for the same failures — that is what the product is. So collisions
between "a rule you invented" and "a rule we shipped" are **normal and expected**, not an edge
case.

> ### ⛔ The default failure is "keep both." It is always wrong.
> Two rules covering the same ground do not add up to more safety — they **subtract** it.
> An agent reading two overlapping rules cannot tell which is authoritative, so it follows the
> nearer one, or averages them, or follows whichever it read last. Enforcement fragments
> exactly where the user cared enough to write a rule twice. And in `CLAUDE.md` the cost
> compounds: a duplicated Golden Rule takes a **new number**, and every `#7` / `#11` reference
> in the skills, the checklists and the case-study comments now points at the wrong half.
>
> **One failure mode ⇒ one rule.** Merging is the goal; appending is the thing to avoid.

⚠️ **This runs whether or not the user's rule was ever contributed upstream.** Provenance
markers (Golden Rule #15) are the *fast path* — an adopted, marked block is already known to be
upstream's and reconciles to a no-op. Everything **without** a marker still has to be matched
the slow way, below. Most users will never have contributed anything, and they are the ones
this section protects.

### 1. Detect — match on the FAILURE, not the wording

For every incoming rule, gate, convention or checklist row, first ask: **what does this stop
from happening?** Then scan the user's file for a rule that stops the *same* thing.

**Do not match on vocabulary.** A rule the user wrote after a real rejection and a rule the
product wrote from aggregate experience will describe the same failure in almost no shared
words — the user's says *"never lead with manager-of-managers scope on a first-line req"*, the
product's says *"lead with the facet the role is hiring for."* Same failure, no overlapping
phrase. A text diff sees two unrelated additions and appends both. **The diff is not the check;
reading for meaning is.**

Cheap way in: for each incoming rule, name its failure in one sentence, then grep the user's
file for the *situation* (a CV screen, a comp estimate, a skipped prep area), not the phrasing.

### 2. Classify — four outcomes, four different resolutions

| | What it looks like | What to do |
|---|---|---|
| **Duplicate** | same failure, same remedy | **Merge into ONE rule.** Keep the **user's position and number**; take whichever wording is more **mechanical** (a gate beats a principle — Golden Rule #13); keep the user's evidence. Never add a second rule. |
| **Overlap** | same failure, each covers part of it | **One rule, union of the remedies.** Usually the user's rule is narrower (born of one incident) and upstream's is broader — keep the broad statement and fold the user's specific trigger in as the sharp edge. |
| **Conflict** | same situation, **different required action** | **Never resolve silently — ask.** See below. |
| **Genuinely new** | a failure the user has no rule for | Adopt normally. This is the common case; don't over-think the other three into existence. |

### 3. Conflicts — ask, with the consequences spelled out

Do not present a conflict as *"keep yours or take theirs?"* — the user cannot answer that
without re-deriving both. Present: **what upstream requires · what your rule requires · what
actually happens differently under each.** One conflict per question.

Two defaults for when the user shrugs:
- **The user's rule wins**, because it is backed by a real event in *their* search while
  upstream's is an aggregate. Their evidence is the more specific evidence.
- **Unless upstream's is strictly stricter** — if upstream forbids a superset of what the
  user's rule forbids, take upstream's; nothing the user relied on is lost.

⛔ **Never weaken a user's rule to make it merge.** If the merged wording would permit something
their rule forbade, that is not a merge — say so and ask.

### 4. Golden Rules are NUMBERED — treat them like the question bank

`CLAUDE.md`'s Golden Rules have exactly the identifier problem as `question-bank.md`, and the
same fix applies:

- **Never renumber a user's Golden Rule.** The skills, the checklists and the inline
  `<!-- customized -->` comments all cite them by number; renumbering orphans every reference.
- **An incoming rule that duplicates a local one is merged into the local one's number** — not
  appended under a fresh number.
- **`L`-numbered rules are the user's own namespace** (`L1, L2, …`; see `CLAUDE.md` §1). They
  **can never collide** with an incoming `#N`, so adopt upstream's rule at its own number
  without a second thought about identifiers.
  ⚠️ **But still meaning-match it against every `L…` rule.** The namespace removes the
  *number* collision, not the *duplication* — and it removes the accidental tripwire that a
  colliding number used to provide, so a duplicate now appends **silently**. `L` rules are
  exactly the rules most likely to duplicate an incoming one, because both were written from
  the same real failures. Treat "no number collision" as **no information at all** about
  whether the rule is new.
  - If an `L` rule and an incoming `#N` are duplicates, **merge into the `L` rule** and keep
    its number — the user's citations point there. Record the alias:
    `<!-- merged 1.5.0: upstream #17 folded into L2; L2 is authoritative here -->`
  - If the user **contributed** that rule and upstream shipped it as `#N`, the provenance
    marker already carries `local L2 ⇄ upstream #N`. **Use the alias — don't re-derive it**,
    and re-point any stale citations mechanically.
- **If the user has their own rule at the number an incoming rule wants** — the legacy case,
  for clones that numbered their own rules before the `L` convention existed (e.g. they wrote
  their own `#15` and this release also ships a `#15`) — and the two are about **different**
  things: keep theirs at `#15`, add upstream's at the next free number, and **record the
  mapping in one line** so a later release can still find it:
  `<!-- upstream 1.4.0 GR #15 (upstream contributions) lives here as #17 — #15 AND #16 were both taken -->`
  (the example uses `#17` on purpose: take the next **actually free** number, which is often not
  the next integer — a well-used clone has several of its own rules.)
  **Do not "fix" this by renumbering their rule into `L`** — the convention is for *new* rules;
  re-pointing hundreds of existing citations is a large cosmetic change with real breakage
  risk. Freeze the past, namespace the future. You may **offer** it, once, as an optional
  cleanup and take no for an answer.
- Then **sweep for stale cross-references — IN THE USER'S OWN LAYER ONLY.** Re-point `#N`
  citations in their `<!-- customized -->` notes, their added checklist rows, their prep plans
  and debriefs. A dangling rule reference is worse than a missing rule: it reads as
  authoritative and points at the wrong thing.
  ⛔ **Do NOT edit Tier A engine files to re-point them.** `UPDATE.md`, the skills and the
  shipped checklists cite the **product's** numbering, which is correct for them and wrong to
  localize — and editing a Tier A file makes it differ from `new`, so the next update sees it
  as user-customized and stops auto-refreshing it forever. Instead record the alias once, in
  `CLAUDE.md` next to the moved rule, and read engine `#N` references through it.

### 5. Record every merge, in one line

A merge you don't record has to be re-derived at the *next* update, from prose that has since
drifted further apart. Leave the note where the merge happened:

```
<!-- merged 1.4.0: upstream's "lead with the JD-matching facet" folded into this rule;
     the manager-of-managers trigger below is the local layer. -->
```

That line is what makes the next reconciliation a lookup instead of another judgment call — the
same reason provenance markers exist, applied to rules the user never contributed.

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

**4. Rule and gate additions — one identifier collision, and it is in `CLAUDE.md`.**

> 🚨 **1.4.0 ships Golden Rule #15, and `#15` is the next free number a user would have taken.**
> Any clone that added its own fifteenth Golden Rule from experience — which is exactly what a
> well-used cockpit does — already has a `#15` about something else. Appending upstream's as a
> second `#15`, or renumbering the user's to `#16`, both break things: duplicate numbers make
> every `#15` citation ambiguous, and renumbering orphans the user's own cross-references.
>
> **Run [Rule reconciliation](#rule-reconciliation--never-let-an-update-duplicate-a-rule-the-user-already-has) on it:**
> - **Their #15 is about contributing improvements upstream too** → it is a **duplicate**.
>   Merge into **their** number, take whichever wording is more mechanical, keep their evidence.
>   Do not add a second rule.
> - **Their #15 is about something else** → keep theirs at `#15`, add upstream's at the next
>   free number, and record the mapping:
>   `<!-- upstream 1.4.0 GR #15 (upstream contributions) lives here as #17 — #15 AND #16 were both taken -->`
  (the example uses `#17` on purpose: take the next **actually free** number, which is often not
  the next integer — a well-used clone has several of its own rules.)
>   Then sweep the repo for `#15` citations that now mean the wrong rule.
> - Either way, **never renumber the user's rule.**

The rest of this release is additive with no identifier collisions except **one** checklist row:
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
- If local is newer than upstream → say so and stop (nothing to do).
- If they're equal → **do NOT stop yet.** A matching `VERSION` means the clone was *offered*
  that release; it does not mean the release was fully *applied*. Run the two cheap checks
  below, then say **"You're on the latest version (`X.Y.Z`)"** and stop:
  1. **Re-offer deferred items.** Read `upstream-sync/DEFERRED.md` (if present) and surface
     anything still open, exactly as it was offered before.
  2. **Content-drift check.** With `local == latest`, `base` and `new` are the same tree, so
     this is cheap and unambiguous: any **Tier A** file differing from `new` is either stale
     (an earlier update didn't finish) or user-edited. List them and offer to refresh. Do not
     touch Tier B or C here.

> 🚨 **Why equality is not a stopping condition.** `VERSION` is bumped in step 6 even when the
> user declines optional items — which the flow explicitly allows. Without the checks above,
> the sequence is: *decline → `VERSION` bumps → every future run short-circuits on equality →
> the declined item is never re-offered.* **"Not now" silently becomes "never,"** and the clone
> stays permanently half-applied with nothing left to notice it. The version string records
> **what was offered**; only the content records **what was applied.**

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
🚨 **Read the Migrations section from the UPSTREAM `UPDATE.md` you fetched in step 3 — NOT the
one in the clone you are updating.** The clone's copy is the *old* release's, so it cannot
contain the block for the release you are moving to: a clone on 1.3.0 has no `1.3.0 → 1.4.0`
section, and following "the Migrations section above" literally means **skipping every
migration, on every update, forever.** The instructions for a release always ship *with* that
release.

Read the **Migrations** section of the fetched `new` tree for every release between the local
version and the latest. A release with a migration block has **structural** changes the tiers can't express
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

### 4b. Reconcile provenance markers — BEFORE the tier pass
If this clone has ever contributed upstream (Golden Rule #15), it carries
`<!-- upstream: …#<PR> · status: … -->` markers on the blocks it contributed. **Resolve them
now, before the tier pass**, because the outcome decides how each of those blocks is treated:
one that resolves to `released` is upstream-owned and should refresh as a **no-op**, while one
that resolves to `declined` is purely local and must not be touched.

Full procedure — including the reworded-by-review case, which is the one that rots silently —
is in **[*Contributing back* → *Reconciling provenance markers*](#reconciling-provenance-markers-runs-during-every-update)**.
Report the resolutions in the step-5 summary as their own line items: the user contributed
these, and *"your PR shipped in this release"* / *"your PR was declined"* is news.

### 5. Apply per tier (one confirmation summary, then reconcile)
Build a single plain-English summary of the whole plan — migrations included — then work
through it:
- **Tier A:** for each engine file where `new` ≠ local, show the one-line change and, on the
  user's OK, overwrite. Batch the OK for the whole Tier-A set (it's non-destructive to data).
- **Tier B:** for each shared file, do the 3-way reconcile (`base` → `new` vs the user's
  file). Apply cleanly-mergeable engine changes; for any true conflict, **ask one targeted
  question at a time** ("Upstream changed the date-format rule to X; you'd customized it to
  Y — keep yours, take theirs, or combine?"). Write only after the answer.
  - ⚠️ **A clean 3-way merge is NOT the end of the check.** The 3-way merge only sees text.
    An incoming rule and a rule the user wrote themselves about the **same failure** usually
    share no wording at all, so they merge "cleanly" — as two rules — and the file now says
    the same thing twice, under two numbers. Before writing, run
    **[Rule reconciliation](#rule-reconciliation--never-let-an-update-duplicate-a-rule-the-user-already-has)**
    over every incoming rule, gate, convention or checklist row: match on the **failure**, then
    merge / union / ask / adopt. **One failure mode ⇒ one rule.**
- **A release that adds a NEW file — what "offer it" means.** Two cases, and they differ:
  - **Nothing else in the release references it** (a standalone template) → *offer*: describe
    it, create it only on a yes.
  - **The same release adds links TO it** from files you are refreshing — `CLAUDE.md`'s repo
    map, a skill step, another template → **create the scaffold as part of the refresh, and
    say so.** Declining would ship a `CLAUDE.md` with dangling references, which is a worse
    outcome than an unused empty file. An empty scaffold carries no user data and costs
    nothing; a broken pointer costs the next agent a wrong turn.
  - Either way it is an **empty scaffold**, never populated content — the same rule as a
    Tier-C restructure: create the shape, never infer a value.
- **Tier C:** skip entirely — **except** for a migration that explicitly restructures one
  (see above), which still never changes a value. If an upstream *skeleton* improved (e.g. a
  new field in `basics.md`'s template), you may **mention** it as an optional manual
  adoption, but never edit the file.

### 6. Bump the version and record it
- Set local `VERSION` to the new version.
- The upstream `CHANGELOG.md` is adopted as part of Tier A (so the user's log now shows the
  release they moved to).
- 🚨 **Write every declined or deferred item to `upstream-sync/DEFERRED.md`** — one line each:
  the release it came from, what was offered, and the user's answer (*declined* / *not now* /
  *unanswered because the flow couldn't reach them*). Create the file if absent.
  **This is what stops `VERSION` from lying.** The bump says the release was *offered*, not
  that it was fully applied, and every future run re-offers what is listed here (step 1).
  Without it, a "not now" is indistinguishable from "done" the moment the version matches.
  - Remove a line only when the item is actually applied, or the user declines it a second
    time and says to stop asking — then record *that*, so it isn't re-offered forever
    (`CLAUDE.md` §2.0: drop TODOs the user has declined twice; don't nag).

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
Does this add a numbered entry anywhere users also number their own — a Golden Rule
in CLAUDE.md, question-bank.md, prep-checklist.md, sharpness-probes.md? If yes:
state the ids, and state that the receiving clone must match BY MEANING and never
renumber the user's entries. If no: say "none" explicitly — its absence is
otherwise ambiguous.

## Does an existing rule already cover this?
Name the rule(s) in the current release that address the same failure, and say
whether this REPLACES, NARROWS, or is GENUINELY NEW alongside them. If you cannot
name any, say you looked.
This is the section that stops the product accreting two rules for one failure —
the same defect Rule reconciliation exists to keep out of user clones. A reviewer
cannot catch it, because the near-duplicate is usually in a different file and
shares no wording with what you wrote.

## UPDATE.md migration note — COPY THIS VERBATIM INTO THE RELEASE
⛔ Do NOT invent a version header. You are opening a PR; you do not know which
release will carry it (next minor? a patch? months later? never?). Write the note
body only, under the heading `## Migration note (release TBD)`. Whoever cuts the
release files it under the right `### X.Y.Z → X.Y.Z+1` block — they are the first
actor who actually knows the number.

Write it as instructions to the updating agent, covering:
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

### Adopt it locally too — immediately, not when it merges

**A contribution that isn't adopted locally leaves the clone holding a private, personalized
twin of a rule the product now also ships.** At the next update the flow must then work out
from prose alone that the incoming rule and the local one are the same rule — with no
identifier to match on — so it either asks unanswerable conflict questions or writes the rule
twice. Do it in the same edit as the PR: switch the local file to the generalized text, move
the personal evidence into a marked customization block under it, and add the provenance
marker described in Golden Rule #15.

⛔ **The marker names the PR, never a version.** A contributing clone knows its PR number the
moment it opens one; it cannot know the release, and a guessed version is wrong forever.

### After it merges

Update the queue entry's status to `merged` with the PR link, and — when the change lands in a
release — confirm the migration note actually made it into that release's `UPDATE.md` block.
**A merged PR whose migration note was dropped is worse than an unmerged one:** every clone
that updates into that release now has an engine change with no instructions for reconciling
it against the user's own layer.

### Reconciling provenance markers (runs during every update)

**The update flow is the only actor that knows which release contains a given change** — it
has the clone's `VERSION`, the upstream tree, and the `CHANGELOG`. So advancing a provenance
marker is its job, not the contributor's. During step 4, for every `<!-- upstream: …#<PR> -->`
marker in the clone whose status is not yet `released`:

1. **Look for the block in the fetched upstream tree.**
   - **Present** → the change shipped. Advance the status to **`released <the version being
     updated to>`**, and treat the block as **upstream-owned from now on**: it refreshes like
     any other engine text, and the marked customization block below it is the only part the
     user owns. This is the case that makes the whole scheme pay off — an adopted-and-marked
     block reconciles to a **no-op**, instead of a conflict prompt.
   - **Absent, PR still open** → still `proposed`. Leave it alone and say so; the user may
     want to chase the PR.
   - **Absent, PR closed unmerged** → the contribution was **declined**. Say so plainly, set
     the status to `declined`, and point out that the block is now **purely local** — the
     generalized wording has no upstream home, so the user may prefer to fold their personal
     evidence back into it. **Never delete it**; a declined contribution is still a rule the
     user relies on.
2. **Upstream took the idea but reworded it** — the common review outcome, and the one that
   silently rots. The local text no longer matches what shipped. **Adopt upstream's wording**
   (that is the one the next release will keep merging against), preserve the customization
   block untouched, and tell the user their wording was revised.

> **Why the marker is keyed on the PR and not the version:** the PR is the only identifier
> that exists at the moment the link is created, is globally unique across every clone, and
> stays resolvable whatever happens to the change afterwards — including "nothing ever
> happened to it." Local queue ids (`U13`) are *not* usable here: every clone numbers its own
> queue, so two users' `U13` are unrelated.

---

## Notes
- **Resumable & safe:** the flow writes nothing until a confirmation, so an interrupted
  update leaves the clone untouched. Re-running it just re-computes the diff from `VERSION`.
- **No login, no scraping:** it only reads the public product repo. It never authenticates
  to anything on the user's behalf.
- **Downgrades:** not automatic. If a user needs to pin an older version, they check out the
  matching tag manually; the flow only moves forward.
