# Interview Prep — Coverage Checklist

**Why this exists:** it's easy to skip a whole area (a classic miss: prepping stories but
never prepping **metrics/OKRs**, then getting caught flat in the round). Every prep plan MUST
walk this list: each area is either **covered in the plan** (with a mapped story/answer) or
**consciously skipped** (with a one-line reason written in the plan). No silent gaps.

> ### 🚫 "It's only round 1" is NOT a reason to skip a row
> **A ⏭ needs a reason that is true of the AREA, never one that is true only of the ROUND.**
> *"Deferred to the hiring-manager round"*, *"out of scope for a recruiter screen"* and their
> variants are **coverage failures wearing the costume of a coverage decision** — they satisfy
> the letter of this checklist while leaving the plan empty.
>
> Round 1 is routinely run by an **EM, a senior director, or a talent partner trained to
> probe** — not an admin gatekeeper. First-round screens have asked, for real: *"why did you
> choose to be a manager?"* · *"tell me about an underperformer you handled"* · *"how do you
> know the team is performing?"* · *"what's the most complex event-driven project you've
> worked on?"* · *"how is AI being adopted on your team?"* — and in one case spent the **whole
> hour** on AI-ROI measurement.
>
> Legitimate ⏭ reasons: *IC target role, so this people-management row is off-target* ·
> *the user genuinely lacks this experience — flagged as a named gap* · *already covered in
> §X of this plan*.
>
> **Anything not covered in depth still gets a one-line landing spot** (the question, the best
> story, a hook). **Depth may be prioritized; coverage may not be skipped.** Enforced by step
> 5a of the `interview-prep` skill.

**Leadership gate — read the TARGET role, not the current one.** Rows marked ⟨manages-people⟩
apply whenever the **role being interviewed for** is a people-management role, **including
when the user doesn't manage people yet**. For **IC target roles**, mark them ⏭ ("IC round —
n/a") and add discipline-technical rows from the `interview-question-generator` skill instead
(system design, coding, design critique, product/analytics case).

For a **first-time manager** the row stays ✅-or-gap, never ⏭: cover it with the honest
adjacent evidence (mentoring, leading without authority, technical leadership) and write the
missing piece into the plan as a named gap. A row skipped because the user "isn't a manager
yet" is a silent gap in exactly the round where it will be asked. **Always generate the full
question list first** (the generator) — this checklist covers areas, the generator produces
the actual questions.

| # | Area | Typical questions | Evidence source |
|---|---|---|---|
| 1 | People growth & mentoring ⟨manages-people⟩ | Q2, Q5 | `profile/stories/` (mentoring/turnaround) |
| 2 | Hard performance situations (feedback, PIP, firing) ⟨manages-people⟩ | Q1, Q3, Q4, Q27 | `profile/stories/`; TODO if none |
| 3 | Hiring (wins + mistakes) ⟨manages-people⟩ | Q7, Q8, Q9 | work-experience leadership sections |
| 4 | Conflict — team, peer, cross-functional | Q10, Q12, Q14 | `profile/stories/` (conflict) |
| 5 | Disagreeing with leadership / managing up | Q11, Q13, Q41 | `profile/stories/` (disagree-with-leadership) |
| 6 | Delivery under pressure | Q16 | `profile/stories/` (delivery-under-pressure) |
| 7 | Failure / slipped project — what you owned | Q17, Q29 | `profile/stories/` (failure — project AND, if relevant, people/delegation) |
| 8 | Quality bar, tech debt, incidents | Q15, Q18, Q19 | `profile/stories/` (raising-the-bar, incident) |
| 9 | **Metrics & OKRs — company-wide AND team-wide, per past role** | **Q35–Q41** | `profile/work-experience/*` → "How success was measured" |
| 9b | **⚠️ Keep team-execution KPIs (DORA/cycle time) separate from business metrics (revenue/pipeline/churn/CSAT); name both and bridge them** | Q35–Q41 | `profile/work-experience/*` → "How success was measured" |
| 10 | **The no-metrics answer** (pre-PMF startup: how you steer without OKRs) | **Q39** | earliest/startup role → "How success was measured" |
| 11 | Ambiguity, strategy, scaling teams | Q20–Q26 | multiple |
| 12 | Hands-on vs. leading/managing balance | Q30 | work-experience / projects |
| 13 | Leadership / craft philosophy & team culture | Q31 | — |
| 14 | Why this company / this role + what you're looking for | Q32, Q32b | company research file + `profile/company-fit.md` |
| 15 | 30/60/90 plan | Q33 | — |
| 16 | Questions to ask THEM (3–4, sharp) | — | per-application plan |
| 17 | Current-trends view in your field + one concrete personal example | — | recent work in `profile/` |
| 17b | **Bar calibration & hands-on recency** — what the *absolute best* in your discipline looks like (⚠️ not a growth story, not a virtue list) **and** the most recent thing you built/shipped | Q44, Q45 | `profile/stories/` · `profile/projects/` — the most recent real thing, with its honest limits |
| 18 | **Ways of working — remote / distributed.** Answer with **mechanism, not preference**: written decisions over more meetings, one predictable cadence across sites, async-by-default + explicit overlap hours, cross-site escalation/on-call, and (lead target) how 1:1s and coaching stay real without a shared room | **Q49** | `profile/work-experience/*` → *Distributed / ways of working*. 🔴 If the sites and timezone spreads aren't recorded there, this row is a `TODO(user)`, **not** an improvisation (Golden Rule #2) |
| 18b | **⚠️ Product influence & stakeholder management — carry TWO ready STARs:** (a) you changed *what* got built (roadmap / scope / priority), persuading the decision-maker with data or judgment; (b) you navigated conflicting **non-engineering** stakeholders (Product vs Compliance vs Ops) to a shared outcome. Frame around **influence**, not "we collaborated closely" | Q12, Q13, Q14, **Q14b, Q14c**, Q25 | `profile/stories/` (product-influence, stakeholder-management). ⚠️ Prefer an example where the influence landed **outside** the user's own team — thin cross-team influence is a common senior+ rejection reason. Standing action: capture stakeholder moments **as they happen**, don't wait for prep |
| 19 | Compensation / process logistics parked for recruiter (not this round) | — | `application.md` |
| 20 | **Discipline-technical round** (per generator): e.g. system design — **API/user-contract FIRST**, then one architecture, data model, multi-tenancy, global-scaling + trade-offs; or coding; or design critique; or product/analytics case | — | `interviews/technical/` · `interview-question-generator` skill |
| 21 | **⚠️ Delivery predictability — its own area, never folded into metrics (row 9) or the 30/60/90 (row 15).** When a company says *"predictability"*, decode it first: at a scaling, sales-driven or commitment-heavy org it almost never means uptime — it means **they have been missing dates**, which is a delivery-management problem. Order: **(1) measurement before process** — cycle time, **date-hold rate**, where work sits waiting; **(2) then** the process change the data justifies, not a ritual imported on day one; **(3) the two-sided payoff** — stakeholders get dates they can trust, the team gets a defensible *"not this quarter"*; **(4) bridge to tech debt** — pay down the debt that makes **dates** unreliable, not the debt that's merely ugly. End on **evidence, not method** | Q33, Q35–Q41, Q47 | `profile/work-experience/*` → *How success was measured*. 🔴 A method-only answer is articulate and unproven — needs a before/after number on committed-vs-hit dates |
| 22 | **⚠️ AI ROI & measurement — its own area; row 17 (capability: what AI can automate) does NOT cover it, and this is the half that gets asked.** Any company 12+ months into AI adoption has either measured no movement or is afraid to look. **Decode: this sounds like a tooling question and is a measurement question.** (1) ask **which** KPIs and read the answer — three cases: business flat + output **rose** ⇒ a **prioritization** failure; business flat + output **unmeasured** ⇒ the metric can't see the gain; **output itself flat** ⇒ the gain is consumed before it lands (human review first, then rework and context-setting). ⚠️ **Don't reflexively say "you're measuring the wrong thing"** — if they measure output and output is flat, their metric is working and telling them something true; crediting that earns the right to the real problem. (2) ask the bill's **denominator** — cost per outcome. (3) name the ceiling: while humans review every line, **review is the bottleneck**. (4) *then* the capability ladder. (5) close on the **measure** — outcome over output, the point most often left unmade | **Q47, Q50** · probe §6.6 | `profile/work-experience/*` → AI practice · `profile/skills.md`. ⚠️ **Fact guards:** no productivity percentage unless one was measured; label anything intended-but-not-running as **direction, not shipped**. ⛔ Don't claim a named methodology the user hasn't actually practised (Golden Rule #7) |
| 22b | **⚠️ Timed cognitive / aptitude screening test** (speed-critical — e.g. 40 questions in 20 minutes across numerical, logical and verbal reasoning). Some companies use one as **round 1**, before any human speaks to the candidate. **This is not a leadership area and no STAR prep touches it** — it is a gate to clear, and it is failed on *speed*, not ability: the questions are individually easy and there is no time to check work. Prep = timed practice on the standard test families until pace is automatic, plus the arithmetic shortcuts (percentages, ratios, unit conversion) the numerical section assumes | — | The test provider is usually named in the invitation email — look it up, the families are standardised. 🔴 If a round type in the process is unclear, **ask the recruiter what format it is** rather than preparing the wrong thing |
| 23 | **⚠️ Delivery gate — how answers *land*, run in EVERY behavioural round** (this is not about which story). **(a) Headline first** — open with a one-sentence direct answer, *then* situation → action → result → learning; if the point arrives after ~30 seconds of context, restructure. **(b) Say the motivation out loud** — for a lead target, at least half the stories must be told as **leadership** stories (who was coached, what was decided about people, what you wanted for the team), not engineering stories with a manager narrating; never rely on the interviewer inferring that you want the job. **(c) Concern-coverage check** — the moment an interviewer names what they care about, **write the list down live** and confirm every item was addressed before the call ends; a named concern *is* the grading rubric. This binds hardest in a **thin call**: a short, unprobing round is not a pass, it's an empty scorecard the other candidate filled in — supply the evidence unprompted | all behavioural rounds | Related: `CLAUDE.md` §4 — name the observable behaviour, never a self-claimed trait adjective |

**How to use:** when building `applications/<x>/interview-prep/<round>-plan.md`, add a
"Coverage" section listing every applicable area with ✅ (covered, where) or ⏭ (skipped/n-a,
why). Update this checklist whenever a real interview surfaces an area not on it — that's the
debrief loop (the `interview-debrief` skill).
