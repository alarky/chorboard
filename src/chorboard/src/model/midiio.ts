import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIAccess = WebMidi.MIDIAccess;

export class midiIO {
    public inputs!: MIDIInput[];
    public outputs!: MIDIOutput[];

    public activeInputID!: string;
    public activeOutputID!: string;
    public activeOutputChannel!: number;

    public noteOnHandler!: (noteNumber: number, velocity: number) => void;
    public noteOffHandler!: (noteNumber: number, velocity: number) => void;

    constructor() {
        this.inputs = [];
        this.outputs = [];
        this.noteOnHandler = (n, v) => {
            console.log(n, v)
        };
        this.noteOffHandler = (n, v) => {
            console.log(n, v)
        };
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

            /* TODO
            for (const input of this.inputs) {
                input.onmidimessage = (e) => {
                    switch (e.data[0] & 0xf0) {
                        case 0x90:
                            this.noteOnHandler(e.data[1], e.data[2]);
                            break;
                        case 0x80:
                            this.noteOffHandler(e.data[1], e.data[2]);
                            break;
                        default:
                            console.log("other midi message: ", e.data);
                            break;
                    }
                }
            }
             */
        }, (err) => {
            console.log(err);
        });
    }
}

const MidiIO = new midiIO();
export default MidiIO;