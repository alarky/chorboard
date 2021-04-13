<template>
  <div class="key" :class="{active: isActive}"
       @mousedown="on"
       @mouseup="off"
       @mouseout="off"
    >
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

  private get isActive(): boolean {
    return !!this.activeNotes[this.noteNumber];
  }

  private get keyNumber(): number {
    return this.noteNumber % 12;
  }

  private get octave(): number {
    return (this.noteNumber - this.keyNumber) / 12;
  }

  private get noteName(): string {
    return NoteNameMap[this.keyNumber];
  }

  private on(e: any) {
    console.log(`${this.noteNumber}: on`);
    this.$emit("noteon", this.noteNumber);
  }

  private off(e: any) {
    if (this.isActive) {
      this.$emit("noteoff", this.noteNumber);
    }
  }
}
</script>