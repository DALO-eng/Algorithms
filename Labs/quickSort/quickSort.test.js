import { quickSort } from "./quickSort";

 test("Sort array with first element as pivot", () => {
   let items = [2148, 9058, 7742, 3153, 6324, 609, 7628, 5469, 7017, 504];
   expect(quickSort(items, "first").comparisons).toEqual(25);
 });

test("Sort array with last element as pivot", () => {
  let items = [2148, 9058, 7742, 3153, 6324, 609, 7628, 5469, 7017, 504];
  expect(quickSort(items, "last").comparisons).toEqual(31);
});