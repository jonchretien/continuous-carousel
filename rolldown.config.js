import { defineConfig } from "rolldown";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

const banner = `/*!
 * Continuous Carousel 🎠 v0.4.0
 * Continuous carousel that uses vanilla JavaScript & CSS animations.
 * @author Jon Chretien
 * @license Released under the MIT license.
 */`;

// UMD build
const umd = defineConfig({
  input: "src/ContinuousCarousel.js",
  output: {
    dir: "dist",
    entryFileNames: "continuous-carousel.js",
    format: "umd",
    name: "ContinuousCarousel",
    banner,
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: [["@babel/preset-env", { modules: false }]],
    }),
  ],
});

// UMD minified
const umdMin = defineConfig({
  input: "src/ContinuousCarousel.js",
  output: {
    dir: "dist",
    entryFileNames: "continuous-carousel.min.js",
    format: "umd",
    name: "ContinuousCarousel",
    banner,
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: [["@babel/preset-env", { modules: false }]],
    }),
    terser({ format: { comments: /^!/ } }),
  ],
});

// ES module build
const esm = defineConfig({
  input: "src/ContinuousCarousel.js",
  output: {
    dir: "dist",
    entryFileNames: "continuous-carousel.esm.js",
    format: "esm",
    banner,
  },
  plugins: [],
});

// ES module minified
const esmMin = defineConfig({
  input: "src/ContinuousCarousel.js",
  output: {
    dir: "dist",
    entryFileNames: "continuous-carousel.esm.min.js",
    format: "esm",
    banner,
  },
  plugins: [terser({ format: { comments: /^!/ } })],
});

export default [umd, umdMin, esm, esmMin];
