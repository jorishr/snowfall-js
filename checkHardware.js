export function checkHardware() {
  const cpuCores = navigator.hardwareConcurrency || 0;
  const deviceMemory = navigator.deviceMemory || 0;
  //console.log(`Device Memory: ${deviceMemory} GB`);
  //console.log(`Number of CPU Cores: ${cpuCores}`);

  if (deviceMemory >= 4 || cpuCores >= 4) {
    return true;
  } else return false;
}
