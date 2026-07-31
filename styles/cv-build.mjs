#!/usr/bin/env node
/**
 * cv-build — render a tailored CV to PDF *and* report its true length in one step.
 *
 * WHY THIS EXISTS: the naive loop is "render PDF → eyeball the image → guess a cut →
 * re-render", which can take a dozen rounds to land on 2 pages. The render was never the
 * problem; not knowing HOW MUCH to cut was. This wraps the exact same md-to-pdf call and
 * adds two things an agent cannot get from looking at a PDF:
 *
 *   1. The TRUE page count, read from the produced PDF (not an estimate, not an eyeball).
 *   2. If over budget: how many BULLET LINES to cut, plus a per-section height breakdown
 *      and the longest bullets, so the cut is targeted and lands in ONE pass.
 *
 * Usage:
 *   npm run cv:pdf -- applications/<company-role>/cv.md            # render + report
 *   npm run cv:pdf -- applications/<company-role>/cv.md --dry      # report only, no write
 *   npm run cv:pdf -- applications/<company-role>/cv.md --pages 1  # budget for 1 page
 *
 * Exit code 0 = within budget, 1 = over. Safe to chain in a script.
 */

import { mdToPdf } from 'md-to-pdf';
import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

// --- System Chrome (cross-platform) -------------------------------------------
// Puppeteer is pointed at the system Chrome rather than downloading its own — see
// styles/README.md, trap 2. Override with PUPPETEER_EXECUTABLE_PATH if Chrome lives
// somewhere unusual on this machine.
const CHROME_CANDIDATES = {
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ],
  linux: [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ],
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ],
};

function resolveChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  for (const p of CHROME_CANDIDATES[process.platform] ?? []) {
    if (fs.existsSync(p)) return p;
  }
  console.error(
    `\n  ✖ No system Chrome found for platform "${process.platform}".\n` +
      `    Install Google Chrome, or set PUPPETEER_EXECUTABLE_PATH to its binary.\n` +
      `    See styles/README.md → "System Chrome path (cross-platform)".\n`,
  );
  process.exit(2);
}

const CHROME = resolveChrome();
const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

// --- Calibration --------------------------------------------------------------
// These are NOT derived from the CSS @page box. md-to-pdf applies its own PDF margins, so
// a CSS-derived figure over-estimates. Calibrated against the default Blue theme: a 2-page
// CV measures <= ~1987px of DOM height, so the real ceiling sits at ~995px per page.
//
// RE-CALIBRATE if styles/cv.css margins/font-size change (e.g. after onboarding extracts
// the user's own theme), or if md-to-pdf is upgraded: render a CV, compare the reported
// "PDF pages" with the reported content height, and adjust PAGE_PX until they agree.
const PAGE_PX = 995;
const SAFETY = 0.99; // land just inside the ceiling, not on it
const LINE_PX = 16; // 10pt type, line-height 1.2 => 12pt => 16px @96dpi
const BULLET_PX = LINE_PX + 3; // + li margin 1.5px top/bottom
const MM_TO_PX = 96 / 25.4;
const CONTENT_W = Math.round((210 - 11 - 11) * MM_TO_PX); // A4 minus ~11mm side margins

const args = process.argv.slice(2);
const mdPath = args.find((a) => !a.startsWith('--') && a.endsWith('.md'));
const dryRun = args.includes('--dry');
const pagesIdx = args.indexOf('--pages');
const targetPages = pagesIdx !== -1 ? Number(args[pagesIdx + 1]) : 2;

if (!mdPath) {
  console.error('usage: npm run cv:pdf -- <path/to/cv.md> [--pages 2] [--dry]');
  process.exit(2);
}

const absMd = path.resolve(mdPath);
const dest = absMd.replace(/\.md$/, '.pdf');
const stylesheet = [path.join(repoRoot, 'styles/cv.css')];
const launch_options = { executablePath: CHROME };

// --- 1. Render through the real pipeline (identical to the raw cv:pdf command) --
const pdfResult = await mdToPdf({ path: absMd }, { stylesheet, launch_options });
if (!dryRun) fs.writeFileSync(dest, pdfResult.content);

// Ground truth: count pages in the bytes md-to-pdf actually produced.
const actualPages = (pdfResult.content.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;

// --- 2. Measure the DOM to translate overflow into a concrete number of lines ---
const { content: html } = await mdToPdf({ path: absMd }, { stylesheet, as_html: true, launch_options });
const browser = await puppeteer.launch(launch_options);
const page = await browser.newPage();
await page.setViewport({ width: CONTENT_W, height: PAGE_PX });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);

const measured = await page.evaluate(() => {
  document.body.style.margin = '0';
  const sections = [];
  let current = { name: '(name & contact)', top: 0, bottom: 0, items: [] };
  for (const el of document.body.children) {
    const rect = el.getBoundingClientRect();
    const bottom = rect.bottom + parseFloat(getComputedStyle(el).marginBottom || 0);
    if (el.tagName === 'H2') {
      sections.push(current);
      current = { name: el.textContent.trim(), top: rect.top, bottom, items: [] };
    }
    current.bottom = Math.max(current.bottom, bottom);
    if (el.tagName === 'UL') {
      for (const li of el.children) {
        current.items.push({ text: li.textContent.trim().slice(0, 64), h: li.getBoundingClientRect().height });
      }
    }
  }
  sections.push(current);
  return { total: document.body.scrollHeight, sections };
});
await browser.close();

// --- 3. Report ----------------------------------------------------------------
const budget = PAGE_PX * targetPages * SAFETY;
const overPx = measured.total - budget;
const overLines = Math.ceil(Math.abs(overPx) / BULLET_PX);
// The PDF's own page count is ground truth. The budget is advisory only — it exists to warn
// when a CV sits so close to the boundary that any later edit will tip it over.
const fits = actualPages <= targetPages;
const tight = fits && overPx > 0;
const rel = path.relative(repoRoot, absMd);

console.log(`\n  ${rel}${dryRun ? '  (dry run — no PDF written)' : `\n  → ${path.relative(repoRoot, dest)}`}`);
console.log(`  ${'─'.repeat(68)}`);
console.log(`  PDF pages: ${actualPages}  (target ${targetPages})`);
console.log(`  content ${Math.round(measured.total)}px  ·  budget ${Math.round(budget)}px  (${PAGE_PX}px/page, calibrated)`);
console.log('');

if (fits && !tight) {
  console.log(`  ✅ FITS ${actualPages} page(s) — ~${overLines} bullet lines of headroom.\n`);
  process.exit(0);
}
if (tight) {
  console.log(
    `  ⚠️  FITS ${actualPages} page(s), but only just — ${Math.round(overPx)}px past the safe\n` +
      `      budget. Any later edit may tip it to ${actualPages + 1}. Trim ~${overLines} bullet line(s)\n` +
      `      for margin, or accept it as-is.\n`,
  );
  process.exit(0);
}

console.log(`  ❌ OVER — CUT ~${overLines} BULLET LINES (${Math.round(overPx)}px).\n`);
console.log('  Where the weight is:');
const bar = (px) => '█'.repeat(Math.max(1, Math.round(px / 40)));
for (const s of [...measured.sections].sort((a, b) => b.bottom - b.top - (a.bottom - a.top))) {
  const h = s.bottom - s.top;
  if (h > 0) console.log(`    ${String(Math.round(h)).padStart(5)}px ${bar(h)} ${s.name}`);
}
const longest = measured.sections
  .flatMap((s) => s.items)
  .sort((a, b) => b.h - a.h)
  .slice(0, 6);
console.log('\n  Longest bullets — trimming each by one wrapped line is the cheapest cut:');
for (const i of longest) console.log(`    ${String(Math.round(i.h / BULLET_PX)).padStart(2)} ln  ${i.text}…`);
console.log('');
process.exit(1);
