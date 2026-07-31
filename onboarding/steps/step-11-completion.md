# Step 11 — Completion ("you're ready")

**Purpose:** verify the flow is genuinely finished, flip the checklist to ✅ complete so future
sessions don't re-drive onboarding, and hand the user the everyday prompt menu. This step asks
no career questions — it verifies and celebrates.

**Inputs:** [`../CHECKLIST.md`](../CHECKLIST.md). No user artifacts.

## The gate — verify before you celebrate

- Every row **1–10** is `[x]`. If any is `[ ]`, **stop**, name the first unfinished step, and
  point the user back to it. Don't tick Step 11.
- A skipped/deferred step counts as done **only if it was recorded as such**. A checked box
  with no record of what happened gets flagged, not accepted.
- Sanity-check the essentials exist: `profile/basics.md` is populated (not the bare skeleton),
  `profile/preferences.md` has the git-save mode, `styles/cv.css` exists. A missing core
  artifact gets surfaced, not papered over.

## What to do

1. **Flip the status header** in `CHECKLIST.md` to **`✅ complete`** and tick Step 11 with a
   note ("onboarded YYYY-MM-DD").
2. **Save** per the git-save mode in `profile/preferences.md` — plain-English summary, wait for
   confirmation, in **both** modes.
3. **Show the completion message** below.

## The completion message (template)

> Adapt the bracketed bits to what the user actually did. Don't fabricate — if a step was
> skipped, don't claim it was done.

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
      → I create the application, check for any prior application there, and log it.
  • "Make a CV for this one."
      → a tailored, PDF-ready CV drawn only from your profile.
  • "I have a new story / thing I did."
      → I route it into your profile and story bank.
  • "Get me ready for the <round> interview — I have <N> days."
      → a time-boxed prep plan, plus mock questions.
  • "I got emails about <application> — update it and tell me what to do."
      → I reconcile the replies and move the application forward.
  • "Here's how the interview went…"  /  "I got rejected."
      → a debrief and a root-cause post-mortem that feed every gap back into your prep.

Want to change something later? Say "re-do <step>" (e.g. "re-do my CV style") and I'll
re-run that onboarding step. Full rules live in CLAUDE.md.
```

**Menu ↔ workflow mapping (keep in sync — see the note below):**

| Prompt in the menu | What it triggers |
|---|---|
| "status" | `CLAUDE.md` §2.0 (cockpit status) |
| "Is this JD a match?" | `new-application` skill fit check + `profile/company-fit.md` |
| "I'm applying to <company>…" | `new-application` skill (incl. the repeat-applicant gate) |
| "Make a CV for this one." | `tailored-cv` skill (build + PDF) |
| "I have a new story / thing I did." | `CLAUDE.md` §2.4 router → `story-elicitation` skill |
| "Get me ready for the <round> interview." | `interview-prep` + `interview-question-generator` skills |
| "I got emails about <application>…" | application status log + email access (Step 5) |
| "Here's how the interview went…" / "I got rejected." | `interview-debrief` skill |

## Done when

- The gate passed, `CHECKLIST.md` reads **✅ complete**, and the message + menu were shown.

## Keeping the menu honest

This menu, the "what to say" list in the root [`../../README.md`](../../README.md), and the §2
workflow table in `CLAUDE.md` are **three views of the same capabilities** and must not drift.
If a future release adds, removes, or renames a workflow, update all three — the menu must
never advertise something the system can't do, or hide something it can.
