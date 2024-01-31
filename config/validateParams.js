import { getDefaultParams } from "./defaultParams.js";
import { logInfo, logWarn } from "../logger.js";
import { validateReduceMultiplier } from "../prefersReducedMotion.js";

/**
 * Sets the final parameters for the snowfall-js-plugin, merging the user provided configuration with the defaults parameters.
 *
 * @param {Object} configParams - User defined configuration parameters.
 * @returns {Object} - Merged and validated parameters.
 */
export function setParams(configParams) {
  const defaultParams = getDefaultParams();
  const params = deepMergeWithValidation(defaultParams, configParams);
  logInfo("Done setting snowfall-js-plugin parameters.");
  return params;
}

/**
 * Performs a deep merge of default and provided configuration parameters with validation.
 *
 * @param {Object} defaultConfig - Default configuration parameters.
 * @param {Object} configParams - Provided configuration parameters.
 * @returns {Object} - Merged and validated configuration parameters.
 */
export function deepMergeWithValidation(defaultConfig, configParams) {
  const mergedConfig = { ...defaultConfig };

  for (const key in configParams) {
    if (configParams.hasOwnProperty(key)) {
      // Validate if the key exists in the defaultConfig
      if (!(key in defaultConfig)) {
        logWarn(
          `Warning: '${key}' does not exist in the default configuration and will be ignored.`
        );
        continue;
      }

      const configValue = configParams[key];
      const defaultValue = defaultConfig[key];

      // Validate if the types match
      if (typeof configValue !== typeof defaultValue) {
        logWarn(`Warning: Type mismatch for '${key}'. Using default value.`);
        continue;
      }

      // Recursive merge for nested objects
      if (
        configValue instanceof Object &&
        !Array.isArray(configValue) &&
        defaultValue instanceof Object &&
        !Array.isArray(defaultValue)
      ) {
        mergedConfig[key] = deepMergeWithValidation(defaultValue, configValue);
      } else {
        // Overwrite values from configParams into mergedConfig
        mergedConfig[key] = configValue;
      }
    }
  }
  // Additional logic for handling reduced motion preference
  if (
    configParams !== null &&
    configParams.checkReducedMotionPreference === true &&
    configParams.hasOwnProperty("setReducedMotion") &&
    configParams.setReducedMotion === "reduce"
  ) {
    const reduceMultiplier = validateReduceMultiplier(
      mergedConfig,
      configParams
    );
    mergedConfig.snowfall.count = Math.round(
      mergedConfig.snowfall.count * reduceMultiplier
    );
  }
  return mergedConfig;
}
