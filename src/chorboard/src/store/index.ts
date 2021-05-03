import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import MidiIO from "@/model/midiio";
import Note from "@/model/note";
import Synthesizer from "@/model/synthesizer";
import Chord from "@/model/chord";

export interface State {
  mouseIsDown: boolean
  keyIsDown: {[name: string]: boolean}
  activeOctave: number
  activeNotes: {[name: number]: Note}
  chords: {[name: string]: Chord}
  activeChords: {[name: string]: Chord}
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    mouseIsDown: false,
    keyIsDown: {},
    activeOctave: 4,
    activeNotes: {},
    chords: {},
    activeChords: {},
  },
  mutations: {
    mouseIsDown(state, {v}) {
      state.mouseIsDown = v;
    },
    keyDown(state, {v}) {
      state.keyIsDown[v] = true;
    },
    keyUp(state, {v}) {
      state.keyIsDown[v] = false;
    },
    activeOctave(state, {v}) {
      state.activeOctave = v;
    },
    addNote(state, {v}) {
      state.activeNotes[v.number] = v;
      // Synthesizer.update(state.activeNotes);
    },
    delNote(state, {v}) {
      delete state.activeNotes[v];
      // Synthesizer.update(state.activeNotes);
    },
    addChord(state, {v}) {
      state.chords[v.id] = v;
    },
    setChordBaseNote(state, {id, v}) {
      state.chords[id].baseNote = v;
    },
    setChordType(state, {id, v}) {
      state.chords[id].chordType = v;
    },
    onChord(state, {v}) {
      state.activeChords[v] = state.chords[v];
      state.activeNotes = {};
      for (const cid of Object.keys(state.activeChords)) {
        for (const note of state.activeChords[cid].notes) {
          state.activeNotes[note.number] = note;
        }
      }
      Synthesizer.update(state.activeNotes);
    },
    offChord(state, {v}) {
      delete state.activeChords[v];
      state.activeNotes = {};
      for (const cid of Object.keys(state.activeChords)) {
        for (const note of state.activeChords[cid].notes) {
          state.activeNotes[note.number] = note;
        }
      }
      Synthesizer.update(state.activeNotes);
    },
  },
  actions: {
  },
  modules: {
  }
});

MidiIO.noteOnHandler = (noteNumber, velocity) => {
  const octave = (noteNumber - noteNumber % 12) / 12;
  const octaveDelta = octave - store.state.activeOctave;
  if (octaveDelta > 2) {
    store.commit('activeOctave', {v: octave - 2});
  } else if (octaveDelta < 0) {
    store.commit('activeOctave', {v: octave});
  }

  if (velocity > 0) {
    const note = new Note(noteNumber, velocity);
    store.commit('addNote', {v: note});
  } else {
    store.commit('delNote', {v: noteNumber});
  }
};

MidiIO.noteOffHandler = (noteNumber, velocity) => {
  store.commit('delNote', {v: noteNumber});
};


export const useStore = (): Store<State> => {
  return baseUseStore(key);
};
