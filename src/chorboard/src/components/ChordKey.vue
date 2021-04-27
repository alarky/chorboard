<template>
  <div class="chord-key">
    <div class="chord-key-edit">
      <select class="base-note-selector" v-model="state.baseNoteName">
        <option v-for="name in baseNoteNames" :key="name" :value="name">{{ name }}</option>
      </select>
      <select class="chord-selector space-left" v-model="state.chordName">
        <option v-for="(cymbol, name) in chordCymbols" :key="name" :value="name">{{ cymbol }}</option>
      </select>
      <select class="on-note-selector space-top">
        <option>\</option>
        <option>E\</option>
        <option>D\</option>
      </select>
      <button class="rotate space-left">←</button>
      <button class="rotate space-left">→</button>
    </div>
    <div class="chord-key-button"
         @mousedown="on"
         @mouseup="off"
         @mouseout="off"
         @mouseenter="mouseEnter"
    >
      {{ chord }}

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/light.scss";

.chord-key {
  height: 211px;
  width: 130px;
}

.chord-key-edit {
  height: 60px;
  width: 100%;
}

select, button {
  @apply rounded-md;
  margin: 0;
  padding: 0 0 0 0.7em;
}

button {
  box-shadow: none;
  @apply border-solid;
  @apply border;
  @apply border-gray-400;
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
}

.chord-key-button {
  @apply rounded-xl;
  @apply nm-concave-gray-50;
  height: 100px;
  width: 100%;
}



</style>

<script lang="ts">
import {computed, reactive, defineComponent} from 'vue';
import { useStore } from '@/store';
import Note, {NoteNameMap} from "@/model/note";
import Chord, {ChordCymbols, ChordTypes} from "@/model/chord";

interface State {
  baseNoteName: string
  chordName: string
}

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

    const state = reactive<State>({
      baseNoteName: props.baseNoteName,
      chordName: props.chordName,
    });

    const baseNoteNames = computed(() => {
      return Object.values(NoteNameMap).reverse();
    });

    const chordCymbols = computed(() => {
      return ChordCymbols;
    })

    const baseNoteNumber = () => {
      let no = store.state.activeOctave * 12;
      for (const key in NoteNameMap) {
        const noteNumber = Number(key);
        if (NoteNameMap[noteNumber] == state.baseNoteName) {
          no += noteNumber;
        }
      }
      return no;
    }

    const on = () => {
      const baseNote = new Note(baseNoteNumber(), 127);
      const chord = new Chord(baseNote, ChordTypes[state.chordName]);
      for (const note of chord.notes) {
        store.commit('addNote', {v: note});
      }
    }

    const off = () => {
      const baseNote = new Note(baseNoteNumber(), 127);
      const chord = new Chord(baseNote, ChordTypes[state.chordName]);
      for (const note of chord.notes) {
        store.commit('delNote', {v: note.number});
      }
    }

    const chord = computed(() => {
      return `${state.baseNoteName}${ChordCymbols[state.chordName]}`;
    });

    const mouseEnter = () => {
      if (store.state.mouseIsDown) {
        on();
      }
    }

    return {
      state,
      baseNoteNames,
      chordCymbols,
      on,
      off,
      chord,
      mouseEnter,
    }
  }
});
</script>