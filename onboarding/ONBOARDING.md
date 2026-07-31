# ONBOARDING.md — Why the flow works the way it does

**For a normal onboarding turn you don't need this file** — [`CHECKLIST.md`](CHECKLIST.md) is
the entry point: it carries the live state, the protocol, and a link to each step doc. Read
this one **once** at the start of onboarding, or when a step is ambiguous and you want the
reasoning behind the rules.

> **This is instructions for the agent, not a form the user fills in.**

---

## Why one step per re-prompt

Onboarding turns a stranger's career into a populated `profile/`. Doing it in one giant turn
fails three ways: the context fills with half-parsed CV text, a crash loses everything, and
the user gets a wall of questions instead of a conversation. So state lives entirely in
`CHECKLIST.md` and each turn advances exactly one step. That also means **each step doc is
read only on the turn that runs it** — which is why the docs are short and don't restate the
Golden Rules (already always-on in `CLAUDE.md`) or the protocol (in `CHECKLIST.md`).

## Why one targeted question at a time

Everyday cockpit use batches questions (`CLAUDE.md` §2.0). Onboarding does the opposite: a
new user doesn't yet know what the system wants, so a wide-open "tell me about your career"
produces a thin, unusable answer — and a batch of eight questions produces four skipped ones.
A single, anchored question ("there's a gap between X and Y — what were you doing then?")
gets a real answer. The one exception is the **final confirmation** at the end of a step,
where reading everything back at once is the point.

## Why git-save comes first

Step 1 settles how work gets saved **before** anything is written, so every commit made
during the rest of onboarding already respects the user's choice. Get the order wrong and
later steps either spam commits the user didn't want, or silently lose work they assumed was
saved. (The public README lists saving-your-work later in its feature summary; the execution
order in `CHECKLIST.md` is authoritative.)

## Career-gap & chronology sensitivity (fires across Steps 2, 4 and 6)

This is a *sensitivity baked into the flow*, not a separate step — it fires wherever dates
are involved. The visible timeline in a CV must be strictly **reverse-chronological and
unbroken** (Golden Rule #3).

- On a **date gap** ("role X ended 2021-03, role Y started 2022-06"), ask **one targeted
  question**: *"There's a gap between <role X> (ended YYYY-MM) and <role Y> (started
  YYYY-MM) — what were you doing then?"* Capture the answer in the right `profile/` file (a
  break, study, caregiving, contracting…), or record a `TODO(user)` if they defer. Never
  paper over it and never reorder roles to hide it.
- If roles appear **out of chronological order** on the source CV, don't copy that order —
  file them by real date and confirm the sequence with the user.
- Prefer the plainly-honest version of a gap over an inferred one. If you don't know, ask.

## Where the deep procedures live

Steps that share logic with everyday cockpit work **delegate to the skills** rather than
restating them — the skill is the single home for the craft, the step doc only adds the
onboarding-specific constraints (ordering, resumability, what to record):

| Step | Delegates to |
|---|---|
| 8 — question set | `interview-question-generator` skill |
| 9 — story loop | `story-elicitation` skill |
| 3 / any render | `tailored-cv` skill (PDF pipeline) |

## Where onboarding writes

- **Values** → `profile/preferences.md` (the settings table, read every session — keep it
  terse).
- **Reasoning, dates, test results** → `profile/decisions.md` (read on demand).
- **Career facts** → the right `profile/` file, per the router in `CLAUDE.md` §2.4.
- **State** → `onboarding/CHECKLIST.md`, and nowhere else. Per Golden Rule #8, never the
  agent's own memory.

The ordered list of steps, with links, is the table in [`CHECKLIST.md`](CHECKLIST.md).
Onboarding is complete when every box there is ticked.
