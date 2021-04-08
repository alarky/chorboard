<template>
  <div id="app">
    <button @click="ToneStart">Tone Start</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import * as Tone from 'tone';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  private ToneStart() {
    Tone.start();
  }
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

      const synth = new Tone.PolySynth().toDestination();

      const noteOn = (noteNumber: number, velocity: number) => {
        const freq = 2 ** ((noteNumber - 69) / 12) * 440
        const now = Tone.now();
        synth.triggerAttack(freq, now);
      }

      const noteOff = (noteNumber: number, velocity: number) => {
        const freq = 2 ** ((noteNumber - 69) / 12) * 440
        const now = Tone.now();
        synth.triggerRelease(freq, now);
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
