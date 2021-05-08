<template>
  <div class="chord-key">
    <div class="chord-key-edit-row">
      <select class="base-note-selector" v-model="baseNote">
        <option v-for="name in noteNames" :key="name" :value="name">{{ name }}</option>
      </select>
      <select class="chord-selector space-left" v-model="chordType">
        <option v-for="(cymbol, name) in chordCymbols" :key="name" :value="name">{{ cymbol }}</option>
      </select>
    </div>
    <div class="chord-key-edit-row space-top">
      <select class="on-note-selector">
        <option>\</option>
        <option>E\</option>
        <option>D\</option>
      </select>
      <div @click="rotate(-1)" class="rotate space-left">
        <div class="material-icons material-icons-outlined">
          rotate_left
        </div>
      </div>
      <div @click="rotate(1)" class="rotate space-left">
        <div class="material-icons material-icons-outlined">
          rotate_right
        </div>
      </div>
    </div>
    <div class="chord-key-button space-top" :class="{active: state.isOn}"
         @mousedown="on"
         @mouseup="off"
         @mouseout="off"
         @mouseenter="mouseEnter"
    >
      <div class="on-key">
        <div>
          {{ onKey.toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/light.scss";

.chord-key {
  height: 180px;
  width: 130px;
}

.chord-key-edit-row {
  height: 24px;
  width: 100%;
  @apply flex;
  @apply justify-center;
  @apply items-center;
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
  @apply text-gray-500;
  @apply border;
  @apply border-gray-400;
  @apply rounded-md;
  @apply flex;
  @apply justify-center;
  @apply items-center;
}

.rotate > div {
  margin-top: 2px;
  margin-left: 2px;
  font-size: 18px;
  user-select: none;
}


.chord-key-button {
  @apply rounded-xl;
  @apply nm-concave-gray-50;
  height: 120px;
  width: 100%;
  user-select: none;
  @apply flex;
  @apply justify-center;
  @apply items-center;
}

.chord-key-button.active {
  @apply nm-concave-gray-50;
  @apply light-red;
}

.on-key {
  width: 30px;
  height: 30px;
  @apply rounded-md;
  @apply border;
  @apply border-gray-300;
  @apply text-gray-400;
  @apply flex;
  @apply justify-center;
  @apply items-center;
}



</style>

<script lang="ts">
import {computed, reactive, defineComponent, watch, toRefs} from 'vue';
import { useStore } from '@/store';
import Note, {NoteNameMap} from "@/model/note";
import Chord, {ChordCymbols, ChordTypes} from "@/model/chord";

interface State {
  isOn: boolean
}

export default defineComponent({
  name: 'ChordKey',
  props: {
    onKey: {
      type: String,
      default: "",
    },
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
      isOn: false,
    });

    const noteNames = computed(() => {
      return Object.values(NoteNameMap).reverse();
    });

    const chordCymbols = computed(() => {
      return ChordCymbols;
    })

    const noteNumber = (noteName: string) => {
      let no = store.state.activeOctave * 12;
      for (const key in NoteNameMap) {
        const noteNumber = Number(key);
        if (NoteNameMap[noteNumber] == noteName) {
          return no + noteNumber;
        }
      }
      return 0;
    }

    const _chord = new Chord(props.onKey, new Note(noteNumber(props.baseNoteName), 64), props.chordName);
    store.commit('addChord', {v: _chord});

    const chord = computed(() => store.state.chords[props.onKey])

    const baseNote = computed({
      get: () => chord.value.baseNote.name,
      set: (v: string) => {
        store.commit('setChordBaseNote', {id: chord.value.id, 'v': new Note(noteNumber(v), 64)})
      }
    })

    const chordType = computed( {
      get: () => chord.value.chordType,
      set: (v: string) => {
        store.commit('setChordType', {id: chord.value.id, 'v': v})
      }
    })

    const on = () => {
      if (state.isOn) return;
      state.isOn = true;
      store.commit('onChord', {v: chord.value.id});
    }

    const off = () => {
      if (!state.isOn) return;
      state.isOn = false;
      store.commit('offChord', {v: chord.value.id});
    }

    const rotate = (v: number) => {
      store.commit('rotateChord', {id: chord.value.id, 'v': v});
    }

    watch(store.state.keyIsDown, (newValue) => {
      if (newValue[props.onKey]) {
        on();
      } else if (!newValue[props.onKey]) {
        off();
      }
    }, {deep:true});

    const mouseEnter = () => {
      if (store.state.mouseIsDown) {
        on();
      }
    }

    return {
      state,
      noteNames,
      chordCymbols,
      chord,
      baseNote,
      chordType,
      rotate,
      on,
      off,
      mouseEnter,
    }
  }
});
</script>