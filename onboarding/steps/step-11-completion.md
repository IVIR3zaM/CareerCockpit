# Step 11 — Completion ("you're ready") (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 11); this is the full logic the agent follows. This is the **final** onboarding step:
> it confirms every prior box is ticked, flips the checklist to ✅ complete, and hands the
> user the ready-to-use prompt menu. Obey the global onboarding invariants: **one step per
> re-prompt · state in [`../CHECKLIST.md`](../CHECKLIST.md)**. This step asks no career
> questions — it verifies and celebrates.

---

## Purpose

Onboarding turned an empty clone into a populated cockpit. This step:

1. **Confirms** the flow is genuinely finished (every step 1–10 is `[x]`).
2. **Marks** the checklist ✅ complete so future sessions don't re-drive onboarding.
3. **Hands over** the everyday prompt menu, so the user knows exactly what to say next.

After this step, the manual in [`../../CLAUDE.md`](../../CLAUDE.md) §2 governs normal use;
onboarding is done.

---

## Inputs

- [`../CHECKLIST.md`](../CHECKLIST.md) — the live state. Every step 1–10 must be checked
  (including any step the user *intentionally skipped or deferred* — those count as done,
  per the ONBOARDING.md skip/defer rule).
- No user-provided artifacts. No questions to ask.

---

## The gate — verify before you celebrate

Do **not** show the completion message until you have confirmed the flow is actually
complete. Read `CHECKLIST.md` and check:

- Every row **1–10** is `[x]`. If any is still `[ ]`, **stop** — tell the user which step is
  the first unfinished one, and point them back to it ("continue onboarding"). Do not tick
  Step 11.
- A skipped/deferred step is only "done" if it was recorded as such (a `declined`/`TODO(user)`
  note in the relevant file). If a box is checked but you find no record of what happened,
  flag it rather than treating it as complete.
- Sanity-check the essentials exist: `profile/basics.md` is populated (not the bare
  skeleton), `profile/preferences.md` records the git-save mode, and `styles/cv.css` exists.
  If a core artifact is missing despite its box being checked, surface it — don't paper over
  it.

Only when the gate passes do you proceed.

---

## What to do

1. **Flip the status header** in `CHECKLIST.md` from `⬜ not started` (or in-progress) to
   **`✅ complete`**, and tick Step 11's own box with a note (e.g. "onboarded YYYY-MM-DD").
2. **Save the work** per the user's git-save preference (`profile/preferences.md`) — show the
   plain-English "here's what I'm about to save" summary and wait for confirmation, in both
   auto and manual modes (never push silently).
3. **Show the completion message + prompt menu** below.

---

## The completion message (template)

> Adapt the bracketed bits to what the user actually did; keep it short and warm. Don't
> fabricate — if a step was skipped, don't claim it was done.

```
🎉 You're all set — CareerCockpit is onboarded and ready.

Here's what's in place:
- Your profile is populated in profile/ (source of truth for every CV and answer).
- CV style: {Blue theme | extracted from your CV}.
- Saving: {auto-commit-and-push | commit-when-you-ask} — I always show you what I'm
  about to save first.
{- Email access: connected / declined — as you chose.}
{- A baseline story bank and interview question set are ready.}

From now on, just talk to me in plain language. Some things you can say:

  • "status"
      → where every application stands, what's next, what's missing.
  • "Is this JD a match? [paste it or drop a link]"
      → a fit check against what you told me you want.
  • "I'm applying to <company> for <role> — here's the JD."
      → I create the application and log it.
  • "Make a CV for this one."
      → a tailored, PDF-ready CV drawn only from your profile.
  • "I have a new story / thing I did."
      → I route it into your profile and story bank.
  • "Get me ready for the <round> interview — I have <N> days."
      → a time-boxed prep plan, plus mock questions.
  • "I got emails about <application> — update it and tell me what to do."
      → I reconcile the replies and move the application forward.
  • "Here's how the interview went…"
      → a debrief that feeds every gap back into your prep.

Want to change something later? Say "re-do <step>" (e.g. "re-do my CV style") and I'll
re-run that onboarding step. Full rules live in CLAUDE.md.
```

**Menu ↔ workflow mapping (keep these in sync — see the note at the bottom):**

| Prompt in the menu | Workflow it triggers |
|---|---|
| "status" | CLAUDE.md §2.0 (cockpit status) |
| "Is this JD a match?" | §2.1 fit-check step + `profile/company-fit.md` |
| "I'm applying to <company>…" | §2.1 (create a new application) |
| "Make a CV for this one." | §2.2 (build a tailored CV) → §3 (PDF) |
| "I have a new story / thing I did." | §2.4 router (→ `profile/` and/or `stories/`) |
| "Get me ready for the <round> interview." | §2.3 (prep plan) + §2.5 (HM behavioral) |
| "I got emails about <application>…" | §2.1 status log + email access (Step 5) |
| "Here's how the interview went…" | §2.6 (interview debrief) |

---

## Outputs

- `CHECKLIST.md`: status header = **✅ complete**, Step 11 ticked.
- The completion message shown to the user (not written to a file — it's a hand-off).
- The final onboarding commit (per the git-save preference).

## Done when

- The gate passed (steps 1–10 all done), the checklist reads **✅ complete**, and the
  completion message + prompt menu have been shown to the user.

---

## Keeping the menu honest

The prompt menu here, the "Once you're onboarded — what to say" list in the root
[`../../README.md`](../../README.md), and the §2 workflows in `CLAUDE.md` are **three views of
the same set of capabilities** and must not drift. If a future iteration adds, removes, or
renames a workflow, update all three so the menu never advertises something the system can't
do (and never hides something it can). Every line above maps to a real, built workflow — no
aspirational prompts.
