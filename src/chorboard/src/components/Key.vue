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
    number: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const octave = 5;
    const noteNumber = computed(() => octave * 12 + props.number);

    const isActive = computed(() => noteNumber.value == 60 || noteNumber.value == 61);
    const isAuto = computed(() => noteNumber.value == 62 || noteNumber.value == 63);

    const on = (e: any) => {
      console.log(e);
    };

    const off = (e: any) => {
      console.log(e);
    };

    const isBlack = computed(() => {
      const tone = noteNumber.value % 12;
      return [1, 3, 6, 8, 10].includes(tone);
    });

    return {
      noteNumber,
      isActive,
      isAuto,
      on,
      off,
      isBlack,
    }
  }
});
</script>