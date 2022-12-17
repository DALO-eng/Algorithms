const vertices = [0, 1, 2, 3, 4, 5, 6];
const edges = [
  [1, 0],
  [1, 2],
  [2, 0],
  [1, 3],
  [1, 4],
  [1, 6],
  [3, 5],
  [4, 5],
];

const createAdjacencyList = (vertices, edges) => {
  const adjacencyList = new Map();
  vertices.forEach((vertex) => adjacencyList.set(vertex, []));
  edges.forEach((edge) => {
    adjacencyList.get(edge[0]).push(edge[1]);
    adjacencyList.get(edge[1]).push(edge[0]);
  });
  return adjacencyList;
};

// * O(V + E)
const bfs = (adjaList, s) => {
  const visited = new Set();
  const queue = [s];
  while (queue.length > 0) {
    const v = queue.shift();
    const edjes = adjaList.get(v);
    for (let i of edjes) {
      if (!visited.has(i)) {
        visited.add(i);
        queue.push(i);
      }
    }
  }
  return visited;
};

const criticalConnections = (vertex, edges) => {
  let newEdges, adjaList, first;
  let criticalEdges = [];
  // * O(E)
  for (let i of edges) {
    newEdges = edges.filter((edge) => edge !== i);
    adjaList = createAdjacencyList(vertex, newEdges);
    [first] = adjaList.keys();
    if (bfs(adjaList, first).size !== vertex.length) criticalEdges.push(i);
  }
  return criticalEdges;
};

console.log(criticalConnections(vertices, edges));
