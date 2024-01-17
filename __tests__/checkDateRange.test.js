import { checkDateRange } from "../checkDateRange.js";
import { jest } from "@jest/globals";

describe("checkDateRange with startMonth > endMonth", () => {
  const originalDate = global.Date;

  afterEach(() => {
    global.Date = originalDate;
  });

  const dateRange = {
    startMonth: 12,
    endMonth: 2,
    startDay: 15,
    endDay: 15,
  };
  const testCases = [
    // Dates within the range
    { date: "2024-12-15", expected: true },
    { date: "2024-12-31", expected: true },
    { date: "2024-01-15", expected: true },
    { date: "2024-02-01", expected: true },
    { date: "2024-02-15", expected: true },

    // Dates outside the range
    { date: "2024-02-16", expected: false },
    { date: "2024-03-01", expected: false },
    { date: "2024-12-14", expected: false },
  ];

  testCases.forEach((testCase) => {
    test(`returns ${testCase.expected} for date ${testCase.date}`, () => {
      const mockDate = new Date(testCase.date);
      global.Date = jest.fn(() => mockDate);

      const result = checkDateRange(dateRange);
      expect(result).toBe(testCase.expected);
    });
  });
});

describe("checkDateRange with startMonth < endMonth", () => {
  const originalDate = global.Date;

  afterEach(() => {
    global.Date = originalDate;
  });

  const dateRange = {
    startMonth: 1,
    endMonth: 3,
    startDay: 1,
    endDay: 30,
  };
  const testCases = [
    // Dates within the range
    { date: "2024-01-01", expected: true },
    { date: "2024-01-02", expected: true },
    { date: "2024-02-29", expected: true },
    { date: "2024-03-10", expected: true },
    { date: "2024-03-30", expected: true },

    // Dates outside the range
    { date: "2024-03-31", expected: false },
    { date: "2024-04-01", expected: false },
    { date: "2024-12-01", expected: false },
  ];

  testCases.forEach((testCase) => {
    test(`returns ${testCase.expected} for date ${testCase.date}`, () => {
      const mockDate = new Date(testCase.date);
      global.Date = jest.fn(() => mockDate);

      const result = checkDateRange(dateRange);
      expect(result).toBe(testCase.expected);
    });
  });
});

describe("checkDateRange with startMonth === endMonth", () => {
  const originalDate = global.Date;

  afterEach(() => {
    global.Date = originalDate;
  });

  const dateRange = {
    startMonth: 5,
    endMonth: 5,
    startDay: 1,
    endDay: 31,
  };
  const testCases = [
    // Dates within the range
    { date: "2024-05-01", expected: true },
    { date: "2024-05-31", expected: true },

    // Dates outside the range
    { date: "2024-01-01", expected: true },
    { date: "2024-01-02", expected: true },
    { date: "2024-02-29", expected: true },
    { date: "2024-03-10", expected: true },
    { date: "2024-03-30", expected: true },
  ];

  testCases.forEach((testCase) => {
    test(`returns ${testCase.expected} for date ${testCase.date}`, () => {
      const mockDate = new Date(testCase.date);
      global.Date = jest.fn(() => mockDate);

      const result = checkDateRange(dateRange);
      expect(result).toBe(testCase.expected);
    });
  });
});

describe("checkDateRange with invalid range input", () => {
  test("returns an error for invalid date range input", () => {
    const invalidDateRange1 = {
      startMonth: 10,
      startDay: 33,
      endMonth: 2,
      endDay: 1,
    };
    const invalidDateRange2 = {
      startMonth: 10,
      startDay: 30,
      endMonth: 2,
      endDay: 29,
    };
    const invalidDateRange3 = {
      startMonth: 10,
      startDay: 33,
      endMonth: "",
      endDay: 1,
    };
    const invalidDateRange4 = {
      startMonth: 10,
      startDay: 10,
      endMonth: 10,
      endDay: 10,
    };
    const invalidDateRange5 = {
      startMonth: 10,
      startDay: 11,
      endMonth: 10,
      endDay: 10,
    };
    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});
    const result1 = checkDateRange(invalidDateRange1);
    const result2 = checkDateRange(invalidDateRange2);
    const result3 = checkDateRange(invalidDateRange3);
    const result4 = checkDateRange(invalidDateRange3);
    const result5 = checkDateRange(invalidDateRange3);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
    expect(result5).toBe(false);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid date range values provided in the config file. Check documentation for more information."
    );

    consoleErrorSpy.mockRestore();
  });
});
