const graph = {
  0: { 1: 7, 2: 9, 5: 14 },
  1: { 2: 10, 3: 15 },
  2: { 5: 2 },
  3: {},
  4: { 3: 6 },
  5: { 4: 9 },
};

const dijkstra = (graph, s) => {
  let visited = [];
  let len = {};
  Object.keys(graph).forEach((vertex) => len[vertex] = Infinity);
  len[s] = 0;
  visited.push(s);
  for (let vertex of visited) {
    let edges = graph[vertex];
    Object.assign(len, edges);
  }
  return len;
};
console.log(dijkstra(graph, "0"));
