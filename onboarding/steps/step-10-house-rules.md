# Step 10 — House-rules confirmation (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 10); this is the full logic the agent follows. Obey the global onboarding invariants:
> **one step per re-prompt · one targeted question (here: one rule *cluster*) at a time ·
> state in [`../CHECKLIST.md`](../CHECKLIST.md)**. This step walks the user through the
> operating rules that govern their clone and lets them **keep / drop / customize** each one,
> writing the result back into their own [`../../CLAUDE.md`](../../CLAUDE.md).

---

## Purpose

`CLAUDE.md` is the operating manual the agent obeys every session. It ships with sensible
defaults, but a few rules are **matters of taste or personal policy** (banned phrases, date
format, how strict to be about privacy). This step makes those the **user's** choices instead
of the product's defaults — so the clone feels like theirs — while protecting a small set of
rules that are **the soul of the system and cannot be dropped**.

The output is a `CLAUDE.md` that reflects the user's decisions, plus a decision record in
`profile/preferences.md` so future sessions know this step ran and why the manual reads the way
it does.

> **Two-tier model — read this before touching anything.**
> - **🔒 Locked (core) rules** can be *explained* and *made stricter*, but **never dropped or
>   weakened**. They are the guarantees the whole system rests on. If the user pushes to remove
>   one, explain what it protects and offer a *stricter* variant — never delete it.
> - **⚙️ Customizable rules** are genuinely the user's call: keep as-is, drop, or customize.
>
> Present each cluster with its tier clearly marked so the user knows which of the three
> choices actually apply.

---

## Inputs

- **`CLAUDE.md`** (the target of edits) and the rule files it points to
  (`interviews/hiring-manager/*`, `styles/`, the templates).
- Earlier onboarding decisions already recorded in `profile/preferences.md` — **do not re-ask
  what a prior step settled.** Specifically:
  - **Git-save mode** is owned by Step 1 (git-save). Do **not** re-litigate it here; if the
    user wants to change it, point them to redo Step 1.
  - **CV theme** is owned by Step 3 (style). Same — not this step's job.
- If `profile/basics.md`/`preferences.md` say whether the user **manages people**, use it to
  decide whether the leadership-related cautionary rules are even worth surfacing.

---

## The flow: walk one rule cluster per turn → keep / drop / customize → write back

Frame it once, briefly (not a wide-open prompt):

> "Your clone runs on a set of house rules. Most are fixed guarantees — I'll only flag those so
> you know they're there. A handful are down to your taste, and I'll ask you to keep, drop, or
> tweak each one — one at a time. A few are already set from earlier steps, so I'll skip those.
> Here's the first:"

Then walk the clusters below **one per turn**. For each **⚙️ customizable** cluster, offer the
three options explicitly and wait:

> "**Keep** it as-is, **drop** it, or **customize** it?"

For each **🔒 locked** cluster, don't offer drop — state it in one line, note the user can make
it *stricter*, and move on unless they want a change. Write each decision back into `CLAUDE.md`
**as you go** (so the step is resumable mid-walk — the file itself is the progress marker).

---

## The rule clusters (walk in this order)

### 🔒 1. The Golden Rules floor *(locked — surface, don't offer to drop)*
The load-bearing guarantees in `CLAUDE.md` §1: **source-of-truth** (every claim traces to
`profile/`), **never fabricate** (no invented metrics/dates/titles), **tailor-don't-rewrite /
reverse-chronological, no date gaps**, **no JD-borrowing** (the CV says only what the user did),
**one-fact-one-home**, and **the repo — not agent memory — is the source of truth**.

- One line to the user: *"These stay on — they're what keeps your CV honest and consistent.
  You can't turn them off, but tell me if you ever want them stricter."*
- **Only allowed change:** stricter (e.g. "always ask before writing any number, even ratioed").
  Record a stricter variant as an addendum; never weaken.

### 🔒 2. Privacy / GDPR / confidentiality floor *(locked — but strictness is tunable UP)*
`CLAUDE.md` §1.9: **no third-party real names** (alias to a role), **no sensitive attributes**
of third parties, **no employer-confidential specifics**, applies to contents *and* filenames,
and **never edit a `jd.md`**.

- This is the one place the spec explicitly invites tuning **privacy strictness** — but only
  **upward from the floor**, never below it. Offer, one question at a time:
  - *"Default is aliasing every third party and keeping employer numbers generic/ratioed. Want
    to go stricter — e.g. never store any past-employer metric at all, or alias companies too?"*
- **Never** offer to allow real third-party names or confidential specifics. If the user asks
  to relax below the floor, decline and explain it's a hard GDPR/confidentiality guarantee.
- Record any *stricter* choice as a customization line in `CLAUDE.md` §1.9 and note it in the
  preferences log.

### ⚙️ 3. Banned outward-facing phrases *(customizable)*
`CLAUDE.md` §4 discourages **self-claimed trait adjectives** in CVs / cover letters / prepared
answers ("low ego," "humble," "rockstar," "10x," "passionate") in favour of observable
behaviours. The default list is a starting point.

- Ask, one at a time:
  - *"Keep the default banned-phrase list, drop the whole rule, or customize it — add your own
    pet-peeve words, or remove ones you're fine with?"*
  - If **customize**: collect the user's additions/removals **one item at a time** if the list
    is long; confirm the final list.
- Write the user's list into `CLAUDE.md` §4 (replace the example list with theirs; keep the
  "name the observable behaviour instead" guidance and the `jd.md` / already-sent-CV exception).
- **Even if dropped**, keep the neutral principle available; dropping means "don't enforce a
  banned list," not "trait-claims are now encouraged."

### ⚙️ 4. Date format & other conventions *(customizable)*
`CLAUDE.md` §4 conventions: **dates `YYYY-MM`** (`Present` for current), **kebab-case slugs**,
**YAML frontmatter**, **application status values**, **`TODO(user):` marker**, **ask-when-unsure**.

- The one most people have an opinion on is **date format**. Ask:
  - *"Dates default to `YYYY-MM` (e.g. `2026-07`). Keep that, or prefer another format like
    `MMM YYYY` (`Jul 2026`) or full `YYYY-MM-DD`?"*
  - If customized, update the §4 dates convention line **and** flag that the CV template/CSS
    render dates as written — a format change applies to new writes, not a silent rewrite of
    existing files (offer to re-normalize existing `profile/` dates if any exist).
- The status vocabulary, slug style, and `TODO(user)` marker are rarely worth changing — mention
  they exist and only customize on request. Leave `ask-when-unsure` locked in spirit (it's the
  never-fabricate rule wearing a different hat).

### ⚙️ 5. Comp handling default *(customizable)*
`profile/company-fit.md` / §1.9 default: comp is recorded as a **frame/shape**, not a stored
figure, unless the user asks. Some users want their target numbers saved for negotiation prep.

- Ask: *"By default I store comp as a shape (base floor, equity appetite) rather than a number.
  Keep that, or would you rather I save your actual target figures?"*
- If they opt to store numbers, record the preference in `profile/preferences.md` (a setting,
  not a CLAUDE.md rule change) — and still **never** store a past employer's confidential comp
  data (that stays under the §1.9 floor).

### ⚙️/🔒 6. Cautionary/leadership framing rules *(mostly locked; leadership parts gated)*
The generic cautionary rules distilled into `CLAUDE.md` (no-date-gap check, don't relabel a
team/role to match a JD) are **locked** — they're §1 guarantees restated. The
**people-leadership** workflow (§2.5) is **gated**: it applies only if the user manages people.

- If Step 2 recorded the user as an **IC who doesn't manage people**, confirm one line:
  *"You're not managing people — I'll skip the manager-behavioural prep track (PIP, hiring/
  firing stories) unless a specific round calls for it. Good?"* Record the confirmation; do not
  delete §2.5 from the manual (a future role may need it) — just note it's dormant.
- If they **do** manage people, leave §2.5 active; nothing to change.

---

## Writing customizations back into `CLAUDE.md`

- **Edit in place, minimally.** Change only the specific line/list the user customized; leave the
  surrounding structure, section numbers, and locked rules intact.
- **Mark user changes** so they're visible later. After a customized rule, add a short inline
  note, e.g.:
  `<!-- customized during onboarding (house-rules, {YYYY-MM-DD}): user's own banned list -->`
- **Never weaken a 🔒 locked rule.** Stricter addenda only. If a requested change would drop a
  core guarantee, decline and record the request as declined in the preferences log.
- Keep the `jd.md` exception intact wherever a phrasing/format rule is edited (a `jd.md` is the
  company's verbatim text and is never rewritten).

---

## What to write to `profile/preferences.md`

Append a decision-log section so future sessions know how the manual was tuned:

```markdown
## House rules (Step 10)
- **Decision:** reviewed — recorded {YYYY-MM-DD}
- **Kept as default:** {list clusters kept}
- **Customized:** {e.g. banned-phrase list → user's own; date format → `MMM YYYY`; privacy → stricter (alias companies)}
- **Dropped:** {clusters the user dropped, or "none"}
- **Locked (surfaced, unchanged):** Golden Rules floor, privacy/GDPR floor.
- **Manages people:** {yes → §2.5 active | no → §2.5 dormant}
```

Add a **Current settings** row for any choice that later sessions must read at a glance (e.g.
comp handling `frame | numbers`, date format if non-default).

If the user wants to skip this step, record `Decision: deferred` and leave `CLAUDE.md` at its
defaults — a deliberate skip is done, but note the defaults are in force.

---

## Privacy & house rules on write (this step, too)

- This step edits `CLAUDE.md` and appends to `profile/preferences.md` — **no third-party names,
  no employer-confidential data** should enter either. A user's banned-phrase example is fine;
  a real colleague's name is not.
- Do not let a user's customization requests reach *below* the privacy/GDPR floor or disable the
  never-fabricate / source-of-truth guarantees — those are locked (see the two-tier model).

---

## Outputs

- **`CLAUDE.md`** — updated to reflect the user's keep/drop/customize decisions (customized
  rules marked inline; locked rules unchanged or made stricter).
- **`profile/preferences.md`** — a **House rules (Step 10)** decision-log section (and any new
  *Current settings* rows) future sessions read.

---

## Done-criteria (tick the box when all true)

- [ ] Each rule cluster was surfaced **one at a time**, with its tier (🔒 locked / ⚙️
      customizable) made clear; the user gave a keep/drop/customize decision for every
      customizable cluster.
- [ ] No 🔒 locked rule (Golden Rules floor, privacy/GDPR floor) was dropped or weakened; any
      change to them was *stricter* only.
- [ ] Customizations were written back into `CLAUDE.md` (minimal, in-place, marked inline) and
      the `jd.md` exception was preserved wherever a phrasing/format rule was edited.
- [ ] The decisions are recorded in `profile/preferences.md` (House rules section + any Current
      settings rows) — or the step was **deferred** and that is recorded.

Then tick Step 10 in [`../CHECKLIST.md`](../CHECKLIST.md), note in its cell what was kept/
customized (or "deferred"), and tell the user to re-prompt with **"continue onboarding"** —
next is **Step 11 (completion — "you're ready")**.
