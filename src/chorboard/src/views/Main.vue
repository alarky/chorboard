<template>
  <div>
    <div class="header">
      <h1>ChorBoard</h1>
    </div>

    <div class="controls">
      <ActiveOctave></ActiveOctave>
    </div>


    <KeyBoard></KeyBoard>

  </div>
</template>

<style scoped lang="scss">
.header {
  @apply flex;
  @apply flex-row;
  @apply mb-4;

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

export default defineComponent({
  name: 'Main',
  components: {
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
