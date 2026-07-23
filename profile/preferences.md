# preferences.md — Durable user choices (settings + decision log)

This is the **single home for every choice the user makes during onboarding and beyond** —
git-save mode, CV theme, email-access, the negotiated CV structure, and so on. It is the
repo's memory of *what the user chose* so **future sessions read it and never re-ask** (per
CLAUDE.md Golden Rule #8: the repo is the source of truth, not agent memory).

**Read this file at the start of every session** (CLAUDE.md §0 points here). Two parts:

1. **Current settings** — the live values, in one table an agent can scan at a glance. This is
   the authoritative source for these values (e.g. the Git-save policy in CLAUDE.md §4 reads
   its mode from here, not from an inline value).
2. **Decision log** — the *why/when* behind each choice (rationale, access-test results,
   negotiated structure). Onboarding steps append their record here.

> Contains **no third-party personal data.** When a decision involves email or contacts,
> record the choice and method only — never store email contents or a third party's real name.

---

## Current settings

| Setting | Value | Set by | Notes |
|---|---|---|---|
| **Git-save mode** | `TODO(onboarding): auto-commit-and-push \| manual` *(default: auto-commit-and-push)* | Step 1 (git-save) | Always confirm-before-push in **both** modes — see CLAUDE.md §4. |
| **Git remote** | `TODO(onboarding): configured \| none (commit locally only)` | Step 1 (git-save) | If none, pushes are on hold until a remote is added. |
| **CV theme** | `blue` *(default)* | Step 3 (style) | `blue` or `extracted-from-cv`; drives `styles/cv.css`. |
| **CV structure** | `TODO(onboarding)` | Step 2 (CV intake) | The negotiated section set for the user's discipline/level. |
| **Email access** | `TODO(onboarding): granted (method) \| declined` | Step 5 (email) | Read-only; method + access-test result logged below. |

<!-- Add a row when a new durable setting is introduced. Keep values terse; put the reasoning
     in the Decision log below. -->

---

## Decision log

Onboarding steps append their sections below (each starts with the decision and the date it
was recorded). Until a step runs, its section is simply absent.

<!-- e.g.: Git-save (Step 1), CV structure (Step 2), CV style (Step 3), Email access (Step 5),
     LinkedIn ingest (Step 6), Company fit (Step 7), Story elicitation (Step 9). -->
