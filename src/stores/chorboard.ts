import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { midiIO } from '@/model/midiio'
import MidiIO from '@/model/midiio'
import Note from '@/model/note'
import Synthesizer from '@/model/synthesizer'
import type Chord from '@/model/chord'

export const useChorboardStore = defineStore('chorboard', () => {
  const midiIO = ref<midiIO | undefined>()
  const mouseIsDown = ref(false)
  const keyIsDown = reactive<Record<string, boolean>>({})
  const activeOctave = ref(4)
  const activeNotes = ref<Record<number, Note>>({})
  const chords = reactive<Record<string, Chord>>({})
  const activeChords = reactive<Record<string, Chord>>({})

  function setMouseIsDown(v: boolean) {
    mouseIsDown.value = v
  }

  function keyDown(v: string) {
    keyIsDown[v] = true
  }

  function keyUp(v: string) {
    keyIsDown[v] = false
  }

  function setActiveOctave(v: number) {
    const offset = (v - activeOctave.value) * 12
    activeOctave.value = v
    for (const id in chords) {
      chords[id].baseNote.number += offset
    }
  }

  function addChord(v: Chord) {
    chords[v.id] = v
  }

  function setChordBaseNote(id: string, v: Note) {
    chords[id].baseNote = v
  }

  function setChordType(id: string, v: string) {
    chords[id].chordType = v
  }

  function rotateChord(id: string, v: number) {
    chords[id].rotate(v)
  }

  function updateActiveNotes() {
    const notes: Record<number, Note> = {}
    for (const cid of Object.keys(activeChords)) {
      for (const note of activeChords[cid].notes) {
        notes[note.number] = note
      }
    }
    activeNotes.value = notes
  }

  function outputNotes() {
    if (midiIO.value && midiIO.value.activeOutputID) {
      midiIO.value.output(activeNotes.value)
    } else {
      Synthesizer.update(activeNotes.value)
    }
  }

  function onChord(id: string, velocity: number) {
    if (chords[id].isOn) return
    chords[id].isOn = true
    chords[id].velocity = velocity
    activeChords[id] = chords[id]
    updateActiveNotes()
    outputNotes()
  }

  function offChord(id: string) {
    if (!chords[id].isOn) return
    chords[id].isOn = false
    chords[id].velocity = 0
    delete activeChords[id]
    updateActiveNotes()
    outputNotes()
  }

  function setMidiInput(v: string) {
    if (!midiIO.value) return
    midiIO.value.activeInputID = v
  }

  function setMidiOutput(id: string, channel: number) {
    if (!midiIO.value) return
    midiIO.value.activeOutputID = id
    midiIO.value.activeOutputChannel = channel
  }

  async function initMidiIO() {
    await MidiIO.initialize()
    midiIO.value = MidiIO
  }

  return {
    midiIO,
    mouseIsDown,
    keyIsDown,
    activeOctave,
    activeNotes,
    chords,
    activeChords,
    setMouseIsDown,
    keyDown,
    keyUp,
    setActiveOctave,
    addChord,
    setChordBaseNote,
    setChordType,
    rotateChord,
    onChord,
    offChord,
    setMidiInput,
    setMidiOutput,
    initMidiIO,
  }
})
