<template>
  <div class="keyboard">
    <div class="black-keys">
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 1"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 3"></Key>
      <div class="spacer"></div>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 6"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 8"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 10"></Key>
      <div class="spacer"></div>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 13"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 15"></Key>
      <div class="spacer"></div>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 18"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 20"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 22"></Key>
    </div>
    <div class="white-keys">
      <Key :active-notes="activeNotes" :note-number="octave * 12"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 2"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 4"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 5"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 7"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 9"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 11"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 12"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 14"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 16"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 17"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 19"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 21"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 23"></Key>
      <Key :active-notes="activeNotes" :note-number="octave * 12 + 24"></Key>
    </div>
  </div>
</template>

<style scoped lang="scss">
.black-keys, .white-keys {
  display: flex;
  background-color: gray;
}

.black-keys {
  padding-left: 40px;
}

.key {
  box-sizing: border-box;
  margin: 3px;
  height: 113px;
  width: 80px;
  border-radius: 5px;
  text-align: center;
}

.spacer {
  margin: 3px;
  width: 80px;
}

.black-keys > .key {
  background-color: black;
  color: white;
}

.white-keys > .key {
  background-color: white;
  color: black;
}

.black-keys > .active, .white-keys > .active {
  background-color: red;
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Note from "@/model/note";
import Key from "@/components/Key.vue";

@Component({
  components: {
    Key,
  }
})
export default class KeyBoard extends Vue {
  @Prop({default:5})
  private octave!: number;

  @Prop({default:{}})
  private activeNotes!: {[name: number]: Note};
}
</script>