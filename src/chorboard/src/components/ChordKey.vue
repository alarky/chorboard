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
import Note, {NoteNameMap} from "@/model/note";
import Chord, {ChordCymbols, ChordTypes} from "@/model/chord";

export default defineComponent({
  name: 'ChordKey',
  props: {
    baseNoteName: {
      type: String,
      default: "C",
    },
    chordName: {
      type: String,
      default: "None",
    },
  },
  setup(props) {
    const store = useStore();

    const baseNoteNumber = () => {
      let no = store.state.activeOctave * 12;
      for (const key in NoteNameMap) {
        const noteNumber = Number(key);
        if (NoteNameMap[noteNumber] == props.baseNoteName) {
          no += noteNumber;
        }
      }
      return no;
    }

    const on = () => {
      const baseNote = new Note(baseNoteNumber(), 127);
      const chord = new Chord(baseNote, ChordTypes[props.chordName]);
      for (const note of chord.notes) {
        store.commit('addNote', {v: note});
      }
    }

    const off = () => {
      const baseNote = new Note(baseNoteNumber(), 127);
      const chord = new Chord(baseNote, ChordTypes[props.chordName]);
      for (const note of chord.notes) {
        store.commit('delNote', {v: note.number});
      }
    }

    const chord = computed(() => {
      return `${props.baseNoteName}${ChordCymbols[props.chordName]}`;
    });

    const mouseEnter = () => {
      if (store.state.mouseIsDown) {
        on();
      }
    }

    return {
      on,
      off,
      chord,
      mouseEnter,
    }
  }
});
</script>