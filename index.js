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
import { logError, logInfo } from "./logger.js";

/**
 * Global configuration parameters for the snowfall-js-plugin.
 * @type {Object}
 */
export let params = {};

/**
 * Start the snowfall animation based on the provided configuration parameters.
 * @param {Object} configParams - Configuration parameters for the snowfall animation.
 * @returns {void}
 */
export function snowAnimationStart(configParams = {}) {
  if (configParams.logLevel === "info") params.logLevel = "info";
  logInfo("Validating snowfall-js-plugin parameters...");

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

/**
 * Initializes and returns a Snowfall instance.
 * @param {Object} params - Configuration parameters for Snowfall.
 * @returns {Snowfall} - The initialized Snowfall instance.
 * @throws {Error} - If an error occurs during the initialization.
 */
export function initSnowfall(params) {
  try {
    const snowfall = new Snowfall(params);
    return snowfall;
  } catch (err) {
    logError("Error initializing Snowfall instance");
    throw err;
  }
}
