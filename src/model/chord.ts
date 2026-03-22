import Note from "@/model/note";

// Intervals from root (semitones)
export const ChordTypes: {[name: string]: number[]} = {
    // Single / Power
    None:                  [0],
    Power2:                [0, 7],
    Power3:                [0, 7, 12],

    // Triads
    Major:                 [0, 4, 7],
    Minor:                 [0, 3, 7],
    Diminished:            [0, 3, 6],
    MinorFlatFive:         [0, 3, 6],
    SusFour:               [0, 5, 7],
    SusTwo:                [0, 2, 7],
    Augmented:             [0, 4, 8],

    // Seventh
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

    // Sixth
    Sixth:                 [0, 4, 7, 9],
    MinorSixth:            [0, 3, 7, 9],

    // Ninth
    Ninth:                 [0, 4, 7, 10, 14],
    MajorNinth:            [0, 4, 7, 11, 14],
    MinorNinth:            [0, 3, 7, 10, 14],
    MinorMajorNinth:       [0, 3, 7, 11, 14],

    // Eleventh
    Eleventh:              [0, 4, 7, 10, 14, 17],
    MajorEleventh:         [0, 4, 7, 11, 14, 17],
    MinorEleventh:         [0, 3, 7, 10, 14, 17],

    // Thirteenth
    Thirteenth:            [0, 4, 7, 10, 14, 17, 21],
    MajorThirteenth:       [0, 4, 7, 11, 14, 17, 21],
    MinorThirteenth:       [0, 3, 7, 10, 14, 17, 21],

    // Add
    Add9:                  [0, 4, 7, 14],
    MinorAdd9:             [0, 3, 7, 14],
    Add11:                 [0, 4, 7, 17],
    Add13:                 [0, 4, 7, 21],

    // Altered
    SeventhFlatNine:       [0, 4, 7, 10, 13],
    SeventhSharpNine:      [0, 4, 7, 10, 15],
    SeventhSharpEleven:    [0, 4, 7, 10, 18],
    SeventhFlatThirteen:   [0, 4, 7, 10, 20],
}

export const ChordSymbols: {[name: string]: string} = {
    None:                  "",
    Power2:                "5",
    Power3:                "5",

    Major:                 "",
    Minor:                 "m",
    Diminished:            "dim",
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

    Ninth:                 "9",
    MajorNinth:            "M9",
    MinorNinth:            "m9",
    MinorMajorNinth:       "mM9",

    Eleventh:              "11",
    MajorEleventh:         "M11",
    MinorEleventh:         "m11",

    Thirteenth:            "13",
    MajorThirteenth:       "M13",
    MinorThirteenth:       "m13",

    Add9:                  "add9",
    MinorAdd9:             "m(add9)",
    Add11:                 "add11",
    Add13:                 "add13",

    SeventhFlatNine:       "7(b9)",
    SeventhSharpNine:      "7(#9)",
    SeventhSharpEleven:    "7(#11)",
    SeventhFlatThirteen:   "7(b13)",
}

// Category grouping for UI
export const ChordCategories: {[category: string]: string[]} = {
    "Single/Power": ["None", "Power2", "Power3"],
    "Triad": ["Major", "Minor", "Diminished", "SusFour", "SusTwo", "Augmented"],
    "7th": [
        "Seventh", "MajorSeventh", "MinorSeventh", "MinorSeventhFlatFive",
        "MinorMajorSeventh", "DiminishedSeventh",
        "SeventhSusFour", "SeventhSusTwo", "MajorSeventhSusFour", "MajorSeventhSusTwo",
        "AugmentedSeventh", "AugmentedMajorSeventh",
    ],
    "6th": ["Sixth", "MinorSixth"],
    "9th": ["Ninth", "MajorNinth", "MinorNinth", "MinorMajorNinth"],
    "11th": ["Eleventh", "MajorEleventh", "MinorEleventh"],
    "13th": ["Thirteenth", "MajorThirteenth", "MinorThirteenth"],
    "Add": ["Add9", "MinorAdd9", "Add11", "Add13"],
    "Altered": ["SeventhFlatNine", "SeventhSharpNine", "SeventhSharpEleven", "SeventhFlatThirteen"],
}

// Voicing: array of semitone offsets from the chord root, representing the actual pitch layout
export interface Voicing {
    name: string;
    offsets: number[];  // semitone offsets from root (can span multiple octaves)
}

// Generate close voicing inversions for a chord type
function generateCloseVoicings(intervals: number[]): Voicing[] {
    const voicings: Voicing[] = [];
    const names = ["Root", "1st inv", "2nd inv", "3rd inv", "4th inv", "5th inv"];

    for (let inv = 0; inv < intervals.length; inv++) {
        const offsets = intervals.slice();
        for (let i = 0; i < inv; i++) {
            const v = offsets.shift()!;
            offsets.push(v + 12);
        }
        voicings.push({
            name: `Close ${names[inv] ?? inv + 'th inv'}`,
            offsets,
        });
    }
    return voicings;
}

// Generate drop 2 voicings (move 2nd-from-top note down an octave)
function generateDrop2Voicings(intervals: number[]): Voicing[] {
    if (intervals.length < 4) return [];

    const voicings: Voicing[] = [];
    const names = ["Root", "1st inv", "2nd inv", "3rd inv", "4th inv", "5th inv"];

    for (let inv = 0; inv < intervals.length; inv++) {
        const close = intervals.slice();
        for (let i = 0; i < inv; i++) {
            const v = close.shift()!;
            close.push(v + 12);
        }
        // Drop the 2nd from top
        const dropIdx = close.length - 2;
        const dropped = close[dropIdx] - 12;
        const offsets = [dropped, ...close.slice(0, dropIdx), ...close.slice(dropIdx + 1)];
        offsets.sort((a, b) => a - b);

        voicings.push({
            name: `Drop2 ${names[inv] ?? inv + 'th inv'}`,
            offsets,
        });
    }
    return voicings;
}

// Generate drop 3 voicings (move 3rd-from-top note down an octave)
function generateDrop3Voicings(intervals: number[]): Voicing[] {
    if (intervals.length < 4) return [];

    const voicings: Voicing[] = [];
    const names = ["Root", "1st inv", "2nd inv", "3rd inv", "4th inv", "5th inv"];

    for (let inv = 0; inv < intervals.length; inv++) {
        const close = intervals.slice();
        for (let i = 0; i < inv; i++) {
            const v = close.shift()!;
            close.push(v + 12);
        }
        // Drop the 3rd from top
        const dropIdx = close.length - 3;
        if (dropIdx < 0) continue;
        const dropped = close[dropIdx] - 12;
        const offsets = [dropped, ...close.slice(0, dropIdx), ...close.slice(dropIdx + 1)];
        offsets.sort((a, b) => a - b);

        voicings.push({
            name: `Drop3 ${names[inv] ?? inv + 'th inv'}`,
            offsets,
        });
    }
    return voicings;
}

// Generate all rule-based voicings for a given chord type
export function generateVoicings(chordType: string): Voicing[] {
    const intervals = ChordTypes[chordType];
    if (!intervals) return [];

    return [
        ...generateCloseVoicings(intervals),
        ...generateDrop2Voicings(intervals),
        ...generateDrop3Voicings(intervals),
    ];
}

export default class Chord {
    public id: string;
    public baseNote: Note;
    public chordType: string;
    public bassNote: Note | null;  // slash chord bass note
    public voicing: number[];      // current voicing offsets
    public isOn: boolean;
    public velocity: number;

    public get notes(): Note[] {
        const notes = this.voicing.map(n => new Note(this.baseNote.number + n, this.velocity));

        // Add slash chord bass note (below the chord)
        if (this.bassNote) {
            // Ensure bass note is below the lowest chord note
            let bassNumber = this.bassNote.number;
            const lowestChordNote = this.baseNote.number + Math.min(...this.voicing);
            while (bassNumber >= lowestChordNote) {
                bassNumber -= 12;
            }
            notes.unshift(new Note(bassNumber, this.velocity));
        }

        return notes;
    }

    // Display name like "CM7" or "CM7/Bb"
    public get displayName(): string {
        const symbol = ChordSymbols[this.chordType] ?? this.chordType;
        const root = this.baseNote.name;
        const bass = this.bassNote ? `/${this.bassNote.name}` : '';
        return `${root}${symbol}${bass}`;
    }

    constructor(id: string, baseNote: Note, chordType: string) {
        this.id = id;
        this.baseNote = baseNote;
        this.chordType = chordType;
        this.bassNote = null;
        this.voicing = ChordTypes[chordType]?.slice() ?? [0];
        this.isOn = false;
        this.velocity = 127;
    }

    public setVoicing(offsets: number[]): void {
        this.voicing = offsets;
    }

    public setChordType(chordType: string): void {
        this.chordType = chordType;
        // Reset to default close root voicing
        this.voicing = ChordTypes[chordType]?.slice() ?? [0];
    }
}
