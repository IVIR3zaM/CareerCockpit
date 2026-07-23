# Step 1 — Git-save preference *(do this first)* (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 1); this is the full logic the agent follows. Obey the global onboarding
> invariants: **one step per re-prompt · one targeted question at a time · state in
> [`../CHECKLIST.md`](../CHECKLIST.md)**. This step decides **how the agent saves work to
> git** for the whole rest of onboarding and beyond, and records the choice where every
> future session reads it.

---

## Purpose

This cockpit is **Markdown files under git** — git *is* the audit log and the safety net.
So the very first thing to settle is **how work gets saved**: should the agent
**auto-commit and push** as it goes, or only commit **when the user explicitly asks**?

This runs **first on purpose** (ONBOARDING.md ordering note): every commit made during the
*rest* of onboarding — CV intake, profile population, company-fit, stories — already
respects the user's choice. Get it wrong and later steps either spam commits the user
didn't want or silently lose work the user assumed was saved.

> **Default is auto-commit-and-push, and that's deliberate.** The product is aimed at
> people who are *not* git experts (designers, PMs, ICs who never touch a terminal). For
> them, "nothing is ever lost" beats "tidy history." Technical users who want manual
> control just say so here.

---

## Inputs

- None required — this is a conversation. Optionally, knowledge of whether a **git remote**
  is already configured (you can check with `git -C . remote -v`), used only to fill in the
  remote situation below.

---

## The flow: ask mode → (if needed) check remote → record

### 1. Ask the one question (mode)
Ask a single, plainly-scoped question — do **not** bundle the remote question into it yet:

> "As we work, should I **auto-commit and push** your changes as we go — recommended, so
> nothing you tell me ever gets lost — or should I only commit **when you explicitly ask**?
> Either way, **before every save I'll show you a plain-English summary of exactly what I'm
> about to commit and wait for your OK** — I never push silently. The default is **auto**."

Make the two boundaries explicit so the choice is informed:
- **Confirm-before-push always.** In *both* modes the agent shows a plain-English "here's
  what I'm about to save" summary (which files, one line on why) and waits for a **yes**
  before any commit/push. This is a hard rule (CLAUDE.md §4), not a mode — it cannot be
  turned off here.
- **Reversible.** The user can switch modes anytime by saying so (which updates
  `profile/preferences.md`); this step just sets the starting default.

Map the answer to a mode value:
- "auto" / "yes, save as you go" / no strong preference → **`auto-commit-and-push`**
- "only when I ask" / "manual" / "I'll tell you when" → **`manual`**

### 2. If needed, ask about the remote (second question, one at a time)
Only after the mode is settled, and only if it matters (i.e. auto mode, or the user asked),
resolve where pushes go. Check first, then ask only what's still unknown:

> "Is there a **git remote** set up yet (somewhere I'd push to, like a GitHub repo)? If not,
> I'll **commit locally only** until you add one — your work is still saved on this machine,
> it just isn't pushed anywhere off it yet."

Record one of:
- **`configured`** — a remote exists; pushes go there (still confirm-before-push).
- **`none (commit locally only)`** — no remote yet; commits stay local until one is added.
  Offer a light `TODO(user)`: "add a remote when you want off-machine backup." Do **not**
  block onboarding on this, and do **not** create accounts or remotes for the user.

> **Never treat "no remote" as a failure.** Local commits are a complete safety net for
> onboarding; a remote is an enhancement the user can add whenever they like.

### 3. Record the decision (durable, committed)
Write the chosen **mode** and **remote situation** into **`profile/preferences.md`** — both
the *Current settings* table (the authoritative values) and a short *Decision log* entry
(the why/when). This is the single home for durable choices; `CLAUDE.md` §4 holds the
git-save *rule* and **reads the mode from here** — you do **not** edit `CLAUDE.md` for this
(consolidated 2026-07-23). The decision must outlive the session and live in the repo, not
agent memory (Golden Rule #8).

---

## What to write to `profile/preferences.md`

**Update the two placeholder rows** in the *Current settings* table (replace the
`TODO(onboarding)` values):

```markdown
| **Git-save mode** | `auto-commit-and-push` \| `manual` | Step 1 (git-save) | Always confirm-before-push in **both** modes — see CLAUDE.md §4. |
| **Git remote** | `configured` \| `none (commit locally only)` | Step 1 (git-save) | If none, pushes are on hold until a remote is added. |
```

**Append** to the *Decision log* a section like:

```markdown
## Git-save (Step 1)
- **Mode:** {auto-commit-and-push | manual} — recorded {YYYY-MM-DD}
- **Remote:** {configured | none — commit locally only}
- **Why:** {one line — e.g. "user prefers nothing lost" / "user wants manual control"}
- **Rule (both modes):** always show a plain-English summary and wait for confirmation before
  any commit/push (CLAUDE.md §4). Never push silently.
- **Follow-up:** {TODO(user): add a git remote for off-machine backup | none}
```

Future sessions: **read the *Current settings* table before committing.** In `manual` mode,
commit only when asked; in `auto-commit-and-push` mode, batch a coherent unit of work and
save it — but in **both** modes, summarize-and-confirm first.

---

## Saving *this* step's own record

This step sets the very policy that governs saving. Apply it immediately: once the decision
is recorded, if the mode is `auto-commit-and-push`, offer to commit `profile/preferences.md`
and the ticked `CHECKLIST.md` — showing the plain-English summary first and waiting for the
user's OK (respecting the rule this step just established). In `manual` mode, tell the user
the record is written and ask whether to commit it now.

---

## Outputs

- **`profile/preferences.md`** — *Current settings* rows for **Git-save mode** and **Git
  remote** filled in, plus a **Git-save (Step 1)** entry in the *Decision log* (the durable
  record future sessions read).
- No changes to `CLAUDE.md` (it reads the value from `preferences.md`).

---

## Done-criteria (tick the box when all true)

- [ ] The user was asked the mode question with **confirm-before-push (both modes)** made
      explicit and the default (auto) stated.
- [ ] The **remote situation** was resolved (configured, or "none — commit locally only")
      and the no-remote case handled without blocking.
- [ ] The chosen **mode + remote** are written into `profile/preferences.md` (both the
      *Current settings* table and a *Decision log* entry) — a committed file future sessions
      read, not agent memory.

Then tick Step 1 in [`../CHECKLIST.md`](../CHECKLIST.md), note in its cell the mode + remote,
and tell the user to re-prompt with **"continue onboarding"** — next is **Step 2 (CV intake
& template reconciliation)**.
