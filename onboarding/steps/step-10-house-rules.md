# Step 10 — House-rules confirmation

**Purpose:** let the user **keep / drop / customize** the rules that are matters of taste,
writing the result back into their own [`../../CLAUDE.md`](../../CLAUDE.md) — so the clone
feels like theirs — while protecting the small set of rules the whole system rests on.

> **Two-tier model — read before touching anything.**
> - **🔒 Locked (core)** rules can be *explained* and *made stricter*, **never dropped or
>   weakened**. If the user pushes to remove one, explain what it protects and offer a
>   *stricter* variant.
> - **⚙️ Customizable** rules are genuinely the user's call: keep, drop, or customize.
>
> Mark each cluster's tier so the user knows which of the three choices actually apply.

**Inputs:** `CLAUDE.md` and the files it points to; plus earlier decisions in
`profile/preferences.md` — **don't re-ask what a prior step settled.** Git-save mode belongs to
Step 1 and CV theme to Step 3 (to change either, redo that step). Use **Manages people** to
decide whether the leadership clusters are worth surfacing at all.

## The walk — one cluster per turn

Frame it once, briefly:

> "Your clone runs on a set of house rules. Most are fixed guarantees — I'll flag those so you
> know they're there. A handful are down to your taste, and I'll ask you to keep, drop, or
> tweak each one — one at a time. A few are already set from earlier steps, so I'll skip
> those. Here's the first:"

For each **⚙️** cluster ask explicitly *"**Keep** as-is, **drop**, or **customize**?"* and
wait. For each **🔒** cluster, don't offer drop — state it in one line, note it can be made
*stricter*, and move on. Write each decision into `CLAUDE.md` **as you go**, so the step is
resumable mid-walk.

### 🔒 1. The Golden Rules floor
`CLAUDE.md` §1: source-of-truth, never-fabricate, tailor-don't-rewrite (reverse-chronological,
no date gaps), no JD-borrowing, one-fact-one-home, repo-not-agent-memory, and the enforcement
gates (#10–#13).

> *"These stay on — they're what keeps your CV honest and consistent. You can't turn them off,
> but tell me if you ever want them stricter."*

Only allowed change: **stricter** (e.g. "always ask before writing any number, even ratioed"),
recorded as an addendum.

### 🔒 2. Privacy / GDPR / confidentiality floor
`CLAUDE.md` §1.9: no third-party real names, no sensitive attributes, no employer-confidential
specifics, contents *and* filenames, never edit a `jd.md`.

This is the one place tuning is explicitly invited — but **upward only**:

> *"Default is aliasing every third party and keeping employer numbers generic/ratioed. Want to
> go stricter — never store any past-employer metric at all, or alias company names too?"*

**Never** offer to allow real third-party names or confidential specifics. A request to relax
below the floor is declined and recorded as declined.

### ⚙️ 3. Banned outward-facing phrases
`CLAUDE.md` §4 discourages self-claimed trait adjectives ("low ego", "humble", "rockstar",
"10x", "passionate") in favour of observable behaviours.

> *"Keep the default banned-phrase list, drop the whole rule, or customize it — add your own
> pet-peeve words, or remove ones you're fine with?"*

Write their list into §4 (replacing the examples, keeping the "name the observable behaviour"
guidance and the `jd.md` / already-sent-CV exception). **Dropping means "don't enforce a
list," not "trait-claims are encouraged."**

### ⚙️ 4. Date format & other conventions
Dates `YYYY-MM`, kebab-case slugs, YAML frontmatter, status values, `TODO(user):`,
ask-when-unsure.

> *"Dates default to `YYYY-MM` (e.g. `2026-07`). Keep that, or prefer `MMM YYYY` (`Jul 2026`)
> or full `YYYY-MM-DD`?"*

A format change applies to **new writes** — offer to re-normalize existing `profile/` dates
rather than silently rewriting them. The other conventions are rarely worth changing; mention
they exist and customize only on request. `ask-when-unsure` is locked in spirit (it's
never-fabricate wearing a different hat).

### ⚙️ 5. Comp handling default
> *"By default I store comp as a shape (base floor, equity appetite) rather than exact
> figures. Keep that, or would you rather I save your actual target numbers?"*

If they want numbers stored, that's a **setting** in `preferences.md`, not a rule change — and
a past employer's confidential comp data still stays out under the §1.9 floor.

### ⚙️/🔒 6. Leadership-gated content
The cautionary framing rules (no date gap, don't relabel a team/role to match a JD) are
**locked** — they're §1 guarantees restated. The people-leadership content is **gated**:

- **IC who doesn't manage people:** confirm in one line — *"You're not managing people, so I'll
  skip the manager-behavioural track (PIP, hiring/firing stories) unless a specific round calls
  for it. Good?"* Record it; **don't delete** anything (a future role may need it) — it's
  dormant, not gone.
- **Manages people:** nothing to change.

## Writing customizations back

- **Edit in place, minimally** — only the line/list the user customized; leave structure,
  section numbers, and locked rules intact.
- **Mark user changes** so they survive an update:
  `<!-- customized during onboarding (house-rules, {YYYY-MM-DD}): user's own banned list -->`
  (`UPDATE.md` treats `CLAUDE.md` as Tier B and merges *around* these.)
- **Never weaken a 🔒 rule** — stricter addenda only; a declined request gets recorded.
- Keep the `jd.md` exception intact wherever a phrasing/format rule is edited.

Nothing entering `CLAUDE.md` or the records may contain third-party names or
employer-confidential data — a banned-phrase example is fine, a colleague's name is not.

## One last question — upstream contributions (Golden Rule #15)

Ask it plainly, as its own question:

> *"As we work, some of what we learn won't be about you at all — it'll be a fix to how this
> toolkit itself works: a tightened rule, a new checklist row, a stylesheet bug. I can offer
> those back to the open-source CareerCockpit project so other people get them too. They'd be
> **generalized and scrubbed first** — no company names, no comp figures, no stories, and any
> value specific to you becomes a setting instead. **I'd show you the exact text and ask
> before every single one.** Do you want me to (a) ask you each time, (b) treat you as
> willing in principle — I'd still ask each time — or (c) keep everything local?"*

Record the answer in `profile/preferences.md` → **Upstream contributions** (`ask` / `yes` /
`no`; default `ask`). Make sure the user hears that **even `yes` still means asking per
entry** — this setting is willingness, never authorization, because a PR publishes to a
public repo permanently.

## Record

- `profile/preferences.md` → any setting the user changed (comp handling, a non-default date
  format, **Banned phrases** if customized, **Upstream contributions**).
- `profile/decisions.md` → `## House rules (Step 10)`: date, what was kept / customized /
  dropped, which locked clusters were surfaced unchanged, any *declined* relaxation request,
  and the manages-people gate outcome.

Deferring leaves `CLAUDE.md` at its defaults — record it and note the defaults are in force.

## Done when

- [ ] Each cluster was surfaced **one at a time** with its tier clear, and every ⚙️ cluster got
      a keep/drop/customize decision.
- [ ] No 🔒 rule was dropped or weakened; changes to them were *stricter* only.
- [ ] Customizations are in `CLAUDE.md` — minimal, in place, marked inline — with the `jd.md`
      exception preserved.
- [ ] Decisions are recorded (or the step was deferred and that's recorded).

Tick Step 10 in [`../CHECKLIST.md`](../CHECKLIST.md) noting what was kept/customized → next is
**Step 11 (completion)**.
