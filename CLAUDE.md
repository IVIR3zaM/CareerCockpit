# CLAUDE.md — Operating Manual for CareerCockpit

This repository is a **living CV and job-search cockpit** for one person — you (the coding
agent) are the primary interface. The human talks to you in natural language; you read from
and write to the Markdown files described below.

It works for anyone in tech at any level — junior/senior IC, staff, lead, engineering
manager, head/director — across disciplines (software, design, product, data, infra, and
adjacent roles). Nothing here assumes a specific job title.

> **⭐ The cockpit serves the role the user is GOING FOR, not the one they hold.** Every
> level/discipline gate in this repo — the `⟨manages-people⟩` markers on question blocks and
> checklist rows, the sharpness probes, the prep plan's shape — reads the **target role of the
> application or round**, taken from `application.md` and the JD. The user's own current
> status (`profile/preferences.md` → *Manages people*, their level and discipline) decides
> **what evidence exists**, never **what gets prepared**.
> - An **IC applying for their first lead/manager role** gets the full leadership preparation.
>   Skipping it because they don't manage people *today* is the single worst failure this repo
>   can have — it withholds exactly the help they came for.
> - A **manager applying for an IC role** does not get the management material; it is
>   off-target and pulls them toward over-leveling (Golden Rule #11).
> - **This is preparation, never fabrication.** Prep to the target, but every answer still
>   traces to real experience (#1, #2, #7). Where the target role expects evidence the user
>   genuinely doesn't have, **say so plainly, surface it as a gap, and prep the honest
>   adjacent version** (mentoring and technical leadership instead of headcount and
>   promotions) — don't quietly skip the topic *or* invent the experience.
> - Ambiguous target (a "lead" title with no reports and no technical authority in the JD)?
>   **Ask the user** which it is; don't guess.

Everything is **Markdown files** — no database, no build step required. Git is the source of
truth and the audit log.

> **Detailed task procedures live in on-demand skills** under `.claude/skills/` (see §2).
> This always-on file holds the Golden Rules, the repo map, the conversational/always-on
> workflows, and the conventions. The skills carry the step-by-step procedures **and the
> mandatory gates**; the Golden Rules below point into them by name.

---

## 0. First run — onboarding

**A fresh clone is empty on purpose.** Before doing normal cockpit work, a new user must be
onboarded so `profile/` gets populated and their preferences (theme, git-save mode, house
rules) are set.

- If `onboarding/CHECKLIST.md` has unchecked steps (or `profile/basics.md` is still a bare
  skeleton), **the repo is not onboarded yet.** Point the user to onboarding: tell them to
  say **"onboard me"** (or "continue onboarding"), then follow `onboarding/CHECKLIST.md` —
  it carries the protocol and links the one step doc you need for this turn. Read
  `onboarding/ONBOARDING.md` only if you need the full protocol rationale.
- Onboarding runs **one step per re-prompt** and asks **one targeted question at a time** —
  never a single wide-open "tell me everything." State lives in `onboarding/CHECKLIST.md` so
  it's resumable across sessions.
- Once onboarding is complete, this manual governs everyday use.
- **Read `profile/preferences.md` at the start of every session.** It is a short table of the
  user's durable settings — git-save mode, CV theme, comp floor, email access, whether they
  manage people — and is the authoritative source for those values (e.g. the Git-save policy
  in §4 reads its mode from there). The *reasoning* behind each setting lives in
  `profile/decisions.md`; read that only when a decision needs revisiting.

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
   not order (see the `tailored-cv` skill).
4. **One fact, one home.** When the user shares a new experience, project, or metric, route
   it to the correct `profile/` file (see §2.4) so it can be reused everywhere.
5. **Log everything.** Application status changes go into the application's status log and
   the master index (`applications/_index.md`).
6. **Keep it PDF-ready.** Tailored CVs are Markdown that convert cleanly to PDF via the
   pipeline in `styles/` (driven by the `tailored-cv` skill). Don't use features that break
   that pipeline.
7. **The CV says only what the user actually did — never what the JD wants.** Every line of a
   tailored CV must map to a real experience in `profile/`. You may *select and emphasize*
   real work (through expansion depth, not by resequencing the reverse-chronological timeline
   — see Golden Rule #3) so it resonates with a JD, but you may **never import a skill,
   responsibility, metric, or framing from the JD** — e.g. don't relabel a team, a role, or a
   project as something the JD asks for. If the JD implies something you cannot trace to
   `profile/`, **ask the user whether it's true before writing it.** Do not infer, aspire, or
   borrow JD language on the user's behalf. When in doubt, describe the real work plainly and
   let the genuine overlap speak — or ask. **This principle repeatedly fails on its own** (it
   is stated here and *still* gets violated) — do not rely on remembering it; **enforce it
   with the mechanical JD-echo read-back gate in the `tailored-cv` skill** after every CV,
   cover letter, or prepared answer.
8. **This repository is the ONLY source of truth — never your agent/internal memory.** Any
   durable fact, story, metric, preference, interview lesson, sourcing rule, or working-style
   note belongs in a **committed Markdown file in this repo** (routed per §2.4), where it is
   versioned, auditable, and visible to the user. **Do not store job-search or CV knowledge
   in the coding agent's cross-session memory** — that memory is a private, unversioned
   parallel store that silently drifts from the repo and breaks the SSOT guarantee. If the
   agent's memory index is used at all, it may hold **only thin pointers back into this
   repo**, never the facts themselves. When you learn something worth keeping, **write it to
   the repo and commit it** — if you catch a fact living only in agent memory, migrate it into
   the repo and delete it from memory. *(The skills under `.claude/skills/` satisfy this rule
   — they are committed, versioned, and auditable; agent memory would not be.)*
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
10. **Answer the question's real intent, not its surface — and be picky about it.** Every
    free-text question you answer on the user's behalf (application forms, screening
    questionnaires, "why us?" boxes, recruiter emails, interview forms) fishes for a specific
    **signal**. Name that signal, then confirm the answer **delivers** it using the strongest
    evidence in `profile/` — not the safest story. **A merely-true, on-topic answer that
    misses the signal never ships.** This holds when the *user* wrote the answer too: flag it,
    don't rubber-stamp it. Enforced by the **answer-intent gate in §2.2b**.
11. **Lead with what the role is about — not with the user's most impressive work.** A CV can
    be fully truthful and import zero JD language (passing #7) and *still* fail by
    **emphasizing the wrong real experience**. A screener decides in the **first ~15 lines**
    (summary + the current role's heading and first bullets); if those lines show a **broader
    or more senior facet than the target asks for**, the user reads as over-leveled and is cut
    before the matching evidence below is ever seen. This is the **mirror of #7** — #7 forbids
    importing what the user did NOT do; #11 forbids **leading with what the user DID do that
    the JD did not ask for.** Fix it by re-weighting **within** the current role (never by
    resequencing the timeline — #3 still holds). Enforced by the **role-fit positioning gate +
    15-line squint test in the `tailored-cv` skill** — **and by §2.2b check 6 on every
    application answer.** The CV-only version of this gate is not enough: the screener reads
    the CV **and** the free-text answers in one sitting, so an ungated answers surface leaks
    the same failure straight through to the same reader.
12. **Never re-apply into a prior rejection blind.** Before building a CV, drafting answers,
    or applying to ANY company, check for a prior application/rejection — in **both**
    `applications/_index.md` **and `applications/_archive/_index.md`** (where every closed
    application lives — see #14), plus their email if access was granted. Never assume a clean
    slate — ATSs key candidates
    by email, so the reader sees a returning applicant. **Same reader + fundamentally the same
    candidate = same no.** A **structural** prior reason (seniority, tenure, domain depth) is
    not beatable by re-tailoring — don't spend a CV on it; a **fixable positioning** reason is
    worth a retry **only if the new CV fixes that exact thing**. Surface any prior rejection
    with its date + reason **before building anything**. Enforced by the pre-apply gate in the
    **`new-application` skill (step 0)**.
13. **Every rejection triggers a root-cause diagnosis — even with zero feedback.** A rejection
    is never just logged; it is **diagnosed**, so the same *type* of rejection doesn't happen
    twice. Run the **rejection post-mortem in the `interview-debrief` skill**: find the real
    reason (marked KNOWN vs INFERRED) → **name the failure class** → **check recurrence**
    against the **failure-class ledger in `applications/_archive/_index.md`** (a class that
    recurs means the previous fix didn't hold — escalate) → **ship a correction, not a note**
    (a `profile/` fix, a tightened gate, or a proposed new golden rule). The test
    for every correction: *what mechanical change makes this class hard to repeat?* **A
    principle by itself is not a fix** — #7, #10, and #11 all exist because principles get
    forgotten; prefer a gate, a read-back, or a checklist step.
14. **A closed application is ARCHIVED — never left in place, never deleted — and every history
    check reads BOTH indexes.** The moment an application reaches a terminal status —
    **`rejected`, `withdrawn`, `ghosted`**, or **`not applied — skipped`** — its folder moves to
    **`applications/_archive/<company>-<role>/`** and its `_index.md` row moves **verbatim** into
    **`applications/_archive/_index.md`**. `applications/` then holds **only live applications**,
    so a "status" read is the actual cockpit and not a wall of dead rows. Run it via the
    close-out procedure in **§2.5**.
    - **Archived ≠ forgotten. This is the dangerous half of the rule.** Golden Rules **#12**
      (repeat-applicant gate) and **#13** (recurrence check) are powered *entirely* by past
      rejections — and after archival **every past rejection is in the archive, not in
      `applications/_index.md`.** Reading only the active index shows a **clean slate for a
      company that already said no**, which is precisely the failure #12 exists to stop.
      Therefore: **any question about application history — "have I applied here before?", the
      #12 gate, the #13 recurrence check, "how many rejections?", "what happened with X?" —
      MUST read `applications/_index.md` AND `applications/_archive/_index.md`.** Treat "I
      scanned the index" as an incomplete scan unless both files were opened.
    - **Nothing is ever deleted.** Archiving is a move, never a removal or a summarisation; the
      row is not condensed, re-worded, or trimmed on the way in. The archive is the search's
      memory.
    - **Archived content is read-only history**, like a sent `cv.md`. The only permitted writes
      to an archived application are: (a) **appending** a post-mortem/diagnosis (#13) or a later
      recruiter reply to its `application.md`, (b) **mechanical path/link repair**, and (c)
      **un-archiving** — if a closed application reopens (the recruiter comes back, the req
      reposts), move the folder *and* its row back to `applications/` and set a live status.
    - **`_archive/_index.md` carries the failure-class ledger** — the class → occurrences table
      that answers #13's recurrence check. Every post-mortem that names a class adds its
      occurrence there in the same edit, so recurrence is visible at a glance instead of being
      reconstructed from dozens of rows.

---

## 2. Core Workflows

The heavy, task-specific procedures live in **on-demand skills** under `.claude/skills/`
(auto-discovered — you don't reference a path; the harness surfaces each skill's description
and you invoke it when its task starts). **Invoking the matching skill is NOT optional for
the gated workflows** — the Golden Rules point into these skills for enforcement, and the
full step-by-step (including the mandatory read-back gates) lives inside them:

| When the user… | Invoke the skill | It carries |
|---|---|---|
| is applying to a company / pastes a JD / describes a role | **`new-application`** | repeat-applicant pre-apply gate (#12), culture-fit + comp-floor checks |
| wants a tailored CV, or a CV rendered to PDF | **`tailored-cv`** | JD-echo gate (#7), role-fit positioning / 15-line squint gate (#11), CV→PDF pipeline + page budget |
| wants to get ready for an interview | **`interview-prep`** | company/interviewer research, time-boxed plan, behavioral/STAR prep, coverage gate |
| is prepping a round and needs the question set | **`interview-question-generator`** | discipline/level/round-aware generation (invoked by `interview-prep`); the bank is a seed, not the ceiling |
| tells a story, or wants to add / refine one | **`story-elicitation`** | full STAR, quantified, and the **learning** captured after confirmation → `profile/stories/` + `answers.md` |
| reports how an interview went, OR any rejection (incl. silent CV-screen) | **`interview-debrief`** | interview debrief + rejection post-mortem (#13), then hands off to the §2.5 close-out |

The four workflows below **stay always-on in this file** — they trigger on unpredictable,
conversational moments a skill description could miss (a stray form question, an offhand "oh,
I also did X", a passing "yeah, I dropped that one"), and two are safety-critical gates that
must never be a maybe-load.

### 2.0 Session start & "status" (user experience)
Keep the experience **smooth and low-friction**:

- **At the start of every session** (and whenever the user says "status" / "where are we"),
  open with a short **cockpit status** — no preamble, ≤10 lines:
  1. Active applications + stage + next interview/deadline (from `applications/_index.md`,
     which holds **only** live applications — Golden Rule #14).
  2. Top 3 open `TODO(user)` items, most urgent first (urgent = blocks an upcoming interview
     or CV).
  3. One suggested next action.
  - **If the repo isn't onboarded yet** (see §0), the status is simply that — point the user
    to onboarding instead of showing an empty cockpit.
- **Two cheap checks while you're in the index** (stay silent unless they fire):
  - **Archive drift** — any row in `applications/_index.md` whose status is `rejected`,
    `withdrawn`, `ghosted`, or `not applied — skipped` was never closed out. Run §2.5 on it.
  - **Ghosting sweep** — any row silent **45+ days** since the last contact, with no scheduled
    next step, is a `ghosted` candidate. Name them and **ask** before closing (§2.5 step 0).
- **Any history question reads BOTH indexes** — "have I applied to X?", "how many rejections?"
  — the active one *and* `applications/_archive/_index.md`. The active file alone will say
  "never applied" about a company that already rejected the user (Golden Rule #14).
- **Don't make the user learn the repo.** They speak naturally; you find and route the files.
  Never ask "which file should I put this in".
- **Batch your questions.** When you need facts, ask them as one grouped list at the end of
  your reply — never scattered one-by-one across turns. (During onboarding, the opposite
  applies: ask one targeted question at a time.)
- Drop/park TODOs the user has declined twice; don't nag.

### 2.2b Answer an application / screening question — the answer-intent gate
Trigger: **any** free-text question you answer on the user's behalf — application-form
questions, screening questionnaires, take-home prompts, "why us?" boxes, recruiter-email
questions, interview forms — **whether you draft the answer or the user hands you one to
check.** This is the mechanical enforcement of Golden Rule #10.

Save answers to `applications/<...>/application-answers.md` (or the round's prep file for
interview questions). Mark them SENT once submitted; **never edit a sent answer** (the same
no-edit rule that applies to sent CVs).

For **each** question, before the set ships, run these five checks and record them inline
(one line each) next to the answer:
1. **Name the signal.** *What is the reader actually trying to learn?* — competence proof,
   judgment, self-awareness, culture fit, depth on a specific thing. If the JD or the reader
   states what "good" looks like ("I want to see depth here, not a vanilla description"),
   quote it as the bar.
2. **Pick the evidence deliberately.** From `profile/`, choose the story that **best delivers
   that signal** — the strongest and most on-target, not the safest or the one already
   drafted. If a bolder / more on-point story exists and you're steering away from it, that is
   a decision to **surface to the user**, not make silently.
3. **Read the draft back against the signal.** Does it hit the signal in the first few
   sentences? Does anything in it **work against** the signal — hedges, unnecessary
   disclaimers, "to be honest…" caveats the question never asked for, or JD-echo (#7)? Cut
   those.
4. **Picky check — flag, don't rubber-stamp.** If an answer is only "true and on-topic" but
   doesn't clearly land the signal, it is **NOT ready.** Flag the specific gap to the user —
   **including when the user wrote the answer themselves.** Better to challenge and lose a
   minute than repeat a rejection.
5. **Cross-reader check.** If this is a repeat application to the same company/reader, verify
   the answer isn't re-running a pitch shape that already failed (read the status log / prior
   answers). Same reader + same shape = same no. 🗄️ **The prior application is almost certainly
   in `applications/_archive/<slug>/` — that is where rejections live (Golden Rule #14)**; a
   check that only looked in `applications/` did not run.
6. **Role-fit positioning — Golden Rule #11 applies to ANSWERS, not just the CV.** The screener
   reads the CV **and** the free-text answers in one sitting; a #11 gate that lives only in the
   `tailored-cv` skill leaves the answers as an **ungated surface into the same reader**. For
   every answer ask: **does this lead with a broader or more senior facet than the target role
   asked for?** Especially the **first** answer, and especially when the role is **narrower or
   more junior than the user's current scope**:
   - **Lead with the JD-matching facet** — put the on-target fact in the **first clause**, not
     buried mid-sentence.
   - Bigger scope may be **present but not the headline** — the same re-weighting rule as the CV.
   - A question that *invites* breadth does **not** license leading with the broadest version of
     the user's scope. Answer the breadth honestly, but frame it from the level the role is
     hiring at.
   - **Comp answers:** never quote current total comp; state the user's floor from
     `profile/preferences.md` and hand the band question back.

Only when all **six** pass for **every** question is the set ready to submit. Offer the user the
one-line signal + evidence rationale per question so they can sanity-check before sending.

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

When the user tells a story — or wants to add or refine one — use the **`story-elicitation`**
skill: it draws out full STAR, quantifies, and captures the **learning** (what they'd do
differently, even when it went wrong).

### 2.5 Close out an application — the archival step (Golden Rule #14)
Trigger: an application reaches a terminal status — the user reports (or an email sweep
surfaces) a **rejection**, the user **withdraws** ("I dropped that one", "not going ahead with
X", a comp walk-away), a role is **ghosted**, or you decide **not to apply** after the pre-apply
gates. This stays always-on because most of these arrive as an offhand remark, not a task.

**0. Confirm the terminal status.**
   - `rejected` — a rejection was actually received. Run the **`interview-debrief` skill first**
     (the Golden Rule #13 post-mortem): the diagnosis must exist *before* the folder moves,
     because the folder is read-only afterwards.
   - `withdrawn` — the user chose to stop. Record the **reason in one line** (comp, culture,
     deal-breaker, competing process); it is the whole value of the row later.
   - `ghosted` — **no response for 45+ days** since the last contact, **and** no scheduled next
     step, **and** nothing pending from the user. **Never mark a booked round as ghosted**, and
     **always ask the user before closing one** — ghosting is inferred, never received, and a
     recruiter returning after a holiday is normal.
   - `not applied — skipped` — a role evaluated and dropped before applying (a #12, comp-floor,
     or core-capability verdict). Log **which gate stopped it** — that is a gate working, and
     worth keeping.

**1. Append the close-out to the application's status log** (`application.md`) — date, terminal
   status, reason (or "boilerplate, no feedback"), and for a rejection the **failure class**
   from the #13 post-mortem. This is the last write before the folder goes read-only.

**2. Move the folder:** `git mv applications/<slug> applications/_archive/<slug>`.

**3. Move the row VERBATIM** out of `applications/_index.md` into the table in
   `applications/_archive/_index.md`. Do **not** condense, re-word, or trim it — the row *is*
   the record (Golden Rule #14). Bump any repo-relative link in that row by one level
   (`../profile/...` → `../../profile/...`), and fix links **into** the moved folder from
   elsewhere in the repo (`applications/<slug>/…` → `applications/_archive/<slug>/…`).

**4. Update the failure-class ledger** at the top of `applications/_archive/_index.md` — add
   this occurrence to its class row, or add a new class row. **If the class already had
   occurrences, say so out loud to the user**: a class recurring after a shipped correction
   means the previous fix did not hold, and Golden Rule #13 requires escalating to a more
   mechanical guard, not just another note.

**5. Rows with no folder are archived too** (applications that pre-date this repo, agency
   roles, research-only entries). The row moves; there is simply nothing to `git mv`.

**Never** delete an application, a row, or a rejection — closing is always a move. If a closed
application reopens, **un-archive**: move the folder and its row back to `applications/` and set
a live status again.

---

## 3. CV → PDF pipeline

**Lives in the `tailored-cv` skill** — the `npm run cv:pdf` command, the auto-install on
first render, the page budget, and the render-and-verify steps are all there, alongside the
CV build procedure and its gates. Invoke that skill to build or render a CV. The styling
contract and the failure modes behind the pinned setup are in `styles/README.md`; **edit the
CSS to change look, not the content files.**

---

## 4. Conventions

- **Dates:** `YYYY-MM` (use `Present` for current). Convert relative dates the user gives
  ("last year") to absolute before saving. Today's date is available in context.
- **Slugs:** kebab-case for folders/files (`company-role`, `story-name`).
- **Frontmatter:** each structured file starts with YAML frontmatter (see templates).
- **Status values** for applications — split into **live** and **terminal**:
  - **Live** (row + folder stay in `applications/`): `interested`, `applied`, `screening`,
    `interviewing`, `offer`, `accepted`.
  - **Terminal** (row + folder move to `applications/_archive/` via §2.5 — Golden Rule #14):
    `rejected`, `withdrawn`, `ghosted`, `not applied — skipped`.
  - **`ghosted`** = **45+ days of silence** since the last contact, with no scheduled next step
    and nothing pending from the user. It is **inferred, never received** — always confirm with
    the user before setting it, and never apply it while a round is booked. A ghosted
    application that later replies is **un-archived**, not re-created.
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
push** changes or only commit **when explicitly asked**. The chosen **mode** (and whether a
remote exists) lives in **`profile/preferences.md`** — that is the single source of truth for
the value; **read it there.** This section holds the *rules* that apply regardless of the mode:

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
.claude/skills/          # on-demand workflow skills (§2) — committed, not machine-local

onboarding/              # First-run setup (see §0)
  CHECKLIST.md           # live, resumable state + the protocol — START HERE for onboarding
  ONBOARDING.md          # the protocol's rationale and the step index
  steps/                 # one doc per step — read ONLY the step you are running

profile/                 # SOURCE OF TRUTH — the master CV data (populated during onboarding)
  basics.md              # name, contact, links, headline, elevator pitch
  summary.md             # long-form professional summary / positioning
  work-experience/       # one file per role (see _TEMPLATE.md)
  projects/              # one file per notable project (see _TEMPLATE.md)
  skills.md              # skills grouped by category, with proficiency + evidence
  education.md           # degrees
  certifications.md      # certifications & courses
  company-fit.md         # what the user WANTS from an employer (culture fit + deal-breakers)
  preferences.md         # SETTINGS TABLE — durable values, read every session (kept small)
  decisions.md           # the why/when behind each setting — read on demand, not every session
  stories/               # STAR story bank (behavioral evidence) — see _index.md

applications/            # LIVE applications only — one folder each
  _index.md              # MASTER TABLE of OPEN applications (interested → accepted)
  <company>-<role>/      # created per application (see applications/_TEMPLATE)
  _archive/              # CLOSED applications (rejected / withdrawn / ghosted) — Golden Rule #14
    _index.md            # archive table + the FAILURE-CLASS LEDGER (feeds GR #12 and #13)
    <company>-<role>/    # moved here verbatim on close-out (§2.5); read-only history

interviews/
  hiring-manager/        # behavioral/leadership question bank + answers + prep-checklist.md
                         # + sharpness-probes.md — short calibration questions,
                         #   MANAGEMENT/LEAD ROUNDS ONLY (never opened for an IC round)
  technical/             # system design / technical / discipline-specific prep
  company-research/      # per-company research notes (linked from applications)

styles/                  # CV styling (default Blue theme) + Markdown→PDF pipeline
templates/               # reusable templates (CV, cover letter, prep plan)

VERSION                  # the product release this clone is on (semver) — used by updates
CHANGELOG.md             # what each product release changed (read during an update)
UPDATE.md                # the flow the agent follows to update the engine (see §6)
```

> ⚠️ **`applications/_index.md` is HALF the history.** It lists only what is still open. Every
> past rejection lives in `applications/_archive/_index.md`. Any lookup of what the user has
> applied to — above all the Golden Rule **#12** repeat-applicant gate and the **#13**
> recurrence check — reads **both** files. See Golden Rule #14 and §2.5.

---

## 6. Updating CareerCockpit (product updates without touching user data)

A clone is created from a GitHub **template**, so it shares no git history with the product
— a plain `git pull` won't work. When the user says **"update CareerCockpit"**, **"pull the
latest version"**, or **"is there an update?"**, follow **`UPDATE.md`**.

The essentials:
- **User data is untouchable.** Updates only refresh **engine** files (templates, rules,
  skills, onboarding logic, styles). The user's career data (`profile/` content,
  `applications/`, stories, research, their answers) is never overwritten — see the
  three-tier engine-vs-data manifest in `UPDATE.md`.
- **Never clobber a customization silently.** For files the user changed (their extracted
  theme in `styles/cv.css`, their house-rule edits in this `CLAUDE.md`, their extended
  question bank), the update re-applies engine changes *around* their edits and asks **one
  targeted question at a time** on any real conflict.
- **Confirm before saving.** The version bump and every written file are shown as a
  plain-English summary and committed only after a yes, per the Git-save policy in §4
  (both modes).
- The clone's current release is in `VERSION`; what changed is in `CHANGELOG.md`.
