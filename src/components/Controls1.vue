<template>
  <div class="controls">
    <div class="control">
      <div class="label-container">
        <label for="active-midi-input">MIDI IN</label>
      </div>
      <div>
        <select id="active-midi-input" v-model="activeMidiInput">
          <option value="-">-</option>
          <option v-for="input in midiInputs" :key="input.id" :value="input.id">{{ input.name }}</option>
        </select>
      </div>
    </div>
    <div class="control">
      <div class="label-container">
        <label for="active-midi-output">MIDI OUT</label>
      </div>
      <div>
        <select id="active-midi-output" v-model="activeMidiOutput">
          <option value="-">-</option>
          <template v-for="output in midiOutputs" :key="output.id">
            <option v-for="channel in midiChannels" :key="channel" :value="`${output.id}:${channel}`">{{ output.name }}: ch{{ channel }}</option>
          </template>
        </select>
      </div>
    </div>
    <div class="control">
      <div class="label-container">
        <label for="active-octave-input">OCTAVE</label>
      </div>
      <div>
        <input type="number" id="active-octave-input" v-model="activeOctave" min="0" max="9">
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.controls {
  @apply flex flex-row;
}

.control {
  @apply flex flex-col;
  margin-left: 5px;
}

.label-container {
  @apply flex justify-center pr-1;
}

select, input {
  @apply m-0;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useChorboardStore } from '@/stores/chorboard'

const store = useChorboardStore()

const midiChannels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

const midiInputs = computed(() => store.midiIO ? store.midiIO.inputs : [])
const midiOutputs = computed(() => store.midiIO ? store.midiIO.outputs : [])

const activeMidiInput = computed({
  get: () => store.midiIO ? store.midiIO.activeInputID || '-' : '-',
  set: (v: string) => store.setMidiInput(v),
})

const activeMidiOutput = computed({
  get: () => {
    if (!store.midiIO || !store.midiIO.activeOutputID) return '-'
    return `${store.midiIO.activeOutputID}:${store.midiIO.activeOutputChannel}`
  },
  set: (v: string) => {
    const vs = v.split(':')
    store.setMidiOutput(vs[0], Number(vs[1]))
  },
})

const activeOctave = computed({
  get: () => store.activeOctave,
  set: (v: number) => store.setActiveOctave(Number(v)),
})
</script>
