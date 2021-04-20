import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from 'vuex'

export interface State {
  fullLevel: boolean
  activeOctave: number
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    fullLevel: false,
    activeOctave: 5,
  },
  mutations: {
    fullLevel(state, {v}) {
      console.log("set full level", v);
      state.fullLevel = v;
    },
    activeOctave(state, {v}) {
      console.log("set octave", v);
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
