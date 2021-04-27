<template>
  <div class="app" @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseUp">
    <div class="container mx-auto py-4">
      <router-view />
    </div>
    <div>
      <pre>{{ state }}</pre>
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

    window.addEventListener('keydown', (e: any) => {
      store.commit('keyDown', {v: e.key});
    });

    window.addEventListener('keyup', (e: any) => {
      store.commit('keyUp', {v: e.key});
    });

    return {
      state: store.state,
      mouseIsDown,
      mouseDown,
      mouseUp,
    }
  }
});
</script>
