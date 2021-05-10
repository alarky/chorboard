<template>
  <div>
    <div class="header">
      <div class="title">
        <h1>ChorBoard</h1>&nbsp;beta
      </div>

      <Controls1></Controls1>

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
  @apply mb-4;
}
</style>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useStore } from '@/store';
import KeyBoard from "@/components/KeyBoard.vue";
import ChordBoard from "@/components/ChordBoard.vue";
import Controls1 from "@/components/Controls1.vue";

export default defineComponent({
  name: 'Main',
  components: {
    Controls1,
    ChordBoard,
    KeyBoard,
  },
  setup() {
    const store = useStore();

    return {
    }
  }
});
</script>
