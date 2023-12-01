import * as aoc from "./aoc";
import * as A from "fp-ts/Array";
import * as N from "fp-ts/number";

const a = new aoc.Aoc(2022, 1, false);
const elfCalories = a.lineGroups();
//console.log("ecs: " + elfCalories);
//console.log("num elves: " + elfCalories.length);
const nums = elfCalories.map(aoc.linesToNums);
//console.log("nums: " + nums);
//console.log("nums.length: " + nums.length);
const totals: number[] = nums.map(aoc.sum);
console.log("Max cals: " + Math.max(...totals));

const sortedTotals = A.sort(N.Ord)(totals).reverse();
console.log(sortedTotals);
console.log(
    "Top 3: cals: " + (sortedTotals[0] + sortedTotals[1] + sortedTotals[2])
);
