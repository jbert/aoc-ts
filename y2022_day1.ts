import * as aoc from "./aoc";

const a = new aoc.aoc(2022, 1, false);
const elfCalories = a.loadLineGroups();
//console.log("ecs: " + elfCalories);
//console.log("num elves: " + elfCalories.length);
const nums = elfCalories.map(aoc.linesToNums);
//console.log("nums: " + nums);
//console.log("nums.length: " + nums.length);
const totals = nums.map(aoc.sum);
console.log("Max cals: " + Math.max(...totals));
