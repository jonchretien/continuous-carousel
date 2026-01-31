# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-31

### Added
- **Keyboard Navigation** - Space/Enter to pause/play, arrow keys support
- **TypeScript Definitions** - `.d.ts` type declarations
- **numVisible Validation** - Validates numVisible < itemCount
- **GitHub Templates** - Issue templates, PR template, contributing guide
- **npm Publish Workflow** - CI publishes on tag push with provenance

### Changed
- **v1.0 Stable Release** - First major version
- Added `bugs` and `engines` fields to package.json
- Added pnpm/bun install instructions to docs

---

## [0.4.1] - 2026-01-30

### Changed
- Read banner version from package.json, rebuild dist

### Docs
- Move hero emoji to name, add VitePress CSS overrides

---

## [0.4.0] - 2026-01-30

### Added
- **Reverse Scroll Direction** - New `reverse` option to scroll in opposite direction

### Changed
- Apply formatter, replace ∞ with 🎠

### Docs
- Update README with reverse option, refresh demos section

---

## [0.3.0] - 2026-01-30

### Added

#### Core Features
- **ES6 Module Architecture** - Refactored to modern ES6 modules with factory function pattern
- **Public API Methods** - Added `play()`, `pause()`, `destroy()`, and `updateConfig()` methods
- **Extended Configuration** - New options: `interval`, `transitionDuration`, `pauseOnHover`, `pauseOnFocus`, `autoplay`, `observeVisibility`, `observeResize`
- **Event Callbacks** - Added `onSlideChange`, `onPause`, `onPlay`, `onDestroy` callbacks
- **Pause on Hover** - Optional hover pause with `pauseOnHover` option
- **Pause on Focus** - Optional focus pause with `pauseOnFocus` option
- **Autoplay Control** - Option to disable autoplay with `autoplay: false`

#### Performance Improvements
- **requestAnimationFrame** - Replaced setTimeout with rAF for 60fps animation
- **IntersectionObserver** - Automatically pauses carousel when off-screen (battery saving)
- **ResizeObserver** - Auto-recalculates dimensions on window resize
- **CSS Custom Properties** - Replaced inline styles for better CSP compliance and performance

#### Architecture
- **AnimationController** - Dedicated animation controller with rAF-based timing
- **TransformStrategy** - Strategy pattern for horizontal/vertical transforms
- **VisibilityObserver** - IntersectionObserver wrapper with fallback
- **ResizeHandler** - ResizeObserver wrapper with debounced fallback
- **Validation Utilities** - Input validation helpers
- **DOM Utilities** - Reusable DOM manipulation functions

#### Build System
- **Rolldown** - Modern Rust-based bundler (25x faster than Rollup)
- **Multiple Build Targets** - UMD, ESM, minified variants
- **ES5 Transpilation** - UMD builds transpiled for legacy browser support
- **CSS Minification** - PostCSS-based CSS processing

#### Documentation & Demos
- **Comprehensive README** - Updated with full API documentation and examples
- **Migration Guide** - Detailed upgrade path from v0.2.x
- **Demo Hub** - Interactive demo site with navigation
- **Basic Examples** - Horizontal/vertical single and multi-item demos
- **Content Examples** - Image gallery, card showcase, text ticker demos
- **Advanced Features** - Interactive controls, callbacks, all config options
- **GitHub Pages** - Automated deployment via GitHub Actions
- **CLAUDE.md** - AI assistant context documentation

#### Developer Experience
- **Package Exports** - Proper `main`, `module`, and `exports` fields in package.json
- **npm Scripts** - `build`, `build:js`, `build:css`, `dev`, `demo` commands
- **GitHub Actions** - Automated CI/CD for GitHub Pages deployment

### Changed

- **Module System** - Migrated from IIFE to ES6 modules
- **File Structure** - Moved source to `src/`, builds to `dist/`
- **Distribution Files** - Now in `dist/` directory with multiple formats
- **Animation Timing** - Switched from setTimeout to requestAnimationFrame
- **CSS Architecture** - Uses CSS custom properties instead of inline styles
- **Browser Support** - Dropped IE11, targeting modern browsers (ES2020+)

### Improved

- **Performance** - 60fps animations with frame-rate independent timing
- **Accessibility** - Enhanced ARIA live region support
- **Responsiveness** - Automatic recalculation on resize
- **Battery Life** - Pauses when off-screen via IntersectionObserver
- **Code Organization** - Modular architecture with separated concerns
- **Bundle Size** - Tree-shakeable ES6 modules
- **Developer Experience** - Better API with programmatic control

### Fixed

- Layout recalculation on window resize
- Animation timing consistency across different frame rates
- CSS conflicts from inline styles

### Backward Compatibility

- **100% Compatible** - All v0.2.x code continues to work
- **UMD Build** - Maintains global `ContinuousCarousel` for script tags
- **Data Attributes** - Still supported for configuration
- **API Signature** - Function-call syntax unchanged

### Technical Details

#### Build Outputs

```
dist/
├── continuous-carousel.js          # UMD (ES5, transpiled)
├── continuous-carousel.min.js      # UMD minified
├── continuous-carousel.esm.js      # ES6 modules
├── continuous-carousel.esm.min.js  # ES6 minified
└── continuous-carousel.min.css     # Minified CSS
```

#### Bundle Sizes

- UMD minified + gzip: ~8KB
- ESM minified + gzip: ~7KB
- CSS minified + gzip: <1KB

#### Browser Support

- Chrome/Edge 61+
- Firefox 60+
- Safari 11+
- Opera 48+

For older browsers, use UMD build which is transpiled to ES5.

---

## [0.2.1] - 2020-10-XX

### Fixed
- Minor bug fixes and improvements

## [0.2.0] - 2020-XX-XX

### Added
- Vertical carousel support
- Multiple visible items support
- Data attribute configuration

### Changed
- Improved animation performance
- Better accessibility support

## [0.1.0] - 2019-XX-XX

### Added
- Initial release
- Basic horizontal carousel
- CSS animations
- Continuous scrolling

---

[1.0.0]: https://github.com/jonchretien/continuous-carousel/compare/v0.4.1...v1.0.0
[0.4.1]: https://github.com/jonchretien/continuous-carousel/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/jonchretien/continuous-carousel/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/jonchretien/continuous-carousel/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/jonchretien/continuous-carousel/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/jonchretien/continuous-carousel/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jonchretien/continuous-carousel/releases/tag/v0.1.0
