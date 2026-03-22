import MidiIO from '@/model/midiio'
import { useChorboardStore } from './chorboard'

const NOTE_TO_CHORD_ID: Record<number, string> = {
  36: 'a', 37: 's', 38: 'd', 39: 'f', 40: 'g', 41: 'h', 42: 'j',
  // 43: blank
  44: 'q', 45: 'w', 46: 'e', 47: 'r', 48: 't', 49: 'y', 50: 'u',
  // 51: blank
}

export function setupMidiHandlers() {
  const store = useChorboardStore()

  MidiIO.noteOnHandler = (noteNumber: number, velocity: number) => {
    const id = NOTE_TO_CHORD_ID[noteNumber]
    if (id) store.onChord(id, velocity)
  }

  MidiIO.noteOffHandler = (noteNumber: number) => {
    const id = NOTE_TO_CHORD_ID[noteNumber]
    if (id) store.offChord(id)
  }
}
