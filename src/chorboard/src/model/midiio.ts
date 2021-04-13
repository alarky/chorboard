import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIAccess = WebMidi.MIDIAccess;

export default class MidiIO {
    private inputs!: MIDIInput[];
    private outputs!: MIDIOutput[];

    private noteOnHandler!: (noteNumber: number, velocity: number) => void;
    private noteOffHandler!: (noteNumber: number, velocity: number) => void;

    constructor(
            noteOnHandler: (noteNumber: number, velocity: number) => void,
            noteOffHandler: (noteNumber: number, velocity: number) => void) {
        this.inputs = [];
        this.outputs = [];
        this.noteOnHandler = noteOnHandler;
        this.noteOffHandler = noteOffHandler;

        navigator.requestMIDIAccess({sysex: true}).then((midiAccess: MIDIAccess) => {
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
        }, (err) => {
            console.log(err);
        });
    }
}