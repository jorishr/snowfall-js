import { Snowfall } from "../snowfall.js";
import { animationStart } from "../index.js";

loadAnimation();
export default function loadAnimation() {
  let defaultParams = {
    count: "100", // number of snowflakes
    minRadius: "10", // minimum radius of a snowflake in pixels
    maxRadius: "30", // maximum radius of a snowflake in pixels
    minSpeed: "3", // minimum speed of a snowflake in pixels per frame
    maxSpeed: "10", // maximum speed of a snowflake in pixels per frame
    text: "❄", // text for a snowflake (can be any symbol or text)
    color: "#99ccff", // color of a snowflake in HEX format
    zIndex: "1000", // z-index for the snowflakes canvas
  };

  //let snowfall = new Snowfall();
  let snowfall;
  animationStart();

  let form = document.getElementById("form");
  let defaultButton = document.getElementById("default");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let newParams = {};
    for (let input of form.elements) {
      if (input.name) {
        newParams[input.name] = input.value;
      }
    }
    snowfall.destroy();
    snowfall = new Snowfall(newParams);
  });

  defaultButton.addEventListener("click", () => {
    snowfall.destroy();
    snowfall = new Snowfall();
    for (let input of form.elements) {
      if (input.name) {
        input.value = defaultParams[input.name];
      }
    }
  });
}
