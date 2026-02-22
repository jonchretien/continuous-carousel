# Architecture

## Source Structure

```
src/
├── ContinuousCarousel.ts       # Main factory function
├── constants.ts                # Configuration constants
├── types.ts                    # Central type definitions
├── animation/
│   ├── AnimationController.ts  # rAF-based animation
│   └── TransformStrategy.ts    # Strategy pattern for H/V transforms
├── observers/
│   ├── KeyboardHandler.ts      # Arrow key & space/enter support
│   ├── VisibilityObserver.ts   # IntersectionObserver for pause when off-screen
│   └── ResizeHandler.ts        # ResizeObserver for responsive recalculation
└── utils/
    ├── dom.ts                  # DOM manipulation helpers
    └── validation.ts           # Input validation
```

## Build System

**Tool:** Rolldown (Rust-based, Rollup-compatible)

**Outputs:**
- `dist/continuous-carousel.js` - UMD (transpiled ES5)
- `dist/continuous-carousel.min.js` - UMD minified
- `dist/continuous-carousel.esm.js` - ES6 modules
- `dist/continuous-carousel.esm.min.js` - ES6 minified
- `dist/continuous-carousel.min.css` - Minified CSS
- `dist/ContinuousCarousel.d.ts` - Generated type declarations
- `dist/*.d.ts.map` - Declaration maps (Go to Definition → source)

**Critical build files:**
- `rolldown.config.js` - Build configuration (used by watch mode)
- `bin/build-js.mjs` - Sequential build script (production)
- `bin/build-one.mjs` - Single-config build worker
- `tsconfig.json` - TypeScript config (strict mode, declaration generation)

**Build pipeline:** `build:js` (Rolldown) → `build:types` (tsc --emitDeclarationOnly) → `copy` → `build:css` (PostCSS)

## Documentation Site

VitePress-powered docs in `docs/`. See `docs/.vitepress/config.mjs` for sidebar/nav config and `docs/.vitepress/components/CarouselDemo.vue` for live demo component.

## GitHub Pages Deployment

- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push to main or manual dispatch
- **Process:** Build dist files -> deploy docs site
