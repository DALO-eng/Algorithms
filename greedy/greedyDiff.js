export const greedyDiff = (tasks) => {
  tasks.sort((a, b) => b.weight - b.length - (a.weight - a.length));
  tasks.sort((a, b) => {
    if (a.weight - a.length === b.weight - b.length) {
      return b.length - a.length;
    }
  });
  return tasks;
};
