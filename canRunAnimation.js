import { checkDateRange } from "./checkDateRange.js";
import { checkHardware } from "./checkHardware.js";
import { logInfo } from "./logger.js";
import { checkReducedMotionConfig } from "./prefersReducedMotion.js";

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
