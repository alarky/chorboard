
const noteNameMap: {[name: number]: string} = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B",
}


export default class Note {
    public readonly number: number = 0;
    public readonly name: string = "";
    public readonly octave: number = 0;
    public readonly freq: number = 0;

    constructor(number: number) {
        this.number = number;

        const remainder = number % 12;
        this.name = noteNameMap[remainder];
        this.octave = (number - remainder) / 12;

        this.freq = 2 ** ((number - 69) / 12) * 440
    }

    public get asStr() {
        return `${this.name}${this.octave}`;
    }
}