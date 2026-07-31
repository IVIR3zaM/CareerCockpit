# Step 5 — Email access decision *(optional)*

**Purpose:** decide whether the agent may read the user's job-search email to track
application replies — and, if yes, **verify the access actually works** and record it so
future sessions never re-ask. Also feeds the repeat-applicant gate (Golden Rule #12), which
searches mail for prior applications when access exists.

**Inputs:** none — this is a decision. An email connector, if one is available in the
environment, is used only for the access **test**.

> **This step reads a decision, not the inbox.** Nothing from the user's email is copied into
> the repo here. When email *is* later used, Golden Rule #9 still applies: alias third-party
> names (recruiters, interviewers) before writing anything.

## 1. Ask the one question (opt-in, no pressure)

> "Would you like me to be able to **read your job-search email** so I can track application
> replies (screening invites, rejections, offers) and keep your application list in sync? This
> is **optional** — I'll only read to reconcile your applications, never send anything, and
> you can turn it off anytime. Yes or no?"

Make the boundaries explicit so consent is informed: **read-only for tracking** (never sends,
replies, archives, labels, or deletes); **sending is always a separate explicit action**; and
the decision is **revocable** at any time.

## 2. If NO (or "not now")

Record the decline and **tick the box** — a deliberate skip is *done*, not pending. Don't
nag; the user can enable it later, which un-ticks and re-runs this step.

## 3. If YES — pick the method (one question)

> "Which email should I track, and how do you want me to reach it? That depends on what's
> connected in your environment — for example a **Gmail connector**, another mail connector,
> or a manual **forward-the-relevant-emails** approach if you'd rather not connect an inbox."

Pick the **most privacy-preserving method that works** and that the user is comfortable with;
prefer a scoped read connector over broad access. If nothing is connected, the honest answer
is "no automated access is available yet" — record that and offer the manual forward path.

## 4. Test the access *(required when the user says yes)*

**Actually test it — don't assume the connector works.** Run a **minimal read-only probe**:
the connector's lightest read (list labels/folders, or one thread's metadata), never a bulk
search or download. Then report one of:

- ✅ **Access confirmed** — name the tool and what the probe returned at a high level. **Never
  paste email contents or third-party names** into the repo or the summary.
- ⚠️ **Connected but limited** — reachable, missing a scope tracking needs. State exactly
  what's missing so the user can fix it.
- ❌ **No access** — no tool available, or the probe failed/was denied. Say so; don't claim
  tracking will work.

**Never fabricate a successful test** (Golden Rule #2). If a connector prompt needs approval,
ask the user to approve it and re-run the probe; a declined prompt is ❌.

## Record

- `profile/preferences.md` → **Email access** = `granted (<method>)` or `declined`.
- `profile/decisions.md` → `## Email access (Step 5)`: decision + date, method/tool, the
  honest **test result** (✅/⚠️/❌ + one line), and any follow-up TODO ("grant read scope",
  "forward offer emails manually").

Future sessions read the setting before touching email: `declined` → don't offer unless asked;
`granted` + ✅ → reconcile applications from the inbox (aliasing third parties); ⚠️/❌ →
surface the blocker rather than silently failing.

## Done when

- [ ] The opt-in question was asked with read-only / never-send / revocable made explicit.
- [ ] The decision **and** method are in `preferences.md` + `decisions.md`.
- [ ] **If yes:** a minimal read-only access test ran and the honest result is recorded —
      never a fabricated success.
- [ ] No email contents or third-party names were written into the repo.

Tick Step 5 in [`../CHECKLIST.md`](../CHECKLIST.md) noting the decision + test result → next
is **Step 6 (LinkedIn export ingest)**.
