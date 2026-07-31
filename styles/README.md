# CV Styling & PDF Pipeline

Tailored CVs are Markdown (`applications/<...>/cv.md`) rendered to PDF with a consistent
look controlled by [`cv.css`](cv.css). **To change appearance, edit the CSS — not the
content.**

> **The theme is Blue by default.** `cv.css` ships as a neutral **default Blue** theme:
> Roboto (Light 300 body, Regular 400 inline emphasis, Medium 500 dates, Bold 700
> headings), blue `#1a56db` name + light-weight section headings, `#333` role titles,
> `#666` company names and sub-headers, `#808080` headline, `#1155cc` underlined links,
> A4 with ~11 mm side margins, 1.2 line height.
>
> **Onboarding may replace it.** The onboarding style step offers two options: *keep the
> default Blue*, or *extract the style from the user's own CV*. If the user chooses
> extraction, the agent pulls the fonts, colors, spacing, and margins from their CV and
> rewrites `cv.css` to match — programmatically extracted, not eyeballed. Either way, the
> Markdown conventions the CSS depends on are documented at the top of
> `templates/cv-template.md`, and the heading→CSS contract must not change.

## ✅ THE command that works (agents: use this, don't improvise)

Dependencies are pinned in the repo's `package.json`. From the repo root:

```bash
# One-time per machine/checkout (fast — Chromium download is skipped on purpose):
PUPPETEER_SKIP_DOWNLOAD=1 npm install

# Render any CV (output lands next to the input as cv.pdf):
npm run cv:pdf -- applications/<company-role>/cv.md
```

> **Agent-run, never the user.** CareerCockpit is built for non-technical users too — the
> agent runs the one-time `PUPPETEER_SKIP_DOWNLOAD=1 npm install` **automatically on the
> first PDF render** (detect a missing `node_modules/` and install before invoking the
> render). Never ask the user to open a terminal or run install/render commands by hand.

### What `cv:pdf` does that a bare render doesn't — the page budget

`cv:pdf` runs [`cv-build.mjs`](cv-build.mjs), which makes the *same* md-to-pdf call and then
reports what you can't get from looking at a PDF:

```
  PDF pages: 3  (target 2)
  content 2180px  ·  budget 1970px  (995px/page, calibrated)

  ❌ OVER — CUT ~11 BULLET LINES (210px).
  Where the weight is:      … per-section height bars …
  Longest bullets — trimming each by one wrapped line is the cheapest cut: …
```

**This exists to kill the render-and-guess loop.** Without it, a 3-page CV turns into a dozen
"trim a bit, re-render, still 3 pages" rounds. The render was never the bottleneck — not
knowing *how much* to cut was. Read the output and make **one** targeted corrective pass.

- `--dry` reports without writing the PDF; `--pages 1` budgets for a one-pager.
- Exit code is `0` within budget, `1` over.
- **⚠️ Don't verify page count by `Read`ing the PDF** — asking for `pages: "1-2"` on a 3-page
  PDF silently returns 2 and looks like success. The `PDF pages:` line is ground truth.
- **Re-calibrate `PAGE_PX`** in `cv-build.mjs` if `cv.css` margins/font-size change (e.g.
  after onboarding extracts the user's own theme) or `md-to-pdf` is upgraded — the constant
  is commented with how.
- `npm run cv:pdf:raw -- <cv.md>` is the bare md-to-pdf escape hatch if the wrapper breaks.

After rendering, **verify**: Read the PDF and check it's ~1–2 pages with the right
design (blue headings, gray company names, Roboto — or the user's extracted theme).

### System Chrome path (cross-platform)

Puppeteer is pointed at the **system Chrome** rather than downloading its own (see trap 2).
`cv-build.mjs` **finds it automatically** — it probes the usual locations for the current
platform and exits with a clear message if none is found:

| OS | Typical Chrome path |
|---|---|
| macOS | `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` |
| Linux | `/usr/bin/google-chrome` (or `/usr/bin/chromium`) |
| Windows | `C:\Program Files\Google\Chrome\Application\chrome.exe` |

If Chrome lives somewhere unusual, set `PUPPETEER_EXECUTABLE_PATH` — the script honors it
over its own probing. (The `cv:pdf:raw` fallback script still has the macOS path hard-coded;
edit it if you use that escape hatch on Linux or Windows.)

### Why it's set up this way — the traps that break naive attempts

Every one of these was hit for real. If you change the setup, re-test against them:

1. **`npx md-to-pdf` FAILS — don't use it.** md-to-pdf declares a loose peer range, so
   npm resolves puppeteer to ≥22, which is **ESM-only** and crashes md-to-pdf's CJS
   `require("puppeteer")` with `ERR_REQUIRE_ESM`. This happens both with a stale npx
   cache and with a fresh `npx --yes md-to-pdf@5.2.4`. The fix is the repo-local
   install with **puppeteer pinned to 21.11.0** (last CJS-compatible major, works on
   Node 18) via `devDependencies` + `overrides` in `package.json`.
2. **Puppeteer's own Chromium is unreliable here** — the bundled-browser launch failed
   (`Failed to launch the browser process`), and downloading it is slow anyway. We
   skip the download (`PUPPETEER_SKIP_DOWNLOAD=1` at install) and point puppeteer at
   the **system Chrome** via `PUPPETEER_EXECUTABLE_PATH` (baked into the npm script; see
   the cross-platform table above).
3. **Pandoc alone is not a fallback** — even where `pandoc` is installed, it has no
   usable PDF engine unless `weasyprint`/`wkhtmltopdf` are installed, and LaTeX engines
   ignore `cv.css` entirely. If md-to-pdf is ever unusable, the correct fallback is
   the same idea by hand: `pandoc cv.md -s -t html5 --css=styles/cv.css -o /tmp/cv.html`
   then Chrome headless: `"<system Chrome path>" --headless
   --print-to-pdf=cv.pdf --no-pdf-header-footer /tmp/cv.html`.
4. **Don't "fix" a broken render by switching tools** — the CSS `@page` rules, fonts,
   and heading selectors are tuned for Chrome's print engine (which is what md-to-pdf
   uses). A different engine will produce a different-looking CV, which violates the
   one-design rule above.

## Conventions that keep every CV consistent

- Use standard Markdown headings (`#`, `##`, `###`) exactly as in
  `templates/cv-template.md` — the CSS depends on them.
- Bullets for achievements; **bold** for emphasis; avoid raw HTML.
- Keep to 1–2 pages of content.
- Themes (font, colors, spacing) are all in `cv.css` — one place to restyle everything.
- Output `cv.pdf` sits next to its `cv.md` and **is committed** (deliverable, not build
  output); `node_modules/` is git-ignored.
