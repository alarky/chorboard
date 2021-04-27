<template>
  <div class="chord-board">
    <div class="keys">
      <ChordKey baseNoteName="C" chordName="Major"></ChordKey>
      <ChordKey baseNoteName="D" chordName="Minor"></ChordKey>
      <ChordKey baseNoteName="E" chordName="Minor"></ChordKey>
      <ChordKey baseNoteName="F" chordName="Major"></ChordKey>
      <ChordKey baseNoteName="G" chordName="Major"></ChordKey>
      <ChordKey baseNoteName="A" chordName="Minor"></ChordKey>
      <ChordKey baseNoteName="B" chordName="MinorFlatFive"></ChordKey>
    </div>
    <div class="keys">
      <ChordKey baseNoteName="C" chordName="MajorSeventh"></ChordKey>
      <ChordKey baseNoteName="D" chordName="MinorSeventh"></ChordKey>
      <ChordKey baseNoteName="E" chordName="MinorSeventh"></ChordKey>
      <ChordKey baseNoteName="F" chordName="MajorSeventh"></ChordKey>
      <ChordKey baseNoteName="G" chordName="Seventh"></ChordKey>
      <ChordKey baseNoteName="A" chordName="MinorSeventh"></ChordKey>
      <ChordKey baseNoteName="B" chordName="MinorSeventhFlatFive"></ChordKey>
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