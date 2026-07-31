# decisions.md — Why each setting is what it is (read on demand)

The companion to [`preferences.md`](preferences.md). That file holds the **values** and is
read every session; this one holds the **reasoning** — when a choice was made, why, what was
tested, what was ruled out — and is read only when a decision is being revisited, redone, or
questioned.

**Split on purpose:** the settings table is in every session's context, so it has to stay
small. Rationale grows without bound (access-test results, negotiated CV structure, comp
reasoning, house-rule debates) and would otherwise tax every single prompt.

## How to write here

- One `##` section per decision, in the order steps run. A section is **absent** until its
  step runs — don't pre-create empty ones.
- Start each with the decision and the date it was recorded (`YYYY-MM-DD`, absolute — convert
  "last week" before writing).
- When a setting **changes**, don't overwrite: append a dated line under its section saying
  what changed and why, and update the value in `preferences.md`.
- **No third-party personal data** (Golden Rule #9) — record methods and roles, never names,
  and never message contents.

## Template for a section

```markdown
## <Setting name> (Step N)
- **Decision:** <the value that went into preferences.md> — recorded YYYY-MM-DD
- **Why:** <the user's reasoning, in their terms>
- **Notes:** <access-test result, what was ruled out, anything a future session needs>
```

---

<!-- Onboarding steps append their sections below. -->
