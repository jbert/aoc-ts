import * as P from "./pts";

test("allNeighbours", () => {
    const p = new P.Pt(0, 0);
    const got = p.allNeighbours();
    const expected = [
        new P.Pt(0, 1),
        new P.Pt(1, 0),
        new P.Pt(0, -1),
        new P.Pt(-1, 0),
        new P.Pt(-1, +1),
        new P.Pt(+1, -1),
        new P.Pt(+1, +1),
        new P.Pt(-1, -1),
    ];
    expect(got).toBe(expected);
});
