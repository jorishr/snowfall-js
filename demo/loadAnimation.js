import { animationStart, snowfallState } from "../index.js";
import { handleForm } from "./form.js";

function loadAnimation() {
  animationStart({
    checkDateRange: function () {
      return;
    },
    checkHardware: false,
    snowfall: {
      zIndex: "10",
    },
    switches: {
      show: false,
      styles: {
        bgClrOff: "#000000",
        txtPosition: "1",
      },
    },
  });
  handleForm();
}

loadAnimation();
