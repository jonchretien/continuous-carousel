<template>
  <div class="carousel-demo-wrapper">
    <div
      :id="id"
      class="c-carousel-container"
      :data-direction="direction"
      :data-num-visible="String(numVisible)"
      :data-reverse="reverse ? 'true' : undefined"
    >
      <ul class="c-carousel-group">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="c-carousel-item"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  items: { type: Array, default: () => ['1', '2', '3', '4', '5', '6'] },
  direction: { type: String, default: 'horizontal' },
  numVisible: { type: Number, default: 1 },
  interval: { type: Number, default: 2000 },
  pauseOnHover: { type: Boolean, default: false },
  autoplay: { type: Boolean, default: true },
  reverse: { type: Boolean, default: false },
});

let carousel = null;

onMounted(async () => {
  const { default: ContinuousCarousel } = await import(
    '../../../dist/continuous-carousel.esm.js'
  );
  carousel = ContinuousCarousel(props.id, {
    direction: props.direction,
    numVisible: props.numVisible,
    interval: props.interval,
    pauseOnHover: props.pauseOnHover,
    autoplay: props.autoplay,
    reverse: props.reverse,
  });
});

onUnmounted(() => {
  if (carousel) carousel.destroy();
});
</script>
