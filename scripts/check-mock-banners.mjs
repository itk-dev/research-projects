#!/usr/bin/env node
/*
 * Verifies that every prototype HTML file under docs/public/projects/
 * loads the shared mock-banner script. Fails CI when a new mock forgets
 * the banner.
 *
 * Add a project relative path to ALLOWLIST when a deliberate alternative
 * banner is used (e.g. deltag-aarhus mimics the real aarhus.dk staging
 * banner and intentionally diverges).
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PROJECTS_DIR = join(ROOT, 'docs/public/projects');
const REQUIRED_MARKER = 'mock-banner.js';

const ALLOWLIST = new Set([
  'docs/public/projects/deltag-aarhus/mocks/index.html',
]);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      yield full;
    }
  }
}

const failures = [];
for await (const file of walk(PROJECTS_DIR)) {
  const rel = relative(ROOT, file);
  if (ALLOWLIST.has(rel)) continue;
  const html = await readFile(file, 'utf8');
  if (!html.includes(REQUIRED_MARKER)) {
    failures.push(rel);
  }
}

if (failures.length > 0) {
  console.error('Missing shared mock-banner script in:');
  for (const f of failures) console.error(`  - ${f}`);
  console.error('');
  console.error('Add to <head>:');
  console.error('  <link rel="stylesheet" href="/research-projects/design-system/v1/mock-banner.css">');
  console.error('  <script src="/research-projects/design-system/v1/mock-banner.js" defer></script>');
  console.error('');
  console.error('Or, if the prototype intentionally uses a different banner,');
  console.error('add its path to ALLOWLIST in scripts/check-mock-banners.mjs.');
  process.exit(1);
}

console.log('All prototype HTML files reference the shared mock-banner.');
