import { defineConfig } from "rolldown";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const banner = `/*!
 * Continuous Carousel 🎠 v0.3.0
 * Continuous carousel that uses vanilla JavaScript & CSS animations.
 * @author Jon Chretien
 * @license Released under the MIT license.
 */`;

export default defineConfig([
  // UMD build
  {
    input: "src/ContinuousCarousel.js",
    output: {
      dir: "dist",
      entryFileNames: "continuous-carousel.js",
      format: "umd",
      name: "ContinuousCarousel",
      banner,
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: "bundled",
        presets: [["@babel/preset-env", { modules: false }]],
      }),
    ],
  },
  // UMD minified
  {
    input: "src/ContinuousCarousel.js",
    output: {
      dir: "dist",
      entryFileNames: "continuous-carousel.min.js",
      format: "umd",
      name: "ContinuousCarousel",
      banner,
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: "bundled",
        presets: [["@babel/preset-env", { modules: false }]],
      }),
      terser({ format: { comments: /^!/ } }),
    ],
  },
  // ES module build
  {
    input: "src/ContinuousCarousel.js",
    output: {
      dir: "dist",
      entryFileNames: "continuous-carousel.esm.js",
      format: "esm",
      banner,
    },
    plugins: [resolve()],
  },
  // ES module minified
  {
    input: "src/ContinuousCarousel.js",
    output: {
      dir: "dist",
      entryFileNames: "continuous-carousel.esm.min.js",
      format: "esm",
      banner,
    },
    plugins: [resolve(), terser({ format: { comments: /^!/ } })],
  },
]);
