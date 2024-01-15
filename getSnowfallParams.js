const defaultParams = {
  snowfall: {
    count: 100,
    minRadius: 10,
    maxRadius: 30,
    minSpeed: 3,
    maxSpeed: 10,
    text: "\u2744",
    color: "#99ccff",
    zIndex: "1000",
  },
  switches: {
    stylesheetRoot: {
      bgClrOff: "rgba(189, 195, 199, 1)", //#bdc3c7
      bgClrOn: "rgba(149, 165, 166, 1)", //#95a5a6
      toggleClr: "#ffffff",
      txtClr: "rgba(33, 37, 41, 1)", //#212529
      txtPosition: "2",
    },
  },
};

export function getDefaultParams() {
  return defaultParams;
}
