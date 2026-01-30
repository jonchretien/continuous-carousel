<script setup>
import CarouselDemo from '../.vitepress/components/CarouselDemo.vue';
</script>

# Vertical Carousel

## Single Item

<CarouselDemo id="v-single" direction="vertical" :num-visible="1" />

```javascript
ContinuousCarousel('myCarousel', {
  direction: 'vertical'
});
```

```html
<div id="myCarousel" class="c-carousel-container" data-direction="vertical" data-num-visible="1">
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

Show 2 items at once:

<CarouselDemo id="v-multi" direction="vertical" :num-visible="2" />

```javascript
ContinuousCarousel('myCarousel', {
  direction: 'vertical',
  numVisible: 2
});
```

```html
<div id="myCarousel" class="c-carousel-container" data-direction="vertical" data-num-visible="2">
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
