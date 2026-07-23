# Step 2 — CV intake & template reconciliation (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 2); this is the full logic the agent follows. Obey the global onboarding
> invariants: **one step per re-prompt · one targeted question at a time · state in
> [`../CHECKLIST.md`](../CHECKLIST.md)**. This step does **not** populate `profile/` — that
> is Step 4 (I07). Here you only **get the CV, parse it, and agree the CV *structure***.

---

## Purpose

Get the user's current CV into the cockpit, parse it, compare it against the canonical
[`templates/cv-template.md`](../../templates/cv-template.md), and **negotiate the section
structure** that best fits *this* user's discipline and level. The output is a confirmed
target CV structure that later steps (style, profile population, tailored CVs) build on.

The canonical template is deliberately generic and says its sections are
**discipline/level-dependent** ("use *Leadership Focus* only if you manage people; use
*Selected Work* / *Portfolio* for design/IC roles; keep only what fits"). This step is where
that choice gets made *for this user*, once, and recorded.

---

## Inputs

- The user's **current CV** — accept any of:
  - pasted text in chat,
  - a file path in the repo or on disk (`.md`, `.txt`, `.docx`),
  - a **PDF path** (read it with the `pdf` skill / PDF read tool),
  - or "I don't have one yet" (see *No-CV fallback* below).

Do **not** require a particular format. If the user only has a LinkedIn profile, note that
Step 6 (LinkedIn ingest) will cover it and offer to proceed with a short interview instead.

---

## The flow: parse → compare → negotiate → confirm

### 1. Get the CV (one question)
Ask **only** for the CV first:

> "To start, share your current CV — paste it here, give me a file or PDF path, or tell me
> you don't have one and we'll build from a short interview."

If given a file/PDF path, read it. If pasted, use it as-is. Keep the raw text available for
Step 4 — stash it to a working file the later step can read (e.g.
`onboarding/cv-source.md`, in the *user's own clone* — runtime personal data is fine there;
it never ships). Do not parse facts into `profile/` yet.

### 2. Parse — extract the shape, not the facts
Read the CV and infer, without writing anything to `profile/` yet:
- **Discipline** — software eng, design (product/UX/brand), product management, data
  (analyst/scientist/engineer), infra/platform/SRE, QA, research, or other.
- **Level / track** — junior IC · mid IC · senior IC · staff/principal IC · **people
  manager** (team lead / EM / director / head / VP). Track = IC vs manager matters as much
  as level.
- **What sections the CV already uses**, and which canonical-template sections map to them.
- **Chronology** — role dates, in reverse-chronological order, and any **gaps or
  out-of-order roles** (flag them now; the deep resolution happens in Step 4, but note them
  so the user isn't surprised). See the *Career-gap & chronology sensitivity* block in
  [`../ONBOARDING.md`](../ONBOARDING.md).

If discipline or level is ambiguous, ask **one** targeted question to disambiguate — e.g.
"Your CV reads as a senior IC — do you also manage people directly, or is this a pure IC
track?" One at a time; wait for the answer.

### 3. Compare against the canonical template
Line the parsed shape up against
[`templates/cv-template.md`](../../templates/cv-template.md). The canonical section spine is:

`Name | Headline` → `Personal Summary` → **highlight band** (`Leadership Focus` /
`Selected Work` / `Highlights`) → `Work Experience` → `Professional Development` → `Skills`
→ `Education`.

Decide, per section, one of: **keep**, **rename**, **add**, or **drop** — driven by
discipline/level, not by anything a future JD might want (Golden Rule / no JD-borrowing
applies later; here it's about the user's real shape).

### 4. Discipline / level → section choices (negotiation guide)
Use this as a starting proposal, then confirm with the user. **Never hard-code "Engineering
Manager."** The highlight band and any leadership content are gated on *"do you manage
people."*

| Discipline / track | Highlight band | Leadership content | Discipline-specific sections | Notes |
|---|---|---|---|---|
| **People manager** (EM / lead / director / head / VP) — any discipline | **Leadership Focus** | Yes — team size, hiring, delivery, org impact | — | Highlight band leads with people/delivery outcomes. |
| **Senior / staff IC — software / data / infra** | **Highlights** or **Selected Work** | Only if they've led without a manager title (tech lead) — gate it | Optional **Selected Projects** if projects are the story | Emphasis: technical depth, scope, impact. |
| **Junior / mid IC** | **Highlights** (optional) | No | — | Keep tight; a highlight band may be skipped entirely. |
| **Design (product / UX / brand)** | **Selected Work** | Only if they lead a design team — gate it | **Portfolio** (link + 2–3 signature pieces) | Portfolio link is load-bearing; ask for it. |
| **Product management** | **Highlights** / **Selected Work** | Only if they manage PMs — gate it | Optional **Selected Launches / Outcomes** | Emphasis: outcomes, metrics, discovery→delivery. |
| **Research / academic-leaning** | **Highlights** | If they lead a lab/group | **Publications / Talks** | Map "Professional Development" → publications if richer. |

Rules threaded through the table:
- **Leadership sections appear only if the user manages (or has led) people.** If they don't,
  drop `Leadership Focus` — don't rename it into existence.
- **`Skills`, `Education`, `Work Experience`** stay for everyone (Work Experience always
  reverse-chronological, no gaps).
- **`Professional Development`** can become *Publications/Talks*, *Certifications*, or be
  dropped if empty — ask.
- Keep the CV to **~1–2 pages** of content; the section set should serve that.

### 5. Confirm (the one place batching is allowed)
Present the proposed structure as a **single confirmation list** — the end-of-step batch the
protocol permits — e.g.:

> "Here's the CV structure I'd use for you — a **senior IC, data engineering** profile:
> Personal Summary → Highlights → Work Experience → Selected Projects → Skills → Education
> (no Leadership Focus, since you're not managing people; Professional Development dropped —
> your CV had none). Good, or want to change any section?"

Adjust on feedback until the user agrees.

---

## Outputs

1. **Confirmed target CV structure** recorded to a durable, committed file the later steps
   read: **`profile/preferences.md`** (create it if missing; append a "CV structure"
   section). Record: discipline, level/track, whether they manage people, the ordered list
   of sections to use, and any discipline-specific sections (Portfolio, Publications, …).
2. **Raw CV kept for Step 4** — stashed to `onboarding/cv-source.md` (user's clone only).

Both are the user's own runtime data — never part of the shipped product. This step doc and
`preferences.md`'s *structure* are generic; the *content* the user adds at runtime is theirs.

### No-CV fallback
If the user has no CV: record `discipline`/`level` from a couple of targeted questions,
propose a structure from the table above, confirm it, and note in `preferences.md` that
`profile/` will be built from interview + LinkedIn (Steps 4/6) rather than an existing CV.
Tick the box — a no-CV user has still completed CV intake.

---

## Done-criteria (tick the box when all true)

- [ ] The CV was provided (or the no-CV path was taken) and parsed for discipline/level.
- [ ] The section structure was proposed from the discipline/level guide and **confirmed by
      the user**.
- [ ] The confirmed structure is written to `profile/preferences.md`; the raw CV is stashed
      for Step 4.

Then tick Step 2 in [`../CHECKLIST.md`](../CHECKLIST.md), note the confirmed
discipline/level in its notes cell, and tell the user to re-prompt with **"continue
onboarding"** — next is **Step 3 (CV style choice: Blue vs extract-from-your-CV)**.
