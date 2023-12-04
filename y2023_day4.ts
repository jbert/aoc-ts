import * as aoc from "./aoc";
import * as P from "./pts";

export const run = (a: aoc.Aoc): void => {
    const p1 = calcp1(a);
    console.log(`Part 1: ${p1}`);
    const p2 = calcp2(a);
    console.log(`Part 2: ${p2}`);
};

interface card {
    id: number;
    winning: Array<number>;
    has: Array<number>;
}

const cardScore = (c: card): number => {
    const numWinners = cardNumWinners(c);
    if (numWinners == 0) {
        return 0;
    }
    return Math.pow(2, numWinners - 1);
};

const cardNumWinners = (c: card): number => {
    const isWinner = (n: number) => c.winning.includes(n);
    return c.has.filter(isWinner).length;
};

const parseLine = (l: string): card => {
    const re = /^Card +([0-9]+):([0-9 ]+)\|([0-9 ]+)$/;
    const m = l.match(re);
    const wins = m[2]
        .trim()
        .split(" ")
        .filter((s) => s.length > 0)
        .map(aoc.strToNum);
    const hass = m[3]
        .trim()
        .split(" ")
        .filter((s) => s.length > 0)
        .map(aoc.strToNum);
    const result = { id: Number(m[1]), winning: wins, has: hass };
    //console.log(result);
    return result;
};

const calcp1 = (a) => {
    const cards = a.lines.map(parseLine);
    const scores = cards.map(cardScore);
    //    console.log(scores);
    return aoc.sum(scores);
};

const calcp2 = (a) => {
    const cards = a.lines.map(parseLine);
    const numWinners = cards.map(cardNumWinners);
    let cardCounts = new Array<number>(numWinners.length).fill(1);
    numWinners.forEach((n, i) => {
        for (let j = 1; j <= n; j++) {
            cardCounts[i + j] += cardCounts[i];
        }
    });
    console.log(cardCounts);
    return aoc.sum(cardCounts);
};
