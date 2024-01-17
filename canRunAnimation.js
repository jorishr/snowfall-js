import { checkDateRange } from "./checkDateRange.js";
import { checkHardware } from "./checkHardware.js";

export function canRunAnimation(configParams) {
  let hardwareCheck;
  let inSideDateRange;
  if (configParams.checkHardware) {
    hardwareCheck = checkHardware();
  } else hardwareCheck = true;
  if (configParams.inSideDateRange) {
    inSideDateRange = checkDateRange(configParams.dateRange);
  } else inSideDateRange = true;

  return hardwareCheck && inSideDateRange;
}
