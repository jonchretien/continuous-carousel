#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { rolldown } from "rolldown";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

const { version } = JSON.parse(readFileSync("./package.json", "utf8"));

const banner = `/*!
 * Continuous Carousel 🎠 v${version}
 * Continuous carousel that uses vanilla JavaScript & CSS animations.
 * @author Jon Chretien
 * @license Released under the MIT license.
 */`;

const input = "src/ContinuousCarousel.js";
const name = process.argv[2];

const configs = {
  umd: {
    input,
    output: { dir: "dist", entryFileNames: "continuous-carousel.js", format: "umd", name: "ContinuousCarousel", banner },
    plugins: [babel({ babelHelpers: "bundled", presets: [["@babel/preset-env", { modules: false }]] })],
  },
  "umd-min": {
    input,
    output: { dir: "dist", entryFileNames: "continuous-carousel.min.js", format: "umd", name: "ContinuousCarousel", banner },
    plugins: [babel({ babelHelpers: "bundled", presets: [["@babel/preset-env", { modules: false }]] }), terser({ format: { comments: /^!/ } })],
  },
  esm: {
    input,
    output: { dir: "dist", entryFileNames: "continuous-carousel.esm.js", format: "esm", banner },
    plugins: [],
  },
  "esm-min": {
    input,
    output: { dir: "dist", entryFileNames: "continuous-carousel.esm.min.js", format: "esm", banner },
    plugins: [terser({ format: { comments: /^!/ } })],
  },
};

const config = configs[name];
if (!config) {
  console.error(`Unknown build: ${name}`);
  process.exit(1);
}

const build = await rolldown(config);
await build.write(config.output);
await build.close();
console.log(`✔ ${name}`);
