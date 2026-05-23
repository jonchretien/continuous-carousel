<script setup>
import CarouselDemo from '../.vitepress/components/CarouselDemo.vue';
import CallbacksDemo from '../.vitepress/components/CallbacksDemo.vue';
import ProgrammaticDemo from '../.vitepress/components/ProgrammaticDemo.vue';
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

## Custom Easing

Use any CSS `transition-timing-function` for the slide animation:

<CarouselDemo id="adv-easing" direction="horizontal" :num-visible="1" :interval="2000" easing="linear" />

```javascript
ContinuousCarousel('myCarousel', {
  easing: 'linear'
});

ContinuousCarousel('myCarousel', {
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
});
```

## Callbacks

Hook into carousel events. `onSlideChange` fires when a slide begins transitioning; `onSlideEnd` fires once the animation completes:

<CallbacksDemo />

```javascript
const log = document.getElementById('callbackLog');
const addEvent = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  log.prepend(li);
};

const carousel = ContinuousCarousel('myCarousel', {
  interval: 3500,
  onSlideChange: (index) => addEvent(`onSlideChange → slide ${index}`),
  onSlideEnd: (index) => addEvent(`onSlideEnd → slide ${index}`),
  onPause: () => addEvent('onPause'),
  onPlay: () => addEvent('onPlay'),
  onDestroy: () => addEvent('onDestroy'),
});
```

## Programmatic Control

Use the API to control playback and navigation:

<ProgrammaticDemo />

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

// Jump to a specific slide (0-based index)
document.getElementById('slide3Btn').addEventListener('click', () => {
  carousel.goToSlide(2);
});

document.getElementById('destroyBtn').addEventListener('click', () => {
  carousel.destroy();
});
```

## Dynamic Configuration

Update settings on a running carousel:

<CarouselDemo id="adv-dynamic" direction="horizontal" :num-visible="1" :interval="2000" />

```javascript
const carousel = ContinuousCarousel('myCarousel', {
  interval: 2000
});

// Speed up
carousel.updateConfig({ interval: 500 });

// Slow down
carousel.updateConfig({ interval: 5000 });
```

## Keyboard Navigation

Tab to the carousel and use arrow keys to advance slides. Press Space or Enter to toggle pause.

<CarouselDemo id="adv-keyboard" direction="horizontal" :num-visible="1" :interval="3000" />

```javascript
ContinuousCarousel('myCarousel', {
  keyboardNav: true // enabled by default
});
```

::: tip
Click the carousel above, then use **Arrow Right** to advance or **Space** to pause.
:::

