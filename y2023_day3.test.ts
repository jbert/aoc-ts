import * as d3 from "./y2023_day3";
import * as aoc from "./aoc";

interface testCase {
    name: string;
    in: string;
    expected: number;
}

const testCases = [
    { name: "Single line after, at end", in: ".467+", expected: 467 },
    {
        name: "Single line after, trailing blank line",
        in: ".467+\n.....",
        expected: 467,
    },
    { name: "Failing case!", in: ".....\n.467.\n....+", expected: 467 },
] as Array<testCase>;
const a = new aoc.Aoc(2023, 3, false);

testCases.forEach((tc) => {
    test(tc.name, () => {
        a.setLines(tc.in.split("\n"));
        const got = d3.calc(a);
        expect(got).toBe(tc.expected);
    });
});
