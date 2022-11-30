export const greedyRatio = (tasks) => {
  tasks.sort((a, b) => b.weight / b.length - a.weight / a.length);
  return tasks;
};
