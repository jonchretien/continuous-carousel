# API Methods

`ContinuousCarousel()` is a factory function that returns a carousel instance with methods and properties.

```javascript
const carousel = ContinuousCarousel('myCarousel', options);
```

## Methods

### `play()`

Resume carousel animation. Fires the `onPlay` callback if set.

```javascript
carousel.play();
```

### `pause()`

Pause carousel animation. Fires the `onPause` callback if set.

```javascript
carousel.pause();
```

### `destroy()`

Stop the carousel and clean up all event listeners, observers, and DOM modifications. Fires the `onDestroy` callback if set.

```javascript
carousel.destroy();
```

::: warning
After calling `destroy()`, the carousel instance can no longer be used. You must create a new instance to restart it.
:::

### `updateConfig(options)`

Update configuration options on a running carousel. Accepts a partial options object.

```javascript
carousel.updateConfig({
  interval: 5000,
  pauseOnHover: true
});
```

## Properties

### `container`

The carousel's root DOM element.

```javascript
carousel.container; // HTMLElement
```

### `config`

The current configuration object (read-only reference).

```javascript
carousel.config.interval;   // 2000
carousel.config.direction;  // 'horizontal'
```

## Example

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  interval: 3000,
  pauseOnHover: true,
  onSlideChange: (index) => console.log('Slide:', index)
});

// Pause after 10 seconds
setTimeout(() => carousel.pause(), 10000);

// Update speed
carousel.updateConfig({ interval: 1000 });

// Clean up when done
carousel.destroy();
```
