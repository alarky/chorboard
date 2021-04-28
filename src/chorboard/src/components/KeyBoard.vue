<template>
  <div class="keyboard">
    <div class="keys">
      <div class="black-keys">
        <Key :number="1"></Key>
        <Key :number="3"></Key>
        <div class="spacer"></div>
        <Key :number="6"></Key>
        <Key :number="8"></Key>
        <Key :number="10"></Key>
        <div class="spacer"></div>
        <Key :number="13"></Key>
        <Key :number="15"></Key>
        <div class="spacer"></div>
        <Key :number="18"></Key>
        <Key :number="20"></Key>
        <Key :number="22"></Key>
      </div>
      <div class="white-keys">
        <Key :number="0"></Key>
        <Key :number="2"></Key>
        <Key :number="4"></Key>
        <Key :number="5"></Key>
        <Key :number="7"></Key>
        <Key :number="9"></Key>
        <Key :number="11"></Key>
        <Key :number="12"></Key>
        <Key :number="14"></Key>
        <Key :number="16"></Key>
        <Key :number="17"></Key>
        <Key :number="19"></Key>
        <Key :number="21"></Key>
        <Key :number="23"></Key>
        <Key :number="24"></Key>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.keyboard {
  @apply flex;
  @apply flex-row;
  @apply justify-center;
  @apply px-4;
  @apply py-2;
  @apply rounded-xl;
  @apply nm-flat-gray-300-lg;
}

.keys {
  @apply mx-auto;
}

.black-keys, .white-keys {
  @apply mx-auto;
  @apply flex;
  @apply flex-row;
}

.black-keys {
  padding-left: 28px;
}

.key {
  margin: 5px;
  height: 100px;
  width: 56px;
}

.spacer {
  margin: 5px;
  height: 100px;
  width: 56px;
}

</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Key from "@/components/Key.vue";

export default defineComponent({
  name: 'KeyBoard',
  components: {Key},
  setup() {
    return {
    }
  }
});
</script>
