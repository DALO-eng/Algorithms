const vertices = [0, 1, 2, 3];
const edges = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
];

// * O(V + E)
const createAdjacencyList = (vertices, edges) => {
  const adjacencyList = new Map();
  vertices.forEach((vertex) => adjacencyList.set(vertex, []));
  edges.forEach((edge) => {
    adjacencyList.get(edge[0]).push(edge[1]);
    adjacencyList.get(edge[1]).push(edge[0]);
  });
  return adjacencyList;
};

const targan = (adjaList) => {
  const visited = {},
    low = {},
    disc = {},
    parent = {},
    criticalEdges = [];
  let time = 0,
    [first] = adjaList.keys();

  const dfs = (u) => {
    visited[u] = true;
    disc[u] = time;
    low[u] = time;
    time += 1;
    const edjes = adjaList.get(u);
    for (let i of edjes) {
      if (!visited[i]) {
        parent[i] = u;
        dfs(i);
        low[u] = Math.min(low[u], low[i]);
        if (low[i] > disc[u]) criticalEdges.push([u, i]);
      } else if (i !== parent[u]) {
        low[u] = Math.min(low[u], disc[i]);
      }
    }
  };
  dfs(first);
  return criticalEdges;
};

console.log(targan(createAdjacencyList(vertices, edges)));
