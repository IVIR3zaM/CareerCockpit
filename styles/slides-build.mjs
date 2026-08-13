#!/usr/bin/env node
/**
 * slides-build — render a presentation HTML deck to a landscape-A4 PDF.
 *
 * Companion to cv-build.mjs, for decks the user PRESENTS (interview scenario
 * slides, etc.) rather than CVs. Same visual language — styles/slides.css
 * inherits the CV design tokens — but one .slide section per page, landscape.
 *
 * Usage:
 *   npm run slides:pdf -- applications/<company-role>/interview-prep/<deck>.html
 *
 * Input is HTML (one <section class="slide"> per page), not Markdown — decks need
 * per-slide layout that Markdown can't express.
 *
 * Reports the true page count and FAILS on any slide whose content overflows its
 * fixed box, so a clipped slide is caught here rather than in the room.
 */

import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

// --- System Chrome (cross-platform) -------------------------------------------
// Same resolution as cv-build.mjs — see styles/README.md, trap 2. Override with
// PUPPETEER_EXECUTABLE_PATH if Chrome lives somewhere unusual on this machine.
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

const src = process.argv[2];
if (!src) {
  console.error('usage: node styles/slides-build.mjs <path/to/deck.html>');
  process.exit(2);
}
const absHtml = path.resolve(src);
const dest = absHtml.replace(/\.html$/, '.pdf');

const browser = await puppeteer.launch({ executablePath: CHROME });
const page = await browser.newPage();
await page.goto(`file://${absHtml}`, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);

// Catch any slide whose content overflows its fixed 210mm-tall box.
const overflow = await page.evaluate(() =>
  [...document.querySelectorAll('.slide')]
    .map((s, i) => ({ i, over: Math.round(s.scrollHeight - s.clientHeight) }))
    .filter((s) => s.over > 1),
);

// Count slides from the DOM, not the source text. Matching `class="slide` in the raw
// file also matches the word inside HTML comments — and templates/slides-template.html
// documents the format in a comment block, so a deck started from the template would
// report phantom slides and fail the page-count check for no reason.
const slides = await page.evaluate(() => document.querySelectorAll('.slide').length);

const pdf = await page.pdf({
  path: dest,
  format: 'A4',
  landscape: true,
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();

const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;

console.log(`\n  ${path.relative(repoRoot, absHtml)}\n  → ${path.relative(repoRoot, dest)}`);
console.log(`  ${'─'.repeat(60)}`);
console.log(`  slides: ${slides}   PDF pages: ${pages}`);
if (overflow.length) {
  for (const o of overflow) console.log(`  ❌ slide ${o.i + 1} overflows by ${o.over}px — trim it`);
  process.exit(1);
}
if (pages !== slides) {
  console.log(`  ❌ page count != slide count — a slide is spilling onto a second page`);
  if (pages < slides) {
    // By far the most common cause, and it looks nothing like its cause: with no
    // stylesheet the slides lose their fixed height and page breaks, so the whole
    // deck collapses onto one or two pages.
    console.log(
      `     ↳ ${pages} page(s) for ${slides} slides usually means slides.css never loaded —\n` +
        `       check the <link href="…/styles/slides.css"> path is right for where this\n` +
        `       deck sits in the repo (a deck three levels down needs "../../../styles/…").`,
    );
  }
  process.exit(1);
}
console.log(`  ✅ one page per slide, nothing clipped.\n`);
