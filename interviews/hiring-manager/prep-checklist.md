# Interview Prep — Coverage Checklist

**Why this exists:** it's easy to skip a whole area (a classic miss: prepping stories but
never prepping **metrics/OKRs**, then getting caught flat in the round). Every prep plan MUST
walk this list: each area is either **covered in the plan** (with a mapped story/answer) or
**consciously skipped** (with a one-line reason written in the plan). No silent gaps.

**Leadership gate:** rows marked ⟨manages-people⟩ apply only if the user manages people. For
IC rounds, mark them ⏭ ("IC round — n/a") and add discipline-technical rows from
[`../question-generator.md`](../question-generator.md) instead (system design, coding, design
critique, product/analytics case). **Always generate the full question list first** (the
generator) — this checklist covers areas, the generator produces the actual questions.

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
| 18 | Ways of working (agile/rituals, remote/hybrid, stakeholder mgmt) | — | — |
| 19 | Compensation / process logistics parked for recruiter (not this round) | — | `application.md` |
| 20 | **Discipline-technical round** (per generator): e.g. system design — **API/user-contract FIRST**, then one architecture, data model, multi-tenancy, global-scaling + trade-offs; or coding; or design critique; or product/analytics case | — | `interviews/technical/` · `../question-generator.md` |

**How to use:** when building `applications/<x>/interview-prep/<round>-plan.md`, add a
"Coverage" section listing every applicable area with ✅ (covered, where) or ⏭ (skipped/n-a,
why). Update this checklist whenever a real interview surfaces an area not on it — that's the
debrief loop (`CLAUDE.md` §2.6).
