# System-Design Round — the framework

A reusable method for a 60-minute system-design interview, at IC-senior or engineering-lead
level. Generic by design: adapt the domain examples to whatever the target company builds.

> **⚠️ Read the format before you rehearse.** "System design" is not one round. Some are the
> classic *"design X for 10M users"*. Others are *"here is a real problem we already solved —
> work it with the low context you have"*, which grades **behaviour under missing information**
> (which questions come first, assumptions stated aloud, scope narrowed before designing, the
> willingness to say *"I'd need to know X before choosing"*) far more than the method below.
> Where the JD makes the role a *contributor to* rather than *owner of* technical decisions,
> solving it silently and correctly can score **worse** than reasoning openly.
> **Ask the recruiter which format it is before picking the drill.**

---

## The two habits this file exists to break

**Habit 1 — designing before dimensioning.** Boxes get drawn before the requirements and the
arithmetic exist. Numbers derived *after* a design can only validate it; they can never
*choose* it.

**Habit 2 — naming a mechanism instead of designing it.** *"We'd shard it"*, *"we'd add a
cache"*, *"we'd use a queue"* — a noun with no dimensions. The score comes from the level
*below* the noun: which key, why that key, what breaks, what it costs.

**If you remember nothing else: get the numbers on the board in the first ten minutes, and
never let a noun stand alone.**

---

## The clock (60-minute round)

Say the plan out loud at minute zero — it buys credit immediately and stops the interviewer
wondering whether requirements are coming.

> *"Let me take about ten minutes on requirements and rough numbers before I draw anything —
> I'd rather the scale pick the architecture than the other way round. Then I'll do the API
> contract, commit to a design, and go deep on storage and scale. Shout if you want me
> somewhere else."*

| Time | Phase | You must leave this phase with… |
|---|---|---|
| **0–06** | **1. Functional requirements** | 3–5 user stories, in-scope vs. explicitly out-of-scope |
| **06–12** | **2. NFRs + capacity math — ON THE BOARD** | QPS (avg + peak), storage/day and /year, payload size, latency target, availability target, retention |
| **12–20** | **3. API / user contract first** | 3–5 endpoints or events with real fields — the *consumer's* view |
| **20–32** | **4. High-level architecture — COMMIT** | One diagram, one chosen approach, alternative named and rejected out loud |
| **32–44** | **5. Data storage — go deep** | Engine + schema + partition key + hot path + index + retention |
| **44–54** | **6. Scale — go deep** | Shard key, replication mode, cache strategy, one failure mode walked |
| **54–60** | **7. Trade-offs + wrap** | What you'd cut, what you'd monitor, what you'd do with more time |

**Checkpoint at minute 12:** if there are no numbers on the board, the round is already going
wrong. Stop and do the math before drawing anything.

---

## Phase 2 — the NFR checklist: ask every one of these

| # | Ask | Why it changes the design |
|---|---|---|
| 1 | **Scale** — DAU/MAU, requests/sec, growth rate? | picks single-node vs. distributed |
| 2 | **Peak factor** — how spiky? (sale events, payday, lunch rush) | sizes headroom + autoscaling |
| 3 | **Latency** — p50/p99 target, per operation? | picks sync vs. async, cache vs. no cache |
| 4 | **Availability** — 99.9% vs. 99.99%? | picks multi-AZ vs. multi-region |
| 5 | **Consistency** — strong or eventual, and *where*? | the single biggest architectural fork |
| 6 | **Durability** — is losing one record acceptable? | if no → WAL, replication, idempotency |
| 7 | **Retention** ⭐ | how much data actually accumulates; TTL/archival tier |
| 8 | **Payload size** — bytes per record/request? | storage + bandwidth math |
| 9 | **Read:write ratio** | picks caching + replica strategy |
| 10 | **Multi-tenancy** ⭐ | shared vs. isolated, per-tenant limits, noisy neighbours |
| 11 | **Geography / data residency** ⭐ | regionalization, GDPR, cross-region latency |
| 12 | **Compliance** — audit trail, domain regulation? | shapes storage, logging, access |

⭐ = the three most commonly left vague, and the three most commonly cited in rejection
feedback. Volunteer them; don't wait to be asked.

**If the interviewer says "you tell me":** state an assumption *with a number* and move on.
*"I'll assume 10M DAU, 10:1 read:write, p99 under 200ms, 99.99%, and 7-year retention because
it's financial data. Stop me if any of that is wrong."* Never leave it undefined.

### The arithmetic — out loud, rounded aggressively

Interviewers want the *method*, not precision. Round to powers of ten.

**Constants worth memorising:**
- 1 day ≈ **86,400 s** → call it **10⁵**
- 1 million/day ≈ **12/s** · 1 billion/day ≈ **12,000/s**
- 1 year ≈ 31.5M s → call it **3×10⁷**
- Peak ≈ **2–3× average** (spiky consumer traffic: **5–10×**)

**Worked template — say it exactly like this:**

> *"10M DAU × 5 writes/day = 50M writes/day. Over ~10⁵ seconds that's **~500 writes/sec
> average**, and at 3× peak, **~1,500/sec**. Each record is ~1 KB, so 50M × 1 KB = **50 GB/day**
> → **~18 TB/year**, and with 7-year retention and 3× replication that's **~380 TB**. That's
> well past one node, so this is sharded from day one — which is why I'll pick a partition key
> before I draw anything."*

That last clause is the whole point: **the number chose the architecture, in front of them.**

**Ratios worth having ready:** a cache at 80–95% hit rate cuts DB read load ~10×; one commodity
node ≈ a few thousand simple QPS and ~10–100K rows/sec bulk; cross-region RTT ≈ 50–150 ms — so
never put a synchronous cross-region hop in a user-facing write path.

---

## Phase 3 — API / user contract FIRST

**Write the consumer's contract before drawing a single service box.** Sketching services
first is a frequently-cited rejection reason at lead level: it reads as *backend-service
thinking* rather than *user-centric modelling*, and it lets the design drift away from what
anyone actually needs. Endpoints or events, with real field names, real types, and the error
cases. The services then fall out of the contract instead of the contract being retrofitted
to the services.

---

## Phase 4 — COMMIT to one architecture

Weighing three options and picking none reads as indecision, not rigour. Say it in one
sentence: **"I'm committing to X. The alternative is Y — it wins on A, costs B. I'd revisit
if C."** Naming and *rejecting* the alternative out loud is the part that scores.

---

## Phase 6 — never stop at the word

Every mechanism gets its four follow-ups. This is the single most mechanical fix in the file.

**Sharding**
- **Shard key + why** — *"by `tenant_id`, because every read is tenant-scoped, so queries stay
  single-shard"*
- **Skew / hot shards** — what if one tenant is 30% of volume? → composite key, sub-sharding
- **Rebalancing** — consistent hashing with virtual nodes; how a shard splits without downtime
- **Cross-shard operations** — the query that spans shards, and how you avoid or handle it
  (scatter-gather, denormalization, saga instead of distributed transaction)

**Replication**
- **Topology** — leader-follower vs. multi-leader vs. leaderless
- **Sync or async** — and say the consequence: *sync = durability, costs write latency; async =
  fast writes, accepts a failover data window*
- **Read-your-writes** — how you avoid the stale-replica read straight after a write
- **Failover** — who promotes, how long, split-brain protection

**Caching**
- **What** (the hot path from Phase 5), **where** (client/CDN/edge/app/DB), **TTL**,
  **invalidation strategy**, **hit-rate assumption + what it saves**, **stampede protection**
  on expiry
- ⚠️ Never cache authorization state or balances without saying why it is safe

**Async / queues**
- Queue vs. log, **ordering** guarantees and partition key, **consumer lag** monitoring,
  **retries + DLQ**, **poison messages**, idempotent consumers

**Then walk ONE failure mode out loud.** Pick the scariest — *"the primary DB fails mid-write"*,
*"the downstream provider is down for 20 minutes"* — and narrate detection, blast radius,
degradation, recovery, and what the customer sees. **This is the lead-flavoured
differentiator:** an IC designs the happy path; a lead talks about what happens at 3am.

---

## Phase 7 — trade-offs + wrap

Never let the round end without all four. Their absence reads as a shallow design.

1. **"Here's what I'd cut for v1"** — the smallest thing that ships
2. **"Here's what I'd monitor"** — 3–4 SLIs tied to the Phase-2 NFRs (p99 latency, error rate,
   queue lag, saturation), plus what pages a human vs. what waits for morning
3. **"Here's the weakest part of this design"** — naming it yourself is a strength signal, not
   a confession
4. **"With more time I'd dig into…"** — shows you know what you skipped

---

## Anti-patterns

| ❌ Don't | ✅ Do |
|---|---|
| Draw boxes in the first 5 minutes | Requirements + numbers first, then draw |
| Do capacity math midway | Math in the first 12 minutes, and let it pick the design |
| Say "we'd store it in a database" | Engine + schema + partition key + hot path + retention |
| Say "we'd shard and replicate" | Shard key + skew + rebalancing + cross-shard; sync-vs-async + failover |
| Sketch services first | API/user contract first, services fall out of it |
| Weigh three options, pick none | Commit, justify with a number, name and reject the alternative |
| Leave multi-tenancy vague | Pick a model, state isolation + per-tenant limits |
| Leave global scale vague | Pick regionalization, state residency + failover |
| Wait to be asked about retention | Volunteer TTL/tiering/archival |
| Stay high-level to seem strategic | Depth *is* the strategic signal |

---

## Phrase bank — say these out loud

- *"Before I draw anything, let me get the requirements and rough numbers down."*
- *"That's ~1,500 writes/sec at peak and ~18 TB/year — so this is sharded from day one."*
- *"I'll start from the consumer's API contract and let the services fall out of it."*
- *"I'm committing to X. The alternative is Y — it wins on A, costs B. I'd revisit if C."*
- *"Let me go one level deeper on that rather than just naming it."*
- *"The trade-off I'm accepting here is ___, and I'd monitor it with ___."*
- *"The weakest part of this design is ___."*

---

## ⚠️ Rehearsal gate — MANDATORY before any design round

**Reading this file is not the fix.** This round is lost to *habit under time pressure*, and a
habit only changes by repetition. A candidate who has read the method and not rehearsed it
performs like a candidate who has not read it. Before any scheduled design round:

- [ ] **One full 60-minute timed dry run**, out loud, on a prompt in the target's domain —
      not a read-through, not a skim
- [ ] **Checkpoint:** numbers were on the board **by minute 12**
- [ ] **Checkpoint:** the **API contract** was written before any service box
- [ ] **Checkpoint:** an architecture was **committed to** in one sentence, with the
      alternative named and rejected
- [ ] **Checkpoint:** no bare nouns survived — every *shard / replicate / cache / queue* got
      its four follow-ups
- [ ] **Checkpoint:** retention/TTL was volunteered, not extracted
- [ ] One **failure mode** narrated end to end

If a full dry run isn't possible, run the **first 12 minutes** at minimum — that phase alone
accounts for the majority of the cited defects in this round type.

---

## Related

- `interviews/technical/coding-round-playbook.md` — the live-coding equivalent
- `interviews/hiring-manager/prep-checklist.md` row 20 — where this round is tracked in the
  coverage gate
- After any real design round, run the `interview-debrief` skill and fold the specific
  feedback back into this file. **Feedback on this round type is unusually concrete** — it
  names the phase that was missed — which makes it the highest-value thing to capture.
