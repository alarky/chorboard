<template>
  <div class="app" @mousedown="store.setMouseIsDown(true)" @mouseup="mouseUp" @mouseleave="mouseUp">
    <div class="view-container">
      <router-view />
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/main.css";

.app {
  @apply min-h-screen bg-gray-300 text-gray-600;
}

.view-container {
  @apply mx-auto py-4;
  width: 1030px;
}
</style>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useChorboardStore } from '@/stores/chorboard'

const store = useChorboardStore()

function mouseUp() {
  store.setMouseIsDown(false)
}

function handleKeyDown(e: KeyboardEvent) {
  store.keyDown(e.key)
}

function handleKeyUp(e: KeyboardEvent) {
  store.keyUp(e.key)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  store.initMidiIO()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>
