<template>
  <div>
    <div class="font-header italic mb-1">settings</div>
    <div class="flex flex-row">
      <Button class="mx-1 my-1 px-4 py-2 w-40" :label="'FullVelocity'"></Button>
      <Button class="mx-1 my-1 px-4 py-2 w-40"></Button>
      <Button class="mx-1 my-1 px-4 py-2 w-40"></Button>
    </div>

    <!--
    <div>
      <label for="full-velocity">FullVelocity</label>
      <input type="checkbox" id="full-velocity" v-model="fullLevel">
    </div>
    <div>
      <label for="octave">Octave</label>
      <input type="number" id="octave" v-model="octave">
    </div>
    -->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useStore } from '@/store';
import Button from "@/components/Button.vue";

export default defineComponent({
  name: 'Main',
  components: {Button},
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
