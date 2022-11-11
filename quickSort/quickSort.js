function quickSort(arr, pivotOption, l = 0, r = arr.length - 1) {
  if (l >= r) {
    return;
  }
  let pivot = getPivot(pivotOption, l, r);
  swap(arr, l, pivot);
  let j = partition(arr, l, r);
  quickSort(arr, pivotOption, l, j - 1);
  quickSort(arr, pivotOption, j + 1, r);
  return { sortedArray: arr, comparisons: count };
}

function getPivot(option, l, r) {
  let pivot;
  switch (option) {
    case "first":
      pivot = l;
      break;
    case "last":
      pivot = r;
      break;
    case "random":
      pivot = getRandomPivot(l, r);
      break;
    case "3median":
      pivot = median([
        getRandomPivot(l, r),
        getRandomPivot(l, r),
        getRandomPivot(l, r),
      ]);
      break;
  }
  return pivot;
}

function getRandomPivot(first, last) {
  return Math.floor(Math.random() * (last + 1 - first) + first);
}

const median = (arr) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

function swap(arr, leftIndex, rightIndex) {
  let temp = arr[leftIndex];
  arr[leftIndex] = arr[rightIndex];
  arr[rightIndex] = temp;
}

function partition(arr, l, r) {
  let p = arr[l];
  let i = l + 1;
  for (let j = l + 1; j <= r; j++) {
    count++;
    if (arr[j] < p) {
      swap(arr, j, i);
      i++;
    }
  }
  swap(arr, l, i - 1);
  return i - 1;
}

// * CAMBIA EL SEGUNDO ATRIBUTO POR UN first, last, random O 3median
let countComparisons = 0;
for (let i = 0; i < 10000; i++) {
  var count = 0;
  var items = [2148, 9058, 7742, 3153, 6324, 609, 7628, 5469, 7017, 504];
  countComparisons += quickSort(items, "3median").comparisons;
}
console.log(`Comparisons: ${countComparisons / 10000}`);
