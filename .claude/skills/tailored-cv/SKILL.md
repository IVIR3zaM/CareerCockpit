---
name: tailored-cv
description: Build a per-application tailored CV from profile/ against a JD, and render cv.md to a 1-2 page PDF. Use whenever creating, tailoring, revising, or rendering a CV for a specific job application in this repo. Carries the mandatory JD-echo read-back gate (Golden Rule #7), the role-fit positioning gate / 15-line squint test (Golden Rule #11), and the CV→PDF pipeline with its page budget.
---

# Tailored CV — build + render

**All Golden Rules in `CLAUDE.md` still apply** — this skill carries the mechanical gates
that enforce #7 and #11. Invoke it for any CV work; never hand-write or render a CV that
bypasses these gates.

## Build a tailored CV for an application
Trigger: *"make a CV for this"*.

> **NEVER source content from a previous application's `cv.md` / `cv.notes.md` / cover
> letter.** Those are already-sent deliverables and may hold **stale facts** — a wrong date
> or metric copied from one application into the next is a classic, hard-to-catch error.
> Every fact, date, metric, and framing must come from **`profile/` (source of truth)** or
> the JD-tailoring decision. You may reuse the *template structure*
> (`templates/cv-template.md`) and the general positioning approach — never the facts.

1. Read the JD (`jd.md`) and the whole of `profile/`.
2. Decide **positioning**: which 3–5 requirements matter most in this JD. **Then run the
   pre-write half of the role-fit positioning gate (Golden Rule #11):**
   - Write one line — *"This role's core mandate is ___, at ___ level."*
   - **Level-delta check.** Compare that level to the user's **current** role. If the target
     is **narrower or more junior** than the current role (a first-line manager req vs. a
     manager-of-managers; an IC role vs. a lead; a single-product scope vs. a platform
     scope), write it down as a **RISK: current role out-scopes the target — do NOT lead
     with the senior facet.** Decide *now* which facet of the current role you will expand
     first so it matches the mandate (direct coaching, hands-on delivery, the specific
     domain), keeping the bigger scope present but not as the headline. Record this in
     `cv.notes.md`.
3. Select & rank content — **the compress/expand decision is yours, made per JD. Order is
   NOT yours: work experience is ALWAYS reverse-chronological (current role first).** Never
   move an older, more-relevant role above the current one — that breaks the recruiter/ATS
   convention and buries the user's current title (their strongest, most up-to-date
   evidence). Express relevance through **expansion depth, not ordering**: the bullseye role
   gets the deepest treatment *in its chronological slot*, while the current role stays first
   even if you keep it tight.
   - **Expand** (sub-headers, 5–8 bullets, tech/skill stack re-ordered) the roles that best
     evidence THIS JD's top requirements — regardless of age, but **in place**.
   - **Condense** weaker matches to 2–4 bullets, no sub-headers.
   - **Collapse** the oldest/irrelevant roles into a single "Earlier Roles" block.
   - **Omit** truly irrelevant items (never delete from `profile/` — just leave them out of
     this CV). Re-decide all of this for every application; no fixed scheme.
   - **NEVER CREATE A DATE GAP.** The visible timeline must be reverse-chronological **and
     unbroken**. The "Earlier … Roles" block is a **contiguous tail** — everything older than
     one cut-off date, nothing skipped. Never lift a *mid-sequence* role into it: the entries
     above keep their real dates, so the hole becomes visible and reads as hiding something.
     Don't collapse a single role into a block either — that's just a worse-formatted entry.
     **After writing any CV, read the dates top-to-bottom and confirm each role starts
     on/before the previous one ends.**
   🗄️ **Looking up a past CV as precedent?** Closed applications are archived (Golden Rule
   #14): prior `cv.md` / `cv.notes.md` for **rejected, withdrawn or ghosted** roles live under
   `applications/_archive/<slug>/`, not `applications/<slug>/`. Search **both** — most of the
   useful precedent (and every CV that *lost*, which is the more instructive half) is in the
   archive. Archived CVs and notes are **read-only**; never edit one to "fix" it.
4. Write the tailored CV to `applications/<...>/cv.md` using `templates/cv-template.md`,
   **following its heading/inline conventions exactly** — they drive `styles/cv.css`, which
   renders the user's chosen theme. Every generated CV must look like that theme. Keep to
   ~1–2 pages (see the page budget below — write to it, don't discover it).
5. **JD-echo read-back gate (MANDATORY — this is how Golden Rule #7 gets enforced; the
   principle alone keeps failing).** With `jd.md` open **beside the finished draft**, re-read
   every adjective and noun-phrase and ask: *"is this word here because `profile/` proves it,
   or because the JD used it?"* **Any phrase that also appears in the JD is guilty until
   traced to `profile/`** — delete it or reword it in the user's own terms. The phrases that
   slip through are the **flattering, generic-sounding** ones — "small / focused /
   high-performing team", "fast-paced", "hands-on", "high bar", "force multiplier" —
   *precisely because* they read like ordinary CV filler rather than an imported claim. A
   phrase can be **individually true and still a violation** if it's there to echo the JD.
   And **check every scope/team descriptor against the real numbers** in `profile/` — an
   imported descriptor is often factually wrong too, not just borrowed. The same gate applies
   to cover letters and prepared interview answers.
   - *Typical failure: a JD's "leading a small, focused team" lands verbatim in the CV — and
     contradicts the user's real scope of a dozen engineers. **Borrowed AND inaccurate.**
     That is why this is a mechanical read-back with the JD open, not a principle to
     remember.*
5b. **Positioning read-back gate — the 15-line squint test (MANDATORY — this is how Golden
   Rule #11 gets enforced; distinct from the step-5 JD-echo gate).** The JD-echo gate catches
   *importing what the user didn't do*; this gate catches the opposite — *leading with what
   the user did do that the role didn't ask for.* A CV can pass step 5 clean and still fail
   here.
   - Read **only** the top ~15 lines a screener sees before deciding to keep reading: the
     **Summary + the current (first) role's heading and its first 2–3 bullets.** Ignore
     everything below.
   - Ask: *"If a stranger read ONLY these lines, would they classify the **level** and
     **domain** this role wants — or something more impressive but off-target?"* Check it
     against the one-line **core mandate** from step 2.
   - **If they'd misclassify**, the lead is wrong. **Re-weight the bullets *within* the
     current role** so the on-target facet comes first — do **NOT** resequence the timeline
     (Golden Rule #3); the current role stays first, you only change which of its bullets
     leads.
   - The trap is that the off-target lead is usually the user's **most genuinely impressive**
     work — which is exactly why it feels right to lead with, and why this test is mechanical
     rather than a judgment call. Same gate applies to the cover letter's opening.
6. Note *why* each big choice was made in `cv.notes.md` (traceability) — including the core
   mandate line, the level-delta verdict, and anything the two gates made you change.
6b. **`cv.notes.md` must carry the #11 gate's written output — a CV whose notes lack it is NOT
   BUILT (MANDATORY).** Steps 2 and 5b are the only gates here that can pass *silently*: the
   JD-echo gate leaves a scrub list and the timeline check leaves a date read-out, but "the
   squint test looked fine to me" leaves **nothing** — so a CV where #11 was **skipped** is
   indistinguishable from one where it **passed**. The fix is that the gate must produce an
   artifact. `cv.notes.md` must contain these **two literal sections**:

   ```markdown
   ## Core mandate & level-delta (GR#11 pre-write, step 2)
   Core mandate: This role's core mandate is ___, at ___ level.
   Level-delta vs. current role: [SAME / TARGET IS NARROWER — RISK / target is broader]
   → Facet of the current role I will expand FIRST: ___

   ## 15-line squint test (GR#11 read-back, step 5b)
   First bullet of the current role, quoted verbatim: "___"
   A stranger reading only the summary + this would classify me as: ___
   Matches the core mandate? [YES / NO → re-weighted, new first bullet: "___"]
   ```

   Rules: **quote the first bullet verbatim** — paraphrasing it is how the gate gets
   rubber-stamped. If the level-delta line says **RISK**, the squint-test verdict must be an
   explicit YES, never a blank. **Do not render the PDF (step 7) until both sections exist and
   are filled.** When revising an existing CV, re-run and re-record both — they are per-CV,
   not per-role.
7. Offer to render a PDF (→ the pipeline below).

---

## CV → PDF pipeline

Tailored CVs are Markdown (`cv.md`) styled by `styles/cv.css` and converted to PDF.

- **The ONE command (from repo root):**
  `npm run cv:pdf -- applications/<company-role>/cv.md`
- **Auto-install on first render — never make the user open a terminal.** The one-time setup
  is `PUPPETEER_SKIP_DOWNLOAD=1 npm install`; if `node_modules/` is missing, **the agent runs
  it** and then renders. Dependencies are pinned for hard-won reasons — **do NOT use
  `npx md-to-pdf` (crashes with `ERR_REQUIRE_ESM`) and do NOT switch PDF engines**;
  `styles/README.md` documents the exact failure modes and the only approved fallback.

### The page budget — WRITE TO BUDGET, DON'T TRIM BY TRIAL AND ERROR
A CV that lands on 3 pages and then takes a dozen render-and-guess rounds to get back to 2 is
a **banned loop**. The render was never the bottleneck — *not knowing how much to cut* was.

- `npm run cv:pdf` runs `styles/cv-build.mjs`, which renders the PDF **and** reports the
  **true page count read from the produced PDF**, and — if over — **exactly how many bullet
  lines to cut**, a per-section height breakdown, and the longest bullets. Read that output;
  it is the instruction for a single corrective pass. **Never eyeball the PDF image and guess
  a cut.**
- **Budget before writing.** A 2-page CV is **~1970px of rendered content** (~995px/page for
  the default theme). Rough planning figures: a wrapped bullet line ≈ **19px**, a role
  heading + company line + tech/skill line ≈ **75px**, an `####` sub-header ≈ **21px**, an
  `##` section heading ≈ **30px**. Draft to that budget; expect **one** corrective pass.
- **⚠️ `Read` on a PDF only returns the pages you ask for** — `pages: "1-2"` on a 3-page PDF
  silently returns 2 and looks like success. **Trust the `PDF pages:` line from `cv:pdf`**,
  never the number of images you got back.
- Re-calibrate `PAGE_PX` in `styles/cv-build.mjs` if `cv.css` margins/font-size change or
  `md-to-pdf` is upgraded (the constant is commented with how). A user who extracted their
  own theme during onboarding may need this once.
- `npm run cv:pdf:raw` is the bare md-to-pdf escape hatch if the wrapper ever breaks.
- After rendering, Read the PDF back and verify it matches the user's chosen theme, and
  **read the dates top-to-bottom for gaps** (see "NEVER CREATE A DATE GAP" above).
- The CSS in `styles/cv.css` controls fonts, margins, spacing, and section styling. **Edit
  the CSS to change look, not the content files.**
- Keep CV Markdown clean: standard headings, bullet lists, bold for emphasis. Avoid raw HTML
  unless it's in the template.
- Output PDFs go to `applications/<...>/cv.pdf` and are committed (deliverables).
