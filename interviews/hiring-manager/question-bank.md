# Behavioral / Leadership Interview — Question Bank

A **seed** list of behavioral questions common in hiring-manager and leadership rounds.
Prepared answers live in [`answers.md`](answers.md), keyed by the `Q#` ids below and drawn
from the STAR stories in `profile/stories/`.

> **This bank is a seed, not the ceiling.** Before any prep, run
> the `interview-question-generator` skill to generate the **full** candidate
> list for the user's discipline + level + round type first; then fold anything new and
> reusable back into this file. A fixed list under-serves ICs and non-software disciplines.

> 🎯 **Companion file — [`sharpness-probes.md`](sharpness-probes.md) ⟨management/lead rounds
> only⟩.** This bank holds the **deep STAR questions** (3–5 minute answers). The short
> **calibration probes** interviewers use to gauge how real a manager or lead is — *"how big
> is your team?"*, *"what was your last challenging feedback, and when?"*, *"where's your
> biggest tech debt and why isn't it fixed?"*, *"when did you last push back on higher
> leadership?"*, *"how has AI changed the way your team works?"* — live there, with the signal
> behind each, good vs. bad answer shapes, a recall card, and a list of gaps that wording can't
> fix. Read it before any **lead** round — **including round one**: talent partners run these
> probes too, so a first round is not logistics-only (see §7 there). ⛔ **It does not apply to IC
> rounds at any level** — every probe assumes accountability for a team; see the applicability
> gate at the top of that file.

**Leadership gate — read the TARGET role, not the current one.** Questions marked
**⟨manages-people⟩** apply whenever the role being interviewed for is a people-management role
— **including when the user doesn't manage people yet** and is going for their first such job.
Skip them only for **IC target roles**, and prep to the discipline instead (see the
generator's IC-technical blocks). The user's own level/discipline (`profile/basics.md`,
`profile/preferences.md`) decides *what evidence exists* and what has to be flagged as a gap —
not which questions get prepared. See the ⭐ note in the `CLAUDE.md` preamble.

**Other applicability markers used below** — same rule: they read the **target role**, not the
user's current one.
- **⟨senior IC and up⟩** — the question assumes influence beyond one's own tasks. Below that
  level it's off-target; ask the craft version instead (the generator's IC-technical blocks).
- **⟨lead/manager, and staff+ IC in platform roles⟩** — asked by people accountable for a
  budget or a team's output. For a junior/mid IC round, use the simpler variant noted inline.
- **Unmarked** — applies at every level and discipline.
- **Conditional** — Q48 fires *only* when the target role is broader or more senior than the
  user's current scope (that's the whole question); Q50 only at companies already ≥12 months
  into AI adoption.

Each question notes a **theme** (matching the `profile/stories/` theme vocabulary) so a story
can be mapped to it. Use this to (a) find gaps in the story bank and (b) build a focused prep
subset per company.

## People leadership & growth ⟨manages-people⟩
- **Q1** — Tell me about a time you gave someone difficult feedback. _(difficult-feedback)_
- **Q2** — Describe coaching a struggling report to success. _(mentoring, turnaround)_
- **Q3** — Walk me through putting someone on a PIP: what led to it, how you ran it, the
  outcome. _(PIP, difficult-feedback)_
- **Q4** — Tell me about a time you had to let someone go / manage someone out. _(firing)_
- **Q5** — How have you grown someone a level (mid→senior, IC→lead)? _(mentoring)_
- **Q6** — Describe a time you improved a team's morale or engagement. _(turnaround)_
- **Q7** — Tell me about a hire you're proud of — how did you assess and land them? _(hiring)_
- **Q8** — Tell me about a hiring mistake and what you learned. _(hiring, failure)_
- **Q9** — How have you built diversity into a team you led? _(diversity-inclusion, hiring)_
- **Q9a** — You have a **plateauing** report — competent but stalled. Walk me through, specifically,
  how you diagnose it and what you do. _(mentoring, turnaround, difficult-feedback)_
  <!-- Cautionary rule: "how would you handle X?" people-questions are a demand for a concrete,
       real, numbers-backed STAR — not a philosophy. Name the diagnosis (skill vs will vs
       role-fit vs boredom), the specific intervention (stretch project, role reshape, explicit
       growth plan, direct feedback, or managed exit), and a real outcome with a number.
       Generalities read as thin and are a common reject reason. -->

## Conflict & influence
- **Q10** — A time you resolved a conflict between two people or teams. _(conflict)_
- **Q11** — Disagreeing with your manager / leadership — how did it resolve? _(disagree-with-leadership, influence-without-authority)_
- **Q12** — A conflict with a peer or cross-functional partner. _(cross-functional, conflict)_
- **Q13** — Influencing a decision without formal authority. _(influence-without-authority)_
- **Q14** — A time you said no to a stakeholder / pushed back on a request. _(prioritization, conflict)_
- **Q14b** — A time you **influenced the roadmap** — changed *what* got built or its priority, not
  just *how*. How did you persuade the product owner / decision-maker?
  _(product-influence, stakeholder-management, cross-functional)_ ⟨senior IC and up⟩
  <!-- Framing rule: the axis is INFLUENCE, not collaboration. "We worked closely with Product"
       does not answer it. Name what you changed, the evidence or judgment you used, and who
       had to be moved. Prefer an example where the change landed OUTSIDE your immediate scope —
       "no evidence of influence beyond your own team" is a common senior+ rejection reason. -->
- **Q14c** — Managing **conflicting demands from multiple non-engineering stakeholders** (e.g.
  Product vs Compliance vs Ops). How did you get to a shared outcome?
  _(stakeholder-management, cross-functional, prioritization)_ ⟨senior IC and up⟩

## Delivery, quality & execution
- **Q15** — A time you raised the quality bar. _(raising-the-bar)_
  <!-- Framing rule: the bar is raised **for the team/org**, not "I have high standards." Lead
       with the leverage, end with a measured outcome. This class of question commonly decides
       senior/leadership offers — rehearse to ~90s with a metric. -->
- **Q15b** — A time you **changed the technical direction** — a deliberate strategy/architecture
  pivot you *chose* to drive (not one forced on you mid-project). _(strategy, architecture, influence-without-authority)_
- **Q15c** — How did you get buy-in for that change, and how did you handle the people who
  disagreed? _(influence-without-authority, conflict, strategy)_ <!-- the usual follow-up to Q15b -->
- **Q16** — Delivering a critical project under a tight deadline. _(delivery-under-pressure)_
- **Q17** — A project that failed or slipped — what happened and what did you own? _(failure)_
- **Q18** — Handling a major production incident / outage. _(incident)_
- **Q18b** — Designing a process, policy, or standard — especially one spanning your function
  and others (HR/legal/security). _(raising-the-bar, strategy, influence-without-authority)_
- **Q18c** — A time you were publicly criticized or blamed and had to turn it around. _(conflict, difficult-feedback)_
- **Q19** — Managing significant tech debt vs feature pressure. _(prioritization, raising-the-bar)_
- **Q20** — Prioritizing a roadmap with more demand than capacity. _(prioritization, strategy)_
- **Q21** — Changing direction mid-project due to new information. _(ambiguity)_
- **Q46** — How do you **communicate a difficult decision, or a change of direction, to the
  people affected**? _(communication, influence-without-authority, strategy)_
  <!-- The bar is "how do you bring people with you", NOT what you decided — so the answer needs
       the MECHANISM: how the problem was made shared rather than asserted, what you did visibly
       yourself, and how you checked it landed. ⚠️ Do NOT use a story that ends in regret or
       attrition here, however honest — that shape belongs to "tell me about a failure" (Q17/Q29).
       For an IC target role, tell it about people you did NOT manage (a squad, a peer group, a
       partner team) — the question still applies; only the authority changes. -->

## Strategy, scope & ambiguity
- **Q22** — Operating in a highly ambiguous situation. _(ambiguity, strategy)_
  <!-- Cautionary rule: this question wants ONE decision made without enough information — what
       was unknown, what you decided anyway, what it cost. Two failure shapes, both common:
       (a) "most of my work is ambiguous" answers *how often*, not *which one*; (b) answering
       with a method for REDUCING the unknown before committing — that answers "how do you
       commit to a date when you don't know the work?", a different question. Shrinking
       uncertainty is not deciding under it. -->
- **Q23** — Scaling a team or org (growth, restructure, split). ⟨manages-people⟩ _(scaling-team, org-design)_
- **Q24** — Setting technical or organizational strategy. _(strategy)_
- **Q25** — Aligning multiple teams toward a shared goal. _(cross-functional, strategy)_
- **Q26** — A decision you made with incomplete data. _(ambiguity)_
- **Q48** — ⭐ **The step-up question:** *"This role owns more than you own today — can you
  actually do it?"* _(step-up, breadth-of-ownership)_
  <!-- Fires whenever the TARGET role is broader or more senior than the user's current scope —
       IC → first lead, senior → staff, EM → head/VP, single-function → owning several
       (e.g. backend + frontend + QA + DevOps + data). Expect it in EVERY step-up process; it is
       usually the question that decides one.
       Answer shape: (1) name the real delta honestly — often it is SCALE, not scope (say this
       only if it is true: e.g. they have already owned everything technical for a smaller org);
       (2) for functions they have never personally practised, answer AS AN OWNER — standards,
       ownership model, who is accountable for what, how they'd hire/judge for it — NOT as a
       practitioner; (3) don't oversell and don't shrink.
       ⚠️ Golden Rule #7/#2: a step-up answer is the easiest place to drift into experience the
       user doesn't have. Prep the honest adjacent evidence and name what is genuinely new. -->

## Bar, hands-on craft & ways of working
- **Q44** — **Describe the best person you've worked with in your discipline, someone else in
  your top five, and the difference between the two.** _(bar-calibration, judgment)_
  <!-- Traps, both fatal: (a) telling a GROWTH story — this question asks what the *absolute
       best* looks like, not who you developed; prompts often say so explicitly. Most people
       stories in a story bank are growth stories, so this needs its own prepared answer.
       (b) a vanilla description ("smart, humble, gets things done") — interviewers name this
       as the failure mode outright. Answer with an AXIS and a named difference: what the best
       one closes that the other doesn't. Related: sharpness probe §6.1 (level boundaries). -->
- **Q45** — **What's the most recent thing you built or shipped, and why?** _(hands-on, craft)_
  <!-- The bar depends on the TARGET role:
       • Lead/manager target — this probes whether you are still hands-on. A small, real, recent
         thing scores well, and naming its limits plainly scores better than dressing it up.
         Inflating it does not survive two follow-ups (probe §1.3).
       • IC target — this is the core of the round, not a check. Go deep: the decision, the
         trade-off, what you'd change. -->
- **Q49** — **What's your experience working remotely / with distributed teams?** _(ways-of-working)_
  <!-- Expect this at nearly every company — distributed is the default shape. Answer with
       MECHANISM, not preference: written decisions instead of more meetings, one predictable
       cadence across sites, async-by-default with explicit overlap hours, how escalation and
       on-call work across timezones, and (for a lead target) how 1:1s and coaching stay real
       without a shared room.
       Evidence source: each role's file in `profile/work-experience/` — capture which sites and
       timezone spreads the user has actually worked across. ⚠️ If that isn't recorded yet, this
       answer is UNARMED: make it a `TODO(user)`, don't improvise a claim about sites. -->

## AI in the workflow — capability *and* measurement
> Two halves, asked separately. **Q47 is capability** (what AI changes about how work gets done);
> **Q50 is measurement** (whether it showed up in the numbers). Prepping only the first leaves the
> half that senior interviewers actually ask. ⟨lead/manager, and staff+ IC in platform roles —
> for a junior/mid IC round expect the simpler "how do you use AI in your work?" instead⟩

- **Q47** — **How would you make a small team ship like one three times its size?**
  _(AI-in-engineering, delivery)_
  <!-- Answer with MECHANISM, not enthusiasm — and from the user's own practice, whatever that
       actually is. The axes an interviewer is listening for: where AI shortens a loop (building,
       reviewing, investigating), what repetitive work stopped being done by hand, and — the one
       most candidates miss — DECIDING WHAT NOT TO BUILD, since the biggest multiplier is usually
       a scope conversation, not a tool.
       ⚠️ Honesty guard (Golden Rule #2): don't let personal-project scale blur into an at-work
       claim, and don't describe an intended practice as a running one. -->
- **Q50** — ⭐ **"We invested in AI, our teams shipped real AI-driven work, and our KPIs did not
  move. We have a large AI bill and no evident impact. Why?"** _(AI-ROI, metrics)_
  <!-- Expect this at ANY company 12+ months into AI adoption. It is the successor to "how do
       you use AI", and it is asked by the person personally on the hook for the spend.
       ⚠️ THE TRAP: it reads like a tooling question and is a MEASUREMENT question. Answering
       with the automation ladder alone (how to get *more* out of AI) is on-topic and still
       under-serves the signal.
       Answer shape — diagnose first, then prescribe:
       1. Ask WHICH KPIs, and read the answer correctly — three cases, not two:
          (a) business KPIs flat while OUTPUT ROSE ⇒ AI accelerated the wrong work: a
              PRIORITIZATION failure, not an AI failure.
          (b) business KPIs flat and output NOT MEASURED ⇒ the metric structurally cannot see
              the gain.
          (c) ⭐ OUTPUT metrics themselves flat ⇒ the most damning reading: AI isn't even
              converting into more output, so the gain is consumed before it lands — human
              review first, then rework and context-setting cost.
          ⚠️ Do NOT reflexively say "you're measuring the wrong thing." If they measure output
          and output is flat, their metric is working correctly and telling them something true.
          Crediting that buys the right to move to the real problem.
       2. Ask the bill's DENOMINATOR — cost only means anything as cost per outcome.
       3. Name the structural ceiling: while humans review every line, HUMAN REVIEW is the
          bottleneck, so agent speed never reaches the KPI.
       4. THEN prescribe the capability side (Q47).
       5. Close on the measure itself — outcome over output. It is the point most often left
          unmade, and it reframes their problem as the next one to solve rather than a lesson
          they missed.
       ⚠️ Fact guards: no productivity percentage unless one was actually measured; label
       anything intended-but-not-running as DIRECTION, not shipped. -->

## Self-awareness & leadership philosophy
- **Q27** — The hardest decision you've made in this role. _(judgment)_
- **Q28** — Tough feedback you received — how did you respond? _(difficult-feedback)_
- **Q29** — A leadership/craft mistake and how you changed as a result. _(failure)_
- **Q30** — Balancing hands-on work with leading/managing. _(strategy)_
- **Q31** — Your ideal team culture, and how you've built it. _(strategy)_

## Metrics, OKRs & how you run the team
- **Q35** — How do you measure the success and health of your work/team? Which metrics do you
  actually track? _(metrics)_
- **Q36** — What were the company-wide goals/OKRs/KPIs at your last role, and how did your work
  ladder up into them? _(metrics, strategy)_
- **Q37** — A metric that moved because of a decision you made. _(metrics)_
- **Q38** — How do you use delivery metrics (DORA, cycle time, incident rate) without
  weaponizing them against the team? ⟨manages-people⟩ _(metrics, raising-the-bar)_
  <!-- Cautionary rule: keep team-execution KPIs (DORA/cycle time) **separate** from business
       metrics (revenue/pipeline/churn/CSAT). Name BOTH and bridge them — answering a
       "team KPI" question with a business metric (or vice-versa) is a common miss. -->
- **Q39** — When there are **no** established metrics/OKRs — e.g. an early startup pre
  product-market fit — how do you know the team is working on the right things? _(metrics, ambiguity)_
- **Q40** — How do you set goals for individuals and evaluate performance? ⟨manages-people⟩ _(metrics, mentoring)_
- **Q41** — What do you report upward, and how do you communicate status / bad news to
  leadership? _(metrics, disagree-with-leadership)_

## Company / role-specific (fill per application)
- **Q32** — Why this company / why this role? _(fill from company research)_
- **Q32b** — What are you looking for in your next role / company? Why are you leaving?
  _(source: `profile/company-fit.md` — frame "why leaving" positively, no bitterness. Follow
  the language rules in the user's `CLAUDE.md` — name the behaviour, not a trait adjective.)_
- **Q33** — What would you do in your first 30/60/90 days here?
- **Q34** — Questions the interviewer is known to ask _(from research)_.
- **Q34b** — _A question the user **ASKS them**, worth making mandatory every company:_ **"Which
  success / team-health metrics does this team actually follow, and how do you know it's on
  track?"** _(source: `profile/company-fit.md` — ask it in an **early** round, while the answer
  can still change the user's decision. Distinct from Q35–Q41, which are about the user's own
  team. For an IC round, the same question narrows to: "what does success look like for this
  role in the first six months, and who judges it?")_
- **Q42** — What would you **add** to us — how would you be **different** from what we already
  have? _(trap: answering with similarity/fit; the question wants the delta. Prepare a
  3-point additive answer per company.)_
- **Q43** — Any strong domain principle the company is known for (e.g. security-first,
  design-led, data-driven) — how do you uphold it **without blocking** the team? _(prepare a
  layered answer: shift-left, risk-tier, make the good path the fast path, partner early.)_

---

> **Maintenance:** when a mock or the generator reveals a missing story, create it in
> `profile/stories/`, then link it from the answer in `answers.md`. Add new questions here as
> they come up in real interviews (the `interview-debrief` skill). Keep `Q#` ids stable.
