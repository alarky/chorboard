<template>
  <div class="chord-key"
      @mousedown="on"
      @mouseup="off"
      @mouseout="off"
      @mouseenter="mouseEnter"
  >
    <div>
      {{ chord }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/light.scss";

.chord-key {
  @apply rounded-xl;
  @apply nm-concave-gray-50;
  @apply flex;
  @apply justify-center;
  @apply content-end;
}



</style>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useStore } from '@/store';
import Note from "@/model/note";
import Chord, {ChordTypes} from "@/model/chord";

export default defineComponent({
  name: 'ChordKey',
  props: {
    chord: {
      type: String,
      default: "C",
    },
  },
  setup(props) {
    const store = useStore();

    const on = () => {
      const baseNote = new Note(48, 127);
      const chord = new Chord(baseNote, ChordTypes.MajorSeventh);
      for (const note of chord.notes) {
        store.commit('addNote', {v: note});
      }
    }

    const off = () => {
      const baseNote = new Note(48, 127);
      const chord = new Chord(baseNote, ChordTypes.MajorSeventh);
      for (const note of chord.notes) {
        store.commit('delNote', {v: note.number});
      }
    }

    const mouseEnter = () => {
      if (store.state.mouseIsDown) {
        on();
      }
    }

    return {
      on,
      off,
      mouseEnter,
    }
  }
});
</script>