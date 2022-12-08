import { greedyDiff } from "./greedyDiff.js";
import { greedyRatio } from "./greedyRatio.js";

const tasks = [
  { weight: 8, length: 50 },
  { weight: 74, length: 59 },
  { weight: 31, length: 73 },
  { weight: 45, length: 79 },
  { weight: 24, length: 10 },
  { weight: 41, length: 66 },
  { weight: 93, length: 43 },
  { weight: 88, length: 4 },
  { weight: 28, length: 30 },
  { weight: 41, length: 13 },
  { weight: 4, length: 70 },
  { weight: 10, length: 58 },
];

const objectiveFunction = (tasks) => {
  let time = 0;
  let sum = 0;
  for (let i = 0; i < tasks.length; i++) {
    time += tasks[i].length;
    sum += tasks[i].weight * time;
  }
  return sum;
};

console.log(objectiveFunction(greedyDiff(tasks)));
console.log(objectiveFunction(greedyRatio(tasks)));
