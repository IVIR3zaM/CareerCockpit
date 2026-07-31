# Step 3 — CV style choice: Blue vs extract-from-your-CV

**Purpose:** pick the theme every tailored-CV PDF uses — keep the built-in **Blue**
([`../../styles/cv.css`](../../styles/cv.css)), or **extract the style from the user's own
CV** so generated PDFs match the document they already use. Visual look only; no content, no
`profile/`.

**The heading→CSS contract never changes** either way (see
[`../../styles/README.md`](../../styles/README.md)) — only **values** (colors, fonts, sizes,
margins). Never rename a selector; the template stops rendering if you do.

**Inputs:** the shipped Blue theme; and, if extracting, the user's CV **as a PDF** — styling
can only be read reliably from a rendered document, not from the Step 2 text stash. Ask for
the PDF path if you don't have it.

## 1. Offer the two options (one question)

> "For the look of your generated CVs you've got two options:
> **(a) keep the built-in Blue theme** — clean, neutral, blue headings on Roboto (I can
> render a quick sample so you can see it), or
> **(b) I extract the style from your own CV** — fonts, colors, spacing, and margins — so
> every PDF I generate matches the CV you already use. Which would you like?"

To render the Blue sample, run `npm run cv:pdf -- <throwaway>.md` on the template or a tiny
throwaway file, Read the PDF back, then delete the throwaway. (The agent runs
`PUPPETEER_SKIP_DOWNLOAD=1 npm install` automatically on first render — never ask the user to
touch a terminal.) Wait for the answer before doing anything else.

## 2a. Blue → record and finish

Nothing changes in `cv.css`.

## 2b. Extract-from-my-CV → extract, then rewrite `cv.css`

Do this **programmatically, not by eyeballing** — fidelity to their real document is the
whole point.

1. **Get the PDF** (one question): *"To match your CV's look I need the original as a PDF —
   what's the path to it?"*
2. **Extract the visual attributes** with the `pdf` skill / a PDF inspection tool — read font,
   color, and layout metadata; don't guess from a screenshot:
   - **Fonts** — family for the name, headings, and body; weights in play. Map to the closest
     widely-available web font (`@import url('https://fonts.googleapis.com/…')`, same
     mechanism Blue uses). If the exact font isn't freely available, pick the nearest fallback
     and **tell the user what you substituted**.
   - **Colors** (hex) — accent/name, section heading, role title, company/muted, headline,
     link.
   - **Spacing & margins** — page size (A4/Letter), margins, line height, gap above section
     headings.
   - **Type sizes** — name, section heading, role title, body, in points.
3. **Rewrite `styles/cv.css` — values only:** the `:root` custom properties (`--accent`,
   `--title`, `--muted`, `--subtitle`, `--link`, `--font-body`), the `@page` margins, and the
   font-size/weight numbers on `h1`–`h4`/`body`. **Never touch selector names.** Update the
   header comment so the file still documents its own look.
4. **Render and verify.** Run the pipeline on the template or a small sample, Read the PDF
   back, confirm the accent color, font, and layout match. Re-extract and re-render any
   attribute that looks off.
5. **Confirm with the user** (end-of-step batch): show the sample and ask *"Does this match
   your CV's look? Anything to adjust — color, font, spacing?"*
6. **Re-calibrate the page budget** if margins or font sizes moved far from the default: see
   `PAGE_PX` in [`../../styles/cv-build.mjs`](../../styles/cv-build.mjs), which is commented
   with how.

> **Privacy:** render previews from the *template's* placeholder content or a throwaway file
> — never from the user's real profile facts just to check styling — and delete any throwaway
> `cv.md`/`cv.pdf` afterward.

## Record

- `profile/preferences.md` → **CV theme** = `blue` or `extracted-from-cv`.
- `profile/decisions.md` → `## CV style (Step 3)`; if extracted, note what was pulled (font
  family + any substitution, accent hex, page size/margins) so a future session knows
  `cv.css` is customized and why.

**Redo later** ("change my CV style" / "go back to Blue"): un-tick Step 3, re-run, re-tick.
Reverting to Blue means restoring the shipped `cv.css` (`git checkout` it from history) and
setting the theme back to `blue`.

## Done when

- [ ] The user was offered **Blue vs extract** and chose one.
- [ ] If extracted: `cv.css` rewritten (values only, contract intact) and a render verified
      against their CV; if Blue: `cv.css` left as shipped.
- [ ] The choice is in `preferences.md`.

Tick Step 3 in [`../CHECKLIST.md`](../CHECKLIST.md) noting the choice → next is **Step 4
(populate `profile/`)**.
