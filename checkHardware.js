import { logInfo } from "./logger.js";

/**
 * Checks hardware capabilities, specifically the amount of device memory and the number of CPU cores.
 *
 * @returns {boolean} - True if the device has sufficient memory or CPU cores, false otherwise.
 */
export function checkHardware() {
  const cpuCores = navigator.hardwareConcurrency;
  const deviceMemory = navigator.deviceMemory;

  logInfo(`Hardware Memory: ${deviceMemory} GB`);
  logInfo(`Number of CPU cores: ${cpuCores}`);

  if (deviceMemory >= 4 || cpuCores >= 4) {
    return true;
  } else return false;
}
