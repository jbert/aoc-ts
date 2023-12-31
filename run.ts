#!/usr/bin/env ts-node
import * as aoc from "./aoc";
import * as y2023d1 from "./y2023_day1";
import * as y2023d2 from "./y2023_day2";
import * as y2023d3 from "./y2023_day3";
import * as y2023d4 from "./y2023_day4";
import * as y2023d5 from "./y2023_day5";
import * as y2023d6 from "./y2023_day6";
import * as y2023d7 from "./y2023_day7";

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
    d2c.set(3, y2023d3.run);
    d2c.set(4, y2023d4.run);
    d2c.set(5, y2023d5.run);
    d2c.set(6, y2023d6.run);
    d2c.set(7, y2023d7.run);
    return d2c.get(day);
};

main();
