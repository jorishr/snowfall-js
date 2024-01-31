import { checkUserSettings } from "./userSettings.js";
import { logInfo } from "./logger.js";

/**
 * Determines whether the snowfall animation should auto-start based on configuration parameters and user preferences.
 *
 * @param {Object} configParams - Configuration parameters for the snowfall animation.
 * @returns {boolean} - True if the animation should auto-start, false otherwise.
 */
export function getAutoStart(configParams) {
  const autostartConfig = getAutostartConfig(configParams);
  const userPreference = checkUserSettings(); // true, false or undefined

  logInfo(`Autostart Config Value: ${autostartConfig}`);
  logInfo(`User Preference: ${userPreference}`);

  // user preferences takes precedence over autoStartConfig
  if (userPreference !== undefined) {
    return userPreference;
  } else return autostartConfig;
}

/**
 * Determines the auto-start configuration based on the provided parameters.
 *
 * @param {Object} configParams - Configuration parameters.
 * @returns {boolean} - True if the animation should auto-start, false otherwise.
 */
function getAutostartConfig(configParams) {
  if (configParams.autostartOnMobile && configParams.autostartOnDesktop) {
    return true;
  } else {
    const screenWidthThreshold = configParams.screenWidthThreshold || 768;
    if (
      window.innerWidth >= screenWidthThreshold &&
      configParams.autostartOnDesktop
    )
      return true;
    else if (
      window.innerHeight <= screenWidthThreshold &&
      configParams.autostartOnMobile
    )
      return true;
    else return false;
  }
}
