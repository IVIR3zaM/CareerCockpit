<!--
Canonical CV structure. Copy into applications/<...>/cv.md and fill from profile/,
tailored to the JD. Styled by styles/cv.css (default Blue theme; onboarding may replace
it by extracting your own CV's style). Keep clean Markdown.

Heading/inline conventions → CSS mapping (don't deviate, the CSS depends on them):
  #  Name *| Headline*                 → accent bold name + gray headline, one line
  ## Section                           → accent LIGHT 10pt (Personal Summary, …)
  ### Title @ *Company (Location)* · **Month YYYY – Month YYYY**
                                       → bold #333 title / gray company / medium dates
  #### Sub-header                      → bold #666 group header inside a role
  > Tech Stack: **stack**              → blockquote = the 11pt tech-stack line
  **bold** inside a bullet             → Regular-weight emphasis (not heavy)
  *italics* inside a skills bullet     → gray value text

SECTIONS ARE DISCIPLINE/LEVEL-DEPENDENT: use "Leadership Focus" only if you manage people;
use "Selected Work" / "Portfolio" for design/IC roles; keep only what fits and delete the
rest. Never import a section a JD implies but your profile/ can't back.

COMPRESSION IS A PER-JD DECISION (agent's call, `tailored-cv` skill): the roles that best
match THIS JD get the full treatment (sub-headers, 5–8 bullets); weaker matches get
2–4 bullets, no sub-headers; oldest/irrelevant roles collapse into the single
"Earlier Roles" block. Never a fixed scheme — re-decide per JD. Order is ALWAYS
reverse-chronological with no date gaps.
-->

# {Full Name} *| {Headline}*

<!-- End each contact line with a backslash — hard line break, or the lines merge. -->
{Location}\
**Mobile**: {phone} · **E-mail**: {email}\
**LinkedIn**: [{url}]({url}) · **Github/Portfolio**: [{url}]({url})

## Personal Summary

{2–3 sentences, tailored to this JD's top priorities. **Bold** the key phrases.}

{Second short paragraph: track record, tuned to the JD.}

## {Leadership Focus / Selected Work / Highlights}

- {3–4 bullets total, re-ranked per JD; bold the payload phrase}

## Work Experience

### {Title} @ *{Company} ({City}, {Country})* · **{Month YYYY} – {Month YYYY or Present}**

{One-line company description.}

> Tech Stack: **{comma-separated stack, re-ordered so JD-relevant tech comes first}**

#### {Grouped sub-header, e.g. "Leadership & Platform Impact" or "Selected Projects"}
- {Quantified, JD-relevant achievement. **Bold** the key result.}
- {…}

#### {Second group}
- {…}

<!-- A role with an internal promotion keeps ONE entry, full date range, with the
     progression named in the title — dates must match your record:
### {Junior Title} → {Senior Title} @ *{Company} ({City}, {Country})* · **{Month YYYY} – {Month YYYY}**
     …then use #### sub-headers to separate the phases. -->

### {Title} @ *{Company} ({City}, {Country})* · **{Month YYYY} – {Month YYYY}**
<!-- Less-relevant roles: condense — drop the sub-headers, keep 2–4 bullets. -->
- {Condensed bullet.}

### Earlier Roles ({YYYY} – {YYYY})
**{Title}** @ *{Company}* ({City}, {Country})\
**{Title}** @ *{Company}* ({City}, {Country})
- {Aggregate impact bullet across the early roles.}

## Professional Development

**{Cert / workshop}** @ *{Issuer}* ({format}) **{Month YYYY}** {link}: {optional one-line takeaway.}

## Skills

- **{Category}:** *{…}*
- **{Category}:** *{…}*

## Education

**{Degree}** @ *{Institution}* ({Location}) **{Month YYYY}**
{Optional one-line note.}
