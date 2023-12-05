import * as aoc from "./aoc";

export const run = (a: aoc.Aoc): void => {
    const p1 = calcp1(a);
    console.log(`Part 1: ${p1}`);
    const p2 = calcp2(a);
    console.log(`Part 2: ${p2}`);
};

class range {
    start: number;
    length: number;

    constructor(start: number, length: number) {
        this.start = start;
        this.length = length;
    }

    toString(): string {
        return `${this.start} (${this.length})`;
    }
}

interface rangeMap {
    src: number;
    dst: number;
    len: number;
}

interface map {
    from: string;
    to: string;
    rangeMaps: Array<rangeMap>;
}

const calcp2 = (a: aoc.Aoc): number => {
    const lgs = a.lineGroups();
    const seedRanges = parseSeedsP2(lgs.shift()[0]);
    console.log("Seed Ranges: " + seedRanges.map((sr) => sr.toString()));
    const maps = lgs.map(parseMaps);
    //    console.log(maps);
    const locs = seedRanges.map((s) => runMaps(s, maps));
    console.log("Locs: " + locs);
    return Math.min(...locs);
};

const calcp1 = (a: aoc.Aoc): number => {
    const lgs = a.lineGroups();
    const seedRanges = parseSeeds(lgs.shift()[0]);
    console.log("Seed Ranges: " + seedRanges.map((sr) => sr.toString()));
    const maps = lgs.map(parseMaps);
    //    console.log(maps);
    const locs = seedRanges.map((sr) => runMaps(sr, maps));
    console.log("Locs: " + locs);
    return Math.min(...locs);
};

const myPipe = (n: number, fs: Array<(n: number) => number>): number => {
    fs.forEach((f) => (n = f(n)));
    return n;
};

const rangeMapApplies = (r: rangeMap, n: number) => {
    return n >= r.src && n < r.src + r.len;
};

const runMap =
    (m: map) =>
    (n: number): number => {
        const rangeMaps = m.rangeMaps.filter((r) => rangeMapApplies(r, n));
        if (rangeMaps.length == 0) {
            return n;
        }
        return n - rangeMaps[0].src + rangeMaps[0].dst;
    };

const runMaps = (sr: range, maps: Array<map>) => {
    return myPipe(
        sr.start,
        maps.map((m) => {
            return (n: number): number => {
                let v = runMap(m)(n);
                console.log(`${n} -> ${m.to} ${v}`);
                return v;
            };
        })
    );
};

const parseMaps = (ls: Array<string>): map => {
    console.log("ls " + ls);
    const re = /^([a-z]+)-to-([a-z]+) map:$/;
    const matches = ls[0].match(re);

    let m = {
        from: matches[1],
        to: matches[2],
        rangeMaps: new Array<rangeMap>(),
    };
    ls.shift();
    m.rangeMaps = ls.map(parseRangeMap);

    return m;
};

const parseRangeMap = (s: string): rangeMap => {
    const bits = s.split(" ").map(aoc.strToNum);
    return { src: bits[1], dst: bits[0], len: bits[2] };
};

const parseSeeds = (l: string): Array<range> => {
    const nums = l.slice(7);
    return nums
        .split(" ")
        .map(aoc.strToNum)
        .map((n) => {
            return new range(n, 1);
        });
};

const parseSeedsP2 = (l: string): Array<range> => {
    const nums = l.slice(7);
    const pairs = nums.split(" ").map(aoc.strToNum);
    let seedRanges = new Array<range>();
    pairs.forEach((n, i) => {
        if (i % 2 == 0) {
            seedRanges.push(new range(n, pairs[i + 1]));
        }
    });
    return seedRanges;
};
