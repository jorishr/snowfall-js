import { Snowfall } from "snowfall.js";
import { checkUserSettings } from "userSettings.js";
import { canRunAnimation } from "canRunAnimation.js";
/* 
  - The selector querySelectorAll is static. That's why in the eventListener block, the checkboxes are selected again. The click event has changed the state of the DOM. 
  - Checkboxes have different id's
  - Code synchronizes the state of the checkboxes in menu and footer
  - The visible part of the checkbox is the label element. Find the target element property and select the previous sibling, which is the checkbox input element
*/
export default function animationStart() {
  const canRun = canRunAnimation();

  if (canRun) {
    const userPreference = checkUserSettings();
    let snowfall;
    let isAnimationRunning;

    checkboxesAppendToDOM();
    initSnowFall();

    if (userPreference) {
      snowfall = initSnowFall();
      isAnimationRunning = true;
      checkboxesToggleOn();
    }

    checkboxesSetupEventHandlers(isAnimationRunning);
  }
}

function initSnowFall() {
  const snowfall = new Snowfall({
    // number of snowflakes
    count: 54,
    // min/max size
    minRadius: 10,
    maxRadius: 30,
    // min/max speed
    minSpeed: 1,
    maxSpeed: 3,
    // custom symbol or text for snowflakes
    text: "\u2744",
    // color of snowflakes
    color: "#ffffff",
    // z-index for the canvas
    zIndex: "10",
  });
  return snowfall;
}
