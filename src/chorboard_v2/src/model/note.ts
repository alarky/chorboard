
export const NoteNameMap: {[name: number]: string} = {
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
    public readonly velocity: number = 0;
    public readonly name: string = "";
    public readonly octave: number = 0;

    constructor(number: number, velocity: number = 0) {
        this.number = number;
        this.velocity = velocity;

        const remainder = number % 12;
        this.name = NoteNameMap[remainder];
        this.octave = (number - remainder) / 12;
    }

    public get asStr(): string {
        return `${this.name}${this.octave}`;
    }

    public get normalizedVelocity(): number {
        return this.velocity / 127;
    }
}