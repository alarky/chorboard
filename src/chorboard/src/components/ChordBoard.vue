<template>
  <div class="chord-board">
    Code:

    <input type="radio" name="chord" v-model="_chordName" id="chord-none" value="None">
    <label for="chord-none">None</label>

    <input type="radio" name="chord" v-model="_chordName" id="chord-major" value="Major">
    <label for="chord-major">M</label>

    <input type="radio" name="chord" v-model="_chordName" id="chord-minor" value="Minor">
    <label for="chord-minor">m</label>

    <input type="radio" name="chord" v-model="_chordName" id="chord-seventh" value="Seventh">
    <label for="chord-seventh">7</label>
  </div>
</template>

<style scoped lang="scss">

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ChordBoard extends Vue {
  @Prop({default: "None"})
  private chordName!: string;

  private get _chordName(): string {
    return this.chordName;
  }

  private set _chordName(v: string) {
    this.$emit('emit', v);
  }
}
</script>