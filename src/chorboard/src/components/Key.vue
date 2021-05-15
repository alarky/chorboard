<template>
  <div class="key" :class="{
    black: isBlack,
    white: !isBlack,
    active: isActive,
    auto: isAuto,
    }"
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
  @apply nm-concave-gray-400;
  @apply light-red;
}

.white.active {
  @apply nm-concave-gray-50;
  @apply light-red;
}

.black.auto {
  @apply nm-concave-gray-400;
  @apply light-green;
}

.white.auto {
  @apply nm-concave-gray-50;
  @apply light-green;
}

</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {useStore} from "@/store";
import Note from "@/model/note";

export default defineComponent({
  name: 'Key',
  props: {
    number: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const store = useStore();

    const noteNumber = computed(() => store.state.activeOctave * 12 + props.number);

    const isActive = computed(() => {
      const note = store.state.activeNotes[noteNumber.value];
      if (!note) {
        return false;
      }
      return !note.isAuto;
    });
    const isAuto = computed(() => {
      const note = store.state.activeNotes[noteNumber.value];
      if (!note) {
        return false;
      }
      return note.isAuto;
    });

    const isBlack = computed(() => {
      const tone = noteNumber.value % 12;
      return [1, 3, 6, 8, 10].includes(tone);
    });

    return {
      noteNumber,
      isActive,
      isAuto,
      isBlack,
    }
  }
});
</script>