import Note from "@/model/note";
import * as Tone from "tone";
import {PolySynth} from "tone";

export default class Synthesizer {
    private synth: PolySynth;
    private activeNotes: {[name: number]: Note};

    constructor() {
        this.synth = new Tone.PolySynth().toDestination();
        this.activeNotes = {};
    }

    public update(activeNotes: {[name: number]: Note}) {
        for (const note of Object.values(activeNotes)) {
            if (!this.activeNotes[note.number]) {
                const now = Tone.now();
                this.synth.triggerAttack(note.asStr, now, note.normalizedVelocity);
            }
        }
        for (const note of Object.values(this.activeNotes)) {
            if (!activeNotes[note.number]) {
                const now = Tone.now();
                this.synth.triggerRelease(note.asStr, now);
            }
        }

        this.activeNotes = { ...activeNotes };
    }
}