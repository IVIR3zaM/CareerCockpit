# CHECKLIST.md — Onboarding state (live, resumable)

This file is the **single source of onboarding state**. The agent reads it to find the
first unchecked step, does **only that step**, ticks the box, and asks the user to
re-prompt with **"continue onboarding"**. See [`ONBOARDING.md`](ONBOARDING.md) for the full
protocol and per-step logic.

- `[ ]` = not started · `[x]` = done (incl. intentionally skipped/deferred — note it)
- Steps run **top to bottom**. To redo a step, un-tick it, re-run it, re-tick it.
- **One step per re-prompt. One targeted question at a time.**

**Onboarding status:** ⬜ not started

| Done | # | Step | Iteration | Notes (what happened / decision recorded) |
|---|---|---|---|---|
| [ ] | 1 | Git-save preference *(do this first)* | I14 | |
| [ ] | 2 | CV intake & template reconciliation | I05 | |
| [ ] | 3 | CV style choice (Blue vs extract-from-CV) | I06 | |
| [ ] | 4 | Populate `profile/` from the CV | I07 | |
| [ ] | 5 | Email access decision *(optional)* | I08 | |
| [ ] | 6 | LinkedIn export ingest | I09 | |
| [ ] | 7 | Company-fit interview | I10 | |
| [ ] | 8 | Generate the interview question set | I11 | |
| [ ] | 9 | Story elicitation loop *(iterative)* | I12 | |
| [ ] | 10 | House-rules confirmation | I13 | |
| [ ] | 11 | Completion ("you're ready") | I15 | |

When every box above is `[x]`, set **Onboarding status** to ✅ complete and show the
completion message + prompt menu (Step 11).
