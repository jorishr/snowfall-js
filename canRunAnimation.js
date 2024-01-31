import { checkDateRange } from "./checkDateRange.js";
import { checkHardware } from "./checkHardware.js";
import { logInfo } from "./logger.js";
import { checkReducedMotionConfig } from "./prefersReducedMotion.js";

/**
 * Determines whether the snowfall animation can be run based on configuration parameters, hardware check, dateRange check and accessibility check.
 *
 * @param {Object} configParams - Configuration parameters.
 * @returns {boolean} - True if the animation can be run, false otherwise.
 */
export function canRunAnimation(configParams) {
  let hardwareCheck;
  let insideDateRange;
  let accessibilityCheck = true;
  if (configParams.checkHardware) {
    hardwareCheck = checkHardware();
  } else hardwareCheck = true;
  if (configParams.checkDateRange) {
    insideDateRange = checkDateRange(configParams.dateRange);
  } else insideDateRange = true;
  if (configParams.checkReducedMotionPreference) {
    accessibilityCheck = checkReducedMotionConfig(configParams);
  }
  logInfo(
    `Result of canRunAnimationCheck: hardwareCheck: ${hardwareCheck}; insideDateRange: ${insideDateRange}; accessibilityCheck: ${accessibilityCheck}`
  );

  return hardwareCheck && insideDateRange && accessibilityCheck;
}
