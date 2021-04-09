import Note from "@/model/note";

export const Major = [0, 4, 7];
export const Minor = [0, 3, 7];
export const Seventh = [0, 4, 7, 10];

export default class Chord {
    public notes: Note[];

    constructor(baseNote: Note, chord: number[]) {
        this.notes = chord.map(n => new Note(baseNote.number + n, baseNote.velocity));
    }
}