<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ chord.displayName }}</h2>
        <div class="close-button" @click="close">
          <div class="material-icons">close</div>
        </div>
      </div>

      <div class="modal-body">
        <!-- Root & Type -->
        <div class="edit-section">
          <div class="edit-row">
            <label>Root</label>
            <select v-model="baseNote">
              <option v-for="name in noteNames" :key="name" :value="name">{{ name }}</option>
            </select>
          </div>
          <div class="edit-row">
            <label>Type</label>
            <select v-model="chordType">
              <optgroup v-for="(types, category) in ChordCategories" :key="category" :label="category">
                <option v-for="t in types" :key="t" :value="t">{{ ChordSymbols[t] || t }}</option>
              </optgroup>
            </select>
          </div>
          <div class="edit-row">
            <label>Bass</label>
            <select v-model="bassNote">
              <option value="">-</option>
              <option v-for="name in noteNames" :key="name" :value="name">/{{ name }}</option>
            </select>
          </div>
        </div>

        <!-- Voicings -->
        <div class="edit-section">
          <label class="section-label">Voicing</label>
          <div class="voicing-list">
            <div
              v-for="v in availableVoicings"
              :key="v.name"
              class="voicing-item"
              :class="{ selected: isCurrentVoicing(v.offsets) }"
              @click="selectVoicing(v.offsets)"
            >
              <span class="voicing-name">{{ v.name }}</span>
              <span class="voicing-notes">{{ formatVoicingNotes(v.offsets) }}</span>
            </div>
          </div>
        </div>

        <!-- Custom Voicing -->
        <div class="edit-section">
          <label class="section-label">Custom Voicing</label>
          <div class="custom-voicing">
            <div v-for="(offset, i) in chord.voicing" :key="i" class="custom-note">
              <span class="custom-note-name">{{ noteNameFromOffset(offset) }}</span>
              <div class="octave-controls">
                <div class="octave-btn" @click="adjustNoteOctave(i, 1)">
                  <div class="material-icons">arrow_drop_up</div>
                </div>
                <div class="octave-btn" @click="adjustNoteOctave(i, -1)">
                  <div class="material-icons">arrow_drop_down</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  @apply flex justify-center items-center;
  z-index: 100;
}

.modal {
  background: #d1d5db;
  box-shadow: 8px 8px 24px #959eac, -8px -8px 24px #fff;
  @apply rounded-2xl;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  @apply flex justify-between items-center px-6 pt-5 pb-3;
}

.modal-header h2 {
  @apply text-2xl italic;
}

.close-button {
  cursor: pointer;
  @apply text-gray-500 rounded-full flex justify-center items-center;
  width: 32px;
  height: 32px;
}

.close-button:hover {
  @apply text-gray-700 bg-gray-200;
}

.modal-body {
  @apply px-6 pb-6;
}

.edit-section {
  @apply mt-4;
}

.edit-row {
  @apply flex items-center gap-3 mt-2;
}

.edit-row label {
  width: 40px;
  @apply text-sm text-gray-500;
}

.edit-row select {
  @apply rounded-lg bg-gray-200 border border-gray-400 px-3 py-1 text-sm;
  margin: 0;
}

.section-label {
  @apply text-sm text-gray-500 block mb-2;
}

.voicing-list {
  @apply flex flex-col gap-1;
  max-height: 200px;
  overflow-y: auto;
}

.voicing-item {
  @apply flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer text-sm;
  background: #c9cdd3;
}

.voicing-item:hover {
  background: #bfc4cb;
}

.voicing-item.selected {
  background: linear-gradient(145deg, #b0b8c2, #d8dee6);
  box-shadow: inset 2px 2px 4px #a0a8b2, inset -2px -2px 4px #e0e6ee;
  @apply font-bold;
}

.voicing-name {
  @apply text-gray-600;
}

.voicing-notes {
  @apply text-gray-400 text-xs;
}

.custom-voicing {
  @apply flex gap-2 flex-wrap;
}

.custom-note {
  @apply flex flex-col items-center rounded-lg px-2 py-1;
  background: #c9cdd3;
  min-width: 48px;
}

.custom-note-name {
  @apply text-sm text-gray-600 font-bold;
}

.octave-controls {
  @apply flex flex-col;
}

.octave-btn {
  cursor: pointer;
  @apply text-gray-400 flex justify-center items-center;
  height: 20px;
}

.octave-btn:hover {
  @apply text-gray-700;
}

.octave-btn .material-icons {
  font-size: 20px;
}
</style>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useChorboardStore } from '@/stores/chorboard'
import Note, { NoteNameMap } from '@/model/note'
import { ChordSymbols, ChordCategories, generateVoicings } from '@/model/chord'

const props = defineProps<{
  chordId: string
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const store = useChorboardStore()

const chord = computed(() => store.chords[props.chordId])

const noteNames = computed(() => Object.values(NoteNameMap).reverse())

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

// Root note
const baseNote = computed({
  get: () => chord.value?.baseNote.name ?? 'C',
  set: (v: string) => {
    if (chord.value) {
      store.setChordBaseNote(chord.value.id, new Note(noteNumber(v), 127))
    }
  },
})

// Chord type
const chordType = computed({
  get: () => chord.value?.chordType ?? 'Major',
  set: (v: string) => {
    if (chord.value) {
      store.setChordType(chord.value.id, v)
    }
  },
})

// Bass note (slash chord)
const bassNote = computed({
  get: () => chord.value?.bassNote?.name ?? '',
  set: (v: string) => {
    if (!chord.value) return
    if (v === '') {
      store.setChordBassNote(chord.value.id, null)
    } else {
      // Bass note one octave below the root
      const bassNoteNumber = noteNumber(v) - 12
      store.setChordBassNote(chord.value.id, new Note(bassNoteNumber, 127))
    }
  },
})

// Available voicings for current chord type
const availableVoicings = computed(() => {
  if (!chord.value) return []
  return generateVoicings(chord.value.chordType)
})

function isCurrentVoicing(offsets: number[]): boolean {
  if (!chord.value) return false
  return JSON.stringify(chord.value.voicing) === JSON.stringify(offsets)
}

function selectVoicing(offsets: number[]) {
  if (chord.value) {
    store.setChordVoicing(chord.value.id, [...offsets])
  }
}

// Format voicing as note names
function noteNameFromOffset(offset: number): string {
  if (!chord.value) return ''
  const noteNum = chord.value.baseNote.number + offset
  const note = new Note(noteNum)
  return note.asStr
}

function formatVoicingNotes(offsets: number[]): string {
  return offsets.map(o => noteNameFromOffset(o)).join(' ')
}

// Custom voicing: adjust individual note octave
function adjustNoteOctave(index: number, direction: number) {
  if (!chord.value) return
  const newVoicing = [...chord.value.voicing]
  newVoicing[index] += direction * 12
  store.setChordVoicing(chord.value.id, newVoicing)
}

function close() {
  emit('close')
}
</script>
