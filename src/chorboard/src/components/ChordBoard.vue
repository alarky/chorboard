<template>
  <div class="chord-board">
    Code:

    <template v-for="(cymbol, name) in chordCymbols">
      <input type="radio" name="chord" v-model="_chordName" :id="`chord-${name}`" :value="name">
      <label :for="`chord-${name}`">{{ cymbol }}</label>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {ChordCymbols} from "@/model/chord";

@Component
export default class ChordBoard extends Vue {
  @Prop({default: "None"})
  private chordName!: string;

  private get chordCymbols(): {[name: string]: string} {
    return ChordCymbols;
  }

  private get _chordName(): string {
    return this.chordName;
  }

  private set _chordName(v: string) {
    this.$emit('emit', v);
  }
}
</script>