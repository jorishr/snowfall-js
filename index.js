import { Snowfall } from "./snowfall.js";
import { checkUserSettings } from "./userSettings.js";
import { canRunAnimation } from "./canRunAnimation.js";
import {
  switchesAppendToDOM,
  switchesSetupEventHandlers,
  switchesToggleOn,
} from "./switch.js";
import { setParams } from "./params.js";
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

export function animationStart(configParams = {}) {
  const params = setParams(configParams);
  const canRun = canRunAnimation(configParams);

  if (canRun) {
    const userPreference = checkUserSettings();
    switchesAppendToDOM();
    switchesSetupEventHandlers();

    if (userPreference) {
      snowfallState.snowfallInstance = initSnowfall(params.snowfall);
      snowfallState.isAnimationRunning = true;
      switchesToggleOn();
    }
  } else return;
}

export function initSnowfall(params) {
  const snowfall = new Snowfall(params);
  return snowfall;
}
