import { logInfo, logError } from "./logger.js";

/**
 * Checks the user preference for running the snowfall animation.
 *
 * @returns {(boolean|undefined)} - True if the animation should run, false if it should not, undefined if not specified.
 */
export function checkUserSettings() {
  if (getUserSettings().runSnowfallAnimation) {
    return true;
  } else if (getUserSettings().runSnowfallAnimation === false) return false;
  else return undefined;
}

/**
 * Retrieves user settings from local storage.
 *
 * @returns {Object|null} - User settings object or null if there's an error.
 */
export function getUserSettings() {
  try {
    const settingsJSON = localStorage.getItem("userSettings");
    const settings = JSON.parse(settingsJSON) || {};
    return settings;
  } catch (error) {
    logError(`Error retrieving user settings: ${error}`);
    return null;
  }
}

/**
 * Sets user settings in local storage.
 *
 * @param {Object} newSettings - New user settings to be merged with existing ones.
 */
export function setUserSettings(newSettings) {
  try {
    const existingSettingsJSON = localStorage.getItem("userSettings");
    const existingSettings = JSON.parse(existingSettingsJSON) || {};

    const mergedSettings = { ...existingSettings, ...newSettings };

    const mergedSettingsJSON = JSON.stringify(mergedSettings);

    localStorage.setItem("userSettings", mergedSettingsJSON);
    logInfo("User settings saved successfully.");
  } catch (error) {
    logError(`Error saving user settings: ${error}`);
  }
}
