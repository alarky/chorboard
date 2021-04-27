<template>
  <div class="chord-board">
    <div class="keys">
      <ChordKey onKey="q" baseNoteName="C" chordName="Major"></ChordKey>
      <ChordKey onKey="w" baseNoteName="D" chordName="Minor"></ChordKey>
      <ChordKey onKey="e" baseNoteName="E" chordName="Minor"></ChordKey>
      <ChordKey onKey="r" baseNoteName="F" chordName="Major"></ChordKey>
      <ChordKey onKey="t" baseNoteName="G" chordName="Major"></ChordKey>
      <ChordKey onKey="y" baseNoteName="A" chordName="Minor"></ChordKey>
      <ChordKey onKey="u" baseNoteName="B" chordName="MinorFlatFive"></ChordKey>
    </div>
    <div class="keys">
      <ChordKey onKey="a" baseNoteName="C" chordName="MajorSeventh"></ChordKey>
      <ChordKey onKey="s" baseNoteName="D" chordName="MinorSeventh"></ChordKey>
      <ChordKey onKey="d" baseNoteName="E" chordName="MinorSeventh"></ChordKey>
      <ChordKey onKey="f" baseNoteName="F" chordName="MajorSeventh"></ChordKey>
      <ChordKey onKey="g" baseNoteName="G" chordName="Seventh"></ChordKey>
      <ChordKey onKey="h" baseNoteName="A" chordName="MinorSeventh"></ChordKey>
      <ChordKey onKey="j" baseNoteName="B" chordName="MinorSeventhFlatFive"></ChordKey>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chord-board {
  @apply px-4;
  @apply py-2;
  @apply mb-4;
  @apply rounded-xl;
  @apply nm-flat-gray-300-lg;
}

.keys {
  @apply flex;
  @apply flex-row;
}

.chord-key {
  margin: 5px;
}

</style>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useStore } from '@/store';
import ChordKey from "@/components/ChordKey.vue";

export default defineComponent({
  name: 'ChordBoard',
  components: {ChordKey},
  setup() {
    const store = useStore();

    return {
    }
  }
});
</script>