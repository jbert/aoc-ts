import * as aoc from "./aoc";

export const run = (a: aoc.Aoc): void => {
    const p1 = calcp1(a);
    console.log(`Part 1: ${p1}`);
    /*
    const p2 = calcp2(a);
    console.log(`Part 2: ${p2}`);
    */
};

export const calcp1 = (a: aoc.Aoc): number => {
    console.log(a.lines);
    const hands = a.lines.map(parseHand).sort(cmpHands).reverse();
    console.log(hands);
    const scores = hands.map((h, i) => {
        console.log(`Hand: ${h} Rank: ${i + 1}`);
        return h.bid * (i + 1);
    });
    console.log(scores);
    return aoc.sum(scores);
};

export class hand {
    cards: Array<string>;
    bid: number;
    power: number;

    constructor(cards: Array<string>, bid: number) {
        this.cards = cards;
        this.bid = bid;
        this.calcPower();
    }

    toString(): string {
        return `${this.cards.toString()} : ${this.bid} : ${this.power}`;
    }

    calcPower() {
        let countMap = new Map<string, number>();
        for (let c of this.cards) {
            const prev = countMap.get(c) ?? 0;
            countMap.set(c, prev + 1);
        }
        const counts = [...countMap.values()].sort(
            (a, b) => Number(b) - Number(a)
        );
        if (counts[0] == 5) {
            this.power = 7;
        } else if (counts[0] == 4) {
            this.power = 6;
        } else if (counts[0] == 3 && counts[1] == 2) {
            this.power = 5;
        } else if (counts[0] == 3) {
            this.power = 4;
        } else if (counts[0] == 2 && counts[1] == 2) {
            this.power = 3;
        } else if (counts[0] == 2) {
            this.power = 2;
        } else {
            this.power = 1;
        }
        console.log(counts);
    }
}

export const cmpCard = (a: string, b: string): number => {
    if (a.length != 1 || b.length != 1) {
        throw "too long for a card!";
    }
    const order = [
        "A",
        "K",
        "Q",
        "J",
        "T",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
    ];
    const aI = order.indexOf(a);
    const bI = order.indexOf(b);
    if (aI < 0 || bI < 0) {
        throw "not a card!";
    }
    return bI - aI;
};

export const cmpHands = (a: hand, b: hand): number => {
    const aP = a.power;
    const bP = b.power;
    if (aP != bP) {
        return bP - aP;
    }
    console.log(`cmpCard ${a.toString()} & ${b.toString()}`);
    for (let i in a.cards) {
        const c = cmpCard(a.cards[i], b.cards[i]);
        console.log(`${i} ${a.cards[i]} ${b.cards[i]}`);
        if (c != 0) {
            console.log(`ret c ${c}`);
            return -c;
        }
    }
    return 0;
};

export const parseHand = (l: string): hand => {
    const bits = l.split(" ");
    return new hand(bits[0].split(""), Number(bits[1]));
};
