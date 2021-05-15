<template>
  <div class="controls">
    <div class="control">
      <div class="label-container">
        <label for="active-midi-output">MIDI IN</label>
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

<style scoped lang="scss">
.controls {
  @apply flex;
  @apply flex-row;
}

.control {
  @apply flex;
  @apply flex-col;
}

.label-container {
  @apply flex;
  @apply justify-center;
  @apply pr-1;
}

input {
  @apply m-0;
}

</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {useStore} from "@/store";

export default defineComponent({
  name: 'Controls1',
  setup() {
    const store = useStore();

    const midiChannels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const midiInputs = computed( () => store.state.midiIO ? store.state.midiIO.inputs : [] );
    const midiOutputs = computed( () => store.state.midiIO ? store.state.midiIO.outputs : [] );

    const activeMidiInput = computed( {
      get: () => store.state.midiIO ? store.state.midiIO.activeInputID || "-" : "-",
      set: (v) => {
        console.log(v);
      }
    });

    const activeMidiOutput = computed({
      get: () => {
        if (!store.state.midiIO || !store.state.midiIO.activeOutputID) return "-";
        return `${store.state.midiIO.activeOutputID}:${store.state.midiIO.activeOutputChannel}`
      },
      set: (v) => {
        const vs = v.split(":");
        store.commit('setMidiOutput', {id: vs[0], channel: Number(vs[1])});
      }
    });

    const activeOctave = computed({
      get: () => store.state.activeOctave,
      set: (v) => store.commit('activeOctave', {v: Number(v)}),
    });

    return {
      midiChannels,
      midiInputs,
      activeMidiInput,
      activeMidiOutput,
      midiOutputs,
      activeOctave,
    }
  }
});
</script>