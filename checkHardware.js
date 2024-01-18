import { logInfo } from "./logger.js";

export function checkHardware() {
  const cpuCores = navigator.hardwareConcurrency;
  const deviceMemory = navigator.deviceMemory;

  logInfo(`Hardware Memory: ${deviceMemory} GB`);
  logInfo(`Number of CPU cores: ${cpuCores}`);

  if (deviceMemory >= 4 || cpuCores >= 4) {
    return true;
  } else return false;
}
