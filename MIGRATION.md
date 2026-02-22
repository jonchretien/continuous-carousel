# Migration Guide

## v1.0.x to v1.1.0 (TypeScript Migration)

v1.1.0 rewrites all source from JavaScript to TypeScript. **No breaking changes** — the public API is identical.

### What Changed
- Source files renamed `.js` → `.ts` with full type annotations
- Type declarations now generated from source (previously hand-written in `types/index.d.ts`)
- Declaration maps (`.d.ts.map`) enable "Go to Definition" → actual `.ts` source

### For TypeScript Users
You can now import types directly:
```typescript
import ContinuousCarousel from 'continuous-carousel';
import type { ContinuousCarouselConfig, ContinuousCarouselInstance } from 'continuous-carousel';
```

### For JavaScript Users
No changes required. The library works exactly as before.

---

# Migration Guide: v0.2.x to v0.3.0

This guide helps you upgrade from Continuous Carousel v0.2.x to v0.3.0.

## What's New in v0.3.0

- **ES6 Modules** - Modern module system with tree-shaking support
- **Enhanced Performance** - requestAnimationFrame-based animations (60fps)
- **Automatic Pause** - IntersectionObserver pauses carousel when off-screen
- **Responsive** - ResizeObserver auto-recalculates on resize
- **CSS Custom Properties** - Cleaner styling without inline styles
- **Extended API** - New `play()`, `pause()`, `destroy()`, `updateConfig()` methods
- **Event Callbacks** - Hook into slide changes and lifecycle events
- **Better Accessibility** - Improved ARIA support

## Breaking Changes

### None!

v0.3.0 is fully backward compatible with v0.2.x. Your existing code will continue to work without modifications.

## Recommended Updates

While not required, these updates take advantage of new features:

### 1. Use ES6 Modules (Optional)

**Before (v0.2.x):**
```html
<script src="continuous-carousel.js"></script>
<script>
  ContinuousCarousel('myCarousel');
</script>
```

**After (v0.3.0):**
```html
<script type="module">
  import ContinuousCarousel from './dist/continuous-carousel.esm.js';
  ContinuousCarousel('myCarousel');
</script>
```

### 2. Use New Configuration Options

**Before (v0.2.x):**
```javascript
// Only data attributes were supported
<div id="myCarousel" data-direction="horizontal" data-num-visible="1">
```

**After (v0.3.0):**
```javascript
// Options can be passed programmatically
const carousel = ContinuousCarousel('myCarousel', {
  direction: 'horizontal',
  numVisible: 1,
  interval: 3000,
  pauseOnHover: true
});
```

### 3. Use Public API Methods

**New in v0.3.0:**
```javascript
const carousel = ContinuousCarousel('myCarousel');

// Control playback
carousel.play();
carousel.pause();
carousel.destroy();

// Update settings
carousel.updateConfig({ interval: 5000 });
```

### 4. Use Event Callbacks

**New in v0.3.0:**
```javascript
const carousel = ContinuousCarousel('myCarousel', {
  onSlideChange: (index) => {
    console.log('Current slide:', index);
  },
  onPause: () => {
    console.log('Carousel paused');
  },
  onPlay: () => {
    console.log('Carousel resumed');
  }
});
```

### 5. Enable Pause on Hover

**New in v0.3.0:**
```javascript
const carousel = ContinuousCarousel('myCarousel', {
  pauseOnHover: true  // Pauses when mouse hovers over carousel
});
```

## Package Installation

### npm/yarn

**Before (v0.2.x):**
```bash
npm install continuous-carousel@0.2.1
```

**After (v0.3.0):**
```bash
npm install continuous-carousel@0.3.0
```

### Module Exports

v0.3.0 properly supports both CommonJS and ES modules:

**CommonJS:**
```javascript
const ContinuousCarousel = require('continuous-carousel');
```

**ES Modules:**
```javascript
import ContinuousCarousel from 'continuous-carousel';
```

## File Structure Changes

### Distribution Files

**Before (v0.2.x):**
- `continuous-carousel.js`
- `continuous-carousel.css`

**After (v0.3.0):**
- `dist/continuous-carousel.js` - UMD build (ES5, for browsers)
- `dist/continuous-carousel.min.js` - UMD minified
- `dist/continuous-carousel.esm.js` - ES6 modules
- `dist/continuous-carousel.esm.min.js` - ES6 minified
- `dist/continuous-carousel.min.css` - Minified CSS

**Update your paths:**
```html
<!-- Before -->
<link rel="stylesheet" href="continuous-carousel.css">
<script src="continuous-carousel.js"></script>

<!-- After -->
<link rel="stylesheet" href="dist/continuous-carousel.min.css">
<script src="dist/continuous-carousel.min.js"></script>
```

## CSS Changes

### CSS Custom Properties

v0.3.0 uses CSS custom properties instead of inline styles. This improves performance and allows easier customization.

**No action required** - existing styles continue to work.

**Optional enhancement:**
```css
.c-carousel-container {
  --carousel-item-width: 300px;
  --carousel-item-height: 200px;
  --carousel-transition-duration: 1000ms;
}
```

## New Features You Can Use

### 1. Automatic Visibility Detection

Carousel automatically pauses when scrolled off-screen (saves battery):

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  observeVisibility: true  // Default: true
});
```

### 2. Automatic Resize Handling

Carousel recalculates dimensions on window resize:

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  observeResize: true  // Default: true
});
```

### 3. Custom Timing

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  interval: 4000,              // 4 seconds between slides
  transitionDuration: 800      // 800ms transition
});
```

### 4. Disable Autoplay

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  autoplay: false  // Start paused
});

// Start manually
carousel.play();
```

## Complete Example: Before & After

### Before (v0.2.x)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="continuous-carousel.css">
</head>
<body>
  <div id="myCarousel" class="c-carousel-container" data-direction="horizontal" data-num-visible="1">
    <ul class="c-carousel-group">
      <li class="c-carousel-item">1</li>
      <li class="c-carousel-item">2</li>
      <li class="c-carousel-item">3</li>
    </ul>
  </div>

  <script src="continuous-carousel.js"></script>
  <script>
    ContinuousCarousel('myCarousel');
  </script>
</body>
</html>
```

### After (v0.3.0)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="dist/continuous-carousel.min.css">
</head>
<body>
  <div id="myCarousel" class="c-carousel-container" data-direction="horizontal" data-num-visible="1">
    <ul class="c-carousel-group">
      <li class="c-carousel-item">1</li>
      <li class="c-carousel-item">2</li>
      <li class="c-carousel-item">3</li>
    </ul>
  </div>

  <script type="module">
    import ContinuousCarousel from './dist/continuous-carousel.esm.js';

    const carousel = ContinuousCarousel('myCarousel', {
      interval: 3000,
      pauseOnHover: true,
      onSlideChange: (index) => {
        console.log('Slide', index);
      }
    });
  </script>
</body>
</html>
```

## Troubleshooting

### Issue: Carousel not found

**Problem:** `ContinuousCarousel is not defined`

**Solution:** Update script path to include `dist/` directory:
```html
<script src="dist/continuous-carousel.min.js"></script>
```

### Issue: Styles not loading

**Problem:** Carousel has no styling

**Solution:** Update CSS path:
```html
<link rel="stylesheet" href="dist/continuous-carousel.min.css">
```

### Issue: Module import error

**Problem:** ES module import fails

**Solution:** Add `type="module"` to script tag:
```html
<script type="module">
  import ContinuousCarousel from './dist/continuous-carousel.esm.js';
</script>
```

## Need Help?

- [Documentation](https://github.com/jonchretien/continuous-carousel)
- [Live Demos](https://jonchretien.github.io/continuous-carousel/)
- [Issues](https://github.com/jonchretien/continuous-carousel/issues)

## Summary

v0.3.0 is a **non-breaking upgrade** that adds powerful new features while maintaining full backward compatibility. You can upgrade immediately and adopt new features at your own pace.

**Minimum required changes:**
1. Update npm package: `npm install continuous-carousel@0.3.0`
2. Update file paths: Add `dist/` prefix to JS/CSS imports

**Recommended enhancements:**
1. Switch to ES6 modules for better tree-shaking
2. Use new configuration options for more control
3. Add event callbacks for custom behavior
4. Enable `pauseOnHover` for better UX
