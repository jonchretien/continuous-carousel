<script setup>
import CarouselDemo from '../.vitepress/components/CarouselDemo.vue';
</script>

# Horizontal Carousel

## Single Item

The default configuration shows one item at a time:

<CarouselDemo id="h-single" direction="horizontal" :num-visible="1" />

```javascript
ContinuousCarousel('myCarousel');
```

```html
<div id="myCarousel" class="c-carousel-container" data-direction="horizontal" data-num-visible="1">
  <ul class="c-carousel-group">
    <li class="c-carousel-item">1</li>
    <li class="c-carousel-item">2</li>
    <li class="c-carousel-item">3</li>
    <li class="c-carousel-item">4</li>
    <li class="c-carousel-item">5</li>
    <li class="c-carousel-item">6</li>
  </ul>
</div>
```

## Multiple Items

Show 3 items at once:

<CarouselDemo id="h-multi" direction="horizontal" :num-visible="3" />

```javascript
ContinuousCarousel('myCarousel', { numVisible: 3 });
```

```html
<div id="myCarousel" class="c-carousel-container" data-direction="horizontal" data-num-visible="3">
  <ul class="c-carousel-group">
    <li class="c-carousel-item">1</li>
    <li class="c-carousel-item">2</li>
    <li class="c-carousel-item">3</li>
    <li class="c-carousel-item">4</li>
    <li class="c-carousel-item">5</li>
    <li class="c-carousel-item">6</li>
  </ul>
</div>
```

## With Pause on Hover

Hover over the carousel to pause it:

<CarouselDemo id="h-hover" direction="horizontal" :num-visible="2" :pause-on-hover="true" />

```javascript
ContinuousCarousel('myCarousel', {
  numVisible: 2,
  pauseOnHover: true
});
```
