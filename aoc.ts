import * as fs from "fs";

export class Aoc {
    day: number;
    year: number;
    lines: Array<string>;

    constructor(
        year: number,
        day: number,
        useTestData: boolean = true,
        suffix?: string
    ) {
        this.day = day;
        this.year = year;
        suffix ??= "";
        if (useTestData) {
            suffix = "-test" + suffix;
        }
        this.lines = this.loadLines(suffix);
    }

    setLines(lines: Array<string>) {
        this.lines = lines;
    }

    loadLines(suffix: string): string[] {
        const contents = this.load(suffix);
        let lines = contents.split("\n");
        lines.pop();
        return lines;
    }

    load(suffix: string): string {
        const path = this.path(suffix);
        const contents = fs.readFileSync(path, "utf8");
        return contents;
    }

    path(suffix: string): string {
        let path = "./data/y" + this.year + "/day" + this.day;
        path += suffix;
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

export function intersect(as: Array<any>, bs: Array<any>): Array<any> {
    let result = new Array<any>();
    for (let i = 0; i < as.length; i++) {
        for (let j = 0; j < bs.length; j++) {
            if (as[i].equals(bs[j])) {
                result.push(as[i]);
            }
        }
    }
    return result;
}

export function unique(as: Array<any>): Array<any> {
    const firstMatch = (v: any): number => {
        for (let i = 0; i < as.length; i++) {
            const w = as[i];
            if (w.equals(v)) {
                return i;
            }
        }
        throw "logic bug - value not in array";
    };
    return as.filter((v, i) => {
        return firstMatch(v) == i;
    });
}

export function all(bs: Array<boolean>): boolean {
    return bs.every((x: boolean) => x);
}

export function any(bs: Array<boolean>): boolean {
    return bs.some((x: boolean) => x);
}

export function isDigit(s: string): boolean {
    return s.length == 1 && s[0] >= "0" && s[0] <= "9";
}

export function iota(start: number, end: number): Array<number> {
    return [...Array(end - start).keys()].map((n) => n + start);
}

export function linesToNums(ls: string[]): number[] {
    return ls.map(strToNum);
}

export function strToNum(l: string): number {
    return +l;
}

export function sum(ns: number[]): number {
    return ns.reduce((a, b) => a + b, 0);
}
