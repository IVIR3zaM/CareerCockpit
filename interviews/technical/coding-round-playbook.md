# Live coding round — reusable playbook

For a 60–90 minute live coding round with an interviewer watching. Generic across languages;
pair it with a language-warmup file (see `language-warmup-TEMPLATE.md`) for the specific
syntax de-rust.

---

## 0. HARD RULES for the agent running the prep ⛔

These bind **the agent**, not the user. Each one exists because breaking it lost a round.

1. **Never tell the user a topic "won't come up."** You have **no visibility into the prompt**,
   so any such claim is a guess presented as information. The honest answer to *"will they ask
   me X?"* is a probability **plus a rehearsal** — never a reassurance.
   The asymmetry is what makes this a hard rule: being wrong in the direction of *"we prepped
   something they didn't ask"* costs an hour, while being wrong in the direction of *"we skipped
   something they did ask"* costs the round. And the damage compounds — a user told a topic is
   safe stops rehearsing it, so the agent's guess quietly removes the one thing that would have
   covered for the guess being wrong. **When the user names a specific worry, that worry is
   data about the round; treat it as a signal, not as a coverage question to be argued down.**
2. **If the user asks to rehearse something specific, rehearse it — full stop.** They are the
   one sitting in the room; their instinct about what will hurt them outranks the agent's
   coverage plan. Deprioritising a level the *plan* invented is fine. Deprioritising a level
   the *user asked for* is not.
3. **Never let a recruiter's "the bar is lower for this role" downgrade the prep.** A round a
   company keeps in the loop is a round they will fail people on. The most that claim can
   safely mean is *"they still expect working code."*
4. **Budget the prep so the hardest level gets rehearsed with runway to spare** (§1). This
   fails the afternoon *before* the round, not on the day.

---

## 1. Rehearse the HARDEST level first ⭐

Many live-coding rounds are **laddered**: the problem is built in stages, each adding a
constraint (e.g. L1 CRUD → L2 scan/prefix or secondary index → L3 TTL/expiry → L4
transactions). The natural instinct is to prepare bottom-up. It is the wrong order.

- The bottom levels are cheap and you will get them anyway.
- **Rehearsal converts thinking time into recall time** — so spend it on the expensive level.
- The round is decided at the top of the ladder, which is exactly where bottom-up prep runs
  out of runway.

**Rule: practice the top of the ladder first.**

## 2. Assume the top level has a twist

The hardest level is rarely the vanilla version. Expect *nested* rather than flat, or the hard
feature **interacting with** an earlier one — transactions that must roll back a secondary
index, TTL that retroactively changes a count. Rehearsing the plain version still leaves the
gap. **When practising the top level, do the nastier variant.**

## 3. Running code is not optional

It is tempting to read a company's "we weight communication most heavily" as permission to
arrive at zero executed code. It is not. Communication is weighted **on top of** a working
artifact, not instead of one.

- **Bank a green checkpoint before touching the hard level.** L1 working and executed beats L4
  designed and unexecuted.
- **Run the code at every level boundary**, not once at the end. *"It never ran"* is a worse
  sentence than *"the last feature is half-done."*
- **Never have more than one thing broken at a time.**
- A design walkthrough is a legitimate *close* to a round that produced code; it is not a
  substitute for one.

## 4. Take the interviewer's design steer

Arguing a marginal design point burns clock and goodwill. Take the steer, implement it, and if
you still think you were right, work it out afterwards — that is what the debrief is for.
**Adopting a suggestion cleanly is itself a positive signal.**

⚠️ **And do not blame a rejection on having taken the steer.** Post-rejection self-diagnosis
reaches for the most *memorable* moment rather than the most *load-bearing* one. Check which is
which before absorbing a lesson — a wrong lesson is worse than none, because it gets prepped
against.

## 5. Pace — a pattern to watch, not a verdict

*"I'm not a fast thinker"* is a common self-diagnosis after a round that ran out of clock. Test
it before believing it: **if the clock went on an UNREHEARSED level, the evidence says
rehearsal coverage, not thinking speed.** Only if a genuinely *rehearsed* problem family runs
out of clock is there a pace finding worth recording.

This matters because the two diagnoses have opposite remedies: one is fixed by §1, the other by
something much harder — and adopting the harder one on no evidence is demoralising and useless.

## 6. Reusable design pockets

Patterns worth working out **once**, in advance, so the round is recall rather than derivation.
Build this section up over time; these are the ones that recur.

- **Layered / nested transactions.** Each layer = an overlay of writes **plus a set of
  deleted-key tombstones**, so *"deleted in this layer"* is distinguishable from *"untouched in
  this layer"* — without tombstones, rollback either resurrects stale values or loses live
  ones. Reads resolve innermost-first, falling outward. **Own the layers as a stack inside the
  store** (`layers[0]` = base, last = innermost): BEGIN pushes, ROLLBACK pops, COMMIT
  pops-and-merges into the new last. Nothing outside holds a layer reference, so there is no
  external pointer surgery and all three operations are O(1).
- **Secondary / reverse index under transactions** (e.g. `COUNT <value>`): each layer carries
  its own count **deltas**; a resolved count = base count + the deltas of every active layer.
  It must unwind with the layer.
- **TTL / expiry:** store an **absolute expiry timestamp**, never a duration. Expire **lazily
  on access** — a timer-based sweep also keeps the event loop alive and hangs a console
  program. Funnel *every* read through one liveness helper, because expiry retroactively
  touches count, size and scan too, not just `get`. **Inject the clock** (`now: () => number`)
  so expiry is testable without real sleeps.
- **Money:** integer minor units, never floats. Multi-step operations atomic.
- **Refactors:** two passes — shape change first (keep it compiling, tests still green), then
  behaviour. **Say this out loud**; it is a trust signal.

## 7. Environment

- A shared browser IDE (CodePair and similar) means **no personal editor and no AI
  autocomplete**. Practice with autocomplete **off** — unless the round explicitly permits AI
  (see below), in which case practice *with* it.
- **Do a dry run in the real tool beforehand, on a practice account** — never the live invite
  link. Learn only three things: the language selector, Run, and the stdin boilerplate.
- Write an inline `assert(cond, msg)` helper and call it from `main`. Routing assertions
  through your own command dispatcher — so the tests are themselves commands — reads as senior.

### ⚠️ Never assume the AI policy — confirm it per round

Rounds now come in both flavours, sometimes at two companies in the same week: **AI-forbidden**
(classic no-autocomplete pairing) and **AI-permitted** ("live coding with AI"). They reward
different things and they need different rehearsals.

An **AI-permitted** round grades **how you drive the tool** far more than syntax recall:
prompt/plan/verify discipline, reading and correcting generated code, and being able to say
**why you rejected a suggestion**. Prep it with real evidence of your own working method, not
as an anecdote.

**Ask which it is. Do not infer it from the company's engineering brand.**

---

## Related

- `interviews/technical/system-design-checklist.md` — the design-round equivalent
- `interviews/technical/language-warmup-TEMPLATE.md` — morning-of syntax de-rust
- After every real coding round, run the `interview-debrief` skill and fold what the round
  actually asked back into §6.
