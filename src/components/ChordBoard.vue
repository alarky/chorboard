<template>
  <div class="chord-board">
    <div class="keys">
      <ChordKey onKey="q" baseNoteName="C" chordName="Major" />
      <ChordKey onKey="w" baseNoteName="D" chordName="Minor" />
      <ChordKey onKey="e" baseNoteName="E" chordName="Minor" />
      <ChordKey onKey="r" baseNoteName="F" chordName="Major" />
      <ChordKey onKey="t" baseNoteName="G" chordName="Major" />
      <ChordKey onKey="y" baseNoteName="A" chordName="Minor" />
      <ChordKey onKey="u" baseNoteName="B" chordName="MinorFlatFive" />
    </div>
    <div class="keys">
      <ChordKey onKey="a" baseNoteName="C" chordName="MajorSeventh" />
      <ChordKey onKey="s" baseNoteName="D" chordName="MinorSeventh" />
      <ChordKey onKey="d" baseNoteName="E" chordName="MinorSeventh" />
      <ChordKey onKey="f" baseNoteName="F" chordName="MajorSeventh" />
      <ChordKey onKey="g" baseNoteName="G" chordName="Seventh" />
      <ChordKey onKey="h" baseNoteName="A" chordName="MinorSeventh" />
      <ChordKey onKey="j" baseNoteName="B" chordName="MinorSeventhFlatFive" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.chord-board {
  @apply px-4 py-2 mb-4 rounded-xl;
  background: #d1d5db;
  box-shadow: .4em .4em .8em #959eac, -.4em -.4em .8em #fff;
}

.keys {
  @apply flex flex-row;
}

.keys :deep(.chord-key) {
  margin: 5px;
}
</style>

<script setup lang="ts">
import ChordKey from '@/components/ChordKey.vue'
</script>
