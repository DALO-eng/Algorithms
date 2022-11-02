function merge(left, right) {
  let arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return [...arr, ...left, ...right];
}

export function mergeSort(array) {
  let leftSide = [];
  let rightSide = [];
  const half = array.length / 2;
  if (array.length < 2) {
    return array;
  }
  const left = array.splice(0, half);
  leftSide = mergeSort(left);
  rightSide = mergeSort(array);
  return merge(leftSide, rightSide);
}
