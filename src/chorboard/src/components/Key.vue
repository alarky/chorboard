<template>
  <div class="key" :class="{active: activeNotes[noteNumber]}">
    {{ noteName }}{{ octave }}
  </div>
</template>

<style scoped lang="scss">

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Note, {NoteNameMap} from "@/model/note";

@Component
export default class Key extends Vue {
  @Prop({default:{}})
  private activeNotes!: {[name: number]: Note};

  @Prop({default: 0})
  private noteNumber!: number;

  private get keyNumber(): number {
    return this.noteNumber % 12;
  }

  private get octave(): number {
    return (this.noteNumber - this.keyNumber) / 12;
  }

  private get noteName(): string {
    return NoteNameMap[this.keyNumber];
  }
}
</script>