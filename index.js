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
import { logInfo } from "./logger.js";

export let params = {};

export function snowAnimationStart(configParams = {}) {
  params = setParams(configParams);
  const canRun = canRunAnimation(params);

  if (canRun) {
    const autoStart = getAutoStart(params);
    switchesAppendToDOM(params);
    switchesSetupEventHandlers(params);

    if (autoStart) {
      snowfallState.snowfallInstance = initSnowfall(params.snowfall);
      snowfallState.isAnimationRunning = true;
      switchesToggleOn();
      logInfo("Done loading and starting animation.");
    }
  } else return;
}

export function initSnowfall(params) {
  const snowfall = new Snowfall(params);
  return snowfall;
}
