import * as aoc from "./aoc";
import { pipe } from "fp-ts/function";

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

const runRange = (r: range): ((n: number) => number) => {
    return (n: number): number => {
        if (n < r.src || n > r.src + r.len) {
            return n;
        }
        return n - r.src + r.dst;
    };
};

const runMap =
    (m: map) =>
    (n: number): number => {
        return myPipe(
            n,
            m.ranges.map((r) => {
                console.log(`Map: ${m.from} -> ${m.to}`);
                return runRange(r);
            })
        );
    };

const runMaps = (s: number, maps: Array<map>) => {
    return myPipe(
        s,
        maps.map((m) => runMap(m))
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
    return { src: bits[0], dst: bits[1], len: bits[2] };
};

const parseSeeds = (l: string): Array<number> => {
    const nums = l.slice(7);
    return nums.split(" ").map(aoc.strToNum);
};
