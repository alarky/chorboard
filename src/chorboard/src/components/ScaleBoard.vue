<template>
  <div class="scale-board">
    Scale:

    <select>
      <option v-for="(name, number) in noteNameMap" :key="number" :value="number">{{ name }}</option>
    </select>

    <select>
      <option v-for="(_, name) in scaleTypes" :key="name" :value="name">{{ name }}</option>
    </select>

    <div>
      Diatonic:

    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {NoteNameMap} from "@/model/note";
import {ScaleTypes} from "@/model/scale";

@Component
export default class ScaleBoard extends Vue {
  private get noteNameMap(): {[name: number]: string} {
    return NoteNameMap;
  }

  private get scaleTypes(): {[name: string]: number[]} {
    return ScaleTypes;
  }
}
</script>