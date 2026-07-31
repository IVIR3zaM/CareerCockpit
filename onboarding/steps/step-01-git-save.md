# Step 1 — Git-save preference *(do this first)*

**Purpose:** settle **how work gets saved** before anything is written — auto-commit-and-push
as we go, or commit only when asked. Every later step's commits respect this choice.

**Inputs:** none (a conversation). Optionally `git -C . remote -v` to see if a remote exists.

> **Default is auto, deliberately.** The product is aimed at people who are *not* git experts.
> For them, "nothing is ever lost" beats "tidy history." Technical users just say so here.

## 1. Ask the mode (one question)

> "As we work, should I **auto-commit and push** your changes as we go — recommended, so
> nothing you tell me ever gets lost — or should I only commit **when you explicitly ask**?
> Either way, **before every save I'll show you a plain-English summary of exactly what I'm
> about to commit and wait for your OK** — I never push silently. The default is **auto**."

Make two boundaries explicit so the choice is informed:
- **Confirm-before-push is not a mode** — it applies in both and can't be turned off here
  (`CLAUDE.md` §4).
- **Reversible** — they can switch anytime; this just sets the starting default.

Map: "auto" / "save as you go" / no preference → **`auto-commit-and-push`** · "only when I
ask" / "manual" → **`manual`**.

## 2. If it matters, ask about the remote (second question)

Only once the mode is settled. Check first, then ask what's still unknown:

> "Is there a **git remote** set up yet (somewhere I'd push to, like a GitHub repo)? If not,
> I'll **commit locally only** until you add one — your work is still saved on this machine,
> it just isn't pushed anywhere off it yet."

Record **`configured`** or **`none (commit locally only)`**. For the latter, add a light
`TODO(user)` ("add a remote when you want off-machine backup"). **Never treat "no remote" as
a failure**, never block onboarding on it, and never create accounts or remotes for the user.

## 3. Record

- `profile/preferences.md` → replace the `TODO(onboarding)` values in the **Git-save mode**
  and **Git remote** rows.
- `profile/decisions.md` → append a `## Git-save (Step 1)` section: decision + date, the
  user's one-line why, and any follow-up TODO.

Then **apply the policy to this step's own record**: in auto mode, offer to commit
`preferences.md` + `decisions.md` + the ticked checklist — summary first, wait for the OK. In
manual mode, say the record is written and ask whether to commit now.

## Done when

- [ ] The mode question was asked with confirm-before-push (both modes) and the default made
      explicit.
- [ ] The remote situation is resolved, with the no-remote case handled without blocking.
- [ ] Mode + remote are in `preferences.md`, the reasoning in `decisions.md` — committed
      files, not agent memory.

Tick Step 1 in [`../CHECKLIST.md`](../CHECKLIST.md) noting mode + remote, and ask the user to
re-prompt with **"continue onboarding"** — next is **Step 2 (CV intake)**.
