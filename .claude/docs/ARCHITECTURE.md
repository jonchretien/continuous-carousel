# Architecture

## Source Structure

```
src/
├── ContinuousCarousel.js       # Main ES6 class (exposed via factory function)
├── constants.js                # Configuration constants
├── animation/
│   ├── AnimationController.js  # rAF-based animation
│   └── TransformStrategy.js    # Strategy pattern for H/V transforms
├── observers/
│   ├── VisibilityObserver.js   # IntersectionObserver for pause when off-screen
│   └── ResizeHandler.js        # ResizeObserver for responsive recalculation
└── utils/
    ├── dom.js                  # DOM manipulation helpers
    └── validation.js           # Input validation
```

## Build System

**Tool:** Rolldown (Rust-based, Rollup-compatible)

**Outputs:**
- `dist/continuous-carousel.js` - UMD (transpiled ES5)
- `dist/continuous-carousel.min.js` - UMD minified
- `dist/continuous-carousel.esm.js` - ES6 modules
- `dist/continuous-carousel.esm.min.js` - ES6 minified
- `dist/continuous-carousel.min.css` - Minified CSS

**Critical build files:**
- `rolldown.config.js` - Build configuration (used by watch mode)
- `bin/build-js.mjs` - Sequential build script (production)
- `bin/build-one.mjs` - Single-config build worker

## Documentation Site

VitePress-powered docs in `docs/`. See `docs/.vitepress/config.mjs` for sidebar/nav config and `docs/.vitepress/components/CarouselDemo.vue` for live demo component.

## GitHub Pages Deployment

- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push to main or manual dispatch
- **Process:** Build dist files -> deploy docs site
