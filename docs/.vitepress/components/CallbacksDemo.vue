<template>
  <div class="carousel-demo-wrapper">
    <div
      id="adv-callbacks"
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
    <div class="callback-controls">
      <button :class="['demo-btn', { 'demo-btn--active': isPlaying }]" :disabled="destroyed" @click="handlePlay">Play</button>
      <button :class="['demo-btn', { 'demo-btn--active': !isPlaying }]" :disabled="destroyed" @click="handlePause">Pause</button>
      <button :class="['demo-btn', 'demo-btn--danger', { 'demo-btn--active': destroyed }]" :disabled="destroyed" @click="handleDestroy">Destroy</button>
    </div>
    <div class="callback-log">
      <span v-if="events.length === 0" class="log-empty">Callback events will appear here…</span>
      <TransitionGroup v-else name="log" tag="ul" class="log-list">
        <li v-for="event in events" :key="event.id" :class="['log-entry', `log-entry--${event.type}`]">
          <span class="log-name">{{ event.type }}</span>
          <span v-if="event.index != null" class="log-detail">slide {{ event.index }}</span>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const items = ['1', '2', '3', '4', '5', '6'];
const events = ref([]);
const isPlaying = ref(true);
const destroyed = ref(false);
let eventId = 0;
let carousel = null;

function addEvent(type, index = null) {
  events.value.unshift({ id: eventId++, type, index });
  if (events.value.length > 4) events.value.pop();
}

onMounted(async () => {
  const { default: ContinuousCarousel } = await import(
    '../../../dist/continuous-carousel.esm.js'
  );
  carousel = ContinuousCarousel('adv-callbacks', {
    interval: 3500,
    onSlideChange: (index) => addEvent('onSlideChange', index),
    onSlideEnd: (index) => addEvent('onSlideEnd', index),
    onPause: () => addEvent('onPause'),
    onPlay: () => addEvent('onPlay'),
    onDestroy: () => addEvent('onDestroy'),
  });
});

onUnmounted(() => {
  if (!destroyed.value) carousel?.destroy();
});

function handlePlay() {
  carousel?.play();
  isPlaying.value = true;
}

function handlePause() {
  carousel?.pause();
  isPlaying.value = false;
}

function handleDestroy() {
  carousel?.destroy();
  destroyed.value = true;
  isPlaying.value = false;
}
</script>

<style scoped>
.callback-controls {
  display: flex;
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

.demo-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.demo-btn--active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.demo-btn--danger:hover:not(:disabled),
.demo-btn--danger.demo-btn--active {
  border-color: var(--vp-c-danger-1, #f43f5e);
  background: var(--vp-c-danger-soft, #fef2f2);
  color: var(--vp-c-danger-1, #f43f5e);
}

.callback-log {
  display: flex;
  align-items: flex-start;
  min-height: 36px;
  margin-top: 16px;
}

.log-empty {
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.log-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.log-entry {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-family: var(--vp-font-family-mono);
}

.log-name {
  font-weight: 600;
}

.log-entry--onSlideChange .log-name {
  color: var(--vp-c-brand-1);
}

.log-entry--onSlideEnd .log-name {
  color: var(--vp-c-text-2);
}

.log-detail {
  color: var(--vp-c-text-2);
}

.log-enter-active {
  transition: opacity 0.2s, transform 0.2s;
}

.log-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
