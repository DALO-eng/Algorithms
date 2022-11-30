export const greedyWeight = (tasks) => {
  tasks.sort((a, b) => b.weight - a.weight);
  return tasks;
};
