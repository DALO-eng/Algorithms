const countInv = require("./countInv");

test("Sorted array inversions", () => {
  expect(countInv([1, 2, 3, 4, 5, 6, 7, 8])).toBe(0);
});

test("Reverse sorted array inversions", () => {
  expect(countInv([8, 7, 6, 5, 4, 3, 2, 1])).toBe(28);
});

test("Test case", () => {
  expect(
    countInv([
      54044, 14108, 79294, 29649, 25260, 60660, 2995, 53777, 49689, 9083,
    ])
  ).toBe(28);
});
