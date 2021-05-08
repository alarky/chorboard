<template>
  <div>
    <div class="header">
      <div class="title">
        <h1>ChorBoard</h1>&nbsp;beta
      </div>
      <div class="controls">
        <ActiveOctave></ActiveOctave>
      </div>
    </div>


    <ChordBoard></ChordBoard>

    <KeyBoard></KeyBoard>

  </div>
</template>

<style scoped lang="scss">
.header {
  @apply flex;
  @apply flex-row;
  @apply justify-between;
  @apply mb-4;
}

.title {
  @apply flex;
  @apply flex-row;

  h1 {
    @apply text-4xl;
    @apply italic;
  }
}

.controls {
  @apply flex;
  @apply flex-row;
  @apply mb-4;
}
</style>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useStore } from '@/store';
import KeyBoard from "@/components/KeyBoard.vue";
import ActiveOctave from "@/components/ActiveOctave.vue";
import ChordBoard from "@/components/ChordBoard.vue";

export default defineComponent({
  name: 'Main',
  components: {
    ChordBoard,
    KeyBoard,
    ActiveOctave,
  },
  setup() {
    const store = useStore();

    return {
    }
  }
});
</script>
