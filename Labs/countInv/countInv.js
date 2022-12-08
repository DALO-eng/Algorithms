import { mergeSort } from '../mergeSort/mergeSort';

export function countInv(array) {
  let leftInv = 0;
  let rightInv = 0;
  let splitInv = 0;
  const HALF = Math.ceil(array.length / 2);

  if (array.length === 0 || array.length === 1) return 0;
  else {
    leftInv = countInv(array.slice(0, HALF));
    rightInv = countInv(array.slice(HALF));
    splitInv = countSplitInv(
      mergeSort(array.slice(0, HALF)),
      mergeSort(array.slice(HALF))
    );
    return leftInv + rightInv + splitInv;
  }
}

function countSplitInv(firstHalf, secondHalf) {
  let count = 0;
  let i = 0;
  let j = 0;
  let n = firstHalf.length + secondHalf.length;

  for (let k = 0; k < n; k++) {
    if (firstHalf[i] < secondHalf[j]) {
      i++;
    } else if (firstHalf[i] >= secondHalf[j]) {
      j++;
      count = count + firstHalf.length - i;
    }
  }
  return count;
}
