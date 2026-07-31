# preferences.md — Current settings (read this every session)

The user's durable choices as **values only**. This file is loaded at the start of every
session, so it is deliberately kept to one scannable table — **the reasoning, dates, and
access-test results live in [`decisions.md`](decisions.md)**, which is read only when a
decision needs revisiting.

**This table is authoritative** for these values (e.g. `CLAUDE.md` §4 reads the git-save mode
from here). Per Golden Rule #8, the repo is the source of truth — never agent memory.

| Setting | Value | Set by |
|---|---|---|
| **Git-save mode** | `TODO(onboarding): auto-commit-and-push \| manual` *(default: auto)* | Step 1 |
| **Git remote** | `TODO(onboarding): configured \| none (commit locally only)` | Step 1 |
| **CV structure** | `TODO(onboarding)` | Step 2 |
| **Discipline / level** | `TODO(onboarding)` *(e.g. senior IC software, staff, EM, head of design)* | Step 2 |
| **Manages people** | `TODO(onboarding): yes \| no` | Step 2 |
| **CV theme** | `blue` *(default)* — `blue` \| `extracted-from-cv` | Step 3 |
| **Email access** | `TODO(onboarding): granted (method) \| declined` | Step 5 |
| **Comp floor** | `TODO(user): hard floor on base + any flex band` | Step 7 |
| **Target-role filter** | `TODO(user): levels/domains to pursue or rule out` | Step 7 |
| **Banned phrases** | *(default list in `CLAUDE.md` §4)* | Step 10 |

<!-- Add a row when a new durable setting is introduced. Values stay terse — one line, no
     rationale. Anything longer than a cell belongs in decisions.md. -->

> Contains **no third-party personal data.** For email or contacts, record the choice and
> method only — never message contents or a third party's real name.

**Why the settings matter to a workflow:** *Manages people* gates every people-leadership
question and story theme · *Comp floor* and *Target-role filter* drive the `new-application`
skill's pre-apply checks · *Discipline / level* drives the `interview-question-generator`
skill.
