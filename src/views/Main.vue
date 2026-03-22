<template>
  <div>
    <div class="header">
      <div class="title">
        <h1>ChorBoard</h1>
        <span class="version">v0.2.0</span>
      </div>
      <Controls1 />
    </div>
    <ChordBoard />
    <KeyBoard />
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.header {
  @apply flex flex-row justify-between items-center;
  margin-bottom: 2px;
}

.title {
  @apply flex flex-row items-baseline gap-2;
  margin-top: -6px;
}

.title h1 {
  @apply text-4xl italic;
}

.version {
  @apply text-gray-500;
}
</style>

<script setup lang="ts">
import KeyBoard from '@/components/KeyBoard.vue'
import ChordBoard from '@/components/ChordBoard.vue'
import Controls1 from '@/components/Controls1.vue'
</script>
