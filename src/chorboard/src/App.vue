<template>
  <div class="h-screen flex justify-between flex-col">
    <router-link to="/">
      <h1 class="h-24 p-3 flex items-center bg-green-500 text-white text-2xl font-bold"> TODO APP composition API </h1>
    </router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
/*
html, body {
  height: 100%;
  margin: 0;
}
#app {
  min-height: 100%;
  background-color: gray;
  color: white;
}

 */
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    return {
    }
  }
});
</script>
