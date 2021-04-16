<template>
  <div class="button-square" :class="{on: state.pushed, off: !state.pushed}" @click="toggle">
    {{ label }}
  </div>
</template>

<style scoped lang="scss">
.button-square {
  @apply relative;
  @apply rounded;
  @apply select-none;
}

.on {
  box-shadow: inset  2px  2px 5px #aaaaaa,
              inset -2px -2px 5px #ffffff;
}

.off {
  box-shadow: 2px  2px 5px #aaaaaa,
             -2px -2px 5px #ffffff;
}

</style>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

interface State {
  pushed: boolean;
}

export default defineComponent({
  name: 'Button',
  props: {
    label: {
      type: String,
      default: () => '',
    },
  },
  setup() {
    const state = reactive<State>({
      pushed: false,
    });

    const toggle = () => {
      state.pushed = !state.pushed;
    }

    return {
      state,
      toggle,
    }
  }
});
</script>