import checkDateRange from "../checkDateRange.js";
import { jest } from "@jest/globals";

describe("checkDateRange", () => {
  const originalDate = global.Date;

  afterEach(() => {
    global.Date = originalDate;
  });

  const testCases = [
    // Dates within the range
    { date: "2022-12-15", expected: true },
    { date: "2022-12-31", expected: true },
    { date: "2023-01-15", expected: true },
    { date: "2023-02-01", expected: true },
    { date: "2023-02-15", expected: true },

    // Dates outside the range
    { date: "2022-02-16", expected: false },
    { date: "2023-03-01", expected: false },
    { date: "2023-12-14", expected: false },
  ];

  testCases.forEach(({ date, expected }) => {
    test(`returns ${expected} for date ${date}`, () => {
      // Mock the current date to the specified date
      global.Date = class extends Date {
        constructor() {
          super(date);
        }
      };

      // Expect the function to return the expected value
      expect(checkDateRange()).toBe(expected);
    });
  });
});
