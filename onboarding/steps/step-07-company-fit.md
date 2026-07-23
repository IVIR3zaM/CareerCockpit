# Step 7 — Company-fit interview (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 7); this is the full logic the agent follows. Obey the global onboarding
> invariants: **one step per re-prompt · one targeted question at a time · state in
> [`../CHECKLIST.md`](../CHECKLIST.md)**. This step captures **what the user wants from an
> employer** — culture must-haves, ways of working, comp frame, and deal-breakers — into
> [`../../profile/company-fit.md`](../../profile/company-fit.md), in the user's own words.

---

## Purpose

`profile/company-fit.md` is a small file that does a lot of work later. Once it's filled it
drives three things (per its own header):

1. **Fit-scoring a new application.** When a JD comes in (CLAUDE.md §2.1 step 5), the agent
   scores the role against these must-haves and deal-breakers and flags mismatches — the user
   is job-searching *toward* this culture and *away* from something, so a deal-breaker signal
   should surface early.
2. **The honest "what are you looking for / why this company" answer.** These are the genuine
   reasons the user is moving; they become the spine of that interview answer instead of a
   generic script.
3. **The vetting agenda — questions to ask *them*.** Each must-have and deal-breaker converts
   into a question that tests whether the company actually has it.

The value is entirely in it being **the user's real preferences in their own words**, not a
list of tech-industry platitudes. So this step is an **interview**, not a form: focused
questions, one at a time, and you write down *what the user says* — never what a "good
candidate" is supposed to want.

> **Golden Rule #2 applies here too: never fabricate.** Don't infer must-haves the user didn't
> state, don't upgrade a mild preference into a deal-breaker, and don't borrow culture language
> from elsewhere. If the user is vague, ask a sharper question; if they don't have an opinion
> on something, leave it out.

---

## Inputs

- **None required** — this is a conversation. It helps to have Steps 2/4 done (the agent knows
  the user's discipline/level and current/past roles from `onboarding/decisions.md` and
  `profile/`), so questions can be grounded in *their* situation (e.g. "you're an EM — how much
  hands-on time do you want to keep?"). But the step can run without them.
- If the user has already dropped culture signals earlier in onboarding (a story about why
  they're leaving a role, a comment while populating `profile/`), **reuse those** — read them
  back and ask the user to confirm/refine rather than asking cold.

---

## The flow: frame → walk the bank one question at a time → confirm

### 1. Frame it in one short opener (not a wide-open prompt)
Don't start with "tell me everything you want in a company" — that's exactly the wide-open
prompt the protocol bans, and it produces platitudes. Open with the purpose and the shape:

> "I want to capture what *you* actually want from your next employer — the things that would
> make you take or refuse a role. I'll ask a handful of focused questions, one at a time, and
> write your answers into `profile/company-fit.md`. Ready? First one:"

Then ask the questions below **one per turn**, waiting for each answer. Adapt the wording to
the user's discipline/level. Skip a question if the user has clearly already answered it; probe
deeper if an answer is thin.

### 2. The question bank (ask sequentially — a floor, not a script)
Grouped by theme. Ask the ones that fit; follow a thin answer with a sharpening follow-up
("what would that look like day-to-day?"). **One question per turn.**

**A. The push — why moving.** *(Often the richest source; ask first.)*
- "What's making you look right now — what's not working in your current or most recent role?"
  *(A deal-breaker usually hides in the answer — the thing they won't repeat.)*
- "What's the one thing that, if a new company had it, would matter most to you?"

**B. Culture & how teams are run.**
- "Describe a team you did your best work on — what made it work?"
- "How should decisions get made — direction set top-down and handed to you, or teams shaping
  *what* gets built, not just *how*?"
- "How should the company measure success — shipping features/output, or customer/business
  outcomes?"
- "How is failure handled where you want to work — blameless learning, or someone takes the
  blame?"

**C. Ways of working.**
- "Remote, hybrid, or onsite — and is that a preference or a hard requirement?"
- "What's your pace/hours boundary — what does sustainable look like for you?"
- "How much do you want to stay hands-on vs. lead/coordinate?" *(Especially for senior/staff/
  manager tracks — calibrate to their level.)*
- "Team size / stage — startup scrappiness, scale-up, or big-company structure?"

**D. Comp frame.** *(Frame, not a number — see the privacy note below.)*
- "What's your comp frame — base floor, equity appetite, cash-heavy vs. upside-heavy? I'll
  record the *shape*, not a figure, unless you want the number saved."

**E. Deal-breakers — the hard no's.**
- "What would make you turn a role down even if everything else looked great?"
- "Any domains or business models that are off the table for you?" *(e.g. someone might rule
  out a whole industry — capture it plainly.)*
- "Anything you've experienced that you refuse to repeat?"

**F. Evidence (optional, powerful later).**
- "Have you written or spoken publicly about how you think teams should work — an article, a
  talk, a post? If so, it's great backing for the 'what are you looking for' answer."

> **Manager/leadership questions are gated.** The "how much hands-on vs. lead," team-shape, and
> "how is failure handled across a team" angles land hardest for people who manage or lead.
> If Step 2 recorded the user as an IC who doesn't manage people, keep those lighter and
> centre their own working conditions instead. Never assume a management frame.

### 3. Write each answer straight into `company-fit.md` as you go
Don't wait until the end. After each substantive answer, route it into the file (see the
structure below) in **the user's own words** — quote/paraphrase them, don't rewrite into
corporate language. This keeps state durable if the session ends mid-interview (the file itself
is the progress marker; you resume by reading which sections still say `TODO(user)`).

### 4. Confirm (the one place batching is allowed)
When the bank is walked (or the user wants to stop), read back a compact summary — the batch
the protocol permits:

> "Here's your company-fit as I captured it:
> **Must-haves:** `<list>`. **Deal-breakers:** `<list>`. **Ways of working:** `<remote/pace/
> hands-on>`. **Comp frame:** `<shape>`. Did I get your words right, and is anything missing or
> too strong?"

Fix on feedback. Set the file's frontmatter `confirmed: true` once the user signs off.

---

## The file structure (`profile/company-fit.md`)

Fill the skeleton that already exists in the repo. Shape:

```markdown
---
title: What I'm looking for in a company (culture fit & deal-breakers)
confirmed: true            # set true once the user signs off
---

# What I'm Looking For in a Company

<!-- The throughline in one line: what you're moving toward (and away from). -->

## Must-haves (what I want)
- {the user's own words — culture, decision-making, outcome vs output, ways of working}

## Deal-breakers (what I'm avoiding / won't repeat)
- {the hard no's — the things that turn a role down on their own}

## Ways of working
- **Work mode:** {remote / hybrid / onsite — preference or hard requirement}
- **Pace / boundaries:** {…}
- **Hands-on vs. leading:** {… — if applicable to their track}
- **Team size / stage:** {…}

## Comp frame
- {shape only — base floor / equity appetite / cash-vs-upside. A number only if the user
  explicitly wants it stored.}

## How to use this
- **Fit-scoring a new JD:** flag matches/mismatches against must-haves and deal-breakers in
  the application's `application.md`.
- **"What are you looking for?"** → lead with the genuine must-haves; it's why you're moving.
- **Questions to ask them** → turn each must-have / deal-breaker into a question that vets
  whether the company actually has it.

## Evidence (my own words / track record)
- {articles / talks / stories that demonstrate the culture the user wants — optional}
```

Keep the "How to use this" section (it tells future sessions how to apply the file). Only the
top sections are user-elicited.

---

## Privacy & house rules on write

- **No third-party names (Golden Rule #9 / CLAUDE.md §0.9).** If a push-factor story names a
  manager, colleague, or report, alias them (`a peer`, `my skip-level`, `a report`) before
  writing — in contents *and* any `[[links]]`. Don't record sensitive attributes of anyone.
- **No employer-confidential specifics.** A deal-breaker can describe *what happened* without
  naming a real internal metric, unreleased product, or customer. Keep it generic.
- **Comp is a frame, not a leaked figure by default.** Record the *shape*; store an actual
  number only if the user explicitly asks — and never a past employer's confidential comp data.
- **Banned outward-facing phrasing still applies** (CLAUDE.md §4). The underlying *preference*
  is captured faithfully, but when this file later feeds an interview answer, the agent must
  phrase trait-claims as observable behaviours ("credit is shared", "team-first", "blameless")
  rather than self-describing adjectives. Capture the real preference here; the wording rule
  bites at output time, not intake — so it's fine for the raw preference to live here plainly.

---

## What to write to `onboarding/decisions.md`

Append a short record so future sessions know this step ran:

```markdown
## Company fit
- **Decision:** captured — recorded {YYYY-MM-DD}
- **Result:** {N} must-haves, {M} deal-breakers written to `profile/company-fit.md`
  (`confirmed: true`).
- **Open:** {TODO(user): <anything the user deferred> | none}
```

If the user wants to skip this step for now, record `Decision: deferred` instead and leave
`company-fit.md` as its `TODO(user)` skeleton — a deliberate skip is done, but note it's thin.

---

## Outputs

- **`profile/company-fit.md`** — must-haves, deal-breakers, ways of working, and comp frame in
  the user's own words; `confirmed: true`; third parties aliased, no confidential specifics.
- **`onboarding/decisions.md`** — a short **Company fit** record future sessions read.

---

## Done-criteria (tick the box when all true)

- [ ] The user was asked a **sequence of targeted questions** (not one wide-open prompt), one
      per turn, covering must-haves and deal-breakers at minimum.
- [ ] Their answers were written to `profile/company-fit.md` in **their own words**; nothing
      was invented or borrowed from generic culture language.
- [ ] Third-party names are aliased and no employer-confidential specifics were written.
- [ ] The user confirmed the read-back and `confirmed: true` is set (or the step was
      **deferred** and that is recorded).
- [ ] The decision/result is recorded in `onboarding/decisions.md`.

Then tick Step 7 in [`../CHECKLIST.md`](../CHECKLIST.md), note in its cell what was captured
(or "deferred"), and tell the user to re-prompt with **"continue onboarding"** — next is
**Step 8 (generate the interview question set)**.
