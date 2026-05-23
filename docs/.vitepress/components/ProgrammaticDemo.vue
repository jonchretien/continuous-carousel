<template>
  <div class="carousel-demo-wrapper">
    <div
      id="adv-programmatic"
      class="c-carousel-container"
      data-direction="horizontal"
      data-num-visible="1"
    >
      <ul class="c-carousel-group">
        <li
          v-for="(item, i) in items"
          :key="i"
          :class="['c-carousel-item', `slide-color-${(i % 6) + 1}`]"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="programmatic-controls">
      <button :class="['demo-btn', { 'demo-btn--active': isPlaying }]" :disabled="destroyed" @click="handlePlay">Play</button>
      <button :class="['demo-btn', { 'demo-btn--active': !isPlaying }]" :disabled="destroyed" @click="handlePause">Pause</button>
      <button class="demo-btn" :disabled="destroyed" @click="handleGoToSlide">Go to slide 3</button>
      <button :class="['demo-btn', 'demo-btn--danger', { 'demo-btn--active': destroyed }]" :disabled="destroyed" @click="handleDestroy">Destroy</button>
      <span v-if="destroyed" class="destroyed-label">Destroyed</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const items = ['1', '2', '3', '4', '5', '6'];
const destroyed = ref(false);
const isPlaying = ref(false);
let carousel = null;

onMounted(async () => {
  const { default: ContinuousCarousel } = await import(
    '../../../dist/continuous-carousel.esm.js'
  );
  carousel = ContinuousCarousel('adv-programmatic', { autoplay: false });
});

onUnmounted(() => {
  if (carousel && !destroyed.value) carousel.destroy();
});

function handlePlay() {
  carousel?.play();
  isPlaying.value = true;
}

function handlePause() {
  carousel?.pause();
  isPlaying.value = false;
}

function handleGoToSlide() {
  carousel?.goToSlide(2);
}

function handleDestroy() {
  carousel?.destroy();
  destroyed.value = true;
}
</script>

<style scoped>
.programmatic-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.demo-btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.demo-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.demo-btn--active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.demo-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.demo-btn--danger:hover:not(:disabled),
.demo-btn--danger.demo-btn--active {
  border-color: var(--vp-c-danger-1, #f43f5e);
  background: var(--vp-c-danger-soft, #fef2f2);
  color: var(--vp-c-danger-1, #f43f5e);
}

.destroyed-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
