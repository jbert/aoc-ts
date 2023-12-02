#!/usr/bin/env ts-node
import * as aoc from "./aoc";
import * as y2023d1 from "./y2023_day1";
import * as y2023d2 from "./y2023_day2";

const getArgs = (): Array<string> => {
    // Called as ts-node script arg1 arg2 ...
    const argv = process.argv.slice(2);
    if (argv.length != 2 && argv.length != 3) {
        throw "Must call with 2 or 3 args";
    }
    return argv;
};

const main = () => {
    const argv = getArgs();
    const day = Number(argv[0]);
    const useTest = argv[1] == "true";
    const suffix = argv[2] ?? "";
    const year = 2023;
    const a = new aoc.Aoc(year, day, useTest, suffix);
    const runDay = getDay(year, day);
    runDay(a);
};

const getDay = (year: number, day: number) => {
    if (year != 2023) {
        throw "todo";
    }
    let d2c = new Map();
    d2c.set(1, y2023d1.run);
    d2c.set(2, y2023d2.run);
    return d2c.get(day);
};

main();
