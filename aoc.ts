import * as fs from "fs";

export class Aoc {
    day: number;
    year: number;
    useTestData: boolean;
    lines: Array<string>;

    constructor(year: number, day: number, useTestData: boolean = true) {
        this.day = day;
        this.year = year;
        this.useTestData = useTestData;
        this.lines = this.loadLines();
    }

    loadLines(): string[] {
        const contents = this.load();
        let lines = contents.split("\n");
        lines.pop();
        return lines;
    }

    load(): string {
        const path = this.path();
        const contents = fs.readFileSync(path, "utf8");
        return contents;
    }

    path(): string {
        let path = "./data/y" + this.year + "/day" + this.day;
        if (this.useTestData) {
            path += "-test";
        }
        path += ".txt";
        return path;
    }

    toString(): string {
        return "Year " + this.year + " Day " + this.day;
    }

    lineGroups(): string[][] {
        var lineGroups = new Array<Array<string>>();
        let currentGroup = new Array<string>();
        this.lines.forEach((l) => {
            if (l === "") {
                lineGroups.push(currentGroup);
                currentGroup = [];
            } else {
                currentGroup.push(l);
            }
        });
        lineGroups.push(currentGroup);
        return lineGroups;
    }
}

export function linesToNums(ls: string[]): number[] {
    return ls.map(lineToNum);
}

export function lineToNum(l: string): number {
    return +l;
}

export function sum(ns: number[]): number {
    return ns.reduce((a, b) => a + b, 0);
}
