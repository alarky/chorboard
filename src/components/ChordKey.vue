<template>
  <div class="chord-key">
    <div class="chord-key-edit-row">
      <select class="base-note-selector" v-model="baseNote">
        <option v-for="name in noteNames" :key="name" :value="name">{{ name }}</option>
      </select>
      <select class="chord-selector space-left" v-model="chordType">
        <option v-for="(cymbol, name) in ChordCymbols" :key="name" :value="name">{{ cymbol }}</option>
      </select>
    </div>
    <div class="chord-key-edit-row space-top">
      <select class="on-note-selector">
        <option v-if="rootNoteName">/{{ rootNoteName }}</option>
      </select>
      <div @click="rotate(-1)" class="rotate space-left">
        <div class="material-icons material-icons-outlined">rotate_left</div>
      </div>
      <div @click="rotate(1)" class="rotate space-left">
        <div class="material-icons material-icons-outlined">rotate_right</div>
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
  height: 180px;
  width: 130px;
}

.chord-key-edit-row {
  height: 24px;
  width: 100%;
  @apply flex justify-center items-center;
}

select, button {
  @apply rounded-md;
  margin: 0;
  padding: 0 0 0 0.7em;
}

.base-note-selector {
  width: 40px;
}

.space-left {
  margin-left: 5px;
}

.space-top {
  margin-top: 5px;
}

.chord-selector {
  width: 85px;
}

.on-note-selector {
  width: 40px;
}

.rotate {
  width: 40px;
  height: 24px;
  @apply text-gray-500 border border-gray-400 rounded-md flex justify-center items-center;
}

.rotate > div {
  margin-top: 2px;
  margin-left: 2px;
  font-size: 18px;
  user-select: none;
}

.chord-key-button {
  @apply rounded-xl flex justify-center items-center;
  background: linear-gradient(145deg, #ccd4dd, #fff);
  box-shadow: .2em .2em .4em #aebcc9, -.2em -.2em .4em #fff;
  height: 120px;
  width: 100%;
  margin-top: 7px;
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
import Chord, { ChordCymbols } from '@/model/chord'

const props = withDefaults(defineProps<{
  onKey?: string
  baseNoteName?: string
  chordName?: string
}>(), {
  onKey: '',
  baseNoteName: 'C',
  chordName: 'None',
})

const store = useChorboardStore()

const noteNames = computed(() => Object.values(NoteNameMap).reverse())

function noteNumber(noteName: string): number {
  let no = store.activeOctave * 12
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

const baseNote = computed({
  get: () => chord.value.baseNote.name,
  set: (v: string) => store.setChordBaseNote(chord.value.id, new Note(noteNumber(v), 127)),
})

const chordType = computed({
  get: () => chord.value.chordType,
  set: (v: string) => store.setChordType(chord.value.id, v),
})

const rootNoteName = computed(() => {
  if (chord.value.rotation === 0) return ''
  const num = chord.value.notes[0].number % 12
  return NoteNameMap[num]
})

function on() {
  store.onChord(chord.value.id, 127)
}

function off() {
  store.offChord(chord.value.id)
}

function rotate(v: number) {
  store.rotateChord(chord.value.id, v)
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
