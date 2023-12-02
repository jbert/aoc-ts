import * as aoc from "./aoc";

type colour = "red" | "green" | "blue";

class game {
    id: number;
    reveals: Array<Map<colour, number>>;

    constructor(l: string) {
        const bits = l.split(": ", 2);
        this.id = Number(bits[0].split(" ")[1]);

        const reveals = bits[1]
            .split("; ")
            .map((s) => s.split(", ").map((s) => s.split(" ")));
        this.reveals = new Array<Map<colour, number>>();
        reveals.forEach((rs) => {
            let m = new Map<colour, number>();
            rs.forEach((r) => m.set(r[1] as colour, Number(r[0])));
            this.reveals.push(m);
        });
    }
}

const possible = (game: game, constraints: Map<colour, number>): boolean => {
    for (let [c, maxColour] of constraints) {
        for (let r of game.reveals) {
            const rc: number = r.get(c) ?? 0;
            if (rc > maxColour) {
                return false;
            }
        }
    }
    return true;
};

export const run = (a: aoc.Aoc): void => {
    console.log(a.lines);
    const games = a.lines.map((s) => new game(s));
    const constraints = new Map<colour, number>();
    constraints.set("red", 12);
    constraints.set("green", 13);
    constraints.set("blue", 14);
    const possibles = games.filter((g) => possible(g, constraints));
    console.log(aoc.sum(possibles.map((p) => p.id)));
};
