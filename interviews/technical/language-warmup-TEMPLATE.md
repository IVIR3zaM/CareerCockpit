---
title: "{Language} Coding-Interview Warmup"
purpose: De-rust {Language} syntax, data structures and OOP fast, the morning of a coding round
scope: Reusable — not company-specific
last_reviewed: YYYY-MM-DD
---

# {Language} Coding-Interview Warmup

> **Copy this file to `interviews/technical/<language>-coding-warmup.md` and fill it in for
> each language you might be tested in.** One file per language. Delete this quote block.

Fast de-rust for a **{Language}** coding round when you have been living in other languages.

> ### Why this file exists
> Most experienced engineers are **language-agnostic in practice** — they read and ship in
> several languages and pick whatever the job uses. That is a genuine strength on a CV and a
> **liability in a timed round**, because the language-specific surface is the first thing to
> fade: exact collection APIs, comparator signatures, null/optional handling, class-field
> declaration syntax. None of it is *knowledge* you lack; it is **recall latency**, and recall
> latency costs clock in exactly the round where clock decides the outcome.
>
> This is deliberately **not** an academic tour of the language. It is the **surface a console
> program actually touches**: model a domain, parse and dispatch commands, extend it
> level-by-level. Read top to bottom in ~10 minutes, then type the skeleton at the bottom cold
> from an empty file.

---

## 1. Primitives & type basics

<!-- Number types and their traps (int vs float, overflow, division semantics). String
     immutability. Booleans/null/undefined/optional. Type annotations if the language has
     them. Keep every entry to the ONE line that stops a stumble. -->

## 2. Data structures you'll reach for

<!-- The map/dict, the set, the list/array, the queue/deque, the sorted structure. For EACH:
     how to construct it, how to check membership, how to iterate, and the ONE gotcha
     (e.g. key types, insertion order, default values, mutation while iterating). -->

## 3. Collection / stream operations

<!-- map, filter, reduce, sort with a custom comparator, group-by, min/max-by. Fluency here
     reads as senior; re-deriving a sort comparator mid-round does not. Write the exact
     comparator signature — it is the single most commonly fumbled line. -->

## 4. String parsing & command dispatch

<!-- Split on whitespace, destructure into command + args, trim, case handling, number
     parsing and its failure mode. This is the input path of nearly every console exercise. -->

## 5. Functions

<!-- Default/optional/variadic parameters, closures, function types, early return style. -->

## 6. OOP / structuring — the core of the exercise

<!-- Class or struct declaration, fields, constructor shorthand, visibility, methods,
     interfaces/protocols, composition. This is where most of the round is spent, so this
     section should be the longest. -->

## 7. Error handling & the "senior tells"

<!-- Throwing/returning errors, the idiomatic optional/null-safety pattern, and the small
     habits that read as experienced in THIS language specifically (e.g. exhaustive switch,
     assertion signatures over casts, immutability by default, guard clauses). -->

---

## The console-program skeleton (memorize this shape)

<!-- Write the smallest complete program that: holds state in a class, parses lines into a
     command + args, dispatches with a switch/match, and runs a list of commands. In
     {Language}, with real syntax — no pseudocode. -->

```
{ your language here }
```

**`class holding a map` → `split into cmd + args` → `switch dispatch` → `run(commands[])` is
the entire ritual.** Nearly every archetype — KV store, wallet/ledger, rate limiter, parking
lot, inventory — is this skeleton with a different state object and different cases.

**Type it cold from an empty file until it is reflex.** The point is not to memorise a
program; it is that the first ten minutes of the round cost you nothing, so the whole clock is
available for the level that actually decides it (see `coding-round-playbook.md` §1).

---

## Warm-up routine (the morning of a round)

1. **Skim §1–§7** — about 10 minutes. Do not study; you are reloading, not learning.
2. **Type the skeleton from an empty file, no copy-paste.** Confirm it runs.
3. **Add one case cold** — e.g. `INCR key` or `SCAN prefix` — to reload the *extend-it* muscle,
   which is what a laddered round actually tests.
4. **Confirm the round's AI policy** (`coding-round-playbook.md` §7). If AI is permitted,
   rehearse *with* the tool; if forbidden, turn autocomplete off now, not at the round.

---

## Related
- `interviews/technical/coding-round-playbook.md` — how to run the round itself
