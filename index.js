import { Snowfall } from "./snowfall.js";
import { checkUserSettings } from "./userSettings.js";
import { canRunAnimation } from "./canRunAnimation.js";
import {
  switchesAppendToDOM,
  switchesSetupEventHandlers,
  switchesToggleOn,
} from "./switch.js";
import { getDefaultParams } from "./getSnowfallParams.js";
/* 
  - The selector querySelectorAll is static. That's why in the eventListener block, the checkboxes are selected again. The click event has changed the state of the DOM. 
  - Checkboxes have different id's
  - Code synchronizes the state of the checkboxes in menu and footer
  - The visible part of the checkbox is the label element. Find the target element property and select the previous sibling, which is the checkbox input element
*/
export const snowfallState = {
  snowfallInstance: undefined,
  isAnimationRunning: false,
};

export function animationStart() {
  const canRun = canRunAnimation();
  if (canRun) {
    const params = getDefaultParams();
    const userPreference = checkUserSettings();

    switchesAppendToDOM();

    if (userPreference) {
      snowfallState.snowfallInstance = initSnowfall(params.snowfall);
      snowfallState.isAnimationRunning = true;
      switchesToggleOn();
    }

    switchesSetupEventHandlers();
  }
}

export function initSnowfall(params) {
  const snowfall = new Snowfall(params);
  return snowfall;
}
