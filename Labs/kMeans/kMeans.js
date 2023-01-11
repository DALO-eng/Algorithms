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
    totalBlocks = Math.ceil(k / 4) * 4,
    numColumns = 4,
    numRows = totalBlocks / numColumns,
    width = (maxX - minX) / numColumns,
    height = (maxY - minY) / numRows,
    blocks = [],
    randomPoints = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      blocks.push([
        [minX + j * width, minY + i * height],
        [minX + (j + 1) * width, minY + (i + 1) * height],
      ]);
    }
  }
  for (let i of blocks) {
    if (randomPoints.length === k) {
      break;
    }
    const randomX = Math.random() * (i[1][0] - i[0][0]) + i[0][0],
      randomY = Math.random() * (i[1][1] - i[0][1]) + i[0][1];
    randomPoints.push([randomX, randomY]);
  }
  return randomPoints;
};

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

// * CALLBACK IS THE FUNCTION YOU WANNA USE FOR INITIALIZE
const kMeans = (data, k, callBack) => {
  let oldCentroids = [],
    centroids = callBack(data, k),
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

// * EVALUATE

const evaluateKMeans = (k, variance) => {
  let vx = [1, 3, 5],
    vy = [1, 3, 5],
    points = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 3; j++) {
      points.push([
        vx[j] + variance * Math.random(),
        vy[j] + variance * Math.random(),
      ]);
    }
  }
  return kMeans(points, k, getRandomPoints);
};
