import { sum } from "../sum";

test("sum function should return the sum of 2 numbers", () => {
  const result = sum(3, 6);
  expect(result).toBe(9);
});
