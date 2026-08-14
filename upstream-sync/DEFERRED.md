# DEFERRED.md — update offers that were not applied

**This file is what stops `VERSION` from lying.**

An update bumps `VERSION` once a release has been **offered**, and the flow explicitly lets the
user decline optional items (a Tier-C restructure, a new template, a story split). Nothing in
the version string distinguishes *"applied in full"* from *"declined every optional step"* — so
without a record, the sequence is:

> decline → `VERSION` bumps → the next run sees `local == latest` → **the declined item is never
> re-offered.** *"Not now"* silently becomes *"never"*, and the clone stays permanently
> half-applied with nothing left to notice it.

So every declined, deferred, or unanswered offer is written here, and **step 1 of every update
re-offers whatever is still open** — including on a run where the versions already match.

**Written by:** `UPDATE.md` step 6. **Read by:** `UPDATE.md` step 1.

---

## Open — re-offer these on the next update

| Release | What was offered | User's answer | Date |
|---|---|---|---|
| | | | |

## Closed

Keep the history; it is the record of what the user has already decided.

| Release | What was offered | Outcome | Date |
|---|---|---|---|
| | | | |

---

**Removing a line from *Open*:** only when the item is **actually applied**, or the user
declines it a **second** time and says to stop asking. Move it to *Closed* with which of the two
it was — a permanent "no" must be recorded, or the next update re-offers it forever
(`CLAUDE.md` §2.0: *drop TODOs the user has declined twice; don't nag*).

**An offer the flow could not put to the user at all** (a non-interactive run) is recorded as
`unanswered`, never as declined. The two are different: one is a decision, the other is a
decision that has not been made yet.
