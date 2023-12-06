import * as aoc from "./aoc";

export const run = (a: aoc.Aoc): void => {
    const p1 = calcp1(a);
    console.log(`Part 1: ${p1}`);
    const p2 = calcp2(a);
    console.log(`Part 2: ${p2}`);
};

/*
Tb = Time button held   // Assume > 0, 0 will never win and give inf time (also assume < D)
Tm = Time boat moving
Tr = Time of race
D = distance of race

Tr = Tb + Tm            // 1: Total time of race defn
v = Tb                  // 2: Hold down button for N ms => N mm/ms
Tm = D / v = D / Tb     // 3: Time moving is distance / speed

Tm = Tr - Tb            // 4: (from 3)
Tr - Tb = D / Tb        // 5: (from 3+4)

Tr = D / Tb + Tb        // 6: Rearrange 5. Time of race. Minimise this w.r.t Tb
                        // Check:
                        //  Tb = 1      => Tr = D+1 (yep)
                        //  Tb = D/2    => 2 + D/2

dTr/dTb = -(D/Tb^2) + 1 // 7: Differentiate w.r.t Tb

dTr/dTb = 0             // 8: min/max occurs when deriv = 0
D/Tb^2 = 1
Tbf = sqrt(D)           // Tbf = Tb fastest

// 
Trf = D / Tbf + Tbf     // from 6, for Tbf
    = 2*sqrt(D)         // Check:
                        //  D = 9, Tbf = 3, wins at 2,3,4,5 ms

 */
interface race {
    distance: number;
    bestTime: number;
}

const raceTime = (r, Tb: number): number => {
    // Tr = D / Tb = Tb
    return r.distance / Tb + Tb;
};

/*
Tr * Tb = D + Tb^2      // 9: From 6
Tb^2 - Tr*Tb + D = 0    // 10: From 9
Solve for Tb in terms of D and Tr

                        // Ax^2 + Bx + C = 0
                        // => (-B +/- sqrt(B^2 - 4*A*C))/(2*A)
A = 1, B = -Tr, C = D
Tb(Tr,D) = (Tr +/- sqrt(Tr^2 - 4*D)) / 2
 */
const raceButtonPressLoHi = (r: race): Array<number> => {
    const term = Math.sqrt(r.bestTime * r.bestTime - 4 * r.distance);
    const lo = Math.ceil((r.bestTime - term) / 2);
    const hi = Math.floor((r.bestTime + term) / 2);
    return [lo, hi];
};

const raceNumWins = (r: race): number => {
    //    const raceTimes = aoc.iota(1, r.distance - 1).map((Tb) => raceTime(r, Tb));
    const lohi = raceButtonPressLoHi(r);
    const lo = lohi[0];
    const hi = lohi[1];
    let raceWins = hi - lo + 1;
    console.log(`raceWins ${raceWins} lo ${lo} hi ${hi}`);
    return raceWins;
};

export const calcp2 = (a: aoc.Aoc): number => {
    const race = parseRacesP2(a.lines);
    console.log(race);
    const numWins = raceNumWins(race);
    console.log(numWins);
    return numWins;
};

export const calcp1 = (a: aoc.Aoc): number => {
    const races = parseRaces(a.lines);
    const numWins = races.map(raceNumWins);
    console.log(numWins);
    return aoc.mul(numWins);
};

const parseRacesP2 = (ls: Array<string>): race => {
    const re = /([0-9]+)/g;
    const time = [...ls[0].matchAll(re)].map((match) => match[0]).join("");
    const distance = [...ls[1].matchAll(re)].map((match) => match[0]).join("");
    return { bestTime: Number(time), distance: Number(distance) };
};

const parseRaces = (ls: Array<string>): Array<race> => {
    const re = /([0-9]+)/g;
    const times = [...ls[0].matchAll(re)].map((match) => Number(match[0]));
    const distances = [...ls[1].matchAll(re)].map((match) => Number(match[0]));
    return times.map((t, i) => {
        return { bestTime: t, distance: distances[i] };
    });
};
