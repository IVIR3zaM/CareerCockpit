---
name: new-application
description: Set up a new job application folder from a JD or role description — jd.md, application.md, an _index.md row, a culture-fit check, and a comp-floor check. Use when the user says they are applying to a company, pastes a job description, or describes a role to pursue. Carries the mandatory repeat-applicant / pre-apply gate (Golden Rule #12).
---

# Create a new application

**All Golden Rules in `CLAUDE.md` still apply.** Step 0 is the mechanical enforcement of
Golden Rule #12 — run it BEFORE anything else and do not build a CV or fill a form until it
is cleared.

Trigger: *"I'm applying to X"*, the user pastes a JD, or describes a role.

0. **Repeat-applicant gate (MANDATORY — run BEFORE anything else; Golden Rule #12).** Scan
   `applications/_index.md` for any prior application to this company/role — and, **if email
   access is granted** (`profile/preferences.md` → Email access), search the user's mail for
   the company name too, since applications that predate this repo only exist there. If the
   user was **already rejected** here: pull the prior **date + reason**, tell the user, and
   decide together whether to proceed —
   - a **structural** prior reason (seniority, tenure, scope, domain depth — anything
     re-tailoring cannot change) is not beatable by a better-worded CV; don't spend one.
     Re-apply only if something **material** changed (new title/scope, real time elapsed, a
     different team or domain).
   - a **fixable positioning** prior reason (led with the wrong facet, echoed the JD, buried
     the match) is worth re-applying **only if the new CV genuinely fixes that exact thing** —
     say how, in `cv.notes.md`, before building.
   Record the outcome in the status log. If a prior application surfaced that isn't in
   `_index.md` yet, add its row while you're here.
1. Create folder `applications/<company>-<role-slug>/` (kebab-case, e.g.
   `stripe-eng-manager-payments`).
2. Save the raw JD to `jd.md` (**verbatim** — never edit a `jd.md`). If the user only
   described the role, capture what they said and mark unknowns as `TODO`.
3. Create `application.md` from `applications/_TEMPLATE/application.md`. Extract and fill:
   title, team, level, comp (base/equity/bonus if stated), location & **work mode**
   (remote / hybrid / onsite), interview **process steps**, key requirements, and
   source/link.
4. Append a row to `applications/_index.md`.
5. **Fit check:** score the role against `profile/company-fit.md` (the user's culture
   must-haves and deal-breakers) and record matches/mismatches in `application.md`. Flag any
   deal-breaker signals early — those are usually why the user is leaving their current role.
6. **Comp-floor check.** Read the user's floor from `profile/preferences.md` → *Comp floor*
   (with the full rule in `profile/basics.md` → Compensation). If it's still
   `TODO(onboarding)`, ask the user for it once and record it. Estimate whether this
   employer's band for this level actually reaches the floor — the published band if the JD
   states one, otherwise public salary data (Levels.fyi / Glassdoor / Ravio) plus any prior
   research in `interviews/company-research/`. Record a verdict in `application.md`:
   🟢 likely clears · 🟡 borderline · 🔴 likely below floor.
   **🔴 is not an auto-skip:** surface it and make *"ask the band on the first recruiter
   call"* the next action, rather than sinking a tailored CV and a full loop into a role that
   cannot pay. Apply any **target-role filter** the user recorded in `profile/preferences.md`
   (e.g. a level down-rank, or domains they've ruled out) in the same pass.
7. Ask the user if they want a tailored CV now (→ invoke the `tailored-cv` skill).
