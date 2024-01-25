import { checkUserSettings } from "./userSettings.js";
import { logInfo } from "./logger.js";

export function getAutoStart(configParams) {
  const autostartConfig = getAutostartConfig(configParams);
  const userPreference = checkUserSettings(); // true, false or undefined

  logInfo(`Autostart Config Value: ${autostartConfig}`);
  logInfo(`User Preference: ${userPreference}`);

  // user preferences takes precedence over autoStartConfig
  if (userPreference) {
    return userPreference;
  } else return autostartConfig;
}

function getAutostartConfig(configParams) {
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
