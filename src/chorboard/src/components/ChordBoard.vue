<template>
  <div class="chord-board">
    <div class="keys">
      <ChordKey chord="CM7"></ChordKey>
      <ChordKey chord="Dm7"></ChordKey>
      <ChordKey chord="Em7"></ChordKey>
      <ChordKey chord="FM7"></ChordKey>
      <ChordKey chord="G7"></ChordKey>
      <ChordKey chord="Am7"></ChordKey>
      <ChordKey chord="Bm7(b5)"></ChordKey>
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
  height: 100px;
  width: 100px;
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