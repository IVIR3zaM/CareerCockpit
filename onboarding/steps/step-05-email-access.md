# Step 5 — Email access decision *(optional)* (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 5); this is the full logic the agent follows. Obey the global onboarding
> invariants: **one step per re-prompt · one targeted question at a time · state in
> [`../CHECKLIST.md`](../CHECKLIST.md)**. This step decides whether the agent may read the
> user's job-search email to track application replies — and, if yes, **verifies the access
> actually works** and records the decision so future sessions never re-ask.

---

## Purpose

Job-search replies (recruiter intros, screening invites, rejections, offer emails) mostly
arrive by **email**. If the user lets the agent read their job-search inbox, the cockpit can
keep `applications/_index.md` honest — reconciling the live application list against the
inbox so nothing is missed, and catching status changes the user forgot to mention.

This is **opt-in and privacy-sensitive.** Email is the user's most personal data store; the
agent must never assume access. This step captures a clear **yes/no + method**, and if yes,
**tests** that the access is real before promising to use it. Either way the decision is
written to a **committed file future sessions read**, so the user is asked exactly once.

> **This step reads a decision, not the inbox's contents.** Nothing from the user's email is
> copied into `profile/` here. When email *is* later used to reconcile applications, the same
> privacy/GDPR rule applies: **alias any third-party names** (recruiters, interviewers,
> colleagues) before writing anything to the repo, and never store a third party's personal
> attributes (CLAUDE.md Golden Rule #9).

---

## Inputs

- None required — this is a decision. If the user's environment has an **email connector**
  (e.g. a Gmail connector / MCP, or another mail tool the session exposes), you'll use it
  only for the optional access **test** below.

---

## The flow: ask → (if yes) pick method → test → record

### 1. Ask the one question (opt-in, no pressure)
Ask a single, plainly-scoped question — do **not** bundle it with anything else:

> "Would you like me to be able to **read your job-search email** so I can track application
> replies (screening invites, rejections, offers) and keep your application list in sync? This
> is **optional** — I'll only read to reconcile your applications, never send anything, and you
> can turn it off anytime. Yes or no?"

Make the boundaries explicit so consent is informed:
- **Read-only for tracking.** The agent reads to reconcile `applications/_index.md`; it does
  **not** send, reply, archive, label, or delete anything as part of this feature.
- **Sending email is always a separate, explicit action** governed by the normal rules (the
  agent asks before sending anything on the user's behalf — see CLAUDE.md).
- **Revocable.** The user can say "stop reading my email" and the agent flips the decision.

### 2. If NO (or "not now") — record the decline and move on
Write the decline to `onboarding/decisions.md` (see Outputs) and **tick the box** — a
deliberate skip is *done*, not pending (ONBOARDING.md). Do not nag; the user can enable it
later by saying so (which un-ticks and re-runs this step).

### 3. If YES — pick the method (one question), then test it
Ask which mailbox/tool, one question at a time:

> "Which email should I track, and how do you want me to reach it? Options I can use depend on
> what's connected in your environment — for example a **Gmail connector**, another mail
> connector, or a manual **forward-the-relevant-emails-to-the-repo** approach if you'd rather
> not connect an inbox."

Pick the **most privacy-preserving method that works** and that the user is comfortable with.
Prefer a scoped/read connector over broad access. If nothing is connected, the honest answer
is "no automated access is available yet" — record that and offer the manual forward path.

### 4. Test the access *(required when the user says yes)*
> **The user asked for this explicitly: if they confirm they want email access, actually test
> that the agent has it — don't just assume the connector works.**

Run a **minimal, read-only probe** against whatever email tool the environment exposes and
report the concrete result. The probe must be the smallest possible read — enough to prove
connectivity, no bulk download, no content stored:

- **List-only first.** Call the connector's lightest read (e.g. list labels/folders, or fetch
  the single most-recent thread's metadata) — *not* a full inbox search. You are proving the
  handshake, not reading mail.
- **Report plainly** what happened, one of:
  - ✅ **Access confirmed** — name the tool used and what the probe returned at a high level
    ("Gmail connector reachable; able to list folders / read thread metadata"). Do **not**
    paste email contents or third-party names into the repo or the summary.
  - ⚠️ **Connected but limited** — reachable but missing a scope needed for tracking (e.g.
    can list labels but not read messages). State exactly what's missing so the user can fix it.
  - ❌ **No access** — no email tool is available, or the probe failed / was denied. Say so;
    do **not** claim tracking will work.
- **Never fabricate a successful test.** If you cannot actually reach an inbox, the result is
  ❌ or ⚠️ — record the truth (Golden Rule #2: never fabricate).
- If the probe requires the user to approve a connector prompt, ask them to approve it, then
  re-run the probe. If they decline the prompt, treat it as ❌ and record it.

### 5. Record the decision (durable, committed)
Write the outcome to **`onboarding/decisions.md`** under an **Email access** heading so every
future session reads it and does **not** re-ask (see the block below). This is the whole point
of the step — the decision must outlive the session and live in the repo, not agent memory
(Golden Rule #8).

Record: the yes/no, the chosen **method/tool** (or "none"), the **test result** (✅/⚠️/❌ +
one line), the **date**, and any follow-up (`TODO(user)`) such as "grant read scope" or
"forward offer emails manually."

---

## What to write to `onboarding/decisions.md`

Append (create the file if absent) a section like:

```markdown
## Email access
- **Decision:** {yes | no | deferred} — recorded {YYYY-MM-DD}
- **Purpose (if yes):** read job-search inbox to reconcile `applications/_index.md` (read-only;
  never sends).
- **Method/tool:** {e.g. Gmail connector | other mail connector | manual forward | none}
- **Access test:** {✅ confirmed via <tool> | ⚠️ connected but <missing scope> | ❌ no access —
  <reason> | n/a — declined}
- **Follow-up:** {TODO(user): … | none}
```

Future sessions: **read this block before touching email.** If `Decision: no`, don't offer to
read email unless the user asks. If `Decision: yes` + `✅`, you may reconcile applications from
the inbox (aliasing third parties, per the privacy rule). If `⚠️`/`❌`, surface the blocker
rather than silently failing.

---

## Outputs

- **`onboarding/decisions.md`** — an **Email access** section capturing yes/no + method + test
  result + date (the durable record future sessions read).
- If declined: the decline is recorded (still an output — silence is not).
- No changes to `profile/`; no email content stored anywhere in the repo.

---

## Done-criteria (tick the box when all true)

- [ ] The user was asked the opt-in question, with read-only/never-send/revocable boundaries
      made explicit.
- [ ] The decision (yes / no / deferred) **and** the method are recorded in a committed file
      (`onboarding/decisions.md`) that future sessions read.
- [ ] **If the user said yes:** the agent ran a minimal read-only **access test** and recorded
      the honest result (✅ / ⚠️ / ❌) — never a fabricated success.
- [ ] No email contents or third-party names were written into the repo.

Then tick Step 5 in [`../CHECKLIST.md`](../CHECKLIST.md), note in its cell the decision and
test result, and tell the user to re-prompt with **"continue onboarding"** — next is **Step 6
(LinkedIn export ingest)**.
