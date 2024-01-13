import { checkDateRange } from "checkDateRange.js";
import { checkHardware } from "checkHardware.js";

export default function canRunAnimation() {
  return checkDateRange() && checkHardware();
}
