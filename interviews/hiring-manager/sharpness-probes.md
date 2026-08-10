# Sharpness Probes — the "simple" questions that calibrate a manager or lead

> ## ⛔ APPLICABILITY GATE — read this before opening the rest of the file
>
> **This file is for MANAGEMENT and LEAD rounds only.** Every probe below assumes the
> candidate is accountable for **a team, its people, or its technical direction** — a team's
> headcount, its incidents, its tech debt, its cycle time, its direction changes.
>
> **Load it only when the TARGET ROLE is a people-management or lead role** — engineering
> manager, team lead, tech lead, head of, director, VP, or the equivalent lead title in
> another discipline (design lead/manager, group PM, data/analytics lead, staff+ *with formal
> team accountability*).
>
> **Do NOT load it — and do not surface a single probe from it — for an IC round.** Individual
> contributor, junior/mid/senior engineer, designer, PM, analyst, or any round testing craft
> rather than team accountability: these questions are **off-target**, and prepping them wastes
> the user's time on answers nobody will ask for. Use the
> `interview-question-generator` skill's IC-technical blocks and
> [`question-bank.md`](question-bank.md) instead.
>
> **Gate on the TARGET ROLE, not on the user's own history** (`application.md` → role/level,
> and what the JD asks for):
> - Currently an IC, applying for their **first** lead role → **the probes apply.** They will
>   be asked, and the honest answers will be smaller-scope ones.
> - Currently a manager, applying for an **IC** role → **the probes do not apply.** Prepping
>   them here actively hurts: they pull the user toward leading with management scope, which
>   is the Golden Rule #11 failure this repo already loses applications to.
> - Genuinely ambiguous (a "lead" title with no reports and no technical authority in the JD)
>   → **ask the user** which the round is; don't guess.

Companion to [`question-bank.md`](question-bank.md). That file holds the **deep behavioral
questions** (full STAR, 3–5 minute answers). This file holds the **short calibration probes** —
questions that take 30–90 seconds to answer, used by hiring managers and talent partners to
decide *early and cheaply* how real a manager or lead is.

They are hard for a different reason than STAR questions: **you cannot prepare a narrative,
only a fact.** You either know how long a change takes to reach production on your team or you
don't. No amount of storytelling closes that.

> **How to use this file**
> - Read it once end-to-end. Before a round, re-read only **§0** (the mechanics) and **§8**
>   (your recall card).
> - **Do not memorize answers — memorize *which fact or story goes with which probe*.**
>   Retrieval-by-recognition survives interview stress; retrieval-by-recall doesn't.
> - **§1–§7 are the engine** (the probes and how they're scored). **§8 and §9 are yours** and
>   start empty — the `interview-prep` skill fills them from `profile/` during prep.

**Personal layer.** When the agent arms a probe during prep it appends one line under it:
`→ **Yours:** <the fact, or a link to the profile/stories/ file that answers it>`.
A probe with no fact behind it becomes a `TODO(user)` in **§9**.

**Second gate, inside a lead round.** Probes marked **⟨manages-people⟩** are about **direct
reports** — hiring, promotion, feedback, 1:1s. Skip them only when the **target role** has no
reporting line (a tech-lead round: technical authority, no people management); the rest of the
file still applies. Read the round's shape from `application.md` and the JD.

⚠️ **If the target role *does* have reports and the user doesn't have any yet** (first-time
manager), these probes are **not** skipped — they are the ones most likely to decide the
round. Prep the honest adjacent answer (the mentoring you've done, the hiring loops you've sat
on, the feedback you've given peers) and be ready to say plainly what you haven't done yet. A
first-time manager who has thought this through reads as ready; one caught blank does not.
Never invent a report or a hire (Golden Rules #2/#7).

**Discipline note.** These are written in the vocabulary of software teams because that is
where they're most standardized. The *shape* transfers to any lead role — for design, product,
data or infra leadership, substitute the equivalent artifact (a design system, a roadmap bet, a
pipeline, a cluster) for "the system" and the equivalent cycle time for "merge to production."

---

## §0. The mechanics — why these work and how they're scored

### The three universal tells
An answer reads "sharp" when it contains all three, and vague when it contains none. The topic
barely matters.

1. **A number you own.** Not a company statistic — a number whose denominator you can explain.
   *"8 people, 4 and 4"* beats *"a medium-sized team."*
2. **A tradeoff you name before being asked.** *"We chose X, which cost us Y."* Unqualified
   wins read as marketing; self-named costs read as senior.
3. **A mechanism, not a feeling.** A good answer ends on a thing that *changed* — a gate, a
   ritual, a registry, a rule. Not "and we learned a lot."

### The follow-up *is* the question
Almost every probe here has a hidden second half — *"…and what happened?"*, *"…when?"*,
*"…how do you know?"*. Interviewers ask the simple version and score the follow-up. Assume it's
coming and pre-load the outcome, the date, and the evidence.

### Buying time legitimately
A 3–8 second pause is invisible if it's **framed**. Unframed, it reads as not knowing.

- *"Let me pick the best one rather than the first one."* — then pause. Buys ~5 seconds.
- *"Two come to mind — a recent one and a more instructive one. I'll take the instructive one."*
- *"Can I take that in two parts: what the decision was, and what it cost?"*
- **Restate the question in your own words.** Buys ~4 seconds *and* confirms the intent — this
  is Golden Rule #10 applied live.
- *"Give me a second, I want to get the numbers right."* — signals you *have* numbers.

**Never:** "um…", "that's a good question", apologizing for the pause, or starting to talk
while still searching. The ramble costs the point, not the silence.

### The "last X" rule — when recency matters and when it doesn't
Interviewers say *"the last time…"* but usually test the **pattern**, not the calendar. For
most probes it's fine to answer with your clearest instance and time-box it honestly: *"the
sharpest example is from {Company} — that's where I ran the biggest operational surface."*

**Two exceptions where recency IS the signal**, and no phrasing fixes a stale answer:
**§2.1** (last challenging feedback you gave) and **§3.4** (last incident). Those need
something from roughly the **last 6–8 weeks**. If there isn't one, that is a **real gap closed
by doing, not by wording** — log it in §9.

---

## §1. Do you actually know your own scope?

The cheapest probes in existence. They cost the interviewer ten seconds and separate operators
from title-holders instantly.

### 1.1 "How big is your team / what's your scope?" ⟨manages-people⟩
- **Signal:** Do you hold your org in your head? Silently checks your scope against the req.
- **Good:** Instant, exact, with shape. *"8 direct — 4 backend/platform, 4 data."*
- **Bad:** *"Around ten, depends how you count."* Hesitation here colors the whole interview.
- ⚠️ **Golden Rule #11 lives here.** Lead with the facet **the role asked for**. If the req is
  narrower than your real scope, the on-target number goes in the **first clause** and the
  broader scope comes second, only if asked. This is the single most common way a strong
  candidate reads as over-leveled.
- **Tech-lead round, no reports:** answer on the **technical** surface you own — the systems,
  who depends on them, and how many people build on your calls.

### 1.2 "Who's your strongest person, and who's struggling?" ⟨manages-people⟩
- **Signal:** Do you *evaluate* people, or just administer them? A manager who can't rank has
  no bar.
- **Good:** Names the **axis** (*"strongest at turning an ambiguous ask into a scoped plan"*),
  and for the struggler: the specific gap, what you're doing, and by when.
- **Bad:** *"Everyone's great."* / Ranking by raw output only. / Naming a struggler with no plan.
- 🔒 **Privacy (Golden Rule #9):** in the repo, refer to people by role alias only — never a
  real name, in any file.

### 1.3 "When did you last write or review code?" *(or: design, ship, analyze — your craft)*
- **Signal:** Honesty about your hands-on level. There is no wrong answer, only an evasive one.
- **Good:** A straight fact plus what you use it for. *"I review regularly, I don't take
  tickets — I read PRs to stay close to the design decisions."*
- **Bad:** Inflating it. Any interviewer can puncture a fake hands-on claim in two follow-ups.

### 1.4 "What did you do yesterday?"
- **Signal:** Brutal and underrated. A real operator's day has *texture*; a title-holder
  describes a job description.
- **Good:** 3–4 concrete items with names-of-things: *"two 1:1s, unblocked the migration
  decision on X, pushed back on a scope add, wrote the risk update."*
- **Bad:** *"Meetings, mostly."* / A generic list of responsibilities in the abstract.

### 1.5 "What are you working on that only you can do?"
- **Signal:** Do you understand leverage, or are you doing someone else's job?
- **Good:** One or two things that are structurally yours — a cross-team negotiation, a call
  only you have the context for, headcount.
- **Bad:** Anything a peer or a more junior person could do. That's a delegation flag.

---

## §2. People & feedback ⟨manages-people⟩

**Skip this whole block for a tech-lead round with no reporting line** — hiring, promotion and
1:1s aren't that role's accountability, and answering as though they were over-levels the
candidate (Golden Rule #11). §2.1 is the one to keep even then, answered on **peer and review
feedback** rather than on a direct report.

### 2.1 "What was the last challenging feedback you gave someone? What was it — and when?" ⭐
*(The one probe in this block that survives a no-reports lead round — answer it on a peer.)*
- **Signal:** Three at once — (a) do you give hard feedback at all, or only in review cycles;
  (b) **when**, i.e. are you present with your team *right now*; (c) can you say the **actual
  words**, or only describe the category?
- **Good:** Recent. A specific behavior, not a personality trait. **The literal sentence you
  used.** Their reaction — including if it went badly. What changed after. One thing you'd do
  differently.
- **Bad:** *"I told someone they needed to communicate better"* — that's a category, not
  feedback. / A story from two years ago. / A performance rating dressed up as feedback. /
  You as the hero and the other person as the problem.
- ⏱ **Recency probe** — see the "last X" rule in §0.

### 2.2 "Who's the last person you hired? Would you hire them again?"
- **Signal:** Do you close the loop on your own hiring decisions, or is hiring something that
  happens to you?
- **Good:** The bet you made, what you were unsure about at the time, and the honest verdict
  now — including *"yes, but I'd have onboarded them differently."*
- **Bad:** An unqualified yes for everyone. Nobody has a 100% hit rate; claiming one means you
  aren't measuring.

### 2.3 "What would your team say is your biggest weakness?"
- **Signal:** Does feedback actually *reach* you? The phrasing is the trap — it asks for
  **received** feedback, not introspection.
- **Good:** A specific thing **someone actually told you**, when, and what you changed. The
  concreteness is what proves the loop exists.
- **Bad:** A strength in disguise (*"I care too much"*). / An abstract self-diagnosis with no
  source — that's introspection, and it fails the question as asked.

### 2.4 "How do you run your 1:1s? What did you talk about in your last one?"
- **Signal:** The first half is answerable by anyone who's read a blog post. The **second half**
  is the probe — presence.
- **Good:** A short structure (whose agenda, what's standing, cadence) then a real, specific
  recent topic. Vagueness on the second half undoes the first.
- **Bad:** Only the theory. / *"Status updates"* — that's a standup, not a 1:1.

### 2.5 "Who have you promoted, and what was the case you made?"
- **Signal:** Can you calibrate level and advocate upward? Promotion is where a manager's word
  gets spent — they want to see you've spent it.
- **Good:** The specific scope change that justified it, the evidence you brought, who you had
  to convince.
- **Bad:** *"They were ready"* with no case. / A promotion the process handed you.

---

## §3. Technical / craft authority

Where "someone who used to do the work" separates from "someone still accountable for it."
Hands-on and lead reqs weight this block heavily.

### 3.1 "When did you last change your team's technical direction? What happened?" ⭐
- **Signal:** Do you *have* authority, or ratify what others decide? *"What happened"* tests
  whether you tracked the outcome of your own call.
- **Good:** One decision. The **trigger** (what evidence made you change course), the call, the
  resistance you got, and the **measured outcome including the cost**: *"We were building X;
  two months in, Y showed Z; I stopped it and moved to W; it cost N weeks and bought us M."*
- **Bad:** A decision the team made that you agreed with. / A direction change imposed from
  above, retold as yours. / No outcome — *"and it's going well."* / A stack preference with no
  evidence behind it.

### 3.2 "What's a decision your team made that you disagreed with? What happened?" ⭐
- **Signal:** Both directions at once. Do you **have opinions** (rather than rubber-stamping),
  AND can you **let a team own a call you don't love** (rather than always winning)? They're
  testing whether "I empower my team" is a behavior or a phrase.
- **Good:** A real disagreement **inside your own team**. You stated your position and the why,
  clearly and once. You let them proceed — or you explain the narrow, principled reason you
  didn't. You say honestly **who turned out right.** The strongest version is one where the
  team was right and you say so plainly.
- **Bad:** *"I can't think of one"* — reads as absent or as a rubber stamp. / Every example
  ends with you vindicated. / You escalated or overruled immediately. / **Substituting a
  conflict with another team** — that answers a different question and they will notice.

### 3.3 "Where's the biggest tech debt in your system, and why hasn't it been fixed?" ⭐
- **Signal:** Do you know your system's weak spot, and can you **defend a deliberate non-fix**?
  They want a prioritization tradeoff, not an apology. *The second clause is the real question.*
- **Good:** One specific thing. **Quantify the pain** — how often it bites, what it costs per
  occurrence. State the deliberate reason it's unfixed, and what the alternative work was.
  Then name **the trigger that flips the decision**: *"if X passes Y, we do it — it's written
  down."*
- **Bad:** *"We have a lot of legacy code."* / A confession — *"we've been meaning to get to
  it"* reads as no control. / Claiming there isn't any. / Blaming the business for never giving
  time — negotiating that time is your job.

### 3.4 "What was the last incident your team caused?" ⭐
- **Signal:** Note the word *caused*, it's deliberate. Three things: a blameless-but-honest
  relationship with failure; do you **know** your incidents; were you *in* it or told
  afterwards? Also quietly checks whether the team ships enough to have incidents at all.
- **Good:** Recent and specific. A timeline with **your** role in it. Customer impact stated
  plainly and numerically. The fix. Then the **systemic change** — a gate, a guardrail, an
  ownership change. Say **"we"** for the cause and **"I"** for the decisions.
- **Bad:** *"We don't really have incidents"* — untrue, or the team isn't shipping. / **Naming
  the person who caused it** (instant disqualifier, and a privacy violation in this repo). /
  A postmortem summary with no timeline and no numbers. / *"We added more tests."*
- ⏱ **Recency probe** — see the "last X" rule in §0.

### 3.5 "What's your biggest technical risk right now?"
- **Signal:** Forward-looking ownership. Debt is the past; risk is whether you're managing the
  future.
- **Good:** One named system, why it's a risk, the blast radius, and what you're doing — or
  explicitly and defensibly *not* doing — about it.
- **Bad:** A generic risk (*"scaling"*). / Listing five, which means you haven't prioritized.

### 3.6 "What's your on-call like? What wakes people up?"
- **Signal:** Operational reality, and whether you protect the team's sustainability.
- **Good:** Rotation shape, actual page volume, the top alert source, and what you did to
  reduce it — with the before/after number.
- **Bad:** Not knowing the page volume. / *"It's pretty quiet"* with no number.

### 3.7 "If I gave you one more person, where would they go and why?"
- **Signal:** An instant prioritization test. A sharp answer comes in under three seconds
  because you've already wanted that person.
- **Good:** Immediate, specific, and names the constraint it relieves. Bonus: *"and given the
  choice I'd take a different profile than the obvious one, because…"*
- **Bad:** Hesitation. / *"More capacity everywhere."* / Asking what kind of person.

---

## §4. Communication & altitude

### 4.1 "Explain what your team's system does like I'm not an engineer." ⭐
- **Signal:** Can you translate? Someone who can't do this can't brief an exec, a customer, or
  a recruiter. It also exposes shallow understanding — jargon is where that hides.
- **Good:** 2–3 sentences. **Start with the human problem, not the architecture.** One analogy.
  One concrete "who uses it and for what." Then **stop**, and offer: *"happy to go a level
  deeper if useful."* Under 45 seconds.
- **Bad:** Opening with architecture. / Unglossed jargon. / Three minutes. / Over-flattening to
  nothing: *"we build infrastructure."*
- 📌 **One of only two answers worth scripting verbatim** (the other is the comp line in §7) —
  short, high-frequency, and there is a specific right wording. Draft it during prep, save it
  under this probe, and rehearse it out loud.

### 4.2 "Something shipped late — what did you tell your stakeholders, and when?" ⭐
- **Signal:** Do you escalate early with a revised plan, or go quiet and hope? The single best
  predictor of whether someone can be trusted with a date. *"When" is the entire question.*
- **Good:** You knew before they did. You told them when the slip became **likely**, not
  certain. You brought **options** (cut scope / move the date / accept the risk), not just
  news. You gave a new date **once** and hit it. Put a number on the lead time: *"I flagged it
  three weeks out."*
- **Bad:** *"We communicated transparently"* with no timeline. / Told them at the deadline. /
  Blamed a dependency. / A story where you heroically caught up and never had to tell anyone —
  that dodges the question.

### 4.3 "How do you report status upward?"
- **Signal:** Do you have a rhythm, or do you report when asked?
- **Good:** The artifact (written, cadence, audience), what's always in it — especially **risks
  before they become problems** — and one example of it working.
- **Bad:** *"I keep my manager in the loop."* / Verbal only.

### 4.4 "How would your skip-level describe you?"
- **Signal:** Do you know how you're perceived two levels up? Also a soft check on whether that
  relationship exists at all.
- **Good:** A phrase you've actually heard, plus the flip side of it.
- **Bad:** Pure aspiration — *"I'd hope they'd say…"* means you don't know.

---

## §5. Judgment & failure

### 5.1 "Tell me about something that failed. What was your part in it?" ⭐
- **Signal:** Can you take **specific, non-performative ownership** — without self-flagellating
  or diffusing into "we" / "the org" / "priorities shifted"? *The second sentence is the whole
  question.*
- **Good:** A real failure with a real cost. **Your specific decision** that contributed. No
  blame outsourcing. Then a **mechanical change** you made afterwards that has since held. End
  on the mechanism, not the feelings.
- **Bad:** A disguised success (*"we shipped late but learned so much"*). / A failure caused
  entirely by others. / *"I trusted my team too much"* — a humblebrag. / Over-apologizing; it
  reads as unresolved and makes interviewers uncomfortable.

### 5.2 "Tell me about a decision you got wrong."
- **Signal:** Same family as 5.1 but narrower — it must be **a decision**, i.e. yours alone.
- **Good:** The decision was unambiguously yours, the cost is quantified, and the lesson is a
  rule you now follow.
- **Bad:** A decision that was really someone else's. / A "wrong" decision that turned out fine.

### 5.3 "When do you overrule your team?" ⟨manages-people⟩
- **Signal:** Whether "empowerment" is a principle or an abdication. Both extremes fail.
- **Good:** Names the **narrow conditions** (irreversible, cross-team blast radius, a
  commitment only you can see), one real instance, and what you did afterwards to keep the
  team's ownership intact.
- **Bad:** *"Never"* (abdication). / *"When I know better"* (no framework). / No example.

### 5.4 "What did you say no to last quarter?"
- **Signal:** Prioritization is only real if something was actually **killed**. Nearly everyone
  fails this one.
- **Good:** A specific thing, who wanted it, what you said, and what you protected by saying no.
- **Bad:** *"We deprioritized some things."* / Only saying no to obviously bad ideas.

### 5.5 "Scope, date, or quality — one has to slip. Which, and why?"
- **Signal:** Do you decide fast, and do you know **who else is in the room** for that call?
- **Good:** Picks immediately (usually scope), gives the reasoning in one line, then names the
  stakeholder conversation that has to happen. Notes when the answer would flip.
- **Bad:** *"It depends"* with no follow-through. / Choosing quality without acknowledging the
  debt you just took on.

---

## §6. Do you have a model, or just experience?

### 6.1 "What's the difference between a senior and a staff engineer?" *(or the equivalent level boundary in your discipline)*
- **Signal:** Can you calibrate level? If not, your hiring bar and your promotions mean nothing.
- **Good:** A crisp boundary — how much ambiguity they absorb, the blast radius of their
  decisions, whether they create leverage for others — plus one concrete example of someone
  crossing it.
- **Bad:** *"Staff is more senior."* / A list of behaviors with no dividing line.

### 6.2 "What makes a good {engineering manager / senior engineer / designer / PM}?"
- **Signal:** Do you have an *opinion*, or a virtue list?
- **Good:** Short, opinionated, and it **names something you deprioritize.** The tradeoff is
  what makes it a model instead of a wish list.
- **Bad:** Eight virtues. / Anything you'd find on a careers page.
- ⚠️ **Avoid self-claimed trait adjectives** (`CLAUDE.md` §4) — "low ego", "humble",
  "passionate". Name the observable behavior instead.

### 6.3 "How do you know your team is doing well?"
- **Signal:** Arguably the best single probe in this file. Do you manage by metric, by vibe, or
  by whatever your VP last asked about?
- **Good:** 2–3 metrics you **actually watched**, at least one of which is a **business
  outcome** rather than a delivery proxy, plus what you'd *do* if one moved the wrong way.
- **Bad:** *"Velocity and happiness."* / Story points. / Only lagging indicators. / Metrics you
  can name but have never acted on.
- 💡 Pull these from each role's **"How success was measured"** section in
  `profile/work-experience/`. If that section is still `TODO`, this probe is unarmed.

### 6.4 "How long does a change take to reach production?"
- **Signal:** A number you don't know is a team you don't run. That's the whole question.
- **Good:** The number, the shape of the pipeline, and where the bottleneck is.
- **Bad:** An estimate hedged three ways. Say the number first, then caveat.

### 6.5 "Walk me through your last release."
- **Signal:** Depth of involvement. Were you *in* it, or briefed on it?
- **Good:** The timeline, what nearly went wrong, your role — **including where you were slow.**
- **Bad:** A summary that could have been written from the changelog.

---

## §7. The recruiter / talent-screen variants (different bar, same trick)

Recruiters and talent partners don't test depth — they test **coherence and level**. Failure
here is almost never technical; it's a level mismatch or a rambling answer.

| Question | What they're checking | Fail mode |
|---|---|---|
| "Describe your current team/role in one sentence." | Does your scope match the req? | **#11 over-leveling** — leading with a broader scope than the req asked for |
| "Why are you leaving?" | Stability, self-awareness | Anything blaming; anything long |
| "What are you looking for?" | Can this role actually satisfy you? | A generic answer reads as "any job" |
| "Salary expectations?" | Band fit, before anyone spends time | Quoting your current total comp (never do this) |
| "Explain what your team does, simply." | Will you be credible with non-technical stakeholders? | Jargon (§4.1) |
| "Are you comfortable with X?" (remote, on-call, travel) | Logistics screening | Over-explaining a simple yes |

⚠️ **The Golden Rule #11 trap lives in this table.** Every one of these invites you to describe
your scope — and if your honest scope is *broader* than the req, the honest-but-unweighted
answer reads as over-leveled. Lead with the on-target facet **every time**; let the broader
scope come second, only if asked. Same rule as §2.2b check 6 for written answers.

📌 **The comp line is the second answer worth scripting verbatim.** State your floor from
`profile/preferences.md` → *Comp floor* and hand the band question straight back (*"what's the
band for this role?"*). Never quote your current comp — it anchors you to your past salary
instead of the role's budget.

---

## §8. Recall card — read this in the 10 minutes before a round

*(Per-user. Starts empty; the `interview-prep` skill fills it from `profile/stories/`. Keep it
to one screen — it's a recognition index, not a script.)*

**The three tells:** a number you own · a tradeoff you name first · a mechanism, not a feeling.

**Buy time:** *"Let me pick the best one rather than the first one."*

**Story → probe map (recognition, not recall):**

| If they ask about… | Reach for |
|---|---|
| Changing technical direction (§3.1) | `TODO(prep)` |
| A failure / a wrong decision (§5.1, §5.2) | `TODO(prep)` |
| Late delivery & stakeholders (§4.2) | `TODO(prep)` |
| Hard feedback / someone struggling (§2.1) | `TODO(prep)` |
| Your bar for talent / level boundaries (§6.1) | `TODO(prep)` |
| An incident or a control gap (§3.4) | `TODO(prep)` |
| Conflict, in-team (§3.2) and cross-team | `TODO(prep)` |
| Explaining the system simply (§4.1) | the scripted line — say it, then stop |

**Opening fact, always:** `TODO(prep)` — the one-line scope sentence, weighted for **this**
role (§1.1, Golden Rule #11).

---

## §9. Open gaps — what this file can't fix by wording

*(Per-user. Starts empty. Every probe with no fact behind it lands here, and the
`interview-prep` coverage gate surfaces it.)*

Two kinds of gap, and they are not fixed the same way:

- **Recency gaps** (§2.1, §3.4) — closed only by **doing something**, not by phrasing it
  better. A small recent instance beats a large old one.
- **Missing numbers** (§3.3, §3.6, §6.3, §6.4) — a lookup. Get the figure, then record it in
  the relevant `profile/work-experience/` file so it's reusable.

| # | Probe | What's missing | Kind | Status |
|---|---|---|---|---|
| | | | | |

> **Note on preparation strategy:** this file is deliberately a **recognition index** rather
> than a set of scripts, because retrieval under interview pressure — not knowledge — is the
> usual failure. Scripts collapse when memory is loaded; a probe → story map doesn't. The only
> two answers that should be **scripted verbatim** are §4.1 (explain the system simply) and
> the comp line in §7: both are short, high-frequency, and have a specific right wording.
