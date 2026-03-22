
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
    public number = 0;
    public velocity = 0;
    public name = "";
    public octave = 0;
    public isAuto = false;

    constructor(number: number, velocity = 0, isAuto = false) {
        this.number = number;
        this.velocity = velocity;

        const tone = number % 12;
        this.name = NoteNameMap[tone];
        this.octave = (number - tone) / 12;
        this.isAuto = isAuto;
    }

    public get asStr(): string {
        return `${this.name}${this.octave}`;
    }

    public get normalizedVelocity(): number {
        return this.velocity / 127;
    }
}