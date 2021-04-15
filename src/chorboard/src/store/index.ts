import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from 'vuex'

export interface State {
  fullLevel: boolean
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    fullLevel: false,
  },
  mutations: {
    setFullLevel(state, {v}) {
      state.fullLevel = v;
    },
  },
  actions: {
  },
  modules: {
  }
});

export function useStore() {
  return baseUseStore(key);
}
