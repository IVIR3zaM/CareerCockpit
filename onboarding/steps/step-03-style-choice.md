# Step 3 — CV style choice: Blue vs extract-from-your-CV (deep logic)

> Onboarding step doc. The one-line stub lives in [`../ONBOARDING.md`](../ONBOARDING.md)
> (Step 3); this is the full logic the agent follows. Obey the global onboarding
> invariants: **one step per re-prompt · one targeted question at a time · state in
> [`../CHECKLIST.md`](../CHECKLIST.md)**. This step decides the CV's *visual look only* — it
> does not touch content or `profile/`.

---

## Purpose

Pick the theme every tailored-CV PDF will use. Two options:

1. **Keep the built-in default Blue theme** (already shipped in
   [`../../styles/cv.css`](../../styles/cv.css)) — nothing to do but record the choice.
2. **Extract the style from the user's own CV** — pull the fonts, colors, spacing, and
   margins out of *their* CV and rewrite `cv.css` so generated PDFs match the document they
   already use.

The heading→CSS *contract* never changes either way (see
[`../../styles/README.md`](../../styles/README.md) and the top of
[`../../templates/cv-template.md`](../../templates/cv-template.md)) — only the **values**
(colors, font stack, sizes, margins) change. Never rename a selector; the template stops
rendering if you do.

---

## Inputs

- The **default Blue** theme, already in `styles/cv.css` (name + section headings
  `#1a56db`, `#333` role titles, `#666` companies/sub-headers, `#808080` headline,
  `#1155cc` links, Roboto, A4 with ~11 mm side margins).
- **If extraction is chosen:** the user's CV **as a PDF** (styling can only be read reliably
  from a rendered document, not from Markdown/plain text). The CV text was already provided
  in Step 2 and may be stashed at `onboarding/cv-source.md`, but that stash is *text* — for
  style you need the original **PDF** (or another rendered form). Ask for the PDF path if you
  don't have it.

---

## The flow

### 1. Offer the two options (one question)
Show the user what "Blue" looks like and let them choose. Offer to render a one-page sample
so the choice is concrete rather than abstract:

> "For the look of your generated CVs you've got two options:
> **(a) keep the built-in Blue theme** — clean, neutral, blue headings on Roboto (I can
> render a quick sample so you can see it), or
> **(b) I extract the style from your own CV** — fonts, colors, spacing, and margins — so
> every PDF I generate matches the CV you already use.
> Which would you like?"

- To render the **Blue sample**, run the pipeline (`npm run cv:pdf -- …`, see
  [`../../styles/README.md`](../../styles/README.md)) on
  [`../../templates/cv-template.md`](../../templates/cv-template.md) or a tiny throwaway
  `cv.md` in the user's clone, then Read the PDF back to confirm it's ~1 page, blue
  headings, Roboto. Delete the throwaway afterward. (The agent runs
  `PUPPETEER_SKIP_DOWNLOAD=1 npm install` automatically on first render — never ask the user
  to touch a terminal.)

Wait for the answer before doing anything else.

### 2a. If they choose **Blue** — record and finish
Nothing to change in `cv.css`. Record the decision (see *Outputs*) and tick the box.

### 2b. If they choose **extract-from-my-CV** — extract, then rewrite `cv.css`
Do this **programmatically, not by eyeballing** — the whole point is fidelity to their real
document.

1. **Get the CV as a PDF.** If you only have text so far, ask (one question) for the PDF
   path: *"To match your CV's look I need the original as a PDF — what's the path to it?"*
2. **Extract the visual attributes** from the PDF (use the `pdf` skill / a PDF inspection
   tool to read font, color, and layout metadata — don't guess from a screenshot):
   - **Fonts** — the family used for the name, for headings, and for body; weights in play
     (light/regular/medium/bold). Map to the closest widely-available web font (import via
     `@import url('https://fonts.googleapis.com/...')`, same mechanism the Blue theme uses).
     If the exact font isn't freely available, pick the nearest safe fallback and **tell the
     user** what you substituted.
   - **Colors** — the accent/name color, section-heading color, role-title color, company /
     muted color, headline color, link color. Capture as hex.
   - **Spacing & margins** — page size (A4/Letter), side/top/bottom margins, line height,
     the gap above section headings.
   - **Type sizes** — name, section heading, role title, body, in points.
3. **Rewrite `styles/cv.css`** by editing **only the values** — the `:root` custom
   properties (`--accent`, `--title`, `--muted`, `--subtitle`, `--link`, `--font-body`), the
   `@page` margins, and the font-size/weight numbers on `h1`–`h4`/`body`. **Do not touch the
   selector names or the heading→CSS contract.** Update the header comment block at the top
   of `cv.css` to describe the *extracted* theme instead of the default Blue (so the file
   still documents its own look).
4. **Render and verify.** Run the pipeline on the template (or a small sample), Read the PDF
   back, and confirm it now resembles the user's CV — right accent color, right font, ~1–2
   pages, no broken layout. If a value looks off, re-extract that attribute and re-render;
   iterate until it matches.
5. **Confirm with the user** (end-of-step batch is allowed here): show them the rendered
   sample and ask *"Does this match your CV's look? Anything to adjust — color, font, spacing?"*
   Adjust `cv.css` values on feedback until they're happy.

> **Privacy note.** The sample you render for verification uses the *template's* placeholder
> content or a throwaway file — never build the sample from the user's real profile facts
> just to check styling, and delete any throwaway `cv.md`/`cv.pdf` you created for the
> preview. (Real generated CVs come later, in the application workflow.)

---

## Outputs

1. **The decision recorded** to the durable, committed file the other steps read:
   **`profile/preferences.md`** (create if missing; append a "CV style" section). Record:
   - `blue` (kept the default) **or** `extracted-from-cv`;
   - if extracted: a short note of what was pulled (font family + any substitution, accent
     color hex, page size/margins) so a future session knows `cv.css` is customized and why.
2. **`styles/cv.css`** — unchanged if Blue; rewritten (values only) if extracted.

Both `preferences.md` and the user's `cv.css` are their own runtime data. This step doc and
the *default* `cv.css` are generic and ship with the product; the user's extracted values do
not "ship" — they live only in that user's clone.

---

## Redo / change later
If the user later says "change my CV style" / "go back to Blue", **un-tick Step 3** in
[`../CHECKLIST.md`](../CHECKLIST.md), re-run this step, and re-tick it. Reverting to Blue
means restoring the default `cv.css` (it's in git history — `git checkout` the shipped
version) and updating `preferences.md` back to `blue`.

---

## Done-criteria (tick the box when all true)

- [ ] The user was offered **Blue vs extract-from-your-CV** and chose one.
- [ ] If extraction was chosen: `styles/cv.css` was rewritten (values only, contract intact)
      and a render was verified to match the user's CV; if Blue: `cv.css` is left as shipped.
- [ ] The choice is written to `profile/preferences.md`.

Then tick Step 3 in [`../CHECKLIST.md`](../CHECKLIST.md), note the choice (`blue` /
`extracted`) in its notes cell, and tell the user to re-prompt with **"continue
onboarding"** — next is **Step 4 (populate `profile/` from the CV)**.
