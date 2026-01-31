# Claude Code Context

This file provides context for AI assistants working on the continuous-carousel project.

## Project Overview

Continuous Carousel is a lightweight, vanilla JavaScript carousel library with CSS animations. The library supports both horizontal and vertical scrolling with configurable options.

**Current Version:** 1.0.0

## Architecture

### Source Structure

```
src/
├── ContinuousCarousel.js       # Main ES6 class
├── constants.js                # Configuration constants
├── animation/
│   ├── AnimationController.js  # rAF-based animation (replaces setTimeout)
│   └── TransformStrategy.js    # Strategy pattern for H/V transforms
├── observers/
│   ├── VisibilityObserver.js   # IntersectionObserver for pause when off-screen
│   └── ResizeHandler.js        # ResizeObserver for responsive recalculation
└── utils/
    ├── dom.js                  # DOM manipulation helpers
    └── validation.js           # Input validation
```

### Build System

**Tool:** Rolldown (Rust-based, Rollup-compatible)
- 25x faster than Rollup
- Compatible with Rollup plugin ecosystem
- Powers Vite 8+

**Outputs:**
- `dist/continuous-carousel.js` - UMD (transpiled ES5)
- `dist/continuous-carousel.min.js` - UMD minified
- `dist/continuous-carousel.esm.js` - ES6 modules
- `dist/continuous-carousel.esm.min.js` - ES6 minified
- `dist/continuous-carousel.min.css` - Minified CSS

**Build Commands:**
```bash
npm run build       # Build both JS and CSS
npm run build:js    # Build JS only (Rolldown)
npm run build:css   # Build CSS only (PostCSS)
npm run dev         # Watch mode
npm run docs:dev    # Serve VitePress docs locally
npm run docs:build  # Build VitePress docs
```

### Documentation Site

VitePress-powered docs in `docs/`:

- `docs/examples/horizontal.md` - Horizontal carousel demos
- `docs/examples/vertical.md` - Vertical carousel demos
- `docs/examples/reverse.md` - Reverse scroll direction demos
- `docs/examples/advanced.md` - Advanced features and config
- `docs/.vitepress/components/CarouselDemo.vue` - Reusable demo component
- `docs/.vitepress/config.mjs` - Sidebar and nav config

### Key Modernizations (v0.3.0)

1. **ES6 Module Architecture** - Refactored to ES6 modules with factory function pattern
2. **requestAnimationFrame** - Replaced setTimeout for 60fps animation
3. **IntersectionObserver** - Auto-pause when carousel off-screen
4. **ResizeObserver** - Responsive recalculation on resize
5. **CSS Custom Properties** - Replaced inline styles for CSP compliance
6. **Strategy Pattern** - Separate H/V transform logic
7. **Public API** - `play()`, `pause()`, `destroy()`, `updateConfig()`

### Backward Compatibility

Factory function pattern maintains consistent API:
```javascript
// Simple usage
ContinuousCarousel('id');

// With options
ContinuousCarousel('id', options);

// Returns public API object
const carousel = ContinuousCarousel('id');
carousel.play();
carousel.pause();
carousel.destroy();
```

No `new` keyword needed - uses factory function pattern.

## Configuration Options

```javascript
ContinuousCarousel('id', {
  // Core
  direction: 'horizontal',      // 'horizontal' | 'vertical'
  numVisible: 1,                // Number of items visible at once

  // Timing
  interval: 2000,               // Time between transitions (ms)
  transitionDuration: 1000,     // Transition animation length (ms)

  // Features
  reverse: false,               // Scroll in opposite direction
  pauseOnHover: false,          // Pause when mouse hovers
  pauseOnFocus: false,          // Pause when element focused
  autoplay: true,               // Start automatically
  observeVisibility: true,      // Use IntersectionObserver
  observeResize: true,          // Use ResizeObserver

  // Callbacks
  onSlideChange: null,          // function(index) - fired on slide change
  onPause: null,                // function() - fired on pause
  onPlay: null                  // function() - fired on play
});
```

## Development Workflow

### Making Changes

1. **Code changes** - Edit files in `src/`
2. **Build** - Run `npm run build`
3. **Test** - Run `npm test`
4. **Docs locally** - Run `npm run docs:dev`
5. **Commit** - Use conventional commits (see below)

### Commit Convention

Format: `type: description`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `test:` - Test updates
- `chore:` - Tooling, dependencies, etc.
- `ci:` - CI/CD changes

**Examples:**
- `feat: add pause on hover option`
- `fix: vertical carousel spacing issue`
- `docs: update README with new API`
- `refactor: extract animation logic to controller`
- `test: add tests for visibility observer`
- `chore: update dependencies`

### Testing

- Tests located in `tests/`
- Run with `npm test`
- Uses Vitest framework
- Tests updated for ES6 class structure

## Critical Files

- `src/ContinuousCarousel.js` - Main entry point
- `src/continuous-carousel.css` - Core styles with CSS custom properties
- `package.json` - Dependencies, scripts, exports config
- `rolldown.config.js` - Build configuration (used by watch mode)
- `bin/build-js.mjs` - Sequential build script (production)
- `bin/build-one.mjs` - Single-config build worker
- `tests/continuous-carousel.test.js` - Test suite

## GitHub Pages Deployment

- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push to main branch or manual dispatch
- **Process:** Build dist files → deploy docs site
- **Note:** `.nojekyll` file prevents Jekyll processing

## Performance Targets

- Bundle size: UMD ~8KB, ESM ~7KB (minified + gzip)
- Frame rate: 60fps
- Browser support: Modern browsers (ES2020+) for ESM, ES5 for UMD

## Future Enhancements

Potential features (not yet implemented):
- TypeScript definitions (.d.ts)
- Manual prev/next controls
- Configurable easing functions
- Touch/swipe support
- Responsive breakpoints
- Accessibility improvements (ARIA labels, keyboard nav)

## Guidelines for AI Assistants

1. **Maintain Architecture** - Respect SOLID principles and separation of concerns
2. **Backward Compatibility** - Don't break UMD function-call syntax
3. **Bundle Size** - Keep library lightweight (<10KB minified)
4. **Browser Support** - Modern features OK for ESM, transpile UMD to ES5
5. **Testing** - Update tests when changing behavior
6. **Documentation** - Update README/docs when adding features
7. **Commit Messages** - Follow conventional commit format
8. **Code Style** - Match existing style (see .editorconfig if present)

## Common Tasks

**Add new configuration option:**
1. Add to `src/constants.js`
2. Update `ContinuousCarousel` constructor
3. Implement logic in relevant module
4. Add tests
5. Update README
6. Add example in docs or `docs/examples/advanced.md`

**Fix bug:**
1. Write failing test
2. Fix bug in src/
3. Verify test passes
4. Update CHANGELOG
5. Commit with `fix:` prefix

**Add docs example page:**
1. Create markdown in `docs/examples/`
2. Use `<CarouselDemo>` Vue component for live demos
3. Add link in `docs/.vitepress/config.mjs` sidebar
4. Follow existing page patterns
5. Commit with `docs:` prefix

## Project Context

v0.3.0 modernized the library into a modular ES6 factory function architecture. v0.4.0 added reverse scroll direction support. v0.4.1 moved hero emoji to name, added VitePress hero CSS override. The goal is to provide good performance, developer experience, and extensibility while keeping the library lightweight and dependency-free.
