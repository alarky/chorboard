<template>
  <div id="app">
    <div>
      <label for="full-velocity">FullVelocity</label>
      <input type="checkbox" id="full-velocity" v-model="fullLevel">
    </div>
    <div>
      <label for="octave">Octave</label>
      <input type="number" id="octave" v-model="activeOctave">
    </div>

    <div>
      Mode:
      <input type="radio">Chord
      <input type="radio">Scale
    </div>

    <ScaleBoard></ScaleBoard>

    <ChordBoard :chord-name="activeChordName" @emit="activeChordName = $event"></ChordBoard>

    <KeyBoard :octave="activeOctave" :active-notes="activeNotes"></KeyBoard>
  </div>
</template>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
}
#app {
  min-height: 100%;
  background-color: gray;
  color: white;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import * as Tone from 'tone';
import Note from "@/model/note";
import KeyBoard from "@/components/KeyBoard.vue";
import Synthesizer from "@/model/synthesizer";
import Chord, {ChordTypes} from "@/model/chord";
import ChordBoard from "@/components/ChordBoard.vue";
import ScaleBoard from "@/components/ScaleBoard.vue";
import MidiIO from "@/model/midiio";

@Component({
  components: {
    HelloWorld,
    ScaleBoard,
    ChordBoard,
    KeyBoard,
  },
})
export default class App extends Vue {
  private fullLevel: boolean = false;
  private activeOctave: number = 4;
  private activeNotes: {[name: number]: Note} = {};
  private activeChordName: string = "None";

  private midiIO!: MidiIO;
  private synth!: Synthesizer;

  mounted() {
    console.log("mounted");

    this.midiIO = new MidiIO(this.noteOn, this.noteOff);
    this.synth = new Synthesizer();

  }

  private noteOn(noteNumber: number, velocity: number) {
    if (this.fullLevel) {
      velocity = 127;
    }
    const note = new Note(noteNumber, velocity);
    const chord = new Chord(note, ChordTypes[this.activeChordName]);
    chord.notes.forEach((n) => Vue.set(this.activeNotes, n.number, n));
    this.synth.update(this.activeNotes);
  }

  private noteOff(noteNumber: number, velocity: number) {
    const note = new Note(noteNumber);
    const chord = new Chord(note, ChordTypes[this.activeChordName]);
    chord.notes.forEach((n) => Vue.delete(this.activeNotes, n.number));
    this.synth.update(this.activeNotes);
  }
}
</script>
