<script setup>
import CarouselDemo from '../.vitepress/components/CarouselDemo.vue';
</script>

# Advanced Examples

## Custom Timing

Slower interval with a fast transition:

<CarouselDemo id="adv-timing" direction="horizontal" :num-visible="1" :interval="4000" />

```javascript
ContinuousCarousel('myCarousel', {
  interval: 4000,
  transitionDuration: 500
});
```

## Callbacks

Hook into carousel events:

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  onSlideChange: (index) => {
    console.log('Slide changed to:', index);
    document.getElementById('counter').textContent = `Slide ${index}`;
  },
  onPause: () => console.log('Paused'),
  onPlay: () => console.log('Playing'),
  onDestroy: () => console.log('Destroyed')
});
```

## Programmatic Control

Use the API to control playback:

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  autoplay: false
});

document.getElementById('playBtn').addEventListener('click', () => {
  carousel.play();
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  carousel.pause();
});

document.getElementById('destroyBtn').addEventListener('click', () => {
  carousel.destroy();
});
```

## Dynamic Configuration

Update settings on a running carousel:

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  interval: 2000
});

// Speed up
carousel.updateConfig({ interval: 500 });

// Slow down
carousel.updateConfig({ interval: 5000 });
```

## Image Gallery

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
```

```javascript
ContinuousCarousel('gallery', {
  interval: 5000,
  pauseOnHover: true
});
```
