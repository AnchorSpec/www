#!/usr/bin/env node
// Mirrors one step of the AnchorSpec release checklist ("Docs / www"):
// copies a rebranded docs/ folder into src/docs/v{version}/ and updates the
// VERSIONS array + redirect that reference it. Used by
// .github/workflows/sync-docs.yml, and safe to run by hand to backfill a
// version that was missed.
//
// Usage: node scripts/add-doc-version.mjs <version> <path-to-docs-dir>
// Example: node scripts/add-doc-version.mjs 1.4.0 ./anchorspec-src/docs

import { existsSync, cpSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const [, , version, srcDir] = process.argv;

if (!version || !srcDir) {
  console.error('Usage: add-doc-version.mjs <version> <path-to-docs-dir>');
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.error(`Expected a plain major.minor.patch version, got "${version}"`);
  process.exit(1);
}

if (!existsSync(srcDir)) {
  console.error(`Source docs dir not found: ${srcDir}`);
  process.exit(1);
}

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const versionTag = `v${version}`;
const destDir = path.join(root, 'src/docs', versionTag);

rmSync(destDir, { recursive: true, force: true });
cpSync(srcDir, destDir, { recursive: true });
console.log(`Copied ${srcDir} -> src/docs/${versionTag}`);

// --- Update the VERSIONS array in src/pages/docs/[version]/[slug].astro ---
const slugAstroPath = path.join(root, 'src/pages/docs/[version]/[slug].astro');
const slugAstro = readFileSync(slugAstroPath, 'utf8');

const versionsBlockRe = /const VERSIONS = \[[\s\S]*?\n\];/;
const match = slugAstro.match(versionsBlockRe);
if (!match) {
  console.error(`Could not find "const VERSIONS = [...]" block in ${slugAstroPath}`);
  process.exit(1);
}

const existingVersions = [...match[0].matchAll(/value: '(v[\d.]+)'/g)].map(m => m[1]);
const versions = [versionTag, ...existingVersions.filter(v => v !== versionTag)];

const versionsBlock =
  'const VERSIONS = [\n' +
  versions
    .map((v, i) => `  { value: '${v}', label: '${i === 0 ? `latest (${v})` : v}' },`)
    .join('\n') +
  '\n];';

writeFileSync(slugAstroPath, slugAstro.replace(versionsBlockRe, versionsBlock));
console.log(`Updated VERSIONS array in ${path.relative(root, slugAstroPath)}`);

// --- Update the redirect target in src/pages/docs/index.astro ---
const indexAstroPath = path.join(root, 'src/pages/docs/index.astro');
const indexAstro = readFileSync(indexAstroPath, 'utf8');
const redirectRe = /docs\/v[\d.]+\/getting-started/;
if (!redirectRe.test(indexAstro)) {
  console.error(`Could not find docs redirect target in ${indexAstroPath}`);
  process.exit(1);
}
writeFileSync(indexAstroPath, indexAstro.replace(redirectRe, `docs/${versionTag}/getting-started`));
console.log(`Updated redirect in ${path.relative(root, indexAstroPath)}`);
