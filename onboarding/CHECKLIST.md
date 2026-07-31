# CHECKLIST.md — Onboarding state + protocol (START HERE)

**This file is the onboarding entry point.** Read it, find the first unchecked step, open
**only that step's doc**, run it, tick the box, stop. You do not need `ONBOARDING.md` for a
normal turn — it holds the rationale and the cross-cutting sensitivities, and is worth
reading once at the start of onboarding or when something is ambiguous.

**Onboarding status:** ⬜ not started

## The protocol (non-negotiable)

1. **One step per re-prompt.** Never run two steps in one turn, even if you have enough info
   — batching burns context and breaks resumability.
2. **One targeted question at a time.** Never a wide-open "tell me everything about your
   career." The *only* batching allowed is a final confirmation list at the end of a step
   ("here's what I captured — correct?").
3. **Read only what this step needs** — this file + the one step doc. The Golden Rules
   (privacy/GDPR, never-fabricate, source-of-truth) are already in context from `CLAUDE.md`;
   the step docs don't repeat them.
4. **Write the step's outputs**, then **tick its box** here with a one-line note.
5. **Stop and tell the user to re-prompt** with **"continue onboarding"**, naming what's next.
6. **Quantify-or-TODO.** Ask a vague number once; if still unknown write `TODO(user)`, never
   a guess.
7. **Save per `CLAUDE.md` §4** — summarize in plain English and wait for a yes before any
   commit/push, in both modes.

**Resume:** state is entirely here, so a new session or a crash just re-reads this file and
continues from the first unchecked box. **Redo:** un-tick the box, re-run the step, re-tick —
and flag any later step that depended on it.

**Skipping:** some steps are optional (email access) or depend on an artifact the user may
not have (LinkedIn export). If the user skips or defers, **record that decision** (a
`TODO(user)` or a "declined" note) and tick the box as *handled* — a skipped-on-purpose step
is done, not pending. Never silently leave it unchecked.

| Done | # | Step | Doc | Notes (what happened / decision recorded) |
|---|---|---|---|---|
| [ ] | 1 | Git-save preference *(do this first)* | [step-01](steps/step-01-git-save.md) | |
| [ ] | 2 | CV intake & template reconciliation | [step-02](steps/step-02-cv-intake.md) | |
| [ ] | 3 | CV style choice (Blue vs extract-from-CV) | [step-03](steps/step-03-style-choice.md) | |
| [ ] | 4 | Populate `profile/` from the CV | [step-04](steps/step-04-populate-profile.md) | |
| [ ] | 5 | Email access decision *(optional)* | [step-05](steps/step-05-email-access.md) | |
| [ ] | 6 | LinkedIn export ingest | [step-06](steps/step-06-linkedin-ingest.md) | |
| [ ] | 7 | Company-fit interview | [step-07](steps/step-07-company-fit.md) | |
| [ ] | 8 | Generate the interview question set | [step-08](steps/step-08-question-set.md) | |
| [ ] | 9 | Story elicitation loop *(iterative)* | [step-09](steps/step-09-story-elicitation.md) | |
| [ ] | 10 | House-rules confirmation | [step-10](steps/step-10-house-rules.md) | |
| [ ] | 11 | Completion ("you're ready") | [step-11](steps/step-11-completion.md) | |

When every box is `[x]`, set **Onboarding status** to ✅ complete and show the completion
message + prompt menu (Step 11).
