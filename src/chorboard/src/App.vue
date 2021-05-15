<template>
  <div class="app" @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseUp">
    <div class="view-container">
      <router-view />
    </div>
    <!--
    <div>
      <pre>{{ state }}</pre>
    </div>
    -->
  </div>
</template>

<style lang="scss">
.app {
  @apply min-h-screen;
  @apply bg-gray-300;
  @apply text-gray-600;
}

.view-container {
  @apply mx-auto;
  @apply py-4;
  width: 1030px;
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

    store.dispatch('initMidiIO');

    return {
      state: store.state,
      mouseIsDown,
      mouseDown,
      mouseUp,
    }
  }
});
</script>
