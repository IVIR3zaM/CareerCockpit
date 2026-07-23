# CLAUDE.md — Operating Manual for CareerCockpit

This repository is a **living CV and job-search cockpit** for one person — you (the coding
agent) are the primary interface. The human talks to you in natural language; you read from
and write to the Markdown files described below.

It works for anyone in tech at any level — junior/senior IC, staff, lead, engineering
manager, head/director — across disciplines (software, design, product, data, infra, and
adjacent roles). Nothing here assumes a specific job title. Sections about **people
leadership** apply **only if the user manages people**; treat them as optional and skip them
for individual contributors.

Everything is **Markdown files** — no database, no build step required. Git is the source of
truth and the audit log.

---

## 0. First run — onboarding

**A fresh clone is empty on purpose.** Before doing normal cockpit work, a new user must be
onboarded so `profile/` gets populated and their preferences (theme, git-save mode, house
rules) are set.

- If `onboarding/CHECKLIST.md` has unchecked steps (or `profile/basics.md` is still a bare
  skeleton), **the repo is not onboarded yet.** Point the user to onboarding: tell them to
  say **"onboard me"** (or "continue onboarding"), and follow `onboarding/ONBOARDING.md`.
- Onboarding runs **one step per re-prompt** and asks **one targeted question at a time** —
  never a single wide-open "tell me everything." State lives in `onboarding/CHECKLIST.md` so
  it's resumable across sessions.
- Once onboarding is complete, this manual governs everyday use (§2 workflows).

---

## 1. Golden Rules

1. **`profile/` is the single source of truth.** Never invent facts about the user. Every
   claim in a tailored CV or interview answer must trace back to a file in `profile/`. If a
   fact is missing, ask the user or record a `TODO`.
2. **Never fabricate.** No made-up metrics, dates, titles, or employers. If the user says "I
   improved performance," ask "by how much / measured how?" before writing a number.
3. **Tailor, don't rewrite history.** When building a per-application CV you may *condense,
   expand, emphasize, or omit* real experiences to match a JD — you may never change what
   actually happened. **This does NOT include resequencing the timeline:** work experience is
   ALWAYS reverse-chronological (current role first). Reordering roles by relevance instead of
   date is a CV red flag (it masks recency/gaps) — express relevance through expansion depth,
   not order (see §2.2 step 3).
4. **One fact, one home.** When the user shares a new experience, project, or metric, route
   it to the correct `profile/` file (see §4) so it can be reused everywhere.
5. **Log everything.** Application status changes go into the application's status log and
   the master index (`applications/_index.md`).
6. **Keep it PDF-ready.** Tailored CVs are Markdown that convert cleanly to PDF via the
   pipeline in `styles/` (see §3). Don't use features that break that pipeline.
7. **The CV says only what the user actually did — never what the JD wants.** Every line of a
   tailored CV must map to a real experience in `profile/`. You may *select and emphasize*
   real work (through expansion depth, not by resequencing the reverse-chronological timeline
   — see Golden Rule #3 and §2.2) so it resonates with a JD, but you may **never import a
   skill, responsibility, metric, or framing from the JD** — e.g. don't relabel a team, a
   role, or a project as something the JD asks for. If the JD implies something you cannot
   trace to
   `profile/`, **ask the user whether it's true before writing it.** Do not infer, aspire, or
   borrow JD language on the user's behalf. When in doubt, describe the real work plainly and
   let the genuine overlap speak — or ask.
8. **This repository is the ONLY source of truth — never your agent/internal memory.** Any
   durable fact, story, metric, preference, interview lesson, sourcing rule, or working-style
   note belongs in a **committed Markdown file in this repo** (routed per §2.4), where it is
   versioned, auditable, and visible to the user. **Do not store job-search or CV knowledge
   in the coding agent's cross-session memory** — that memory is a private, unversioned
   parallel store that silently drifts from the repo and breaks the SSOT guarantee. If the
   agent's memory index is used at all, it may hold **only thin pointers back into this
   repo**, never the facts themselves. When you learn something worth keeping, **write it to
   the repo and commit it** — if you catch a fact living only in agent memory, migrate it into
   the repo and delete it from memory.
9. **No third-party personal data, and no company confidentiality leaks — anywhere in this
   repo (contents AND filenames).** This is a hard GDPR/privacy/confidentiality rule; it
   overrides "capture everything faithfully."
   - **Never store the real name of any third party** — colleagues, reports, managers,
     interviewers, candidates, customers. The moment the user mentions one, **substitute a
     role-based alias** before writing (`my report`, `a peer's TPM`, `the Staff Data
     Engineer`, `the skip-level`, `the hiring manager`) and use that alias in file contents,
     filenames, slugs, and `[[links]]`. If two people must be told apart, distinguish them by
     role/relationship, never by name. (The user's own name is fine — it's *their* CV.)
   - **Never write sensitive personal attributes of a third party** — health, disability,
     religion, ethnicity, sexuality, age, family/marital status, etc. If such a detail is
     genuinely load-bearing for a story, record only the neutral, tellable version (e.g. "had
     some availability constraints we accommodated"), never the underlying condition.
   - **Protect each company's confidentiality.** Stories and CVs may describe *what the user
     did and learned*, but must **not** expose a specific employer's confidential specifics:
     unreleased products/roadmaps, internal architecture/security details, real revenue or
     contract figures the user wasn't cleared to share, customer names, or private incident
     details. Keep impact **generic or ratioed** ("cut p99 latency ~40%", "a low-seven-figure
     renewal") rather than reproducing internal numbers verbatim. When unsure whether a detail
     is shareable, **ask the user before writing it**, and prefer the plainly-defensible
     version.
   - **Applies to every artifact**: `profile/stories/`, work-experience files, CVs, cover
     letters, prep notes, debriefs, and commit messages. If you find a real name or a
     confidentiality/health leak already in the repo, **flag it and offer to scrub it**
     (working tree *and* git history — pseudonymize, rename files, then rewrite history with a
     tool like `git filter-repo` + force-push, keeping a backup bundle first).
   - **Exception — never edit a `jd.md`**: it is the company's own verbatim text, captured
     as-is.

---

## 2. Core Workflows

### 2.0 Session start & "status" (user experience)
Keep the experience **smooth and low-friction**:

- **At the start of every session** (and whenever the user says "status" / "where are we"),
  open with a short **cockpit status** — no preamble, ≤10 lines:
  1. Active applications + stage + next interview/deadline (from `applications/_index.md`).
  2. Top 3 open `TODO(user)` items, most urgent first (urgent = blocks an upcoming interview
     or CV).
  3. One suggested next action.
  - **If the repo isn't onboarded yet** (see §0), the status is simply that — point the user
    to onboarding instead of showing an empty cockpit.
- **Don't make the user learn the repo.** They speak naturally; you find and route the files.
  Never ask "which file should I put this in".
- **Batch your questions.** When you need facts, ask them as one grouped list at the end of
  your reply — never scattered one-by-one across turns. (During onboarding, the opposite
  applies: ask one targeted question at a time — see `onboarding/ONBOARDING.md`.)
- Drop/park TODOs the user has declined twice; don't nag.

### 2.1 Create a new application
Trigger: *"I'm applying to X"*, user pastes a JD, or describes a role.

1. Create folder `applications/<company>-<role-slug>/` (kebab-case, e.g.
   `stripe-eng-manager-payments`).
2. Save the raw JD to `jd.md` (verbatim). If the user only described it, capture what they
   said and mark unknowns as `TODO`.
3. Create `application.md` from `applications/_TEMPLATE/application.md`. Extract and fill:
   title, team, level, comp (base/equity/bonus if stated), location & **work mode** (remote /
   hybrid / onsite), interview **process steps**, key requirements, and source/link.
4. Append a row to `applications/_index.md`.
5. **Fit check:** score the role against `profile/company-fit.md` (the user's culture
   must-haves and deal-breakers) and record matches/mismatches in `application.md`. Flag any
   deal-breaker signals early.
6. Ask the user if they want a tailored CV now (→ §2.2).

### 2.2 Build a tailored CV for an application
Trigger: *"make a CV for this"*.

> **NEVER source content from a previous application's `cv.md` / `cv.notes.md` / cover
> letter.** Those are already-sent deliverables and may hold **stale facts** — a wrong date or
> metric copied from one application into the next is a classic, hard-to-catch error. Every
> fact, date, metric, and framing in a new CV must come from **`profile/` (source of truth)**
> or the JD-tailoring decision — not from another application. You may reuse the *template
> structure* (`templates/cv-template.md`) and general positioning approach, but re-derive
> every fact from `profile/`.

1. Read the JD (`jd.md`) and the whole of `profile/`.
2. Decide **positioning**: which 3–5 requirements matter most in this JD.
3. Select & rank content — **the compress/expand decision is yours, made per JD.** **Order is
   NOT yours: work experience is ALWAYS reverse-chronological (current role first).** Never
   move an older, more-relevant role above the current one — that breaks the recruiter/ATS
   convention and buries the user's current title (their strongest, most up-to-date evidence).
   Express relevance through **expansion depth, not ordering**: the bullseye role gets the
   deepest treatment (sub-headers, most bullets) *in its chronological slot*, while the current
   role stays first even if you keep it tight.
   - **Expand** (full treatment: sub-headers, 5–8 bullets, tech/skill stack re-ordered) the
     roles that best evidence THIS JD's top requirements — regardless of age, but **in place**
     (do not reorder them to the top).
   - **Condense** weaker matches to 2–4 bullets, no sub-headers.
   - **Collapse** the oldest/irrelevant roles into a single "Earlier Roles" block.
   - **Omit** truly irrelevant items (never delete from `profile/` — just leave them out of
     this CV). Re-decide all of this for every application; no fixed scheme.
   - **NEVER CREATE A DATE GAP.** The visible timeline must be reverse-chronological **and
     unbroken**. The "Earlier … Roles" block is a **contiguous tail** — everything older than
     one cut-off date, nothing skipped. Never lift a *mid-sequence* role into it: the entries
     above keep their real dates, so the hole becomes visible and reads as hiding something.
     Don't collapse a single role into a block either — that's just a worse-formatted entry.
     **After writing any CV, read the dates top-to-bottom and confirm each role starts on/before
     the previous one ends.**
4. Write the tailored CV to `applications/<...>/cv.md` using `templates/cv-template.md`,
   **following its heading/inline conventions exactly** — they drive `styles/cv.css`, which
   renders the user's chosen theme (see `styles/` and §3). Every generated CV must look like
   that theme. Keep to ~1–2 pages of content.
5. Note *why* each big choice was made in `cv.notes.md` (traceability).
6. Offer to render a PDF (→ §3).

### 2.3 Interview preparation
Trigger: *"help me get ready for the X interview"*, *"I have Y days"*.

1. Read the application, JD, and interview process steps.
2. **Research** (use web tools): the company (product, mission, recent news, funding, tech
   stack, values), the specific interviewer(s) if named (background, focus areas), the team,
   and any public interview guidelines / review-site signals. Save to
   `interviews/company-research/<company>.md` and link it from `application.md`.
3. Build a **time-boxed plan** based on how many days/hours the user has. Write it to
   `applications/<...>/interview-prep/<round>-plan.md`. Front-load the highest-leverage prep.
4. For behavioral / leadership rounds → drive §2.5 **(applies only if the user manages people
   or the round is people-leadership focused; for IC rounds, adapt to the discipline — e.g.
   design critique, coding, system design)**.
5. **Coverage gate (mandatory):** before presenting any prep plan, walk
   `interviews/hiring-manager/prep-checklist.md` and append a "Coverage" section to the plan
   marking every area ✅ (covered, where) or ⏭ (skipped, why). Pay special attention to
   **metrics/OKRs per past role** — pull each role's "How success was measured" section from
   `profile/work-experience/`; if it's still TODO, eliciting it from the user is part of the
   prep, not optional.
6. Offer **mock interviews** and update answers based on how the user responds.

### 2.4 Intake a new experience / project ("router")
Trigger: user talks about something they did.

Decide where it belongs and write it there:
| The user is describing… | Route to |
|---|---|
| A responsibility/impact at a job | that role's file in `profile/work-experience/` |
| A discrete initiative worth naming | new file in `profile/projects/` |
| A tool/skill they used | `profile/skills.md` |
| A behavioral anecdote (conflict, failure, growth) | new STAR story in `profile/stories/` |
| A degree / certification | `profile/education.md` / `certifications.md` |
| How a company/team was run (OKRs, KPIs, metrics, rituals) | that role's "How success was measured" section in `profile/work-experience/` |

Always: quantify if possible (ask for the number), then confirm where you stored it. A single
experience often lands in **two** places (e.g. a role bullet **and** a STAR story) — that's
expected.

### 2.5 Behavioral / leadership interview prep
**Applies when the user manages people, or the round is people-leadership focused.** For IC
roles, skip this and prep to the discipline (design critique, coding, system design, etc.);
the coverage gate (§2.3 step 5) and the debrief loop (§2.6) still apply.

Leadership rounds probe people-leadership, delivery, and judgment.

1. `interviews/hiring-manager/question-bank.md` holds the master list of likely questions
   (conflict, PIP, raising the quality bar, hiring, firing, disagreement with leadership,
   failure, prioritization, etc.). Keep it comprehensive.
2. During a mock, map each question to the user's real history (`profile/`, especially
   `profile/stories/`). If a story is missing, elicit it and **save it to `profile/stories/`**
   (§2.4).
3. Fill the prepared, STAR-structured answer under each question in
   `interviews/hiring-manager/answers.md` (keyed to the question bank), citing which
   experience it draws from.
4. To make the user "ready": produce a focused subset + a rehearsal plan for the specific
   company/round — gated by the coverage checklist (§2.3 step 5).

### 2.6 Interview debrief (close the loop)
Trigger: the user reports how an interview went — *always* run this, especially after a rough
one.

1. Create `applications/<...>/interview-prep/<round>-debrief.md` from
   `applications/_TEMPLATE/interview-prep/_debrief-TEMPLATE.md` and fill it from what the user
   tells you (ask for: questions actually asked, what went well/badly, where they were caught
   unprepared).
2. **Route every gap back into the system:**
   - New/unexpected questions → add to `interviews/hiring-manager/question-bank.md`.
   - A whole missing topic area → add to `interviews/hiring-manager/prep-checklist.md`.
   - Missing facts/metrics → the right `profile/` file (§2.4).
   - A new anecdote → `profile/stories/`.
3. Update the application's status log and `applications/_index.md`.

This is the mechanism that makes prep better with every real interview — a gap should never
bite twice.

---

## 3. CV → PDF pipeline

Tailored CVs are Markdown (`cv.md`) styled by `styles/cv.css` and converted to PDF.

- **The ONE command (from repo root):** `npm run cv:pdf -- applications/<company-role>/cv.md`.
  Dependencies are pinned in `package.json` for hard-won reasons — **do NOT use `npx md-to-pdf`
  (crashes with `ERR_REQUIRE_ESM`) and do NOT switch PDF engines**; `styles/README.md`
  documents the exact failure modes, the cross-platform Chrome path, and the only approved
  fallback.
- **Auto-install on first render (never make the user run a terminal).** The one-time setup is
  `PUPPETEER_SKIP_DOWNLOAD=1 npm install`, but **the agent runs it automatically** the first
  time a PDF is rendered: if `node_modules/` is missing, run the install yourself, then render.
  Non-technical users should never be asked to open a terminal or run install/render by hand.
- After rendering, Read the PDF back and verify: 1–2 pages, and that it matches the user's
  chosen theme (see `styles/`).
- The CSS in `styles/cv.css` controls fonts, margins, spacing, and section styling. **Edit the
  CSS to change look, not the content files.** The theme ships as a neutral **default Blue**;
  onboarding's style step may replace it by extracting the user's own CV design.
- Keep CV Markdown clean: standard headings, bullet lists, bold for emphasis. Avoid raw HTML
  unless it's in the template. This keeps every CV visually consistent.
- Output PDFs go to `applications/<...>/cv.pdf` and are committed (deliverables).

---

## 4. Conventions

- **Dates:** `YYYY-MM` (use `Present` for current). Convert relative dates the user gives
  ("last year") to absolute before saving. Today's date is available in context.
- **Slugs:** kebab-case for folders/files (`company-role`, `story-name`).
- **Frontmatter:** each structured file starts with YAML frontmatter (see templates).
- **Status values** for applications: `interested`, `applied`, `screening`, `interviewing`,
  `offer`, `rejected`, `withdrawn`, `accepted`.
- **TODO markers:** write `TODO(user): <what's missing>` for facts you need from the user;
  surface these back to them.
- **Avoid self-claimed trait adjectives in outward-facing text** (CVs, cover letters, prepared
  interview answers). Trait claims like "low ego," "humble," "rockstar," "10x," or "passionate"
  read as unearned self-description — and some, framed as the absence of a flaw, come off
  defensive. **Name the observable behaviour instead** ("credit is shared," "raises the bar of
  the people around them," "blameless," "team-first," "collaborative"). The user may keep or
  customize a personal banned-phrase list during onboarding's house-rules step; honor whatever
  is recorded in this file. **Exception:** never edit a `jd.md` (company's verbatim text) or an
  already-sent `cv.md` / cover letter.
- When unsure about a fact, **ask** — don't guess.

### Git-save policy
The user chooses during onboarding (git-save step) whether the agent should **auto-commit and
push** changes or only commit **when explicitly asked**. The choice is recorded here:

> **Git-save mode:** `TODO(onboarding): auto-commit-and-push | manual` *(default: auto-commit-and-push)*

Rules that apply in **both** modes:

1. **Never commit or push silently.** Before any commit/push, show a short **plain-English
   summary of exactly what you're about to save** (which files, one line on why) and **wait for
   the user's confirmation**. Only then commit/push. After a confirmed push, say it's done.
2. **Auto mode** means you *initiate* the save without being told "commit this" — but still
   summarize-and-confirm first (rule 1). It's aimed at non-technical users so nothing is lost.
3. **Manual mode** means you commit/push only when the user asks — and still summarize-and-
   confirm first.
4. **Batch a coherent unit of work into one commit** rather than committing after every tiny
   edit.
5. **If no git remote is configured yet,** commit locally and tell the user pushes are on hold
   until they add a remote (onboarding's git-save step records this case).

---

## 5. Repository Map

```
onboarding/              # First-run setup (see §0)
  ONBOARDING.md          # the master onboarding flow the agent follows
  CHECKLIST.md           # live, resumable onboarding state (one checkbox per step)

profile/                 # SOURCE OF TRUTH — the master CV data (populated during onboarding)
  basics.md              # name, contact, links, headline, elevator pitch
  summary.md             # long-form professional summary / positioning
  work-experience/       # one file per role (see _TEMPLATE.md)
  projects/              # one file per notable project (see _TEMPLATE.md)
  skills.md              # skills grouped by category, with proficiency + evidence
  education.md           # degrees
  certifications.md      # certifications & courses
  company-fit.md         # what the user WANTS from an employer (culture fit + deal-breakers)
  stories/               # STAR story bank (behavioral evidence) — see _index.md

applications/            # one folder per job application
  _index.md              # MASTER TABLE / log of every application
  <company>-<role>/      # created per application (see applications/_TEMPLATE)

interviews/
  hiring-manager/        # behavioral/leadership question bank + answers + prep-checklist.md
  technical/             # system design / technical / discipline-specific prep
  company-research/      # per-company research notes (linked from applications)

styles/                  # CV styling (default Blue theme) + Markdown→PDF pipeline
templates/               # reusable templates (CV, cover letter, prep plan)
```
