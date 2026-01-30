# Getting Started

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

## HTML Markup

The carousel requires a specific HTML structure:

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

**Required elements:**
- Container `div` with a unique `id` and `class="c-carousel-container"`
- `data-direction` attribute: `"horizontal"` or `"vertical"`
- `data-num-visible` attribute: number of items visible at once
- `ul` with `class="c-carousel-group"`
- `li` items with `class="c-carousel-item"`

## Include CSS

```html
<link rel="stylesheet" href="dist/continuous-carousel.min.css">
```

## Initialize

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

The factory function returns an object with [API methods](/guide/api) for controlling the carousel.

## Browser Support

Modern browsers with ES6 module support:

| Browser | Version |
|---------|---------|
| Chrome/Edge | 61+ |
| Firefox | 60+ |
| Safari | 11+ |
| Opera | 48+ |

For older browsers, use the transpiled UMD build (`continuous-carousel.min.js`).
