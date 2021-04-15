<template>
  <div class="h-screen flex justify-between flex-col">
    <router-link to="/">
      <h1 class="font-header text-4xl italic">ChorBoard</h1>
      <p>This app is choard assist keyboard.</p>
    </router-link>
    <router-view />
  </div>
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
