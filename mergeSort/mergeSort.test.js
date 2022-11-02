import { mergeSort } from './mergeSort';

test("Sort an even array", () => {
  expect(mergeSort([4, 8, 7, 5, 6, 1])).toEqual([1, 4, 5, 6, 7, 8]);
});
