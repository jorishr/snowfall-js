import { checkUserSettings } from "./userSettings.js";

export function getAutoStart(configParams) {
  const autoStartConfig = getAutoStartConfig(configParams);
  const userPreference = checkUserSettings(); // true, false or undefined
  // user preferences takes precedence over autoStartConfig
  if (userPreference) {
    return userPreference;
  } else return autoStartConfig;
}

function getAutoStartConfig(configParams) {
  if (configParams.autostartOnMobile && configParams.autostartOnDesktop) {
    return true;
  } else {
    if (window.innerWidth >= 768 && configParams.autostartOnDesktop)
      return true;
    else if (window.innerHeight <= 768 && configParams.autostartOnMobile)
      return true;
    else return false;
  }
}
