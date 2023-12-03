#!/usr/bin/env ts-node
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";

interface Foo {
    bar: string;
}

const foo = {
    bar: "hello",
} as Foo | undefined;

console.log(
    pipe(
        foo,
        O.fromNullable,
        O.map((v) => v.bar)
    )
);

interface comparable {
    equals<T>(other: T): boolean;
}

export function unique<T extends comparable>(as: Array<T>): Array<T> {
    const firstMatch = (v: T): number => {
        as.forEach((w, i) => {
            if (w.equals(v)) {
                return i;
            }
        });
        throw "logic bug - value isn't in array";
    };
    return as.filter((v, i) => {
        return firstMatch(v) == i;
    });
}

class F implements comparable {
    x: number;
    constructor(x: number) {
        this.x = x;
    }
    equals(y: number): boolean {
        return this.x == y;
    }
}

const fs = [new F(1), new F(2), new F(3)];
console.log(fs);
console.log(unique(fs));
