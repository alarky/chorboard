import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import MidiIO, { midiIO } from "@/model/midiio";
import Note from "@/model/note";
import Synthesizer from "@/model/synthesizer";
import Chord from "@/model/chord";

export interface State {
  midiIO?: midiIO
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
    midiIO: undefined,
    mouseIsDown: false,
    keyIsDown: {},
    activeOctave: 4,
    activeNotes: {},
    chords: {},
    activeChords: {},
  },
  mutations: {
    setMidiIO(state, {v}) {
      state.midiIO = v;
    },
    setMidiInput(state, {v}) {
      if (!state.midiIO) return;
      state.midiIO.activeInputID = v;
    },
    setMidiOutput(state, {id, channel}) {
      if (!state.midiIO) return;
      state.midiIO.activeOutputID = id;
      state.midiIO.activeOutputChannel = channel;
    },
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
      const offset = (v - state.activeOctave) * 12;
      state.activeOctave = v;
      for (const id in state.chords) {
        state.chords[id].baseNote.number += offset;
      }
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
    rotateChord(state, {id, v}) {
      state.chords[id].rotate(v);
    },
    onChord(state, {id, velocity}) {
      if (state.chords[id].isOn) return;
      state.chords[id].isOn = true;
      state.chords[id].velocity = velocity;
      state.activeChords[id] = state.chords[id];
      state.activeNotes = {};
      for (const cid of Object.keys(state.activeChords)) {
        for (const note of state.activeChords[cid].notes) {
          state.activeNotes[note.number] = note;
        }
      }
      if (state.midiIO && state.midiIO.activeOutputID) {
        state.midiIO.output(state.activeNotes);
      } else {
        Synthesizer.update(state.activeNotes);
      }
    },
    offChord(state, {id}) {
      if (!state.chords[id].isOn) return;
      state.chords[id].isOn = false;
      state.chords[id].velocity = 0;
      delete state.activeChords[id];
      state.activeNotes = {};
      for (const cid of Object.keys(state.activeChords)) {
        for (const note of state.activeChords[cid].notes) {
          state.activeNotes[note.number] = note;
        }
      }
      if (state.midiIO && state.midiIO.activeOutputID) {
        state.midiIO.output(state.activeNotes);
      } else {
        Synthesizer.update(state.activeNotes);
      }
    },
  },
  actions: {
    initMidiIO(context) {
      MidiIO.initialize().then(() => {
        context.commit('setMidiIO', {v: MidiIO});
      });
    },
  },
  modules: {
  }
});

MidiIO.noteOnHandler = (noteNumber, velocity) => {
  switch(noteNumber) {
    case 36:
      store.commit("onChord", {id: "a", velocity: velocity});
      break;
    case 37:
      store.commit("onChord", {id: "s", velocity: velocity});
      break;
    case 38:
      store.commit("onChord", {id: "d", velocity: velocity});
      break;
    case 39:
      store.commit("onChord", {id: "f", velocity: velocity});
      break;
    case 40:
      store.commit("onChord", {id: "g", velocity: velocity});
      break;
    case 41:
      store.commit("onChord", {id: "h", velocity: velocity});
      break;
    case 42:
      store.commit("onChord", {id: "j", velocity: velocity});
      break;
    case 43:
      // blank
      break;
    case 44:
      store.commit("onChord", {id: "q", velocity: velocity});
      break;
    case 45:
      store.commit("onChord", {id: "w", velocity: velocity});
      break;
    case 46:
      store.commit("onChord", {id: "e", velocity: velocity});
      break;
    case 47:
      store.commit("onChord", {id: "r", velocity: velocity});
      break;
    case 48:
      store.commit("onChord", {id: "t", velocity: velocity});
      break;
    case 49:
      store.commit("onChord", {id: "y", velocity: velocity});
      break;
    case 50:
      store.commit("onChord", {id: "u", velocity: velocity});
      break;
    case 51:
      // blank
      break;
  }
};

MidiIO.noteOffHandler = (noteNumber, velocity) => {
  switch(noteNumber) {
    case 36:
      store.commit("offChord", {id: "a", velocity: velocity});
      break;
    case 37:
      store.commit("offChord", {id: "s", velocity: velocity});
      break;
    case 38:
      store.commit("offChord", {id: "d", velocity: velocity});
      break;
    case 39:
      store.commit("offChord", {id: "f", velocity: velocity});
      break;
    case 40:
      store.commit("offChord", {id: "g", velocity: velocity});
      break;
    case 41:
      store.commit("offChord", {id: "h", velocity: velocity});
      break;
    case 42:
      store.commit("offChord", {id: "j", velocity: velocity});
      break;
    case 43:
      // blank
      break;
    case 44:
      store.commit("offChord", {id: "q", velocity: velocity});
      break;
    case 45:
      store.commit("offChord", {id: "w", velocity: velocity});
      break;
    case 46:
      store.commit("offChord", {id: "e", velocity: velocity});
      break;
    case 47:
      store.commit("offChord", {id: "r", velocity: velocity});
      break;
    case 48:
      store.commit("offChord", {id: "t", velocity: velocity});
      break;
    case 49:
      store.commit("offChord", {id: "y", velocity: velocity});
      break;
    case 50:
      store.commit("offChord", {id: "u", velocity: velocity});
      break;
    case 51:
      // blank
      break;
  }
};


export const useStore = (): Store<State> => {
  return baseUseStore(key);
};
