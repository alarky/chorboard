<template>
  <div id="app">
    {{ activeNotes }}
  </div>
</template>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
}
#app {
  min-height: 100%;
  background-color: black;
  color: white;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import * as Tone from 'tone';
import Note from "@/model/note";

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  private activeNotes: {[name: number]: Note|undefined} = {};

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

      Tone.start();

      console.log(inputs);
      console.log(outputs);

      const synth = new Tone.PolySynth().toDestination();

      const noteOn = (noteNumber: number, velocity: number) => {
        const note = new Note(noteNumber, velocity);
        Vue.set(this.activeNotes, note.number, note);
        console.log(note);
        const now = Tone.now();
        synth.triggerAttack(note.asStr, now, note.normalizedVelocity);
      }

      const noteOff = (noteNumber: number, velocity: number) => {
        const note = new Note(noteNumber);
        Vue.set(this.activeNotes, note.number, undefined);
        console.log(note);
        const now = Tone.now();
        synth.triggerRelease(note.asStr, now);
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
