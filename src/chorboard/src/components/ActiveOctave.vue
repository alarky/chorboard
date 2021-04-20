<template>
  <div class="active-octave">
    <div class="label-container">
      <label for="active-octave-input">OCTAVE</label>
    </div>
    <div>
      <input type="number" id="active-octave-input" v-model="activeOctave" min="0" max="9">
    </div>
  </div>
</template>

<style scoped lang="scss">
.active-octave {
  @apply flex;
  @apply flex-col;
}

.label-container {
  @apply flex;
  @apply justify-center;
  @apply pr-1;
}

input {
  @apply m-0;
}

</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {useStore} from "@/store";

export default defineComponent({
  name: 'ActiveOctave',
  setup() {
    const store = useStore();

    const activeOctave = computed({
      get: () => store.state.activeOctave,
      set: (v) => store.commit('activeOctave', {v: Number(v)}),
    });

    return {
      activeOctave,
    }
  }
});
</script>