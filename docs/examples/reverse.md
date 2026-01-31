<script setup>
import CarouselDemo from '../.vitepress/components/CarouselDemo.vue';
</script>

# Reverse Direction

Scroll items in the opposite direction using the `reverse` option.

## Horizontal (Right-to-Left → Left-to-Right)

Default horizontal scrolls left. With `reverse: true`, it scrolls right:

<CarouselDemo id="h-reverse" direction="horizontal" :num-visible="1" :reverse="true" />

```javascript
ContinuousCarousel('myCarousel', {
  reverse: true
});
```

## Vertical (Top-to-Bottom → Bottom-to-Top)

Default vertical scrolls up. With `reverse: true`, it scrolls down:

<CarouselDemo id="v-reverse" direction="vertical" :num-visible="1" :reverse="true" />

```javascript
ContinuousCarousel('myCarousel', {
  direction: 'vertical',
  reverse: true
});
```

## Multiple Items

Works with any `numVisible` value:

<CarouselDemo id="h-reverse-multi" direction="horizontal" :num-visible="3" :reverse="true" />

```javascript
ContinuousCarousel('myCarousel', {
  numVisible: 3,
  reverse: true
});
```

## HTML Data Attribute

You can also set reverse via the `data-reverse` attribute:

```html
<div id="myCarousel" class="c-carousel-container" data-direction="horizontal" data-num-visible="1" data-reverse="true">
  <ul class="c-carousel-group">
    <li class="c-carousel-item">1</li>
    <li class="c-carousel-item">2</li>
    <li class="c-carousel-item">3</li>
  </ul>
</div>
```
