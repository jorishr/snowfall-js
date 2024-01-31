/**
 * Retrieves the default parameters for the application.
 *
 * @returns {object} The default parameters object.
 */
export function getDefaultParams() {
  return defaultParams;
}

const defaultParams = {
  logLevel: "default", // default or info
  checkHardware: true,
  checkDateRange: true,
  dateRange: {
    startMonth: 12, // 1-12
    endMonth: 2, // 1-12
    startDay: 15, // 1-31
    endDay: 15, // 1-31
  },
  autostartOnMobile: true,
  autostartOnDesktop: true,
  screenWidthThreshold: 768,
  checkReducedMotionPreference: true,
  setReducedMotion: "disable", // "disable" or "reduce"
  reduceMultiplier: 0.5,
  // experimental: reduces snowfall count by 50%, use value between 0.1-0.9
  snowfall: {
    count: 33, // number of snowflakes
    minRadius: 10, // min size of snowflakes
    maxRadius: 30, // max size of snowflakes
    minSpeed: 3, // min fall speed of snowflakes
    maxSpeed: 6, // max fall speed of snowflakes
    text: "\u2744", // symbol or text of the snowflakes
    color: "#99ccff", // color of the snowflakes
    zIndex: "1000", // adjust according to project stacking context
    canvasHeightLimit: 0, // 0 = no limit; "1" = 100vh, "2" = 200vh
  },
  switches: {
    show: true,
    storeUserSettings: true,
    txt: "Snow",
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
