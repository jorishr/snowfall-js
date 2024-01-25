import { checkDateRange } from "./checkDateRange.js";
import { checkHardware } from "./checkHardware.js";

export function canRunAnimation(configParams) {
  let hardwareCheck;
  let insideDateRange;
  if (configParams.checkHardware) {
    hardwareCheck = checkHardware();
  } else hardwareCheck = true;
  if (configParams.checkDateRange) {
    insideDateRange = checkDateRange(configParams.dateRange);
  } else insideDateRange = true;

  return hardwareCheck && insideDateRange;
}
