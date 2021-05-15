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
    rotateChord(state, {id, v}) {
      state.chords[id].rotate(v);
    },
    onChord(state, {v}) {
      if (state.chords[v].isOn) return;
      state.chords[v].isOn = true;
      state.activeChords[v] = state.chords[v];
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
    offChord(state, {v}) {
      if (!state.chords[v].isOn) return;
      state.chords[v].isOn = false;
      delete state.activeChords[v];
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
  console.log(`noteOn: ${noteNumber}: ${velocity}`);
  switch(noteNumber) {
    case 36:
      store.commit("onChord", {v: "a"});
      break;
    case 37:
      store.commit("onChord", {v: "s"});
      break;
    case 38:
      store.commit("onChord", {v: "d"});
      break;
    case 39:
      store.commit("onChord", {v: "f"});
      break;
    case 40:
      store.commit("onChord", {v: "g"});
      break;
    case 41:
      store.commit("onChord", {v: "h"});
      break;
    case 42:
      store.commit("onChord", {v: "j"});
      break;
    case 43:
      // blank
      break;
    case 44:
      store.commit("onChord", {v: "q"});
      break;
    case 45:
      store.commit("onChord", {v: "w"});
      break;
    case 46:
      store.commit("onChord", {v: "e"});
      break;
    case 47:
      store.commit("onChord", {v: "r"});
      break;
    case 48:
      store.commit("onChord", {v: "t"});
      break;
    case 49:
      store.commit("onChord", {v: "y"});
      break;
    case 50:
      store.commit("onChord", {v: "u"});
      break;
    case 51:
      // blank
      break;
  }
};

MidiIO.noteOffHandler = (noteNumber, velocity) => {
  console.log(`noteOff: ${noteNumber}: ${velocity}`);
  switch(noteNumber) {
    case 36:
      store.commit("offChord", {v: "a"});
      break;
    case 37:
      store.commit("offChord", {v: "s"});
      break;
    case 38:
      store.commit("offChord", {v: "d"});
      break;
    case 39:
      store.commit("offChord", {v: "f"});
      break;
    case 40:
      store.commit("offChord", {v: "g"});
      break;
    case 41:
      store.commit("offChord", {v: "h"});
      break;
    case 42:
      store.commit("offChord", {v: "j"});
      break;
    case 43:
      // blank
      break;
    case 44:
      store.commit("offChord", {v: "q"});
      break;
    case 45:
      store.commit("offChord", {v: "w"});
      break;
    case 46:
      store.commit("offChord", {v: "e"});
      break;
    case 47:
      store.commit("offChord", {v: "r"});
      break;
    case 48:
      store.commit("offChord", {v: "t"});
      break;
    case 49:
      store.commit("offChord", {v: "y"});
      break;
    case 50:
      store.commit("offChord", {v: "u"});
      break;
    case 51:
      // blank
      break;
  }
};


export const useStore = (): Store<State> => {
  return baseUseStore(key);
};
