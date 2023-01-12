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

// * EVALUATE

const getOddNumbers = (n) => {
  let oddNumbers = [];
  let count = 0;
  while (oddNumbers.length < n) {
    if (count % 2 !== 0) {
      oddNumbers.push(count);
    }
    count++;
  }
  return oddNumbers;
};

const evaluateRandomPoints = (k, variance) => {
  let vx = getOddNumbers(k),
    vy = getOddNumbers(k),
    points = [],
    originalClusters = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < k; j++) {
      points.push([
        vx[j] + variance * Math.random(),
        vy[j] + variance * Math.random(),
      ]);
      originalClusters.push(j);
    }
  }
  return [points, originalClusters];
};

const evaluate = (k, variance, callBack) => {
  let [points, original] = evaluateRandomPoints(k, variance),
    test = kMeans(points, k, callBack),
    correct = 0,
    equivalent = {};
  for (let i = 0; i < test.length; i++) {
    if (equivalent[test[i]] === undefined) {
      equivalent[test[i]] = original[i];
    }
    if (equivalent[test[i]] === original[i]) {
      correct++;
    }
  }
  return correct / test.length;
};

// * PART 1
let accuracy3 = 0,
  accuracy4 = 0,
  accuracy5 = 0;
for (let i = 0; i < 100; i++) {
  accuracy3 += evaluate(3, 1, getRandomPoints);
  accuracy4 += evaluate(4, 1, getRandomPoints);
  accuracy5 += evaluate(5, 1, getRandomPoints);
}
console.log(`3 Centroids: ${accuracy3 / 100}`);
console.log(`4 Centroids: ${accuracy4 / 100}`);
console.log(`5 Centroids: ${accuracy5 / 100}`);

// * PART 2
let variances = [0.1, 0.5, 1, 1.5, 2, 2.5];
for (let variance of variances) {
  let accuracyRP = 0,
    accuracyDB = 0,
    accuracyRPD = 0;
  for (let i = 0; i < 100; i++) {
    accuracyRP += evaluate(3, variance, getRandomPoints);
    accuracyDB += evaluate(3, variance, divideBlocks);
    accuracyRPD += evaluate(3, variance, getRandomPointsFromData);
  }
  console.log(`Variance: ${variance}`);
  console.log(`RandomPoints: ${accuracyRP / 100}`);
  console.log(`Divide Blocks: ${accuracyDB / 100}`);
  console.log(`getRandomPointsFromData: ${accuracyRPD / 100}`);
}
