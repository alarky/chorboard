
export const ScaleTypes: {[name: string]: number[]} = {
    Major: [0, 2, 4, 5, 7, 9, 11],
    Minor: [0, 2, 3, 5, 7, 8, 10],
};

export default class Scale {
    private root!: number;
    private type!: string;
    private scale!: number[];

    constructor(root: number, type: string) {
        this.root = root;
        this.type = type;
        this.scale = ScaleTypes[type];
    }
}
