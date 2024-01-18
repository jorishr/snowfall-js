import { getDefaultParams } from "./defaultParams.js";
import { logInfo, logWarn } from "../logger.js";

export function setParams(configParams) {
  const defaultParams = getDefaultParams();
  const params = deepMergeWithValidation(defaultParams, configParams);
  logInfo("Done setting parameters.");
  return params;
}

export function deepMergeWithValidation(defaultConfig, configParams) {
  const mergedConfig = { ...defaultConfig };

  for (const key in configParams) {
    if (configParams.hasOwnProperty(key)) {
      // Validate if the key exists in the defaultConfig
      if (!(key in defaultConfig)) {
        logWarn(
          `Warning: '${key}' does not exist in the default configuration. Using default value.`
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
      if (configValue instanceof Object && defaultValue instanceof Object) {
        mergedConfig[key] = deepMergeWithValidation(defaultValue, configValue);
      } else {
        // Overwrite values from configParams into mergedConfig
        mergedConfig[key] = configValue;
      }
    }
  }

  return mergedConfig;
}
