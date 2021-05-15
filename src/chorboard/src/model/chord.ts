import Note from "@/model/note";

export const ChordTypes: {[name: string]: number[]} = {
    None:                  [0],
    Power2:                [0, 7],
    Power3:                [0, 7, 12],

    Major:                 [0, 4, 7],
    Minor:                 [0, 3, 7],
    MinorFlatFive:         [0, 3, 6],
    SusFour:               [0, 5, 7],
    SusTwo:                [0, 2, 7],
    Augmented:             [0, 4, 8],

    Seventh:               [0, 4, 7, 10],
    MajorSeventh:          [0, 4, 7, 11],
    MinorSeventh:          [0, 3, 7, 10],
    MinorSeventhFlatFive:  [0, 3, 6, 10],
    MinorMajorSeventh:     [0, 3, 7, 11],
    SeventhSusFour:        [0, 5, 7, 10],
    SeventhSusTwo:         [0, 2, 7, 10],
    MajorSeventhSusFour:   [0, 5, 7, 11],
    MajorSeventhSusTwo:    [0, 2, 7, 11],
    AugmentedSeventh:      [0, 4, 8, 10],
    AugmentedMajorSeventh: [0, 4, 8, 11],
    DiminishedSeventh:     [0, 3, 6, 9],

    Sixth:                 [0, 4, 7, 9],
    MinorSixth:            [0, 3, 7, 9],
}

export const ChordCymbols: {[name: string]: string} = {
    None:                  "",
    Power2:                "Power2",
    Power3:                "Power3",

    Major:                 "M",
    Minor:                 "m",
    MinorFlatFive:         "m(b5)",
    SusFour:               "sus4",
    SusTwo:                "sus2",
    Augmented:             "aug",

    Seventh:               "7",
    MajorSeventh:          "M7",
    MinorSeventh:          "m7",
    MinorSeventhFlatFive:  "m7(b5)",
    MinorMajorSeventh:     "mM7",
    SeventhSusFour:        "7sus4",
    SeventhSusTwo:         "7sus2",
    MajorSeventhSusFour:   "M7sus4",
    MajorSeventhSusTwo:    "M7sus2",
    AugmentedSeventh:      "aug7",
    AugmentedMajorSeventh: "augM7",
    DiminishedSeventh:     "dim7",

    Sixth:                 "6",
    MinorSixth:            "m6",
}

export default class Chord {
    public id: string;
    public baseNote: Note;
    public chordType: string;
    public rotation: number;
    public isOn: boolean;

    public get notes(): Note[] {
        const chord = ChordTypes[this.chordType].slice();

        if (this.rotation > 0) {
            for (let i = 0; i < this.rotation; i++) {
                const v = chord.shift() || 0;
                chord.push(v + 12);
            }
        } else if (this.rotation < 0) {
            for (let i = 0; i < -this.rotation; i++) {
                const v = chord.pop() || 0;
                chord.unshift(v - 12);
            }
        }

        const notes = chord.map(n => new Note(this.baseNote.number + n, this.baseNote.velocity));
        return notes;
    }

    constructor(id: string, baseNote: Note, chordType: string) {
        this.id = id;
        this.baseNote = baseNote;
        this.chordType = chordType;
        this.rotation = 0;
        this.isOn = false;
    }

    public rotate(v: number): void {
        this.rotation += v;
    }
}