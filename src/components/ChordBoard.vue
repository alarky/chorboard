<template>
  <div class="chord-board">
    <div class="keys">
      <ChordKey onKey="q" baseNoteName="C" chordName="Major" @edit="openEdit" />
      <ChordKey onKey="w" baseNoteName="D" chordName="Minor" @edit="openEdit" />
      <ChordKey onKey="e" baseNoteName="E" chordName="Minor" @edit="openEdit" />
      <ChordKey onKey="r" baseNoteName="F" chordName="Major" @edit="openEdit" />
      <ChordKey onKey="t" baseNoteName="G" chordName="Major" @edit="openEdit" />
      <ChordKey onKey="y" baseNoteName="A" chordName="Minor" @edit="openEdit" />
      <ChordKey onKey="u" baseNoteName="B" chordName="MinorFlatFive" @edit="openEdit" />
    </div>
    <div class="keys">
      <ChordKey onKey="a" baseNoteName="C" chordName="MajorSeventh" @edit="openEdit" />
      <ChordKey onKey="s" baseNoteName="D" chordName="MinorSeventh" @edit="openEdit" />
      <ChordKey onKey="d" baseNoteName="E" chordName="MinorSeventh" @edit="openEdit" />
      <ChordKey onKey="f" baseNoteName="F" chordName="MajorSeventh" @edit="openEdit" />
      <ChordKey onKey="g" baseNoteName="G" chordName="Seventh" @edit="openEdit" />
      <ChordKey onKey="h" baseNoteName="A" chordName="MinorSeventh" @edit="openEdit" />
      <ChordKey onKey="j" baseNoteName="B" chordName="MinorSeventhFlatFive" @edit="openEdit" />
    </div>
  </div>

  <ChordEditModal
    :chordId="editingChordId"
    :visible="editModalVisible"
    @close="closeEdit"
  />
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
import { ref } from 'vue'
import ChordKey from '@/components/ChordKey.vue'
import ChordEditModal from '@/components/ChordEditModal.vue'

const editModalVisible = ref(false)
const editingChordId = ref('')

function openEdit(key: string) {
  editingChordId.value = key
  editModalVisible.value = true
}

function closeEdit() {
  editModalVisible.value = false
}
</script>
