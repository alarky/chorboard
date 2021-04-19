<template>
  <div class="keyboard">
    <div class="keys">
      <div class="black-keys">
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 1" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 3" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <div class="spacer"></div>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 6" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 8" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 10" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <div class="spacer"></div>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 13" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 15" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <div class="spacer"></div>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 18" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 20" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 22" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
      </div>
      <div class="white-keys">
        <Key :active-notes="activeNotes" :note-number="octave * 12" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 2" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 4" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 5" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 7" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 9" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 11" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 12" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 14" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 16" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 17" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 19" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 21" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 23" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
        <Key :active-notes="activeNotes" :note-number="octave * 12 + 24" @noteon="noteOn($event)" @noteoff="noteOff($event)"></Key>
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
  @apply nm-flat-gray-300;
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
  padding-left: 40px;
}

.key {
  margin: 5px;
  height: 120px;
  width: 70px;
}

.spacer {
  margin: 5px;
  height: 120px;
  width: 70px;
}

</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Key from "@/components/Key.vue";

export default defineComponent({
  name: 'KeyBoard',
  components: {Key},
  setup() {
    const activeNotes = computed(() => []);
    const octave = computed(() => 5);

    const noteOn = (e: any) => {
      console.log(e);
    }

    const noteOff = (e: any) => {
      console.log(e);
    }

    return {
      activeNotes,
      octave,
      noteOn,
      noteOff,
    }
  }
});
</script>
