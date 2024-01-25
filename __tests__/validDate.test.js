import { isValidDate } from "../checkDateRange.js";

describe("isValidDate", () => {
  test("returns false for non-number input", () => {
    expect(isValidDate("not a number", 15)).toBe(false);
    expect(isValidDate(3, "not a number")).toBe(false);
    expect(isValidDate("not a number", "not a number")).toBe(false);
  });

  test("returns false for invalid month (less than 1 or greater than 12)", () => {
    expect(isValidDate(0, 15)).toBe(false);
    expect(isValidDate(13, 15)).toBe(false);
  });

  test("returns false for invalid day based on the month", () => {
    // Assuming the test is run in a non-leap year
    expect(isValidDate(2, 29)).toBe(false);
    expect(isValidDate(4, 31)).toBe(false);
  });

  test("returns true for a valid date", () => {
    // February has 28 days
    expect(isValidDate(2, 28)).toBe(true);
    expect(isValidDate(4, 15)).toBe(true);
  });
});

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
