import * as aoc from "./aoc";
import * as P from "./pts";

/*
class grid {
    g: Array<Array<string>>;

    constructor(lines: Array<string>) {}
}
*/

interface matchLoc {
    s: string;
    start: P.Pt;
}

const mlPts = (ml: matchLoc): Array<P.Pt> => {
    return aoc.iota(ml.start.x, ml.start.x + ml.s.length).map((x) => {
        return new P.Pt(x, ml.start.y);
    });
};

const mlNeighbours = (ml: matchLoc): Array<P.Pt> => {
    return aoc.unique(
        bounds.filterWithin(
            aoc.unique(mlPts(ml).flatMap((p) => p.allNeighbours()))
        )
    );
};

var bounds: P.Rect;

export const run = (a: aoc.Aoc): void => {
    const p1 = calcp1(a);
    console.log(`Part 1: ${p1}`);
    const p2 = calcp2(a);
    console.log(`Part 2: ${p2}`);
};

export const calcp2 = (a: aoc.Aoc): number => {
    const rxStar = /\*/g;
    const stars: Array<matchLoc> = a.lines.flatMap((l, j) => {
        const y = a.lines.length - 1 - (j ?? 0);
        const matches = [...l.matchAll(rxStar)];
        return matches.map((m) => {
            return {
                s: m[0],
                start: new P.Pt(m.index ?? 0, y),
            };
        });
    });

    const rxNum = /[0-9]+/g;
    const numStrs: Array<matchLoc> = a.lines.flatMap((l, j) => {
        const y = a.lines.length - 1 - (j ?? 0);
        const matches = [...l.matchAll(rxNum)];
        return matches.map((m) => {
            return {
                s: m[0],
                start: new P.Pt(m.index ?? 0, y),
            };
        });
    });

    bounds = new P.Rect(
        new P.Pt(0, 0),
        new P.Pt(a.lines[0].length - 1, a.lines.length - 1)
    );

    const adjacent = (a: matchLoc, b: matchLoc): boolean => {
        const nAs = mlNeighbours(a);
        const nBs = mlPts(b);
        //        console.log("nAs " + nAs);
        //        console.log("nAs.length " + nAs.length);
        //        console.log("nBs " + nBs);
        //        console.log("nBs.length " + nBs.length);
        const is = aoc.intersect(nAs, nBs);
        //console.log(
        //    `a ${a.start} ${a.s} b ${b.start} ${b.s} nAs ${nAs} nBs ${nBs} is ${is}`
        //);
        return is.length > 0;
    };
    let gearRatios = new Array<number>();
    stars.forEach((star) => {
        let adjNums = numStrs.filter((numStr) => adjacent(star, numStr));
        //console.log(`star ${star.start}`);
        //adjNums.forEach((an) => console.log(`an ${an.start}`));
        if (adjNums.length == 2) {
            gearRatios.push(Number(adjNums[0].s) * Number(adjNums[1].s));
        }
    });
    console.log("gear ratios: " + gearRatios);
    return aoc.sum(gearRatios);
};

export const calcp1 = (a: aoc.Aoc): number => {
    //    a.setLines(".....\n.467.\n....+".split("\n"));
    bounds = new P.Rect(
        new P.Pt(0, 0),
        new P.Pt(a.lines[0].length - 1, a.lines.length - 1)
    );
    //    let g = new grid(a.lines);
    const rx = /[0-9]+/g;
    const numStrs: Array<matchLoc> = a.lines.flatMap((l, j) => {
        const y = a.lines.length - 1 - (j ?? 0);
        const matches = [...l.matchAll(rx)];
        return matches.map((m) => {
            return {
                s: m[0],
                start: new P.Pt(m.index ?? 0, y),
            };
        });
    });
    const charAt = (p: P.Pt): string => {
        const c = a.lines[a.lines.length - p.y - 1][p.x];
        return c;
    };
    const serials = numStrs.filter((m) => {
        return hasSymbolNeighbour(m, charAt);
    });
    return aoc.sum(serials.map((s) => Number(s.s)));
};

const isSymbol = (s: string): boolean => {
    return s != "." && !aoc.isDigit(s);
};

const hasSymbolNeighbour = (ml: matchLoc, charAt: (q: P.Pt) => string) => {
    return aoc.any(mlNeighbours(ml).map((p) => isSymbol(charAt(p))));
};
/*
    return aoc.any(
        bounds.filterWithin(p.allNeighbours()).map((p) => isSymbol(charAt(p)))
    );
    digitPts.some((p: P.Pt) => hasSymbolNeighbour(p, charAt));
    return digitPts.some((p: P.Pt) => hasSymbolNeighbour(p, charAt));
    */
