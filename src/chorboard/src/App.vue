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

@Component({
  components: {
    HelloWorld,
    ChordBoard,
    KeyBoard,
  },
})
export default class App extends Vue {
  private fullLevel: boolean = false;
  private activeOctave: number = 4;
  private activeNotes: {[name: number]: Note} = {};
  private activeChordName: string = "None";

  mounted() {
    console.log("mounted");

    navigator.requestMIDIAccess({sysex: true}).then((midiAccess) => {
      const inputs = [];
      const outputs = [];

      const inputIterator = midiAccess.inputs.values();
      const outputIterator = midiAccess.outputs.values();

      let i = inputIterator.next();
      while (!i.done) {
        inputs.push(i.value);
        i = inputIterator.next();
      }

      let o = outputIterator.next();
      while (!o.done) {
        outputs.push(o.value);
        o = outputIterator.next();
      }

      console.log(inputs);
      console.log(outputs);

      const synth = new Synthesizer();

      const noteOn = (noteNumber: number, velocity: number) => {
        if (this.fullLevel) {
          velocity = 127;
        }
        const note = new Note(noteNumber, velocity);
        const chord = new Chord(note, ChordTypes[this.activeChordName]);
        chord.notes.forEach((n) => Vue.set(this.activeNotes, n.number, n));
        synth.update(this.activeNotes);
      }

      const noteOff = (noteNumber: number, velocity: number) => {
        const note = new Note(noteNumber);
        const chord = new Chord(note, ChordTypes[this.activeChordName]);
        chord.notes.forEach((n) => Vue.delete(this.activeNotes, n.number));
        synth.update(this.activeNotes);
      }

      for (const input of inputs) {
        input.onmidimessage = (e) => {
          switch (e.data[0] & 0xf0) {
            case 0x90:
              noteOn(e.data[1], e.data[2]);
              break;
            case 0x80:
              noteOff(e.data[1], e.data[2]);
              break;
            default:
              console.log("other message: ", e.data);
              break;
          }
        }
      }

    }, (err) => {
      console.log(err);
    });
  }
}
</script>
