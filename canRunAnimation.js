import { checkDateRange } from "./checkDateRange.js";
import { checkHardware } from "./checkHardware.js";

export function canRunAnimation() {
  return checkDateRange() && checkHardware();
}
