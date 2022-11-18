const vertices = [1, 2, 3, 4, 5, 6];
const edges = [
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 5],
  [3, 5],
  [3, 4],
  [4, 5],
  [4, 6],
  [5, 6],
];

const adjacencyList = new Map();

const addVertex = (vertex) => {
  adjacencyList.set(vertex, []);
};

const addEdge = (begin, end) => {
  adjacencyList.get(begin).push(end);
  adjacencyList.get(end).push(begin);
};

vertices.forEach(addVertex);
edges.forEach((edge) => addEdge(...edge));

console.log(adjacencyList);

const bfs = (adjList, s) => {
  let layers = new Map();
  layers.set(s, 0);
  let explored = [s];
  let queue = [s];
  while (queue.length > 0) {
    let v = queue.shift();
    let vEdges = adjList.get(v);
    for (let edge of vEdges) {
      if (!explored.includes(edge)) {
        explored.push(edge);
        queue.push(edge);
        layers.set(edge, layers.get(v) + 1);
      }
    }
  }
  return layers;
};

console.log(bfs(adjacencyList, 5));
