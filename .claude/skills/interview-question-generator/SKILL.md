---
name: interview-question-generator
description: Generate the full discipline/level/round-aware candidate question list for an interview BEFORE opening the saved question bank — the bank is a seed, not the ceiling. Use at the start of any interview prep to build the question set, then cut to a focused subset for the time available. Feeds the interview-prep and story-elicitation skills, and onboarding's question-set step.
---

# Interview question generator — discipline/level/round aware

**The rule this skill exists to enforce:** when prepping a round, **generate the full
candidate question list FIRST** — tailored to discipline, level, and round — *before* opening
`interviews/hiring-manager/question-bank.md` or any saved bank. The saved banks are a **seed,
not the ceiling**. A fixed manager-behavioral list is the wrong tool for a senior product
designer's portfolio round or a staff engineer's system-design round.

> Where the user's discipline/level lives: `profile/basics.md` (headline/title) and the CV
> structure recorded during onboarding (`profile/preferences.md`). If it's unclear, ask
> **one** question ("What level and discipline should I prep this round as — e.g. senior IC
> software, staff, EM, head of design?") before generating.

Invoked by the `interview-prep` skill at the start of prep. A missing story for a generated
question → hand off to the `story-elicitation` skill.

---

## How to generate (do this every prep)

1. **Identify three coordinates** for the round:
   - **Discipline** — software, design, product, data, infra/platform, or other.
   - **Level** — junior/mid IC · senior IC · staff/principal · manager (EM/design/product
     lead) · head/director. (Leadership questions apply **only if the user manages people** —
     see the gate below.)
   - **Round type** — recruiter screen · hiring-manager/behavioral · discipline-technical
     (system design, coding, design critique, analytics case, PM case) · cross-functional/panel
     · leadership/values · founder/exec.
2. **Generate a complete list** by pulling from every relevant theme block below for those
   coordinates — breadth first (15–40 candidate questions), then cut to a focused subset for
   the time the user has.
3. **De-duplicate against the saved bank.** Anything reusable (not company-specific) that
   isn't already in `interviews/hiring-manager/question-bank.md` → **add it**, with its theme
   tag, so the bank compounds over time.
4. **Map each question to evidence** in `profile/` (especially `profile/stories/`). Missing
   story → elicit it via the `story-elicitation` skill.
5. **Run the coverage gate** (`interviews/hiring-manager/prep-checklist.md`) so no whole area
   is silently skipped.

---

## The people-leadership gate

Blocks marked **⟨manages-people⟩** apply **only if the user manages people** (EM, design/
product/data lead, head/director — recorded in `profile/preferences.md` → *Manages people*).
For an IC round, **skip them** and lean on the IC-technical and universal blocks instead.
Never assume the user is a manager. Conversely, a staff/principal IC still gets *influence*
and *mentoring* questions — just not *hiring/firing/PIP* ones.

---

## Theme blocks (the generation source)

Pull from these by discipline/level. Each is a **prompt to generate concrete questions**, not
a fixed script — phrase them naturally and add level-appropriate depth.

### Universal (every discipline & level)
- Why this company / why this role / why leaving. _(company-fit — source `profile/company-fit.md`)_
- What are you looking for in your next role? _(company-fit)_
- A time you failed or a project slipped — what did you own? _(failure)_
- A time you disagreed with a decision and how it resolved. _(conflict, influence)_
- A time you influenced an outcome without formal authority. _(influence-without-authority)_
- The hardest problem you've worked on and how you approached ambiguity. _(ambiguity)_
- What would you do in your first 30/60/90 days? _(planning)_
- Questions you have for us. _(always prep 3–4 sharp ones)_
- Current-trends view in your field + one concrete personal example. _(e.g. AI in the workflow)_

### IC-technical — software
- System design for the level (component vs service vs multi-region/global scale). _(system-design)_
- Design a public/user-facing **API or contract first**, then commit to one architecture, then
  discuss data model, multi-tenancy, scaling and trade-offs. _(system-design)_
- A hard technical decision and the trade-offs you weighed. _(technical-judgment)_
- Debugging a nasty production issue / incident you drove. _(incident)_
- Code quality, testing strategy, how you keep a codebase healthy. _(quality-bar)_
- Coding round: data structures/algorithms or a realistic take-home, per the JD.

### IC-technical — design
- Portfolio walkthrough: pick 2–3 pieces, explain the problem, constraints, process, outcome.
- A design critique — give and take feedback on a piece of work. _(critique)_
- A time research or data changed your design direction. _(evidence, ambiguity)_
- Designing within heavy constraints (platform, accessibility, deadline). _(craft)_
- How you collaborate with engineering and product; handling handoff/feasibility tension. _(cross-functional)_

### IC-technical — product
- A product case: size a market, prioritize a roadmap, define success metrics. _(product-sense)_
- A metric you moved and how you attributed it. _(analytics, metrics)_
- Killing or descoping a feature — the call and the fallout. _(prioritization)_
- Discovery: how you decide what to build with incomplete data. _(ambiguity)_
- Stakeholder alignment across eng/design/leadership. _(cross-functional)_

### IC-technical — data / infra-platform
- A pipeline/model/system you built end-to-end and its reliability trade-offs. _(system-design)_
- Data quality, correctness, or model-drift problem you solved. _(quality-bar)_
- Making a platform/self-serve so others move faster — making the paved path the fast path. _(platform-as-product)_
- Security/privacy without blocking delivery — shift-left, risk-tiering, secure defaults. _(security)_

### Delivery, quality & execution (senior IC → leadership)
- A time you raised the quality bar for the **team/org** (not "I have high standards"). _(quality-bar)_
- A deliberate change of technical direction you drove — and how you got buy-in and handled
  dissent. _(strategy, influence-without-authority)_
- Changing direction mid-project due to new information. _(ambiguity)_
- Delivering a critical project under a tight deadline. _(delivery-under-pressure)_
- Managing tech debt vs feature pressure. _(prioritization)_
- Designing a process/policy/standard, especially cross-functional. _(strategy, quality-bar)_

### People leadership & growth ⟨manages-people⟩
- Giving someone difficult feedback. _(difficult-feedback)_
- Coaching a struggling report to success. _(mentoring, turnaround)_
- Running a PIP — cause, how you ran it, outcome. _(PIP)_
- Managing someone out / a termination. _(firing)_
- Growing someone a level (mid→senior, IC→lead). _(mentoring)_
- A **plateauing** report — diagnose (skill vs will vs role-fit vs boredom) and intervene
  **concretely** with a real outcome. _(mentoring)_
- A hire you're proud of, and a hiring mistake you learned from. _(hiring, failure)_
- Building an inclusive, diverse team. _(hiring, culture)_

### Conflict & influence ⟨senior IC and up; hiring/managing-up depth is ⟨manages-people⟩⟩
- Resolving conflict between two people/teams. _(conflict)_
- Disagreeing with your manager / leadership and how it resolved. _(disagree-with-leadership)_
- Conflict with a peer or cross-functional partner. _(cross-functional)_
- Saying no / pushing back on a stakeholder. _(prioritization)_
- A time you were criticized or blamed and turned it around. _(conflict)_

### Strategy, scope & ambiguity (staff/lead and up)
- Operating in a highly ambiguous situation. _(ambiguity)_
- Setting technical or organizational strategy. _(strategy)_
- Scaling/restructuring a team or org. ⟨manages-people⟩ _(scaling-team)_
- Aligning multiple teams toward a shared goal. _(cross-functional)_
- A decision made with incomplete data. _(ambiguity)_

### Metrics, OKRs & how you run the team
- How you measure success and health of your work/team. _(metrics)_
- The company-wide goals/OKRs/KPIs at your last role and how your work laddered up. _(metrics, strategy)_
- A metric that moved because of a decision you made. _(metrics)_
- Using delivery metrics (e.g. DORA, cycle time) **without weaponizing** them. ⟨manages-people⟩ _(metrics)_
- **Keep team-execution KPIs separate from business metrics** (e.g. cycle time vs revenue/
  churn/CSAT); name both and bridge them. _(metrics)_
- The **no-metrics** case: early startup pre product-market fit — how you know you're working
  on the right things. _(metrics, ambiguity)_
- Setting goals for individuals and evaluating performance. ⟨manages-people⟩ _(metrics)_
- What you report upward and how you deliver status / bad news. _(metrics, disagree-with-leadership)_

### Self-awareness & philosophy
- Hardest decision you've made in this role. _(judgment)_
- Tough feedback you received and how you responded. _(difficult-feedback)_
- A mistake that changed how you work. _(failure)_
- Balancing hands-on craft with leading/managing. _(strategy)_
- Your ideal team culture and how you've built it. _(strategy)_

### Company / role-specific (fill from research, per application)
- What would you **add** — how are you **different** from what we already have? _(trap: don't
  answer with similarity/fit; give the delta.)_
- Questions the interviewer is known to ask _(from company research)_.
- Round-specific values or leadership-principle questions this company is known for.

---

## Output of a generation pass

For a given round, produce:
1. **The full candidate list** (generated, 15–40), grouped by theme.
2. **The focused subset** for the user's available time, each mapped to a `profile/` story or
   marked `TODO(user)` if evidence is missing.
3. **New reusable questions appended** to `interviews/hiring-manager/question-bank.md`.
4. A **Coverage** section per `interviews/hiring-manager/prep-checklist.md`.

> Privacy: never store a real interviewer's name in generated notes — alias them by role
> ("the hiring manager", "the panel's staff engineer"). Company-specific questions live in
> the per-application prep files, not in the reusable bank.
