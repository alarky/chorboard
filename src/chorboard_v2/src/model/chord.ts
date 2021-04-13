import Note from "@/model/note";

export const ChordTypes: {[name: string]: number[]} = {
    None:                 [0],

    Major:                [0, 4, 7],
    Minor:                [0, 3, 7],

    Seventh:              [0, 4, 7, 10],
    MajorSeventh:         [0, 4, 7, 11],
    MinorSeventh:         [0, 3, 7, 10],
    MinorMajorSeventh:    [0, 3, 7, 11],

    Sixth:                [0, 4, 7, 9],
    MinorSixth:           [0, 3, 7, 9],

    Ninth:                [0, 4, 7, 10, 14],
    MajorNinth:           [0, 4, 7, 11, 14],
    MinorNinth:           [0, 3, 7, 10, 14],

    SixthNinth:           [0, 4, 7, 9, 14],
    MinorSixthNinth:      [0, 3, 7, 9, 14],

    Eleventh:             [0, 4, 7, 10, 14, 17],
    MajorEleventh:        [0, 4, 7, 11, 14, 17],
    MinorEleventh:        [0, 3, 7, 10, 14, 17],

    Thirteenth:           [0, 4, 7, 10, 14, 17, 21],
    MajorThirteenth:      [0, 4, 7, 11, 14, 17, 21],
    MinorThirteenth:      [0, 3, 7, 10, 14, 17, 21],

    Diminish:             [0, 3, 6, 9],
    SuspendedFour:        [0, 5, 7],
    MinorSeventhFlatFive: [0, 3, 6, 10],
    SeventhSuspendedFour: [0, 5, 7, 10],
    Augmented:            [0, 4, 8],
}

export const ChordCymbols: {[name: string]: string} = {
    None:                 "None",

    Major:                "M",
    Minor:                "m",

    Seventh:              "7",
    MajorSeventh:         "M7",
    MinorSeventh:         "m7",
    MinorMajorSeventh:    "mM7",

    Sixth:                "6",
    MinorSixth:           "m6",

    Ninth:                "9",
    MajorNinth:           "M9",
    MinorNinth:           "m9",

    Eleventh:             "11",
    MajorEleventh:        "M11",
    MinorEleventh:        "m11",

    Thirteenth:           "13",
    MajorThirteenth:      "M13",
    MinorThirteenth:      "m13",

    Diminish:             "dim",
    SuspendedFour:        "sus4",
    MinorSeventhFlatFive: "m7-5",
    SeventhSuspendedFour: "7sus4",
    Augmented:            "aug",
}

export default class Chord {
    public notes: Note[];

    constructor(baseNote: Note, chord: number[]) {
        this.notes = chord.map(n => new Note(baseNote.number + n, baseNote.velocity));
    }
}