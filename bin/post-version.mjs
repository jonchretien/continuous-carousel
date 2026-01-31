#!/usr/bin/env node

/**
 * Post-version script: updates docs nav version, scaffolds changelog entries,
 * and adds comparison links. Runs automatically via `npm version` postversion hook.
 *
 * Usage: node bin/post-version.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const version = pkg.version;
const today = new Date().toISOString().slice(0, 10);

// 1. Update docs nav version in config.mjs
const configPath = resolve(root, "docs/.vitepress/config.mjs");
let config = readFileSync(configPath, "utf8");
config = config.replace(/text:\s*"v[\d.]+"/m, `text: "v${version}"`);
writeFileSync(configPath, config);
console.log(`Updated docs nav → v${version}`);

// 2. Scaffold changelog entry in both files
const changelogFiles = [
  resolve(root, "CHANGELOG.md"),
  resolve(root, "docs/changelog.md"),
];

const scaffold = `## [${version}] - ${today}

### Added
- _TODO_

### Changed
- _TODO_

---

`;

for (const file of changelogFiles) {
  let content = readFileSync(file, "utf8");

  // Skip if entry for this version already exists
  if (content.includes(`## [${version}]`)) {
    console.log(`${file.replace(root + "/", "")} already has v${version} entry, skipping`);
    continue;
  }

  // Insert new entry before the first existing ## entry
  const firstEntry = content.indexOf("\n## [");
  if (firstEntry !== -1) {
    content =
      content.slice(0, firstEntry + 1) +
      scaffold +
      content.slice(firstEntry + 1);
  }

  // Find previous version from the second ## entry
  const entries = [...content.matchAll(/^## \[(\d+\.\d+\.\d+)\]/gm)];
  const prevVersion = entries.length >= 2 ? entries[1][1] : null;

  // Add comparison link
  const linkLine = `[${version}]: https://github.com/jonchretien/continuous-carousel/compare/v${prevVersion}...v${version}`;
  if (prevVersion && !content.includes(`[${version}]:`)) {
    // Insert before the first existing comparison link
    const firstLink = content.indexOf("\n[");
    if (firstLink !== -1) {
      content =
        content.slice(0, firstLink + 1) +
        linkLine +
        "\n" +
        content.slice(firstLink + 1);
    }
  }

  writeFileSync(file, content);
  console.log(`Updated ${file.replace(root + "/", "")}`);
}

console.log(`\nDone! Fill in the _TODO_ entries in CHANGELOG.md and docs/changelog.md.`);
