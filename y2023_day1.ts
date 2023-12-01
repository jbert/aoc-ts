import * as aoc from "./aoc";

const a = new aoc.Aoc(2023, 1, false);

const digitToNumber = (d: string): number => {
    return Number(d);
};

const isDigit = (d: string): boolean => {
    return !isNaN(Number(d));
};

const wordsToDigits = (s: string): Array<number> => {
    const wordToDigit = new Map(
        Object.entries({
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
        })
    );
    let digits = new Array<number>();
    [...s].forEach((c, i) => {
        if (isDigit(c)) {
            digits.push(digitToNumber(c));
            return;
        }
        for (let len = 3; len <= s.length - i; len++) {
            let substr = s.slice(i, i + len);
            let r = wordToDigit.get(substr);
            if (r) {
                digits.push(r);
                return;
            }
        }
    });
    return digits;
};

const filterDigits = (s: string): Array<number> => {
    return s
        .split("")
        .filter((s) => isDigit(s))
        .map((d) => Number(d));
};

export const run = (a: aoc.Aoc): void => {
    console.log(a.lines);
    const digitss = a.lines.map(filterDigits);
    const nums = digitss.map((ds) => ds[0] * 10 + ds[ds.length - 1]);
    //    console.log(nums);
    console.log("Part1: " + aoc.sum(nums));
    console.log(a.lines);
    console.log(a.lines.map(wordsToDigits));
    const p2digitss = a.lines.map(wordsToDigits);
    console.log(p2digitss);
    const p2nums = p2digitss.map((ds) => ds[0] * 10 + ds[ds.length - 1]);
    console.log(p2nums);
    console.log("Part2: " + aoc.sum(p2nums));
};
