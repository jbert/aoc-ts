import * as aoc from "./aoc";

export class Rect {
    bl: Pt;
    tr: Pt;
    constructor(bl: Pt, tr: Pt) {
        this.bl = bl;
        this.tr = tr;
    }
    left(): number {
        return this.bl.x;
    }
    right(): number {
        return this.tr.x;
    }
    top(): number {
        return this.tr.y;
    }
    bottom(): number {
        return this.bl.y;
    }

    contains(p: Pt): boolean {
        return (
            p.x >= this.left() &&
            p.x <= this.right() &&
            p.y >= this.bottom() &&
            p.y <= this.top()
        );
    }

    filterWithin(ps: Array<Pt>): Array<Pt> {
        return ps.filter((p) => this.contains(p));
    }
}

export class Pt {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(p: Pt): boolean {
        return this.x === p.x && this.y === p.y;
    }

    toString(): string {
        return `[${this.x},${this.y}]`;
    }

    allNeighbours(): Array<Pt> {
        const pts = [
            this.add(N),
            this.add(E),
            this.add(S),
            this.add(W),
            this.add(N).add(E),
            this.add(S).add(E),
            this.add(N).add(W),
            this.add(S).add(W),
        ];
        return pts;
    }

    cardinalNeighbours(): Array<Pt> {
        return [this.add(N), this.add(E), this.add(S), this.add(W)];
    }

    add(p: Pt): Pt {
        return new Pt(this.x + p.x, this.y + p.y);
    }
    sub(p: Pt): Pt {
        return new Pt(this.x - p.x, this.y - p.y);
    }
}

export const N = new Pt(0, 1);
export const E = new Pt(1, 0);
export const S = new Pt(0, -1);
export const W = new Pt(-1, 0);
