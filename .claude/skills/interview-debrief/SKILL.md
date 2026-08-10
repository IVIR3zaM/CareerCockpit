---
name: interview-debrief
description: Close the loop after an interview or a rejection — run the interview debrief and/or the rejection post-mortem, route gaps back into the repo, diagnose the root-cause failure class, then archive the closed application. Use whenever the user reports how an interview went, OR reports (or an email sweep surfaces) a rejection — even a silent, no-feedback CV-screen rejection. Carries the mandatory rejection post-mortem (Golden Rule #13) and the close-out to applications/_archive/ (Golden Rule #14).
---

# Interview debrief + rejection post-mortem

**All Golden Rules in `CLAUDE.md` still apply.** The post-mortem is the mechanical
enforcement of Golden Rule #13 and runs on **every** rejection, including silent,
no-feedback CV-screen ones.

## Interview debrief (close the loop)
Trigger: the user reports how an interview went — *always* run this, especially after a
rough one.

1. Create `applications/<...>/interview-prep/<round>-debrief.md` from
   `applications/_TEMPLATE/interview-prep/_debrief-TEMPLATE.md` and fill it from what the
   user tells you (ask for: questions actually asked, what went well/badly, where they were
   caught unprepared).
2. **Route every gap back into the system:**
   - New/unexpected questions → `interviews/hiring-manager/question-bank.md`.
   - A **short calibration probe** that caught the user out in a **management/lead round** — a
     one-fact question they couldn't answer instantly ("how many reports?", "how long from
     merge to production?", "when did you last…?") → `interviews/hiring-manager/sharpness-probes.md`:
     add the probe if it's new, and log the missing fact in its §9 gap list. *(That file is
     lead-round only — a question from an IC round goes to the question bank instead, even if
     it has the same short shape.)*
   - A whole missing topic area → `interviews/hiring-manager/prep-checklist.md`.
   - Missing facts/metrics → the right `profile/` file (route per `CLAUDE.md` §2.4).
   - A new anecdote → `profile/stories/` (use the `story-elicitation` skill).
3. Update the application's status log and `applications/_index.md`.

This is the mechanism that makes prep better with every real interview — a gap should never
bite twice.

## Rejection post-mortem (EVERY rejection — even silent, no-feedback CV-screen no's)
Trigger: the user reports a rejection, **or** an email sweep surfaces one. It runs **even
when there is no feedback at all** — most CV-screen rejections are boilerplate, and the
absence of a stated reason is not an excuse to skip the diagnosis. If the rejection followed
an interview, run the debrief above as well; this adds the *why-were-we-rejected* layer.

1. **Diagnose the cause (don't wait for feedback to be handed to you).**
   - Read the rejection message for any real signal; if it's boilerplate, say so.
   - **Reconstruct it:** open `jd.md` **beside** the sent `cv.md` / `application-answers.md`
     and re-read for the specific mismatch. Check **timing** (same-day/screen vs. days later
     vs. post-interview → did a human ever engage?), a **prior rejection** from the same
     company/reader (Golden Rule #12), and **comp**.
   - Write the most likely cause plainly in the status log; label each cause **KNOWN**
     (stated by them) or **INFERRED** (your reconstruction). Rule out non-causes explicitly
     ("comp was not the cause — form screen, no comp question").
2. **Name the failure class** in one line — e.g. *over-leveled lead (#11)*, *structural
   tenure/scope gap*, *repeat-applicant (#12)*, *JD-echo (#7)*, *answer-intent miss (#10)*,
   *coding round*, *comp floor*, *domain mismatch*. The class is what you track, not the
   single company.
3. **Check recurrence** against the **failure-class ledger at the top of
   `applications/_archive/_index.md`** — that table exists for exactly this step — plus
   `applications/_index.md` and prior debriefs. 🗄️ **Past rejections are in the archive, not
   the active index (Golden Rule #14)** — checking only `applications/_index.md` makes a
   recurring class look brand new. **A class that recurs after it was already "fixed" means
   the previous correction did not hold** — don't just re-note it; escalate to a stronger,
   more mechanical guard.
4. **Route the correction** so the class can't easily repeat:
   - Wrong facts or framing in the profile → the right `profile/` file (`CLAUDE.md` §2.4).
   - A CV/answer/positioning defect → tighten the relevant **gate** (the `tailored-cv`
     skill's JD-echo / positioning gates, or the answer-intent gate in `CLAUDE.md` §2.2b).
   - A **systemic** failure with no gate that would have caught it → **draft a new or amended
     golden rule** and put it to the user.
   - A sourcing/target-selection defect → `profile/basics.md` "Target roles" or
     `profile/company-fit.md`, and the target-role filter in `profile/preferences.md`.
5. **Record & surface:** the status log and the `_index.md` row get the diagnosis, the failure
   class, and the correction shipped; tell the user what you changed and why. Prefer a
   **mechanical** fix (gate / read-back / checklist step) over a remembered principle —
   principles get forgotten.
6. **Close out and archive (MANDATORY — Golden Rule #14).** A rejection is not finished until
   the application is archived. Run **`CLAUDE.md` §2.5**: `git mv applications/<slug>
   applications/_archive/<slug>`, move the `_index.md` row **verbatim** into the archive table,
   fix the row's relative links and any inbound links, and **add this occurrence to the
   failure-class ledger** at the top of `applications/_archive/_index.md`.
   ⚠️ **Order matters** — steps 1–5 write into the application folder, and the archive is
   **read-only history** afterwards. Diagnose first, archive last.

The goal is not to explain a loss; it's to make **that class of loss** hard to repeat.
