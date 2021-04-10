<template>
  <div class="keyboard">
    <div class="black-keys">
      <div class="key" :class="{active: activeNotes[octave * 12 + 1]}">C#{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 3]}">D#{{ octave }}</div>
      <div class="spacer"></div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 6]}">F#{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 8]}">G#{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 10]}">A#{{ octave }}</div>
      <div class="spacer"></div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 13]}">C#{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 15]}">D#{{ Number(octave) + 1 }}</div>
      <div class="spacer"></div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 18]}">F#{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 20]}">G#{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 22]}">A#{{ Number(octave) + 1 }}</div>
    </div>
    <div class="white-keys">
      <div class="key" :class="{active: activeNotes[octave * 12]}">C{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 2]}">D{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 4]}">E{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 5]}">F{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 7]}">G{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 9]}">A{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 11]}">B{{ octave }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 12]}">C{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 14]}">D{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 16]}">E{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 17]}">F{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 19]}">G{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 21]}">A{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 23]}">B{{ Number(octave) + 1 }}</div>
      <div class="key" :class="{active: activeNotes[octave * 12 + 24]}">C{{ Number(octave) + 2 }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.black-keys, .white-keys {
  display: flex;
  background-color: gray;
}

.black-keys {
  padding-left: 20px;
}

.key {
  box-sizing: border-box;
  margin: 3px;
  height: 80px;
  width: 40px;
  border-radius: 5px;
  text-align: center;
}

.spacer {
  margin: 3px;
  width: 40px;
}

.black-keys > .key {
  background-color: black;
  color: white;
}

.white-keys > .key {
  background-color: white;
  color: black;
}

.black-keys > .active, .white-keys > .active {
  background-color: red;
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Note from "@/model/note";

@Component
export default class Keyboard extends Vue {
  @Prop({default:5})
  private octave!: number;

  @Prop({default:{}})
  private activeNotes!: {[name: number]: Note};
}
</script>