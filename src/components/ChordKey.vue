<template>
  <div class="chord-key">
    <div class="chord-key-label">
      <span class="chord-name">{{ chord.displayName }}</span>
      <div class="edit-button" @click="$emit('edit', onKey)">
        <div class="material-icons material-icons-outlined">edit</div>
      </div>
    </div>
    <div class="chord-key-button" :class="{ active: chord.isOn }"
         @mousedown="on"
         @mouseup="off"
         @mouseout="off"
         @mouseenter="mouseEnter"
    >
      <div class="on-key">
        <div>{{ onKey.toUpperCase() }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.chord-key {
  height: 160px;
  width: 130px;
}

.chord-key-label {
  height: 28px;
  width: 100%;
  @apply flex justify-between items-center px-1;
}

.chord-name {
  @apply text-sm text-gray-600 truncate;
}

.edit-button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  @apply text-gray-400 flex justify-center items-center rounded;
}

.edit-button:hover {
  @apply text-gray-600 bg-gray-200;
}

.edit-button .material-icons {
  font-size: 16px;
}

.chord-key-button {
  @apply rounded-xl flex justify-center items-center;
  background: linear-gradient(145deg, #ccd4dd, #fff);
  box-shadow: .2em .2em .4em #aebcc9, -.2em -.2em .4em #fff;
  height: 120px;
  width: 100%;
  margin-top: 4px;
  user-select: none;
}

.chord-key-button.active {
  background: linear-gradient(145deg, #ccd4dd, #fff);
  box-shadow: 0 0 8px 2px #ef4444, inset 0 0 2px #ef4444;
}

.on-key {
  width: 30px;
  height: 30px;
  @apply rounded-md border border-gray-300 text-gray-400 flex justify-center items-center;
}
</style>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useChorboardStore } from '@/stores/chorboard'
import Note, { NoteNameMap } from '@/model/note'
import Chord from '@/model/chord'

const props = withDefaults(defineProps<{
  onKey?: string
  baseNoteName?: string
  chordName?: string
}>(), {
  onKey: '',
  baseNoteName: 'C',
  chordName: 'None',
})

defineEmits<{
  edit: [key: string]
}>()

const store = useChorboardStore()

function noteNumber(noteName: string): number {
  const no = store.activeOctave * 12
  for (const key in NoteNameMap) {
    const num = Number(key)
    if (NoteNameMap[num] === noteName) {
      return no + num
    }
  }
  return 0
}

const _chord = new Chord(props.onKey, new Note(noteNumber(props.baseNoteName), 127), props.chordName)
store.addChord(_chord)

const chord = computed(() => store.chords[props.onKey])

function on() {
  store.onChord(chord.value.id, 127)
}

function off() {
  store.offChord(chord.value.id)
}

watch(() => store.keyIsDown[props.onKey], (isDown) => {
  if (isDown) {
    on()
  } else {
    off()
  }
})

function mouseEnter() {
  if (store.mouseIsDown) on()
}
</script>
