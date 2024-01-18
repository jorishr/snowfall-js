import { Snowfall } from "./snowfall.js";
import { canRunAnimation } from "./canRunAnimation.js";
import {
  switchesAppendToDOM,
  switchesSetupEventHandlers,
  switchesToggleOn,
} from "./switch.js";
import { setParams } from "./config/validateParams.js";
import { getAutoStart } from "./autoStart.js";

export const snowfallState = {
  snowfallInstance: undefined,
  isAnimationRunning: false,
};

export function animationStart(configParams = {}) {
  const params = setParams(configParams);
  const canRun = canRunAnimation(params);

  if (canRun) {
    const autoStart = getAutoStart(params);
    switchesAppendToDOM(params);
    switchesSetupEventHandlers(params);

    if (autoStart) {
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
