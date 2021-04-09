<template>
  <div>
  </div>
</template>

<style scoped lang="scss">

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Note from "@/model/note";

@Component
export default class Keyboard extends Vue {
  @Prop() private activeNotes!: Note[];
}
</script>