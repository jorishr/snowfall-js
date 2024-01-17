import {
  validateConfigBoolean,
  validateConfigString,
  validateConfigNumber,
  validateConfigParams,
  getDefaultParams,
  setParams,
} from "../params.js";
import { jest } from "@jest/globals";

describe("validateConfigBoolean function", () => {
  test("should insert boolean value into params for valid input", () => {
    const key1 = "checkHardware";
    const key2 = "show";
    const params = {
      checkHardware: true,
      checkDateRange: true,
      switches: {
        show: true,
      },
    };
    const userParams = {
      checkHardware: false,
      switches: {
        show: false,
      },
    };

    validateConfigBoolean(key1, params, userParams);
    validateConfigBoolean(key2, params, userParams);
    expect(params.checkHardware).toBe(false);
    expect(params.switches.show).toBe(false);
  });
});

describe("validateConfigString function", () => {
  test("should insert string value into params for valid input", () => {
    const key1 = "zIndex";
    const key2 = "bgClrOff";
    const key3 = "txtPosition";
    const params = {
      checkHardware: true,
      checkDateRange: true,
      snowfall: {
        zIndex: "1000",
      },
      switches: {
        show: true,
        styleSheetRoot: {
          bgClrOff: "#ffffff",
          txtPosition: "2",
        },
      },
    };
    const userParams = {
      checkHardware: true,
      checkDateRange: true,
      snowfall: {
        zIndex: "10",
      },
      switches: {
        show: true,
        styleSheetRoot: {
          bgClrOff: "#000000",
          txtPosition: "1",
        },
      },
    };

    validateConfigString(key1, params, userParams);
    validateConfigString(key2, params, userParams);
    validateConfigString(key3, params, userParams);
    expect(params.snowfall.zIndex).toBe("10");
    expect(params.switches.styleSheetRoot.bgClrOff).toBe("#000000");
    expect(params.switches.styleSheetRoot.txtPosition).toBe("1");
  });
});

describe("validateConfigNumber function", () => {
  test("should insert number value into params for valid input", () => {
    const key1 = "count";
    const key2 = "minRadius";
    const params = {
      checkHardware: true,
      checkDateRange: true,
      snowfall: {
        count: 100,
        minRadius: 3,
        zIndex: "1000",
      },
      switches: {
        show: true,
        styleSheetRoot: {
          bgClrOff: "#ffffff",
          txtPosition: "2",
        },
      },
    };
    const userParams = {
      checkHardware: true,
      checkDateRange: true,
      snowfall: {
        count: 54,
        minRadius: 6,
        zIndex: "10",
      },
      switches: {
        show: true,
        styleSheetRoot: {
          bgClrOff: "#000000",
          txtPosition: "1",
        },
      },
    };

    validateConfigNumber(key1, params, userParams);
    validateConfigNumber(key2, params, userParams);
    expect(params.snowfall.count).toBe(54);
    expect(params.snowfall.minRadius).toBe(6);
  });
});

describe("validateConfigParams function", () => {
  test("should return validated user parameters for valid input", () => {
    const userParams = {
      checkHardware: true,
      checkDateRange: false,
      snowfall: {
        count: 54,
        minRadius: 6,
        zIndex: "10",
      },
      switches: {
        show: false,
        stylesheetRoot: {
          bgClrOff: "#000000",
          txtPosition: "1",
        },
      },
    };
    const expectedResult = {
      checkHardware: true,
      checkDateRange: false,
      dateRange: {
        startMonth: 12, // 1-12
        endMonth: 2, // 1-12
        startDay: 15, // 1-31
        endDay: 15, // 1-31
      },
      snowfall: {
        count: 54, // number of snowflakes
        minRadius: 6, // min size of snowflakes
        maxRadius: 30, // max size of snowflakes
        minSpeed: 3, // min fall speed of snowflakes
        maxSpeed: 10, // max fall speed of snowflakes
        text: "\u2744", // symbol or text of the snowflakes
        color: "#99ccff", // color of the snowflakes
        zIndex: "10", // adjust according to project stacking context
      },
      switches: {
        show: false,
        storeUserSettings: true,
        stylesheetRoot: {
          /* background color of the switch when turned off */
          bgClrOff: "#000000", // #bdc3c7
          /* background color of the switch when turned on */
          bgClrOn: "rgba(149, 165, 166, 1)", // #95a5a6
          /* color of the moving toggle inside switch */
          toggleClr: "#ffffff",
          /* color and position of the text next to the switch */
          txtClr: "rgba(33, 37, 41, 1)", // #212529
          txtPosition: "1", // 1 = left of switch or 2 = right of switch
        },
      },
    };

    const result = validateConfigParams(userParams);
    expect(result).toEqual(expectedResult);
  });

  test("should return an error for invalid object key input", () => {
    const inValidUserParams = { hello: "world", world: "hello" };

    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});
    const result = validateConfigParams(inValidUserParams);

    expect(console.error).toHaveBeenCalledWith(
      "The following parameter keys are invalid: hello,world. Check the snowfall-js-plugin configuration object. The plugin is now loading with the default configuration values..."
    );
    expect(result).toBeNull();
    consoleErrorSpy.mockRestore();
  });
});

describe("setParams", () => {
  const defaultOutput = getDefaultParams();
  test("returns default parameters for invalid input", () => {
    const nonObjectInput = "not an object";
    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});
    const result = setParams(nonObjectInput);

    expect(console.error).toHaveBeenCalledWith(
      "[Error] Invalid snowfall-js-plugin parameters.\nUser defined parameters must be an object.\nLoading animations with default parameters..."
    );
    expect(result).toEqual(defaultOutput);
    consoleErrorSpy.mockRestore();
  });

  test("returns default parameters for empty object input", () => {
    const emptyObjectInput = {};
    const result = setParams(emptyObjectInput);
    expect(result).toEqual(defaultOutput);
  });

  test("returns validated object for valid user object input", () => {
    const validInput = {
      checkHardware: true,
      checkDateRange: false,
      snowfall: {
        minRadius: 3,
        zIndex: "10",
      },
      switches: {
        show: false,
        styleSheetRoot: {
          bgClrOff: "#000000",
          txtPosition: "1",
        },
      },
    };
    const expectedResult = {
      checkHardware: true,
      checkDateRange: false,
      dateRange: {
        startMonth: 12, // 1-12
        endMonth: 2, // 1-12
        startDay: 15, // 1-31
        endDay: 15, // 1-31
      },
      snowfall: {
        count: 100, // number of snowflakes
        minRadius: 3, // min size of snowflakes
        maxRadius: 30, // max size of snowflakes
        minSpeed: 3, // min fall speed of snowflakes
        maxSpeed: 10, // max fall speed of snowflakes
        text: "\u2744", // symbol or text of the snowflakes
        color: "#99ccff", // color of the snowflakes
        zIndex: "10", // adjust according to project stacking context
      },
      switches: {
        show: false,
        storeUserSettings: true,
        stylesheetRoot: {
          /* background color of the switch when turned off */
          bgClrOff: "#000000", // #bdc3c7
          /* background color of the switch when turned on */
          bgClrOn: "rgba(149, 165, 166, 1)", // #95a5a6
          /* color of the moving toggle inside switch */
          toggleClr: "#ffffff",
          /* color and position of the text next to the switch */
          txtClr: "rgba(33, 37, 41, 1)", // #212529
          txtPosition: "1", // 1 = left of switch or 2 = right of switch
        },
      },
    };
    const result = setParams(validInput);
    expect(result).toEqual(expectedResult);
  });
});
