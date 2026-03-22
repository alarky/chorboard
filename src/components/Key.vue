<template>
  <div class="key" :class="{
    black: isBlack,
    white: !isBlack,
    active: isActive,
    auto: isAuto,
    }"
  >
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.key {
  @apply rounded-xl;
}

.black {
  background: linear-gradient(145deg, #818999, #aeb4be);
  box-shadow: .2em .2em .4em #6f7989, -.2em -.2em .4em #c1c5cd;
}

.white {
  background: linear-gradient(145deg, #ccd4dd, #fff);
  box-shadow: .2em .2em .4em #aebcc9, -.2em -.2em .4em #fff;
}

.black.active {
  background: linear-gradient(145deg, #818999, #aeb4be);
  box-shadow: 0 0 8px 2px #ef4444, inset 0 0 2px #ef4444;
}

.white.active {
  background: linear-gradient(145deg, #ccd4dd, #fff);
  box-shadow: 0 0 8px 2px #ef4444, inset 0 0 2px #ef4444;
}

.black.auto {
  background: linear-gradient(145deg, #818999, #aeb4be);
  box-shadow: 0 0 8px 2px #10b981, inset 0 0 2px #10b981;
}

.white.auto {
  background: linear-gradient(145deg, #ccd4dd, #fff);
  box-shadow: 0 0 8px 2px #10b981, inset 0 0 2px #10b981;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useChorboardStore } from '@/stores/chorboard'

const props = defineProps<{ number?: number }>()
const store = useChorboardStore()

const noteNumber = computed(() => store.activeOctave * 12 + (props.number ?? 0))

const isActive = computed(() => {
  const note = store.activeNotes[noteNumber.value]
  return note ? !note.isAuto : false
})

const isAuto = computed(() => {
  const note = store.activeNotes[noteNumber.value]
  return note ? note.isAuto : false
})

const isBlack = computed(() => {
  const tone = noteNumber.value % 12
  return [1, 3, 6, 8, 10].includes(tone)
})
</script>
