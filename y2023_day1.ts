import * as aoc from "./aoc";

const a = new aoc.Aoc(2023, 1, false);

const digitToNumber = (d: string): number => {
    return Number(d);
};

const isDigit = (d: string): boolean => {
    return !isNaN(Number(d));
};

const filterDigits = (s: string): Array<number> => {
    return s
        .split("")
        .filter((s) => isDigit(s))
        .map((d) => Number(d));
};

export const run = (a: aoc.Aoc): void => {
    const digitss = a.lines.map(filterDigits);
    const nums = digitss.map((ds) => ds[0] * 10 + ds[ds.length - 1]);
    console.log(nums);
    console.log(aoc.sum(nums));
};

run(a);
