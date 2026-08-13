# UPSTREAM-QUEUE.md — engine improvements to contribute back

Golden Rule **#15**'s workbench. When a learning turns out to be about **the toolkit** rather
than about **the user**, the generalized version is queued here — **in the same edit that makes
the local change**, while the evidence is still fresh.

Nothing here ships without the user's **explicit, per-entry consent** (`profile/preferences.md`
→ *Upstream contributions*, and see the ⛔ note under that table — even `yes` means *ask each
time*). An entry can sit here indefinitely; that costs nothing and loses nothing.

**Target:** [`IVIR3zaM/CareerCockpit`](https://github.com/IVIR3zaM/CareerCockpit) ·
**PR body:** must follow the **PR-body contract in [`../UPDATE.md`](../UPDATE.md) §7** — it is
written for the AI agent that will apply the change, not for a human reviewer.

---

## The scrub gate — every entry, before it leaves this repo

An entry is not ready until all of these are true. Check them **when writing the entry**, not
at PR time; an entry that can't pass is either rewritten now or reclassified as personal.

- [ ] **No company names** from the job search — not employers, not interviewers' companies.
- [ ] **No comp figures**, no real salary bands, no offer details.
- [ ] **No story contents**, no personal metrics, no third-party details (Golden Rule #9 applies
      with full force — a public PR is the widest possible disclosure).
- [ ] **No user-specific values hardcoded in the engine text.** If the rule needs one, it is a
      row in `profile/preferences.md` and the text reads it from there.
- [ ] **The incident became a CLAIM ABOUT THE WORLD — not an anonymized story.** Removing names
      is not enough; a product file must carry no one's biography. Tells that a narrative
      survived: *"a candidate…"*, *"once"*, *"in one case"*, *"the originating failure was…"*,
      *"asked, for real:"*, past-tense verbs with a person as subject.
      - ❌ *"A candidate led a first-line-EM application with manager-of-managers scope and was
        cut at the screen."*
      - ✅ *"A screener reads the first ~15 lines; scope broader than the role asks for reads as
        over-leveled, and the evidence below is never reached."*
      ⚠️ **Keep the reasoning, change its grammar** — a rule with no *why* is the bare principle
      Golden Rule #13 says will not hold. **The test: would this sentence be equally true if it
      had never happened to this user?** If no, it isn't ready. If the insight can't survive the
      conversion, it is a personal learning — keep it local and delete the entry.
- [ ] **It is genuinely general** — would this help someone in a different discipline, level, or
      country? If it only helps this user, it belongs in `profile/`.

---

## Statuses

`candidate` · `approved` (user said yes to *this* entry) · `scrubbed` · `pr-open (<link>)` ·
`merged` · `declined (why)`

## Queue

| ID | Contribution | Source in this repo | Value to other users | Status | Notes |
|---|---|---|---|---|---|
| | | | | | |

<!-- Ranking guidance when the list grows past a handful: order by value-to-other-users ÷ cost
     to ship, and batch them. The cheapest, highest-value entries are usually the ones that fix
     something the product currently gets WRONG — those need no rewriting and no scrub. Entries
     that require authoring a new file from scratch are the most expensive; entries whose source
     file is *organized around* named companies must be REWRITTEN, never copied. -->
