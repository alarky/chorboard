<template>
  <div>
    <div class="flex flex-row mb-4">
      <h1 class="font-header text-4xl italic">ChorBoard</h1>
      <Button class="mx-8 px-4 py-2 w-40" :label="'FullVelocity'"></Button>
    </div>

    <KeyBoard></KeyBoard>


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
import KeyBoard from "@/components/KeyBoard.vue";

export default defineComponent({
  name: 'Main',
  components: {KeyBoard, Button},
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
