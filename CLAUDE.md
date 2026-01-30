# Claude Code Context

This file provides context for AI assistants working on the continuous-carousel project.

## Project Overview

Continuous Carousel is a lightweight, vanilla JavaScript carousel library with CSS animations. The library supports both horizontal and vertical scrolling with configurable options.

**Current Version:** 0.3.0 (in development)

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
npm run demo        # Build and serve demo locally
```

### Demo Pages

All demo pages located in `demo/examples/`:

**Basic Examples:**
- `horizontal-single.html` - Single item horizontal carousel
- `horizontal-multi.html` - 2-4 visible items horizontal
- `vertical-single.html` - Single item vertical carousel
- `vertical-multi.html` - 2-3 visible items vertical

**Content Examples:**
- `image-gallery.html` - Photo gallery with captions
- `card-showcase.html` - Cards, testimonials, team members
- `text-ticker.html` - News tickers, announcements, quotes

**Advanced:**
- `advanced-features.html` - Interactive controls, callbacks, all config options

**Hub:**
- `demo/index.html` - Main demo hub with navigation to all examples

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
4. **Demo locally** - Run `npm run demo`
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
- Uses Jasmine framework
- Tests updated for ES6 class structure

## Critical Files

- `src/ContinuousCarousel.js` - Main entry point
- `continuous-carousel.css` - Core styles with CSS custom properties
- `package.json` - Dependencies, scripts, exports config
- `rolldown.config.js` - Build configuration
- `demo/index.html` - Demo hub
- `tests/continuous-carousel.test.js` - Test suite

## GitHub Pages Deployment

- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push to main branch or manual dispatch
- **Process:** Build dist files → deploy demo/ directory
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
6. Add example in advanced-features.html

**Fix bug:**
1. Write failing test
2. Fix bug in src/
3. Verify test passes
4. Update CHANGELOG
5. Commit with `fix:` prefix

**Add demo page:**
1. Create HTML in `demo/examples/`
2. Link from `demo/index.html`
3. Use ES6 module import: `import ContinuousCarousel from '../dist/continuous-carousel.esm.js'`
4. Follow existing styling patterns
5. Commit with `docs:` prefix

## Project Context

This modernization (v0.3.0) transforms the library from a simple monolithic implementation to a robust, modular ES6 factory function architecture with separated concerns. The goal is to provide better performance, developer experience, and extensibility while keeping the library lightweight and dependency-free.
