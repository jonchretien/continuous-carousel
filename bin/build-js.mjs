#!/usr/bin/env node

/**
 * Sequential build script to work around rolldown multi-config bug
 * where builds within the same process corrupt module resolution.
 * Each build runs in its own subprocess.
 */

import { execSync } from "node:child_process";

const builds = ["umd", "umd-min", "esm", "esm-min"];

for (const name of builds) {
  execSync(`node bin/build-one.mjs ${name}`, { stdio: "inherit" });
}
