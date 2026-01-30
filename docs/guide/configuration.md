<script setup>
import CarouselDemo from '../.vitepress/components/CarouselDemo.vue';
</script>

# Configuration

All options can be passed as the second argument to `ContinuousCarousel()`:

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  direction: 'horizontal',
  numVisible: 2,
  interval: 3000,
  pauseOnHover: true
});
```

## Quick Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `direction` | string | `'horizontal'` | Scroll direction |
| `numVisible` | number | `1` | Items visible at once |
| `interval` | number | `2000` | Time between transitions (ms) |
| `transitionDuration` | number | `1000` | Transition animation length (ms) |
| `pauseOnHover` | boolean | `false` | Pause on mouse hover |
| `pauseOnFocus` | boolean | `false` | Pause on element focus |
| `autoplay` | boolean | `true` | Start automatically |
| `observeVisibility` | boolean | `true` | Pause when off-screen |
| `observeResize` | boolean | `true` | Recalculate on resize |
| `announceSlides` | boolean | `true` | Announce slides for screen readers |
| `onSlideChange` | function | `null` | Fired on slide change |
| `onPause` | function | `null` | Fired when paused |
| `onPlay` | function | `null` | Fired when played |
| `onDestroy` | function | `null` | Fired when destroyed |

---

## Core Options

### `direction`

- **Type:** `'horizontal' | 'vertical'`
- **Default:** `'horizontal'`

Scroll direction of the carousel. Also set via the `data-direction` HTML attribute.

```javascript
ContinuousCarousel('myCarousel', {
  direction: 'vertical'
});
```

<CarouselDemo id="demo-direction" direction="vertical" :num-visible="1" :interval="2000" />

### `numVisible`

- **Type:** `number`
- **Default:** `1`

Number of items visible at once. Also set via the `data-num-visible` HTML attribute. Must be less than the total number of items.

```javascript
ContinuousCarousel('myCarousel', {
  numVisible: 3
});
```

<CarouselDemo id="demo-num-visible" direction="horizontal" :num-visible="3" :interval="2500" />

## Timing Options

### `interval`

- **Type:** `number` (milliseconds)
- **Default:** `2000`

Time between transitions. Lower values = faster scrolling.

```javascript
ContinuousCarousel('myCarousel', {
  interval: 4000 // 4 seconds between slides
});
```

### `transitionDuration`

- **Type:** `number` (milliseconds)
- **Default:** `1000`

Duration of the slide transition animation. Should be less than `interval`.

```javascript
ContinuousCarousel('myCarousel', {
  transitionDuration: 500 // Fast transition
});
```

## Feature Options

### `pauseOnHover`

- **Type:** `boolean`
- **Default:** `false`

Pause the carousel when the mouse hovers over it. Resumes when the mouse leaves.

```javascript
ContinuousCarousel('myCarousel', {
  pauseOnHover: true
});
```

<CarouselDemo id="demo-hover" direction="horizontal" :num-visible="1" :pause-on-hover="true" :interval="2000" />

::: tip
Hover over the carousel above to see it pause.
:::

### `pauseOnFocus`

- **Type:** `boolean`
- **Default:** `false`

Pause the carousel when any element inside it receives keyboard focus.

```javascript
ContinuousCarousel('myCarousel', {
  pauseOnFocus: true
});
```

### `autoplay`

- **Type:** `boolean`
- **Default:** `true`

Whether the carousel starts automatically. Set to `false` to start paused and control playback via the [API](/guide/api).

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  autoplay: false
});

// Start manually later
carousel.play();
```

### `observeVisibility`

- **Type:** `boolean`
- **Default:** `true`

Uses `IntersectionObserver` to automatically pause the carousel when it's scrolled off-screen. Saves battery and CPU on mobile devices.

```javascript
ContinuousCarousel('myCarousel', {
  observeVisibility: false // Disable auto-pause
});
```

### `observeResize`

- **Type:** `boolean`
- **Default:** `true`

Uses `ResizeObserver` to recalculate carousel dimensions when the container is resized. Ensures the carousel stays responsive.

```javascript
ContinuousCarousel('myCarousel', {
  observeResize: false // Disable resize handling
});
```

### `announceSlides`

- **Type:** `boolean`
- **Default:** `true`

Enables ARIA live region announcements for screen readers when slides change.

```javascript
ContinuousCarousel('myCarousel', {
  announceSlides: false // Disable screen reader announcements
});
```

## Callbacks

### `onSlideChange`

- **Type:** `function(index) | null`
- **Default:** `null`

Called each time the carousel advances to a new slide. Receives the current slide index.

```javascript
ContinuousCarousel('myCarousel', {
  onSlideChange: (index) => {
    console.log('Current slide:', index);
  }
});
```

### `onPause`

- **Type:** `function() | null`
- **Default:** `null`

Called when the carousel is paused (via API, hover, focus, or visibility).

```javascript
ContinuousCarousel('myCarousel', {
  onPause: () => {
    console.log('Carousel paused');
  }
});
```

### `onPlay`

- **Type:** `function() | null`
- **Default:** `null`

Called when the carousel resumes playing.

```javascript
ContinuousCarousel('myCarousel', {
  onPlay: () => {
    console.log('Carousel playing');
  }
});
```

### `onDestroy`

- **Type:** `function() | null`
- **Default:** `null`

Called when the carousel is destroyed via `carousel.destroy()`.

```javascript
ContinuousCarousel('myCarousel', {
  onDestroy: () => {
    console.log('Carousel destroyed');
  }
});
```
