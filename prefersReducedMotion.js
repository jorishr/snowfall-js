import { logInfo, logWarn } from "./logger.js";

//see canRunAnimation.js
export function checkReducedMotionConfig(configParams) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion)"
  ).matches;

  if (prefersReducedMotion && configParams.setReducedMotion === "disable") {
    return false;
  } else {
    return true; // case: setReducedMotion = "reduce" or no-preference set in browser configuration
  }
}

//see validateParams.js
export function validateReduceMultiplier(configParams) {
  const inRange =
    configParams.reduceMultiplier > 0.1 && configParams.reduceMultiplier < 0.9;
  if (inRange) {
    return configParams.reduceMultiplier;
  } else {
    logWarn(
      `Input ${configParams.reduceMultiplier} is an invalid motion reduce multiplier value. Use a number value between 0.1 and 0.9! Fallback value 0.5 will be used.`
    );
    return 0.5;
  }
}
