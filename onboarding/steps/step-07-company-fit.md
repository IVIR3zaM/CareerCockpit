# Step 7 — Company-fit interview

**Purpose:** capture **what the user wants from an employer** — culture must-haves, ways of
working, comp frame, deal-breakers — into
[`../../profile/company-fit.md`](../../profile/company-fit.md), **in their own words**.

That small file does a lot of work later: it **fit-scores every new JD** (the
`new-application` skill), it becomes the spine of the honest *"what are you looking for / why
this company"* answer, and each must-have converts into a **question to ask them**.

The value is entirely in these being the user's *real* preferences, not tech-industry
platitudes — so this is an **interview, not a form**. Never infer a must-have the user didn't
state, never upgrade a mild preference into a deal-breaker (Golden Rule #2).

**Inputs:** none required. If Steps 2/4 ran, ground the questions in *their* situation. If the
user already dropped culture signals earlier in onboarding ("why I'm leaving"), **read those
back and ask them to confirm/refine** rather than asking cold.

## 1. Frame it in one short opener

> "I want to capture what *you* actually want from your next employer — the things that would
> make you take or refuse a role. I'll ask a handful of focused questions, one at a time, and
> write your answers into `profile/company-fit.md`. Ready? First one:"

Then ask **one question per turn**, adapting wording to their discipline/level. Skip what's
already answered; sharpen a thin answer ("what would that look like day-to-day?").

## 2. The question bank (a floor, not a script)

**A. The push — why moving** *(often the richest source; ask first)*
- "What's making you look right now — what's not working in your current or most recent role?"
  *(A deal-breaker usually hides in the answer — the thing they won't repeat.)*
- "What's the one thing that, if a new company had it, would matter most to you?"

**B. Culture & how teams are run**
- "Describe a team you did your best work on — what made it work?"
- "How should decisions get made — direction handed down, or teams shaping *what* gets built,
  not just *how*?"
- "How should success be measured — shipping output, or customer/business outcomes?"
- "How should failure be handled — blameless learning, or someone takes the blame?"

**C. Ways of working**
- "Remote, hybrid, or onsite — preference or hard requirement?"
- "What's your pace/hours boundary — what does sustainable look like?"
- "How much do you want to stay hands-on vs. lead/coordinate?"
- "Team size / stage — startup scrappiness, scale-up, or big-company structure?"

**D. Comp frame and target roles** *(these fill three settings — see Record below)*
- "What's your comp frame — and is there a **hard floor on base** you won't go under? I'll
  record the shape; tell me if you want the actual number saved."
- **Target track — ask this one explicitly, every time, and don't infer it from their current
  title:**
  > "Are you targeting **management/lead** roles, **individual-contributor** roles, or
  > **both**?"

  It decides whether leadership material gets prepared at all when no specific application is
  in play. **The answer is often not their current job** — an IC aiming for their first
  engineering-manager role, or a burnt-out manager going back to IC work, are both common and
  both get the *wrong* preparation if this is assumed. If they say management/lead and Step 2
  recorded *Manages people* = no, that is **not** a contradiction to resolve — record both,
  and say plainly that you'll prep the full leadership set and flag honestly where they don't
  have the experience yet (never invent it). If they're unsure, `both` is the safe value.
- "Which levels and domains are you actually targeting — and is there anything you'd want me
  to **rule out** or automatically down-rank when I screen a role?"

**E. Deal-breakers — the hard no's**
- "What would make you turn a role down even if everything else looked great?"
- "Any domains or business models that are off the table?"
- "Anything you've experienced that you refuse to repeat?"

**F. Evidence** *(optional, powerful later)*
- "Have you written or spoken publicly about how teams should work? It's great backing for the
  'what are you looking for' answer."

> **Leadership angles follow the TARGET track, not the current title.** "Hands-on vs. lead"
> and team-shape questions land hardest for people who manage **or intend to** — so ask the
> target-track question (block D) before deciding how deep to go. For someone targeting IC
> work only, keep those light and centre their own working conditions. Never assume a
> management frame, and never assume its absence either.

## 3. Write as you go, don't wait for the end

After each substantive answer, route it into `company-fit.md` **in the user's own words** —
quote or paraphrase, don't rewrite into corporate language. The file *is* the progress marker:
a session that ends mid-interview resumes by reading which sections still say `TODO(user)`.

Fill the existing skeleton's sections: *Must-haves · Deal-breakers · Ways of working (work
mode, pace, hands-on vs leading, team size/stage) · Comp frame · Evidence*. Keep the **How to
use this** section as shipped — it tells future sessions how to apply the file.

**Privacy on write:** alias anyone named in a push-factor story, keep employer specifics
generic, and record comp as a **shape** unless the user explicitly wants a number stored (and
never a past employer's confidential comp data). The banned-phrasing rule bites at *output*
time, not intake — capture the raw preference plainly here.

## 4. Confirm (the one place batching is allowed)

> "Here's your company-fit as I captured it: **Must-haves:** `<list>`. **Deal-breakers:**
> `<list>`. **Ways of working:** `<remote/pace/hands-on>`. **Comp frame:** `<shape>`.
> **Target track:** `<management-lead | IC | both>`. Did I get your words right, and is
> anything missing or too strong?"

Set `confirmed: true` in the frontmatter on sign-off.

## Record

- `profile/company-fit.md` → the elicited content, `confirmed: true`.
- `profile/preferences.md` → **Comp floor**, **Target-role filter** (both read by the
  `new-application` skill on every JD) and **Target track** (`management/lead | IC | both`).
- `profile/decisions.md` → `## Company fit (Step 7)`: date, how many must-haves/deal-breakers,
  the reasoning behind the floor and any ruled-out domains, **why the target track is what it
  is** (especially when it differs from their current role — that's the interesting case), and
  anything deferred.

Deferring is allowed — record `deferred`, leave the skeleton, tick the box, and note it's thin.

## Done when

- [ ] A **sequence of targeted questions** (not one wide-open prompt) covered must-haves and
      deal-breakers at minimum.
- [ ] Answers are in `company-fit.md` in **their own words** — nothing invented or borrowed
      from generic culture language.
- [ ] Third parties aliased; no employer-confidential specifics.
- [ ] The read-back was confirmed and `confirmed: true` set (or the step was deferred and
      that's recorded).
- [ ] **Comp floor**, **Target track** and **Target-role filter** are set in `preferences.md`.
      *(Target track was **asked**, not inferred from their current title — Step 8 reads it to
      decide whether to generate the leadership question blocks at all.)*

Tick Step 7 in [`../CHECKLIST.md`](../CHECKLIST.md) noting what was captured → next is **Step
8 (generate the interview question set)**.
