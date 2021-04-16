<template>
  <div class="app">
    <div class="container mx-auto py-4">
      <Header></Header>
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
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
  },
  setup() {
    return {
    }
  }
});
</script>
