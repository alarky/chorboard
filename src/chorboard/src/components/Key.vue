<template>
  <div class="key" :class="{
    active: isActive,
    black: isBlack,
    white: !isBlack,
    }"
       @mousedown="on"
       @mouseup="off"
       @mouseout="off"
  >
  </div>
</template>

<style scoped lang="scss">
.key {
  @apply rounded-xl;
}

.black {
  @apply nm-concave-gray-400;
}

.white {
  @apply nm-concave-gray-50;
}

.black-keys > .active, .white-keys > .active {
  background-color: red;
}

</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Key',
  props: {
    noteNumber: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const isActive = computed(() => false);

    const on = (e: any) => {
      console.log(e);
    };

    const off = (e: any) => {
      console.log(e);
    };

    const isBlack = computed(() => {
      const tone = props.noteNumber % 12;
      return [1, 3, 6, 8, 10].includes(tone);
    });

    return {
      isActive,
      on,
      off,
      isBlack,
    }
  }
});
</script>