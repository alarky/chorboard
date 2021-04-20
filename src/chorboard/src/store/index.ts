import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import MidiIO from "@/model/midiio";
import Note from "@/model/note";
import Synthesizer from "@/model/synthesizer";

export interface State {
  mouseIsDown: boolean
  fullLevel: boolean
  activeOctave: number
  activeNotes: {[name: number]: Note}
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    mouseIsDown: false,
    fullLevel: false,
    activeOctave: 4,
    activeNotes: {},
  },
  mutations: {
    mouseIsDown(state, {v}) {
      state.mouseIsDown = v;
    },
    fullLevel(state, {v}) {
      state.fullLevel = v;
    },
    activeOctave(state, {v}) {
      state.activeOctave = v;
    },
    addNote(state, {v}) {
      state.activeNotes[v.number] = v;
      Synthesizer.update(state.activeNotes);
    },
    delNote(state, {v}) {
      delete state.activeNotes[v];
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

  const note = new Note(noteNumber, velocity);
  store.commit('addNote', {v: note});
};

MidiIO.noteOffHandler = (noteNumber, velocity) => {
  store.commit('delNote', {v: noteNumber});
};


export const useStore = (): Store<State> => {
  return baseUseStore(key);
};
