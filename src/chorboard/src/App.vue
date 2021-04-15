<template>
  <router-view/>
</template>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
}
#app {
  min-height: 100%;
  background-color: gray;
  color: white;
}
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
