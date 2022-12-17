const getRandomPointsFromData = (data, k) => {
  const numSamples = data.length,
    randomPoints = [];
  while (randomPoints.length < k) {
    const random = Math.floor(Math.random() * numSamples);
    if (!randomPoints.includes(data[random])) {
      randomPoints.push(data[random]);
    }
  }
  return randomPoints;
};

const getRandomPoints = (data, k) => {
  const dataX = data.map((point) => point[0]),
    dataY = data.map((point) => point[1]),
    minX = Math.min(...dataX),
    maxX = Math.max(...dataX),
    minY = Math.min(...dataY),
    maxY = Math.max(...dataY),
    randomPoints = [];
  while (randomPoints.length < k) {
    const randomX = Math.random() * (maxX - minX) + minX,
      randomY = Math.random() * (maxY - minY) + minY;
    randomPoints.push([randomX, randomY]);
  }
  return randomPoints;
};

const divideBlocks = (data, k) => {
  const dataX = data.map((point) => point[0]),
    dataY = data.map((point) => point[1]),
    minX = Math.min(...dataX),
    maxX = Math.max(...dataX),
    minY = Math.min(...dataY),
    maxY = Math.max(...dataY),
    blockWidth = (maxX - minX) / k,
    blockHeight = (maxY - minY) / k,
    blocks = [];
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k; j++) {
      blocks.push([
        [minX + i * blockWidth, minY + j * blockHeight],
        [minX + (i + 1) * blockWidth, minY + (j + 1) * blockHeight],
      ]);
    }
  }
  return blocks;
};

const assignPoints = (data, centroids, k) => {
  const pointsAssigned = [];
  for (let point of data) {
    let minDist = Infinity,
      minIndex = -1;
    for (let i = 0; i < k; i++) {
      const dist = Math.sqrt(
        (point[0] - centroids[i][0]) ** 2 + (point[1] - centroids[i][1]) ** 2
      );
      if (dist < minDist) {
        minDist = dist;
        minIndex = i;
      }
    }
    pointsAssigned.push(minIndex);
  }
  return pointsAssigned;
};

const setNewCentroids = (data, pointsAssigned, k) => {
  let centroids = [];
  for (let i = 0; i < k; i++) {
    let points = [];
    for (let j = 0; j < pointsAssigned.length; j++) {
      if (pointsAssigned[j] === i) {
        points.push(data[j]);
      }
    }
    let centroid = [0, 0];
    for (let point of points) {
      centroid[0] += point[0];
      centroid[1] += point[1];
    }
    centroid[0] /= points.length;
    centroid[1] /= points.length;
    centroids.push(centroid);
  }
  return centroids;
};

const kMeans = (data, k) => {
  let oldCentroids = [],
    centroids = getRandomPoints(data, k),
    pointsAssigned;
  while (JSON.stringify(centroids) !== JSON.stringify(oldCentroids)) {
    pointsAssigned = assignPoints(data, centroids, k);
    oldCentroids = centroids;
    centroids = setNewCentroids(data, pointsAssigned, k);
  }
  return pointsAssigned;
};

let data = [
  [1, 2],
  [1, 3],
  [2, 5],
  [7, 3],
];
console.log(kMeans(data, 3));
