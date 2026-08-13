---
name: new-application
description: Set up a new job application folder from a JD or role description — jd.md, application.md, an _index.md row, a culture-fit check, a comp-floor check, and a core-capability gap check. Use when the user says they are applying to a company, pastes a job description, or describes a role to pursue. Carries the mandatory repeat-applicant / pre-apply gate (Golden Rule #12, which reads applications/_archive/_index.md where all past rejections live) and the core-capability gate.
---

# Create a new application

**All Golden Rules in `CLAUDE.md` still apply.** Step 0 is the mechanical enforcement of
Golden Rule #12 — run it BEFORE anything else and do not build a CV or fill a form until it
is cleared.

Trigger: *"I'm applying to X"*, the user pastes a JD, or describes a role.

0. **Repeat-applicant gate (MANDATORY — run BEFORE anything else; Golden Rule #12).** Scan
   **BOTH** indexes for any prior application to this company/role:
   - 🗄️ **`applications/_archive/_index.md` — scan this FIRST.** Closed applications are
     archived (Golden Rule #14), so **every prior rejection lives here, not in the active
     index.** Its failure-class ledger also names the class the loss was diagnosed as.
   - `applications/_index.md` — catches a *currently open* application to the same company.
   - `applications/_shortlist.md` → the **⛔ do-not-source table**, if the user keeps a
     shortlist. It is the same check one stage earlier, and it carries the
     *do-not-source* vs *pursue-with-eyes-open* verdict already reasoned through.

   ⛔ **Scanning only `applications/_index.md` makes this gate report a clean slate for a
   company that already said no** — exactly the failure #12 was written for. The gate has not
   run until both files have been opened.

   And, **if email access is granted** (`profile/preferences.md` → Email access), search the
   user's mail for the company name too, since applications that predate this repo only exist
   there. If the user was **already rejected** here: pull the prior **date + reason + failure
   class**, tell the user, and decide together whether to proceed —
   - a **structural** prior reason (seniority, tenure, scope, domain depth — anything
     re-tailoring cannot change) is not beatable by a better-worded CV; don't spend one.
     Re-apply only if something **material** changed (new title/scope, real time elapsed, a
     different team or domain).
   - a **fixable positioning** prior reason (led with the wrong facet, echoed the JD, buried
     the match) is worth re-applying **only if the new CV genuinely fixes that exact thing** —
     say how, in `cv.notes.md`, before building.
   Record the outcome in the status log. If a prior application surfaced that isn't logged
   yet, add its row while you're here — a closed one goes into
   `applications/_archive/_index.md`.

   If the decision is **don't apply**, that is still a logged outcome — close it out as
   `not applied — skipped` per **`CLAUDE.md` §2.5**, so the next pass sees the gate already
   fired.
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

   **⚠️ The estimate is not finished until the COMPANY-SPECIFIC lookup has run.**
   The market-wide bucket (*"Engineering Manager, Germany, 25th pct"*) is the **floor of the
   method, not the method.** Before writing the verdict, also search **this employer by name** —
   its own levels.fyi company/role page and its Glassdoor page — and record what you found **as
   its own line**, including *"nothing company-specific found"*. Note the **sample size** and any
   self-contradiction on the page; a 1–2-submission figure is a **weak signal quoted as a
   bracket**, never a band. Then state the verdict from **all** lines together.

   This is a **sequencing rule, not a filter** — it changes nothing about what the user may
   choose, only that they choose with the complete number in hand.

   *(The pattern, anonymously: a role was scored 🟡 "borderline" from the market-wide bucket
   alone and the application was submitted. The employer-specific lookup ran hours later and
   moved the verdict to 🔴 — the highest figure **ever reported** for that role at that company
   was ~€25k under the floor the candidate had just written on the form. Same conclusion,
   reached too late to inform the spend. The market bucket describes an industry; a band
   describes an employer, and only the second one is going to make the offer.)*

   **🔴 is not an auto-skip:** surface it and make *"ask the band on the first recruiter
   call"* the next action, rather than sinking a tailored CV and a full loop into a role that
   cannot pay. Apply any **target-role filter** the user recorded in `profile/preferences.md`
   (e.g. a level down-rank, or domains they've ruled out) in the same pass.
6b. **Core-capability gate (MANDATORY).** Golden Rule #12 stops a re-application into a
   *known* structural gap — but only when a prior rejection happened to name it. This gate
   covers the blind twin: an **un-tailorable gap on a first application**. Run it BEFORE
   building a CV.
   1. **Name the req's core differentiator in one line** — the thing that makes this posting
      different from a generic req at this level, i.e. why this team exists. Read the team's
      mission and the requirements the JD *repeats*, not the boilerplate bullets.
   2. **Classify the user's evidence for THAT axis** from `profile/` — 🟢 **shipped in
     production / by a team they led** · 🟡 **hands-on but personal, PoC, or dated** ·
     🔴 **absent**.
   3. **🟡 or 🔴 on the differentiator itself → STOP and put it to the user before building
      anything.** State plainly that **no CV tailoring can close it** — honest labeling is
      required by Golden Rules #2/#7, and an honestly-labeled PoC *is* the disqualifier a
      screener needs — and give the odds. Peripheral or "nice to have" requirements at 🟡/🔴
      are fine; this gate is **only** about the core differentiator.
   4. **Not an auto-skip** — same shape as the comp-floor 🔴 rule: it is the user's call, made
      with the cost stated. If they proceed, record the verdict **and their decision** in
      `application.md` so the eventual post-mortem starts from a known baseline.
   5. Record the verdict in `application.md` regardless: 🟢 / 🟡 / 🔴 + the one-line
      differentiator.

   *(Why this is mechanical and not a judgment call: the classic failure is that the gap is
   spotted, written into `application.md` as "an interview risk to manage" — and never weighed
   as a reason not to spend the application at all.)*
7. Ask the user if they want a tailored CV now (→ invoke the `tailored-cv` skill).
