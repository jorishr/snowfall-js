import { logInfo, logError } from "./logger.js";

export function checkUserSettings() {
  if (getUserSettings().runSnowfallAnimation) {
    return true;
  } else if (getUserSettings().runSnowfallAnimation === false) return false;
  else return undefined;
}

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
