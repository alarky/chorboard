import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import MidiIO from "@/model/midiio";
import Note from "@/model/note";
import Synthesizer from "@/model/synthesizer";

const midiIO = MidiIO;

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
    activeOctave: 5,
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

export const useStore = (): Store<State> => {
  return baseUseStore(key);
};
