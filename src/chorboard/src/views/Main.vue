<template>
  <div>
    <label for="full-velocity">FullVelocity</label>
    <input type="checkbox" id="full-velocity" v-model="fullLevel">
  </div>
  <div>
    <label for="octave">Octave</label>
    <input type="number" id="octave" v-model="octave">
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'Main',
  setup() {
    const store = useStore();

    const fullLevel = computed({
      get: () => store.state.fullLevel,
      set: (v) => store.commit('fullLevel', {v}),
    });

    const octave = computed({
      get: () => store.state.octave,
      set: (v) => store.commit('octave', {v: Number(v)}),
    });

    return {
      fullLevel,
      octave,
    }
  }
});
</script>
