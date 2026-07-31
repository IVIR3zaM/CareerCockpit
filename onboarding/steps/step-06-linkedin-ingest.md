# Step 6 — LinkedIn export ingest

**Purpose:** reconcile a **LinkedIn export** into the `profile/` Step 4 built — filling gaps,
correcting dates, adding roles the CV left off — **without ever guessing when the two sources
disagree.** A CV is edited down; LinkedIn usually carries the fuller history (older roles,
month-level dates, side projects, certs).

`profile/` stays the single source of truth (Golden Rule #1). LinkedIn is **another input to
reconcile into it**, never a second parallel store.

**Inputs:** the export (or pasted profile text), the `profile/` from Step 4, and the
discipline/level settings from Step 2.

> **Deferrable.** No export, or doesn't want to pull one? Record it and tick the box — a
> deliberate skip is *done*. The cockpit works without it, just with whatever gaps the CV left.

## 1. Ask the one question

> "Do you want me to pull in your **LinkedIn history** to fill any gaps the CV left (older
> roles, exact dates, extra projects/certs)? It's optional — I can guide you to a data export,
> you can paste your profile, or we can skip it. What works?"

## 2. Guide the export — and let the user choose the effort level

LinkedIn changes its UI, so describe the **path**, not pixels:

> "In LinkedIn: **Me → Settings & Privacy → Data privacy → Get a copy of your data**. Tick at
> least *Positions*, *Education*, *Certifications*, *Projects*, *Skills*, request the archive,
> and LinkedIn emails you a `.zip` (minutes for the fast export, up to 24h for the full one).
> Unzip it and tell me the folder path. **Or** just paste your profile text / the CSVs here."

Offer the quick alternative honestly:

- **Data export (recommended):** structured, complete, exact `YYYY-MM` dates — this is what
  actually **fills gaps and corrects dates**, the whole purpose of this step.
- **Profile → Resources → Save to PDF (instant fallback):** one click, no wait — but it's a
  resume-style render that truncates older roles, often collapses dates to year level, and
  drops the long tail. It is **essentially a second CV** and mostly re-covers Step 2.

If they pick the PDF, ingest it the same way and **note in the confirmation and
`decisions.md` that a PDF — not the full export — was used**, so a future session knows the
remaining gaps came from a lighter source and can offer the full export again.

Accept any of: the unzipped folder path, individual CSVs (`Positions.csv`, `Education.csv`,
`Certifications.csv`, `Projects.csv`, `Skills.csv`, `Profile.csv`), the PDF, or pasted text.

> **Never log into LinkedIn for the user and never scrape it.** Reading a `.zip` they hand you
> is fine; authenticating into their account is not.

## 3. Parse and diff against `profile/`

Match each LinkedIn position to an existing `profile/work-experience/<…>.md` by
company + title + overlapping dates, and classify every item:

- **new** — in LinkedIn, not in `profile/`
- **date-correction** — same role, more precise dates
- **enrichment** — extra detail for an existing role/project
- **conflict** — the sources materially disagree (different title for the same period,
  different company, contradictory dates)

## 4. Apply the safe changes; **flag conflicts, never guess**

- **New** items → route with the **same router table as Step 4**
  ([`step-04-populate-profile.md`](step-04-populate-profile.md)). Fill what LinkedIn states
  plainly; the rest is `TODO(user)`.
- **Date corrections** that only *tighten* precision (LinkedIn's month vs the CV's year, no
  contradiction) → apply and note it.
- **Enrichment** → add to the existing file.
- **Conflicts** → **don't overwrite, don't pick a side.** Keep what Step 4 confirmed and mark
  it inline: `TODO(user): resolve CV vs LinkedIn — <field>: CV says X, LinkedIn says Y`. Ask
  in step 6 below.

**Privacy bites hard here** — LinkedIn text is full of other people. Alias recommenders,
endorsers, colleagues, and managers to roles on the way in (contents *and* filenames), and
generalize the over-shared internal metrics and customer names that LinkedIn descriptions
often carry. **Recommendations** are other people's words: capture only the neutral,
non-attributed substance (a `TODO(user)` seed for a Step 9 story), never the recommender.

## 5. Chronology — LinkedIn is usually where the gap shows up

Re-read the **merged** dates top to bottom. LinkedIn may **close** a gap the CV had (apply it)
or **expose** one the CV hid (surface it). If a gap remains, ask one targeted question:
*"There's a gap between `<role X>` (ended YYYY-MM) and `<role Y>` (started YYYY-MM) — what
were you doing then?"* Defer → `TODO(user)`. **Never** reorder roles to hide a hole, never
invent a filler.

## 6. Resolve conflicts — one targeted question at a time

> "Your CV lists `<role>` as **2021–2023**, LinkedIn says **2021-03 to 2022-11**. Which is
> right? (LinkedIn's month-level dates are usually the accurate ones, but I won't assume.)"

> "The CV titles this role **Senior Engineer**; LinkedIn says **Staff Engineer** for the same
> dates. Which should the cockpit use?"

If they don't know offhand, leave the `TODO(user)` — an honest open item beats a wrong fact.
Conflict resolution may span **multiple re-prompts**.

## 7. Confirm (the one place batching is allowed)

> "Reconciled LinkedIn into `profile/`: **+N new roles/projects/certs** · **D dates
> corrected** · **E roles enriched**. Resolved: `<list>`. Still open as `TODO(user)`:
> `<unresolved conflict>`, `<gap explanation>`. Timeline now reads most-recent → oldest with
> `<no gaps | the flagged gap>`. Anything wrong?"

## Record

`profile/decisions.md` → `## LinkedIn ingest (Step 6)`: decision (ingested / declined /
deferred) + date, **source** (full export · Save-to-PDF · pasted · none, noting when a lighter
source was used), the result (+N added, D dates corrected, E enriched), and open
conflicts/gaps.

## Done when

- [ ] The user was asked; if yes, guided to the export (or allowed to paste) and the data
      parsed.
- [ ] New items routed correctly, dates corrected, merged timeline re-checked and any
      remaining gap **surfaced**.
- [ ] Every CV↔LinkedIn conflict was resolved with the user or flagged `TODO(user)` — none
      silently guessed.
- [ ] Third parties aliased; no employer-confidential specifics written.
- [ ] The decision/result is in `decisions.md`; a skip or defer is recorded and the box still
      ticked.

Tick Step 6 in [`../CHECKLIST.md`](../CHECKLIST.md) noting what changed (or
"declined/deferred") → next is **Step 7 (company-fit interview)**.
