import { calculateDiscount } from "../utils/calculateDiscount";

describe("calculateDiscount", () => {
  test("applies 20% discount for premium users", () => {
    expect(calculateDiscount(100, "premium")).toBe(80);
  });

  test("applies 10% discount for gold users", () => {
    expect(calculateDiscount(100, "gold")).toBe(90);
  });
});
