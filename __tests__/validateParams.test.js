import {
  setParams,
  deepMergeWithValidation,
} from "../config/validateParams.js";
import { getDefaultParams } from "../config/defaultParams.js";
import { jest } from "@jest/globals";

describe("setParams", () => {
  test("should return default params when provided config is invalid", () => {
    const result = setParams(null);
    const expected = getDefaultParams();
    expect(result).toEqual(expected);
  });

  test("should return merged params when provided config is valid", () => {
    const config = {
      checkHardware: false,
      checkDateRange: false,
      snowfall: {
        count: 54,
      },
      switches: {
        show: false,
      },
    };
    const expectedResult = {
      logLevel: "default",
      checkHardware: false,
      checkDateRange: false,
      dateRange: {
        startMonth: 12, // 1-12
        endMonth: 2, // 1-12
        startDay: 15, // 1-31
        endDay: 15, // 1-31
      },
      autostartOnMobile: true,
      autostartOnDesktop: true,
      checkReducedMotionPreference: true,
      setReducedMotion: "disable", // "disable" or "reduce"
      reduceMultiplier: 0.5,
      // experimental: reduces snowfall count by 50%, use value between 0.1-0.9
      snowfall: {
        count: 54, // number of snowflakes
        minRadius: 10, // min size of snowflakes
        maxRadius: 30, // max size of snowflakes
        minSpeed: 3, // min fall speed of snowflakes
        maxSpeed: 10, // max fall speed of snowflakes
        text: "\u2744", // symbol or text of the snowflakes
        color: "#99ccff", // color of the snowflakes
        zIndex: "1000", // adjust according to project stacking context
      },
      switches: {
        show: false,
        storeUserSettings: true,
        txt: "Snow on/off",
        txtElemAttributes: [],
        injectCSS: true,
        styles: {
          /* background color of the switch when turned off */
          bgClrOff: "rgba(189, 195, 199, 1)", // #bdc3c7
          /* background color of the switch when turned on */
          bgClrOn: "rgba(149, 165, 166, 1)", // #95a5a6
          /* color of the moving toggle inside switch */
          toggleClr: "#ffffff",
          /* color and position of the text next to the switch */
          txtClr: "rgba(33, 37, 41, 1)", // #212529
          txtPosition: "2", // 1 = left of switch or 2 = right of switch
        },
      },
    };
    const result = setParams(config);
    expect(result).toEqual(expectedResult);
  });
});

describe("validateConfigParams", () => {
  let originalWarn;
  beforeAll(() => {
    originalWarn = console.warn;
    console.warn = jest.fn();
  });
  afterAll(() => {
    console.warn = originalWarn;
  });

  test("should return default config object when provided config has invalid keys", () => {
    const config = {
      checkHardware: true,
      switches: {
        styles: {
          bgClrOff_invalidKey: "#000000",
        },
      },
    };
    const defaultParams = getDefaultParams();
    const result = deepMergeWithValidation(defaultParams, config);
    expect(result).toEqual(defaultParams);
  });

  test("should return default config object when provided config has invalid value types", () => {
    const config1 = {
      switches: {
        styles: {
          bgClrOff: { color: "red" }, // object instead of string
        },
      },
    };
    const config2 = {
      checkHardware: "disabled", //string instead of boolean
    };
    const defaultParams = getDefaultParams();
    const result1 = deepMergeWithValidation(defaultParams, config1);
    const result2 = deepMergeWithValidation(defaultParams, config2);
    expect(result1).toEqual(defaultParams);
    expect(result2).toEqual(defaultParams);
  });

  test("should return merged params when provided config is valid", () => {
    const config = {
      autostartOnMobile: false,
      snowfall: {
        count: 150,
        maxRadius: 54,
      },
      switches: {
        show: false,
      },
    };
    const expected = {
      logLevel: "default",
      checkHardware: true,
      checkDateRange: true,
      dateRange: {
        startMonth: 12, // 1-12
        endMonth: 2, // 1-12
        startDay: 15, // 1-31
        endDay: 15, // 1-31
      },
      autostartOnMobile: false,
      autostartOnDesktop: true,
      checkReducedMotionPreference: true,
      setReducedMotion: "disable", // "disable" or "reduce"
      reduceMultiplier: 0.5,
      // experimental: reduces snowfall count by 50%, use value between 0.1-0.9
      snowfall: {
        count: 150, // number of snowflakes
        minRadius: 10, // min size of snowflakes
        maxRadius: 54, // max size of snowflakes
        minSpeed: 3, // min fall speed of snowflakes
        maxSpeed: 10, // max fall speed of snowflakes
        text: "\u2744", // symbol or text of the snowflakes
        color: "#99ccff", // color of the snowflakes
        zIndex: "1000", // adjust according to project stacking context
      },
      switches: {
        show: false,
        storeUserSettings: true,
        txt: "Snow on/off",
        txtElemAttributes: [],
        injectCSS: true,
        styles: {
          /* background color of the switch when turned off */
          bgClrOff: "rgba(189, 195, 199, 1)", // #bdc3c7
          /* background color of the switch when turned on */
          bgClrOn: "rgba(149, 165, 166, 1)", // #95a5a6
          /* color of the moving toggle inside switch */
          toggleClr: "#ffffff",
          /* color and position of the text next to the switch */
          txtClr: "rgba(33, 37, 41, 1)", // #212529
          txtPosition: "2", // 1 = left of switch or 2 = right of switch
        },
      },
    };
    const defaultParams = getDefaultParams();
    const result = deepMergeWithValidation(defaultParams, config);
    expect(result).toEqual(expected);
  });
});
