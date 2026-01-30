# Continuous Carousel ∞

[![npm version](https://img.shields.io/npm/v/continuous-carousel.svg)](https://www.npmjs.com/package/continuous-carousel)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight, performant carousel library using vanilla JavaScript and CSS animations. Features automatic continuous scrolling with support for both horizontal and vertical directions.

**[View Live Demos](https://jonchretien.github.io/continuous-carousel/)**

## Features

- 🎯 **Lightweight** - ~8KB minified + gzipped
- ⚡ **Performant** - 60fps animations using requestAnimationFrame
- 📱 **Responsive** - Auto-adjusts on resize with ResizeObserver
- 🔋 **Battery-friendly** - Pauses when off-screen using IntersectionObserver
- ♿ **Accessible** - ARIA live regions for screen readers
- 🎨 **Customizable** - CSS custom properties for easy styling
- 📦 **Zero dependencies** - Pure vanilla JavaScript
- 🔧 **Flexible API** - Programmatic control with play/pause/destroy

## Installation

**npm:**
```bash
npm install continuous-carousel
```

**CDN:**
```html
<link rel="stylesheet" href="https://unpkg.com/continuous-carousel/dist/continuous-carousel.min.css">
<script src="https://unpkg.com/continuous-carousel/dist/continuous-carousel.min.js"></script>
```

**ES Module:**
```javascript
import ContinuousCarousel from 'continuous-carousel';
```

## Quick Start

### 1. Add HTML markup

```html
<div id="myCarousel" class="c-carousel-container" data-direction="horizontal" data-num-visible="1">
  <ul class="c-carousel-group">
    <li class="c-carousel-item">Slide 1</li>
    <li class="c-carousel-item">Slide 2</li>
    <li class="c-carousel-item">Slide 3</li>
    <li class="c-carousel-item">Slide 4</li>
  </ul>
</div>
```

### 2. Include CSS

```html
<link rel="stylesheet" href="dist/continuous-carousel.min.css">
```

### 3. Initialize carousel

```javascript
// Simple usage
const carousel = ContinuousCarousel('myCarousel');

// With options
const carousel = ContinuousCarousel('myCarousel', {
  interval: 3000,
  pauseOnHover: true,
  onSlideChange: (index) => {
    console.log('Current slide:', index);
  }
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `direction` | string | `'horizontal'` | Scroll direction: `'horizontal'` or `'vertical'` |
| `numVisible` | number | `1` | Number of items visible at once |
| `interval` | number | `2000` | Time between transitions (ms) |
| `transitionDuration` | number | `1000` | Transition animation length (ms) |
| `pauseOnHover` | boolean | `false` | Pause animation on mouse hover |
| `pauseOnFocus` | boolean | `false` | Pause animation when element focused |
| `autoplay` | boolean | `true` | Start animation automatically |
| `observeVisibility` | boolean | `true` | Pause when off-screen (IntersectionObserver) |
| `observeResize` | boolean | `true` | Recalculate on resize (ResizeObserver) |
| `announceSlides` | boolean | `true` | Announce slide changes for screen readers |
| `onSlideChange` | function | `null` | Callback fired on slide change: `(index) => {}` |
| `onPause` | function | `null` | Callback fired when paused |
| `onPlay` | function | `null` | Callback fired when played |
| `onDestroy` | function | `null` | Callback fired when destroyed |

## API Methods

The `ContinuousCarousel()` function returns an object with the following methods:

```javascript
const carousel = ContinuousCarousel('myCarousel');

// Control playback
carousel.play();        // Resume animation
carousel.pause();       // Pause animation
carousel.destroy();     // Stop and cleanup

// Update configuration
carousel.updateConfig({ interval: 5000 });

// Access properties
carousel.container;     // HTML element
carousel.config;        // Current configuration
```

## Examples

### Horizontal Carousel (Single Item)

```html
<div id="carousel1" class="c-carousel-container" data-direction="horizontal" data-num-visible="1">
  <ul class="c-carousel-group">
    <li class="c-carousel-item">1</li>
    <li class="c-carousel-item">2</li>
    <li class="c-carousel-item">3</li>
  </ul>
</div>

<script>
  ContinuousCarousel('carousel1');
</script>
```

### Horizontal Carousel (Multiple Items)

```html
<div id="carousel2" class="c-carousel-container" data-direction="horizontal" data-num-visible="3">
  <ul class="c-carousel-group">
    <li class="c-carousel-item">1</li>
    <li class="c-carousel-item">2</li>
    <li class="c-carousel-item">3</li>
    <li class="c-carousel-item">4</li>
    <li class="c-carousel-item">5</li>
    <li class="c-carousel-item">6</li>
  </ul>
</div>

<script>
  ContinuousCarousel('carousel2');
</script>
```

### Vertical Carousel

```html
<div id="carousel3" class="c-carousel-container" data-direction="vertical" data-num-visible="1">
  <ul class="c-carousel-group">
    <li class="c-carousel-item">A</li>
    <li class="c-carousel-item">B</li>
    <li class="c-carousel-item">C</li>
  </ul>
</div>

<script>
  ContinuousCarousel('carousel3');
</script>
```

### With Custom Options

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  interval: 4000,
  transitionDuration: 800,
  pauseOnHover: true,
  onSlideChange: (index) => {
    console.log(`Slide ${index} is now active`);
  }
});
```

### Image Gallery

```html
<div id="gallery" class="c-carousel-container" data-direction="horizontal" data-num-visible="1">
  <ul class="c-carousel-group">
    <li class="c-carousel-item">
      <img src="image1.jpg" alt="Image 1">
    </li>
    <li class="c-carousel-item">
      <img src="image2.jpg" alt="Image 2">
    </li>
    <li class="c-carousel-item">
      <img src="image3.jpg" alt="Image 3">
    </li>
  </ul>
</div>

<script>
  ContinuousCarousel('gallery', {
    interval: 5000,
    pauseOnHover: true
  });
</script>
```

## Styling

The carousel uses CSS custom properties for easy customization:

```css
.c-carousel-container {
  /* Override defaults */
  --carousel-item-width: 300px;
  --carousel-item-height: 200px;
  --carousel-transition-duration: 1000ms;
}

/* Custom item styles */
.c-carousel-item {
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Browser Support

Modern browsers with ES6 module support:
- Chrome/Edge 61+
- Firefox 60+
- Safari 11+
- Opera 48+

For older browsers, use the transpiled UMD build (`continuous-carousel.min.js`).

## Demos

Check out the [live demos](https://jonchretien.github.io/continuous-carousel/) for more examples:

- Basic horizontal and vertical carousels
- Image galleries with captions
- Card showcases and testimonials
- News tickers and text scrollers
- Advanced features and API usage

## Migration from v0.2.x

See [MIGRATION.md](./MIGRATION.md) for upgrade instructions from v0.2.x to v0.3.0.

## Contributing

Contributions are welcome! Please read the [contribution guidelines](./CONTRIBUTING.md) first.

## License

Continuous Carousel is released under the [MIT license](https://github.com/jonchretien/continuous-carousel/blob/master/LICENSE.txt).
