<template>
  <div class="key" :class="{active: isActive}"
       @mousedown="on"
       @mouseup="off"
       @mouseout="off"
  >
  </div>
</template>

<style scoped lang="scss">
.key {
  box-shadow:  0 5px 10px #888888;
}
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Key',
  setup() {
    const isActive = computed(() => false);

    const on = (e: any) => {
      console.log(e);
    };

    const off = (e: any) => {
      console.log(e);
    };

    return {
      isActive,
      on,
      off,
    }
  }
});
</script>