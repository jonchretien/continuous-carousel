# Styling

Continuous Carousel uses CSS custom properties for easy customization.

## CSS Custom Properties

Override these on the `.c-carousel-container` element:

| Property | Description |
|----------|-------------|
| `--carousel-item-width` | Width of each carousel item (horizontal) |
| `--carousel-item-height` | Height of each carousel item (vertical) |
| `--carousel-transition-duration` | Duration of the slide transition |
| `--carousel-item-count` | Total number of items (set automatically) |

```css
.c-carousel-container {
  --carousel-item-width: 300px;
  --carousel-item-height: 200px;
  --carousel-transition-duration: 1000ms;
}
```

## Required Classes

| Class | Element | Purpose |
|-------|---------|---------|
| `c-carousel-container` | Outer `div` | Container wrapper |
| `c-carousel-group` | `ul` | Sliding track |
| `c-carousel-item` | `li` | Individual slide |

## Data Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-direction` | `horizontal`, `vertical` | Scroll direction |
| `data-num-visible` | Number | Items visible at once |
| `data-paused` | `true`, `false` | Current pause state (set by library) |

## Customization Example

```css
/* Custom item styles */
.c-carousel-item {
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
}

/* Style based on pause state */
.c-carousel-container[data-paused="true"] {
  opacity: 0.7;
}
```

## CSP Compliance

v0.3.0 uses CSS custom properties instead of inline styles, so no `style-src 'unsafe-inline'` CSP directive is needed for the carousel's dynamic styling.
