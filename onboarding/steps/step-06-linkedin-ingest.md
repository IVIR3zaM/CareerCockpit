# Step 6 — LinkedIn export ingest (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 6); this is the full logic the agent follows. Obey the global onboarding
> invariants: **one step per re-prompt · one targeted question at a time · state in
> [`../CHECKLIST.md`](../CHECKLIST.md)**. This step reconciles a **LinkedIn export** into the
> `profile/` that Step 4 built from the CV — filling gaps, correcting dates, and adding roles
> or projects the CV left off, **without ever guessing when the two sources disagree.**

---

## Purpose

A CV is edited-down; a LinkedIn profile usually carries the **fuller, more complete history** —
older roles the CV dropped for space, exact month-level dates, side projects, volunteering,
certifications, and education the CV summarized. Ingesting the export lets the cockpit:

- **Fill gaps** in `profile/` (roles/projects/certs the CV omitted).
- **Correct dates** to the precise `YYYY-MM` LinkedIn records (and, crucially, **close or
  explain timeline gaps** — see the career-gap sensitivity below).
- **Cross-check** what Step 4 already captured, surfacing any **CV↔LinkedIn conflict** for the
  user to resolve rather than the agent picking a winner.

`profile/` stays the single source of truth (Golden Rule #1). LinkedIn is **another input to
reconcile into it**, exactly like the CV — never a second, parallel store.

> **This step is deferrable.** If the user doesn't have (or doesn't want to pull) an export,
> record that and tick the box — a deliberate skip is *done*, not pending
> ([`../ONBOARDING.md`](../ONBOARDING.md)). LinkedIn data is optional; the cockpit works
> without it, just with whatever gaps the CV left as `TODO(user)`.

---

## Inputs

- The user's **LinkedIn data export** (see the guide below), and/or their public profile text
  if they'd rather paste it.
- The **`profile/`** already populated in Step 4 (the reconciliation target).
- The **confirmed structure/level/discipline** from Step 2 (`onboarding/decisions.md`) — same
  rules about which optional sections apply (e.g. leadership sections only if they manage
  people).

---

## The flow: guide the export → parse → reconcile → flag conflicts → confirm

### 1. Ask the one question: does the user have / want to pull an export?
Start with a single, plainly-scoped question — don't bundle the export guide into it yet:

> "Do you want me to pull in your **LinkedIn history** to fill any gaps the CV left (older
> roles, exact dates, extra projects/certs)? It's optional — I can guide you to a data export,
> you can paste your profile, or we can skip it. What works?"

- **Skip / not now →** record the decline in `onboarding/decisions.md` (see Outputs) and tick
  the box. Don't nag; the user can enable it later (which un-ticks and re-runs this step).
- **Yes →** continue to the export guide.

### 2. Guide the export (one step, plain language — the user may be non-technical)
LinkedIn changes its UI, so describe the **path**, not exact pixels, and give the fallback:

> "In LinkedIn: **Me → Settings & Privacy → Data privacy → Get a copy of your data**. Tick
> **the specific parts** (at least *Positions*, *Education*, *Certifications*, *Projects*,
> *Skills*), request the archive, and LinkedIn emails you a `.zip` (fast export can be minutes;
> the full one can take up to 24h). When it arrives, unzip it and tell me the folder path —
> I'll read the CSVs. **Or**, if that's a hassle, just **paste your profile text / the CSVs
> here** and I'll work from that."

Accept **any** of: a path to the unzipped export folder, the individual CSVs
(`Positions.csv`, `Education.csv`, `Certifications.csv`, `Projects.csv`, `Skills.csv`,
`Profile.csv`), or pasted profile text. Don't insist on the formal export if the user prefers
to paste.

> **Let the user choose the effort level — full data export vs. the quick PDF.** LinkedIn also
> offers **Profile → Resources → Save to PDF**, which is instant (one click, no request, no
> 24h wait, no unzip). Tell the user this exists and let *them* decide which path to take:
>
> - **Data export (recommended for this step):** the CSV archive above — *structured, complete,
>   nothing truncated, exact `YYYY-MM` dates.* This is what actually **fills gaps and corrects
>   dates**, which is the whole purpose of Step 6.
> - **Save to PDF (quick fallback):** LinkedIn renders your profile into a **resume-style PDF**
>   — but it's edited down like a CV: it truncates older roles/long descriptions, often
>   collapses dates to year-level or "X yrs Y mos," and drops the long tail (full skills list,
>   all certs, recommendations). Because of that it is **essentially a second CV** and mostly
>   re-covers what Step 2 already ingested — better than nothing, but it won't reliably fill the
>   gaps the data export would.
>
> Offer it plainly, e.g.: *"Two options — the full **data export** (structured, complete, but
> you request it and wait), or the instant **Save to PDF** (one click, but it's basically
> another CV so it fills fewer gaps). Which do you want to do?"* If they pick the PDF, ingest it
> the same way (parse → diff → reconcile), and **note in the confirmation and `decisions.md`
> that a PDF — not the full export — was used**, so the remaining gaps are known to be from the
> lighter source and a future session can offer the full export again.

> **Do not open a browser and log into LinkedIn for the user, and don't scrape it.** The user
> either provides the export they requested or pastes their own text. Reading a `.zip` the
> user hands you is fine; authenticating into their account is not (and mass-scraping violates
> LinkedIn's terms).

### 3. Parse and diff against `profile/`
Read the export/text and build a role-by-role, item-by-item diff versus what Step 4 wrote:

- **Match** each LinkedIn position to an existing `profile/work-experience/<…>.md` by
  company+title+overlapping dates.
- Classify every item as one of: **new** (in LinkedIn, not in `profile/`), **date-correction**
  (same role, different/precise dates), **enrichment** (extra detail for an existing role/
  project), or **conflict** (the two sources materially disagree — different title for the
  same period, different company, contradictory dates).

### 4. Apply the safe changes; **flag conflicts, never guess**
- **New roles/projects/certs/education** → route into `profile/` per the **same router table**
  used in Step 4 (see [`step-04-populate-profile.md`](step-04-populate-profile.md) → *The
  router*): one file per role in `profile/work-experience/`, named initiatives in
  `profile/projects/`, degrees in `education.md`, certs in `certifications.md`, skills grouped
  in `skills.md`. Fill what LinkedIn states plainly; leave the rest as `TODO(user)`.
- **Date corrections** that only *tighten* precision (LinkedIn's month vs the CV's year, no
  contradiction) → apply and note it.
- **Enrichment** → add the extra detail to the existing file.
- **Conflicts** → **do not overwrite and do not pick a side.** Ask the user, **one conflict at
  a time** (see step 6 below). Until resolved, keep what Step 4 confirmed and mark the
  discrepancy inline as `TODO(user): resolve CV vs LinkedIn — <field>: CV says X, LinkedIn
  says Y`.

### 5. Privacy on write — same rule as every other step
The privacy/GDPR/confidentiality rule (CLAUDE.md §0.9, Golden Rule #9) fires here too, because
LinkedIn text is full of other people:

- **Third-party names → role-based aliases immediately**, in contents *and* filenames/slugs —
  recommenders, endorsers, colleagues, managers, reports named in descriptions or
  recommendations become `a peer PM`, `my manager`, `the Staff Engineer`, `my report`. The
  user's own name is fine (it's their profile).
- **No sensitive personal attributes** of third parties; keep only the neutral tellable
  version if load-bearing.
- **Protect each employer's confidentiality** — LinkedIn descriptions sometimes over-share
  (internal metrics, unreleased products, customer names). Alias/generalize or ratio on the
  way in; when unsure a detail is shareable, **ask** before writing it.
- **Recommendations** are other people's words about the user — capture only the neutral,
  non-attributed substance if useful (e.g. as a `TODO(user)` seed for a story in Step 9), never
  the recommender's name.

### 6. Career-gap & chronology — LinkedIn is where you usually *find* the gap
This is the step where the fuller history most often **reveals or resolves a timeline gap**
(see the *Career-gap & chronology sensitivity* block in [`../ONBOARDING.md`](../ONBOARDING.md)
and CLAUDE.md §2.2 / Golden Rule #3):

- Re-read the merged role dates **top to bottom**. LinkedIn may **close** a gap the CV had (an
  older role fills it) — good, apply it. Or it may **open/expose** one the CV hid — surface it.
- If a gap remains after merging, **ask one targeted question**: *"There's a gap between
  `<role X>` (ended YYYY-MM) and `<role Y>` (started YYYY-MM) — what were you doing then?"*
  Capture the honest answer (break, study, caregiving, contracting, job search) in the adjacent
  role file or a short note; if the user defers, record `TODO(user): explain YYYY-MM–YYYY-MM
  gap`. **Never** reorder roles to hide a hole and never invent a filler.
- Keep `profile/` strictly by **real date**; the reverse-chronological, unbroken *presentation*
  is a CV concern, but the honest dates must live here first.

### 7. Resolve conflicts — one targeted question at a time
For each conflict from step 4, ask a single focused question and wait for the answer before the
next. Never a wide-open "fix your dates." Examples:

> "Your CV lists `<role>` as **2021–2023**, LinkedIn says **2021-03 to 2022-11**. Which is
> right? (LinkedIn's month-level dates are usually the accurate ones, but I won't assume.)"

> "The CV titles this role **Senior Engineer**; LinkedIn says **Staff Engineer** for the same
> dates. Which title should the cockpit use?"

Apply the user's answer to the right `profile/` file. If they don't know offhand, leave the
`TODO(user)` in place — an honest open item beats a wrong fact (Golden Rule #2). It's fine for
conflict resolution to span **multiple re-prompts**; record what's settled, tick nothing yet,
continue next turn.

### 8. Confirm (the one place batching is allowed)
Present a compact end-of-step summary — the batch the protocol permits:

> "Reconciled LinkedIn into `profile/`:
> **+N new roles/projects/certs** added · **D dates corrected** · **E roles enriched**.
> Resolved conflicts: `<list>`. Still open as `TODO(user)`: `<unresolved conflict>`, `<gap
> explanation>`. Timeline now reads most-recent → oldest with `<no gaps | the flagged gap>`.
> Anything wrong before I move on?"

Fix on feedback. When the export is reconciled and every conflict is either resolved or
honestly flagged as `TODO(user)`, the step is done — remaining TODOs don't block the tick.

---

## What to write to `onboarding/decisions.md`

Append (create the file if absent) a short record so future sessions know this ran and don't
re-ask:

```markdown
## LinkedIn ingest
- **Decision:** {ingested | declined | deferred} — recorded {YYYY-MM-DD}
- **Source:** {full data export (CSVs) | Save-to-PDF resume | pasted profile | none}
  {— note if PDF/paste: lighter source, gaps may remain; can re-run with full export later}
- **Result (if ingested):** +{N} roles/projects/certs, {D} dates corrected, {E} enriched.
- **Open conflicts / gaps:** {TODO(user): resolve <…> | none}
```

---

## Outputs

- **`profile/`** updated — new roles/projects/certs/education added and routed, dates
  corrected to precise `YYYY-MM`, existing files enriched (third parties aliased, employer
  confidentials generalized throughout).
- **Conflicts** either resolved with the user or captured inline as `TODO(user): resolve CV vs
  LinkedIn — …`.
- **`onboarding/decisions.md`** — a **LinkedIn ingest** record (ingested/declined/deferred +
  source + result) that future sessions read.
- No third-party names and no employer-confidential specifics anywhere in the written output.

---

## Done-criteria (tick the box when all true)

- [ ] The user was asked whether to ingest LinkedIn; if **yes**, they were guided to the export
      (or allowed to paste), and the data was parsed.
- [ ] New items were routed into the correct `profile/` files; date corrections were applied;
      the merged timeline was re-checked for gaps/ordering and any remaining gap was **surfaced
      to the user**, not hidden.
- [ ] Every **CV↔LinkedIn conflict** was either resolved with the user (one question at a time)
      or flagged as `TODO(user)` — none were silently guessed.
- [ ] Third-party names are aliased and no employer-confidential specifics were written.
- [ ] The decision/result is recorded in `onboarding/decisions.md`; if the user **skipped or
      deferred**, that is recorded and the box is still ticked (a deliberate skip is done).

Then tick Step 6 in [`../CHECKLIST.md`](../CHECKLIST.md), note in its cell what changed (or
"declined/deferred"), and tell the user to re-prompt with **"continue onboarding"** — next is
**Step 7 (company-fit interview)**.
