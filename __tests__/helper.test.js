import { isValidDate } from "../helper.js";

describe("isValidDate", () => {
  test("returns true for a valid date", () => {
    expect(isValidDate(1, 15)).toBe(true);
    expect(isValidDate(2, 28)).toBe(true);
    expect(isValidDate(3, 31)).toBe(true);
    expect(isValidDate(12, 31)).toBe(true);
    expect(isValidDate(10, 30)).toBe(true);
  });

  test("returns false for invalid month or day", () => {
    expect(isValidDate("January", 15)).toBe(false);
    expect(isValidDate(4, "twenty")).toBe(false);
    expect(isValidDate(13, 1)).toBe(false);
    expect(isValidDate(6, 32)).toBe(false);
    expect(isValidDate(2, 29)).toBe(false);
  });
});
