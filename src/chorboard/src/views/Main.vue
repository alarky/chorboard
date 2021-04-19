<template>
  <div>
    <div class="flex flex-row mb-4">
      <h1 class="font-header text-4xl italic">ChorBoard</h1>
    </div>

    <KeyBoard></KeyBoard>

  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useStore } from '@/store';
import KeyBoard from "@/components/KeyBoard.vue";

export default defineComponent({
  name: 'Main',
  components: {KeyBoard},
  setup() {
    const store = useStore();

    const fullLevel = computed({
      get: () => store.state.fullLevel,
      set: (v) => store.commit('fullLevel', {v}),
    });

    return {
      fullLevel,
    }
  }
});
</script>
