<template>
  <div class="key" :class="{
    black: isBlack,
    white: !isBlack,
    active: isActive,
    auto: isAuto,
    }"
       @mousedown="on"
       @mouseup="off"
       @mouseout="off"
  >
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/light.scss";

.key {
  @apply rounded-xl;
}

.black {
  @apply nm-concave-gray-400;
}

.white {
  @apply nm-concave-gray-50;
}

.black.active {
  @apply nm-flat-gray-600;
  @apply light-red;
}

.white.active {
  @apply nm-flat-white;
  @apply light-red;
}

.black.auto {
  @apply nm-flat-gray-600;
  @apply light-green;
}

.white.auto {
  @apply nm-flat-white;
  @apply light-green;
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
    const isActive = computed(() => props.noteNumber == 60 || props.noteNumber == 61);
    const isAuto = computed(() => props.noteNumber == 62 || props.noteNumber == 63);

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
      isAuto,
      on,
      off,
      isBlack,
    }
  }
});
</script>