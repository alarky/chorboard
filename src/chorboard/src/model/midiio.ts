import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIAccess = WebMidi.MIDIAccess;
import Note from "@/model/note";

export class midiIO {
    public inputs!: MIDIInput[];
    public outputs!: MIDIOutput[];

    public activeInputID!: string;
    public activeOutputID!: string;
    public activeOutputChannel!: number;

    // MIDI Input Handler
    public noteOnHandler!: (noteNumber: number, velocity: number) => void;
    public noteOffHandler!: (noteNumber: number, velocity: number) => void;

    // MIDI Output
    private activeNotes: {[name: number]: Note}

    constructor() {
        this.inputs = [];
        this.outputs = [];
        this.noteOnHandler = (n, v) => {
            console.log(n, v)
        };
        this.noteOffHandler = (n, v) => {
            console.log(n, v)
        };
        this.activeNotes = {};
    }

    public async initialize(): Promise<void> {
        return navigator.requestMIDIAccess({sysex: true}).then((midiAccess: MIDIAccess) => {
            const inputIterator = midiAccess.inputs.values();
            const outputIterator = midiAccess.outputs.values();

            let i = inputIterator.next();
            while (!i.done) {
                this.inputs.push(i.value);
                i = inputIterator.next();
            }

            let o = outputIterator.next();
            while (!o.done) {
                this.outputs.push(o.value);
                o = outputIterator.next();
            }

            for (const input of this.inputs) {
                input.onmidimessage = (e) => {
                    if (input.id != this.activeInputID) return;
                    switch (e.data[0] & 0xf0) {
                        case 0x90:
                            this.noteOnHandler(e.data[1], e.data[2]);
                            break;
                        case 0x80:
                            this.noteOffHandler(e.data[1], e.data[2]);
                            break;
                        default:
                            console.log("other midi message: ", e.data[0], e.data[1], e.data[2]);
                            break;
                    }
                }
            }
        }, (err) => {
            console.log(err);
        });
    }

    public output(activeNotes: {[name: number]: Note}): void {
        if (!this.activeOutputID) return;

        let midiOutput: MIDIOutput = this.outputs[0];
        for (const output of this.outputs) {
            if (output.id === this.activeOutputID) {
                midiOutput = output;
            }
        }

        for (const note of Object.values(activeNotes)) {
            // noteOn
            const midi1 = 0x90 + this.activeOutputChannel - 1;
            if (!this.activeNotes[note.number]) {
                const midi2 = note.number;
                const midi3 = note.velocity;
                midiOutput.send([midi1, midi2, midi3]);
            }
        }
        for (const note of Object.values(this.activeNotes)) {
            // noteOff
            const midi1 = 0x80 + this.activeOutputChannel - 1;
            if (!activeNotes[note.number]) {
                const midi2 = note.number;
                const midi3 = 0;
                midiOutput.send([midi1, midi2, midi3]);
            }
        }

        this.activeNotes = { ...activeNotes };
    }
}

const MidiIO = new midiIO();
export default MidiIO;