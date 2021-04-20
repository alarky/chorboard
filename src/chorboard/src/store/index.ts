import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import MidiIO from "@/model/midiio";
import Note from "@/model/note";

export interface State {
  midiIO: MidiIO
  mouseIsDown: boolean
  fullLevel: boolean
  activeOctave: number
  activeNotes: {[name: number]: Note}
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    midiIO: new MidiIO(),
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
  },
  actions: {
  },
  modules: {
  }
});

export const useStore = (): Store<State> => {
  return baseUseStore(key);
};
