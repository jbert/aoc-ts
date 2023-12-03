import * as aoc from "./aoc";
import * as P from "./pts";

/*
class grid {
    g: Array<Array<string>>;

    constructor(lines: Array<string>) {}
}
*/

interface numLoc {
    digits: string;
    start: P.Pt;
}

var bounds: P.Rect;

export const run = (a: aoc.Aoc): void => {
    const p1 = calc(a);
    console.log(`Part 1: ${p1}`);
};

export const calc = (a: aoc.Aoc): number => {
    //    a.setLines(".....\n.467.\n....+".split("\n"));
    bounds = new P.Rect(
        new P.Pt(0, 0),
        new P.Pt(a.lines[0].length - 1, a.lines.length - 1)
    );
    //    let g = new grid(a.lines);
    const rx = /[0-9]+/g;
    const numStrs: Array<numLoc> = a.lines.flatMap((l, j) => {
        const y = a.lines.length - 1 - (j ?? 0);
        const matches = [...l.matchAll(rx)];
        return matches.map((m) => {
            return {
                digits: m[0],
                start: new P.Pt(m.index ?? 0, y),
            };
        });
    });
    const charAt = (p: P.Pt): string => {
        const c = a.lines[a.lines.length - p.y - 1][p.x];
        return c;
    };
    const serials = numStrs.filter((m) => {
        const digitPts: Array<P.Pt> = aoc
            .iota(m.start.x, m.start.x + m.digits.length)
            .map((x) => {
                return new P.Pt(x, m.start.y);
            });
        return hasSymbolNeighbour(digitPts, charAt);
    });
    return aoc.sum(serials.map((s) => Number(s.digits)));
};

const isSymbol = (s: string): boolean => {
    return s != "." && !aoc.isDigit(s);
};

const hasSymbolNeighbour = (ps: Array<P.Pt>, charAt: (q: P.Pt) => string) => {
    const allNs = aoc.unique(ps.flatMap((p) => p.allNeighbours()));
    const ns = aoc.unique(bounds.filterWithin(allNs));
    return aoc.any(ns.map((p) => isSymbol(charAt(p))));
};
/*
    return aoc.any(
        bounds.filterWithin(p.allNeighbours()).map((p) => isSymbol(charAt(p)))
    );
    digitPts.some((p: P.Pt) => hasSymbolNeighbour(p, charAt));
    return digitPts.some((p: P.Pt) => hasSymbolNeighbour(p, charAt));
    */
