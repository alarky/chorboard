<template>
  <div class="app" @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseUp">
    {{ mouseIsDown }}
    <div class="container mx-auto py-4">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.app {
  @apply min-h-screen;
  @apply bg-gray-300;
  @apply text-gray-600;
}

</style>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from "@/store";

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();

    const mouseIsDown = computed(() => store.state.mouseIsDown);

    const mouseDown = () => {
      store.commit('mouseIsDown', {v: true});
    }

    const mouseUp = () => {
      store.commit('mouseIsDown', {v: false});
    }

    return {
      mouseIsDown,
      mouseDown,
      mouseUp,
    }
  }
});
</script>
