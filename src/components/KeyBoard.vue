<template>
  <div class="keyboard">
    <div class="keys">
      <div class="black-keys">
        <Key :number="1" />
        <Key :number="3" />
        <div class="spacer"></div>
        <Key :number="6" />
        <Key :number="8" />
        <Key :number="10" />
        <div class="spacer"></div>
        <Key :number="13" />
        <Key :number="15" />
        <div class="spacer"></div>
        <Key :number="18" />
        <Key :number="20" />
        <Key :number="22" />
      </div>
      <div class="white-keys">
        <Key :number="0" />
        <Key :number="2" />
        <Key :number="4" />
        <Key :number="5" />
        <Key :number="7" />
        <Key :number="9" />
        <Key :number="11" />
        <Key :number="12" />
        <Key :number="14" />
        <Key :number="16" />
        <Key :number="17" />
        <Key :number="19" />
        <Key :number="21" />
        <Key :number="23" />
        <Key :number="24" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.keyboard {
  @apply flex flex-row justify-center px-4 py-2 rounded-xl;
  background: #d1d5db;
  box-shadow: .4em .4em .8em #959eac, -.4em -.4em .8em #fff;
}

.keys {
  @apply mx-auto;
}

.black-keys, .white-keys {
  @apply mx-auto flex flex-row;
}

.black-keys {
  padding-left: 31px;
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

<script setup lang="ts">
import Key from '@/components/Key.vue'
</script>
