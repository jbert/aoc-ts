import * as aoc from "./aoc";

export const run = (a: aoc.Aoc): void => {
    const p1 = calcp1(a);
    console.log(`Part 1: ${p1}`);
};

interface range {
    src: number;
    dst: number;
    len: number;
}

interface map {
    from: string;
    to: string;
    ranges: Array<range>;
}

const calcp1 = (a: aoc.Aoc): number => {
    const lgs = a.lineGroups();
    const seeds = parseSeeds(lgs.shift()[0]);
    console.log("Seeds: " + seeds);
    const maps = lgs.map(parseMaps);
    //    console.log(maps);
    const locs = seeds.map((s) => runMaps(s, maps));
    console.log("Locs: " + locs);
    return Math.min(...locs);
};

const myPipe = (n: number, fs: Array<(n: number) => number>): number => {
    fs.forEach((f) => (n = f(n)));
    return n;
};

const rangeApplies = (r: range, n: number) => {
    return n >= r.src && n < r.src + r.len;
};

const runMap =
    (m: map) =>
    (n: number): number => {
        const ranges = m.ranges.filter((r) => rangeApplies(r, n));
        if (ranges.length == 0) {
            return n;
        }
        return n - ranges[0].src + ranges[0].dst;
    };

const runMaps = (s: number, maps: Array<map>) => {
    return myPipe(
        s,
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

    let m = { from: matches[1], to: matches[2], ranges: new Array<range>() };
    ls.shift();
    m.ranges = ls.map(parseRange);

    return m;
};

const parseRange = (s: string): range => {
    const bits = s.split(" ").map(aoc.strToNum);
    return { src: bits[1], dst: bits[0], len: bits[2] };
};

const parseSeeds = (l: string): Array<number> => {
    const nums = l.slice(7);
    return nums.split(" ").map(aoc.strToNum);
};
