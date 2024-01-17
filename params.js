import {
  isObject,
  getAllObjectKeys,
  insertValue,
  getValueProps,
} from "./helper.js";

const defaultParams = {
  checkHardware: true,
  checkDateRange: true,
  dateRange: {
    startMonth: 12, // 1-12
    endMonth: 2, // 1-12
    startDay: 15, // 1-31
    endDay: 15, // 1-31
  },
  snowfall: {
    count: 100, // number of snowflakes
    minRadius: 10, // min size of snowflakes
    maxRadius: 30, // max size of snowflakes
    minSpeed: 3, // min fall speed of snowflakes
    maxSpeed: 10, // max fall speed of snowflakes
    text: "\u2744", // symbol or text of the snowflakes
    color: "#99ccff", // color of the snowflakes
    zIndex: "1000", // adjust according to project stacking context
  },
  switches: {
    show: true,
    storeUserSettings: true,
    stylesheetRoot: {
      /* background color of the switch when turned off */
      bgClrOff: "rgba(189, 195, 199, 1)", // #bdc3c7
      /* background color of the switch when turned on */
      bgClrOn: "rgba(149, 165, 166, 1)", // #95a5a6
      /* color of the moving toggle inside switch */
      toggleClr: "#ffffff",
      /* color and position of the text next to the switch */
      txtClr: "rgba(33, 37, 41, 1)", // #212529
      txtPosition: "2", // 1 = left of switch or 2 = right of switch
    },
  },
};

export function getDefaultParams() {
  return defaultParams;
}

export function setParams(configParams) {
  let params = null;
  if (!isObject(configParams)) {
    console.error(
      "[Error] Invalid snowfall-js-plugin parameters.\nUser defined parameters must be an object.\nLoading animations with default parameters..."
    );
    return getDefaultParams();
  }

  if (configParams != {}) {
    params = validateConfigParams(configParams); //null or valid object
  } else return getDefaultParams();

  if (params) {
    return params;
  } else return getDefaultParams();
}

export function validateConfigParams(configParams) {
  /* 
    Modifications might be made to the default object, so deep clone the original object. First validate the user defined keys. Then validate the user defined values. Invalid keys return an error, invalid values return have a fallback with default values and return a warning.
  */
  const params = JSON.parse(JSON.stringify(getDefaultParams()));
  const validKeys = getAllObjectKeys(params);
  const userDefinedKeys = getAllObjectKeys(configParams);

  const invalidKeys = Object.keys(configParams).filter(
    (key) => !validKeys.includes(key)
  );
  if (invalidKeys.length > 0) {
    console.error(
      `The following parameter keys are invalid: ${invalidKeys}. Check the snowfall-js-plugin configuration object. The plugin is now loading with the default configuration values...`
    );
    return null;
  }
  /* validate values from config */
  userDefinedKeys.forEach((key) => {
    const defaultValueType = getValueProps(params, key).type;
    switch (defaultValueType) {
      case "boolean":
        validateConfigBoolean(key, params, configParams);
        break;
      case "string":
        validateConfigString(key, params, configParams);
        break;
      case "number":
        validateConfigNumber(key, params, configParams);
        break;
      case undefined:
        break;
      case "object":
        // No action required on keys that hold object values, e.g. {snowfall: {...}, switches: {...}}
        break;
      default:
        console.warn(
          "Unhandled value type. The default object only deals with booleans, numbers and strings."
        );
        break;
    }
  });
  return params;
}

/* If value is valid, insert into params object */
export function validateConfigBoolean(key, params, configParams) {
  const newValueProps = getValueProps(configParams, key);
  if (newValueProps.type === "boolean") {
    insertValue(params, key, newValueProps.value);
  } else {
    console.warn(
      `Parameter value for ${key} is invalid. The value should be true or false. Proceeding with default value.`
    );
  }
}

export function validateConfigString(key, params, configParams) {
  const newValueProps = getValueProps(configParams, key);
  if (newValueProps.type === "string") {
    insertValue(params, key, newValueProps.value);
  } else {
    console.warn(
      `Parameter value for ${key} is invalid. The value should be a string. Proceeding with default value.`
    );
  }
}

export function validateConfigNumber(key, params, configParams) {
  const newValueProps = getValueProps(configParams, key);
  if (newValueProps.type === "number") {
    insertValue(params, key, newValueProps.value);
  } else {
    console.warn(
      `Parameter value for ${key} is invalid. The value should be number. Proceeding with default value.`
    );
  }
}
