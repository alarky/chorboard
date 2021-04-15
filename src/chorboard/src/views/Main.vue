<template>
  Main
  <div>
    <label for="full-velocity">FullVelocity</label>
    <input type="checkbox" id="full-velocity" v-model="fullLevel">
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'Main',
  setup() {
    const store = useStore();

    const fullLevel = computed({
      get: () => store.state.fullLevel,
      set: (v) => store.commit('setFullLevel', {v}),
    });

    return {
      fullLevel,
    }
  }
});
</script>
