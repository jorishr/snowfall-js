import { setUserSettings } from "./userSettings.js";
import { initSnowfall, snowfallState } from "./index.js";
import { logInfo, logWarn } from "./logger.js";

/**
 * Appends snowfall switch elements to the DOM based on the provided parameters.
 *
 * @param {Object} params - Snowfall parameters.
 * @returns {void|null} - Returns null if no switch containers are found, otherwise void.
 */
export function switchesAppendToDOM(params) {
  const switchContainers = document.querySelectorAll(".snow-animation-switch");

  if (switchContainers.length > 0) {
    switchContainers.forEach((container, i) => {
      const switchElements = buildSwitch(i, params);
      switchElements.forEach((elem) => container.appendChild(elem));
      container.classList.add("snow-animation-switch--show");
    });

    if (params.switches.injectCSS) {
      injectCSS(params);
    }

    logInfo(
      `${switchContainers.length} switch container elements found and ${switchContainers.length} switch toggles appended to the DOM.`
    );
  } else {
    logWarn(
      "No switch container elements found in the DOM. Make sure you have at least one <div class='snow-animation-switch'></div>."
    );
    return null;
  }
}

/**
 * Builds snowfall switch elements.
 *
 * @param {number} i - Index for creating unique IDs.
 * @param {Object} params - Snowfall parameters.
 * @returns {HTMLElement[]} - Array of switch elements.
 */
function buildSwitch(i, params) {
  const inputElem = document.createElement("input");
  const label = document.createElement("label");
  const textElem = document.createElement("span");

  inputElem.classList.add("snow-animation-switch__input");
  inputElem.type = "checkbox";
  inputElem.id = `snow-animation-switch__input${i}`;

  label.classList.add("snow-animation-switch__label");
  label.htmlFor = `snow-animation-switch__input${i}`;
  label.tabIndex = 0;

  textElem.classList.add("snow-animation-switch__text");
  textElem.textContent = params.switches.txt;
  if (params.switches.txtElemAttributes.length > 0) {
    setElemAttributes(textElem, params.switches.txtElemAttributes);
  }

  return [inputElem, label, textElem];
}

/**
 * Sets attributes on an HTML element.
 *
 * @param {HTMLElement} elem - The HTML element to set attributes on.
 * @param {Object[]} attributes - Array of attribute objects.
 */
function setElemAttributes(elem, attributes) {
  attributes.forEach((attr) => {
    if (attr.type === "data-attribute") {
      elem.dataset[attr.name] = attr.value;
    } else {
      elem[attr.name] = attr.value;
    }
  });
}

/**
 * Injects CSS stylesheet into the document.
 *
 * @param {Object} params - Snowfall parameters.
 */
function injectCSS(params) {
  const linkElement = document.createElement("link");
  const root = document.documentElement;
  const rootStyles = params.switches.styles;

  for (const key in rootStyles) {
    root.style.setProperty(`--snow-animation-switch-${key}`, rootStyles[key]);
    if (key === "txtPosition" && rootStyles[key] === "1")
      root.style.setProperty(
        `--snow-animation-switch-txtMargin`,
        "0 0.75em 0 0"
      );
  }

  linkElement.rel = "stylesheet";
  linkElement.type = "text/css";
  linkElement.href = new URL("snowAnimationSwitchStyles.css", import.meta.url);

  document.head.appendChild(linkElement);
}

/**
 * Toggles all snowfall switches to the "ON" state.
 */
export function switchesToggleOn() {
  const inputElems = document.querySelectorAll(".snow-animation-switch__input");
  inputElems.forEach((elem) => {
    elem.checked = true;
    elem.ariaChecked = true;
    logInfo("Switch toggled ON");
  });
}

/**
 * Sets up event handlers for snowfall switches.
 * Note that we are dealing with a custom styled switch whereby the label
 * element is the only visible element. The input element is hidden.
 *
 * @param {Object} params - Snowfall parameters.
 */
export function switchesSetupEventHandlers(params) {
  const labelElems = document.querySelectorAll(".snow-animation-switch__label");
  labelElems.forEach((label) => {
    label.addEventListener("click", (event) =>
      handleEvents(event, undefined, params)
    );
    label.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.key === "Enter" || event.keyCode === 13) {
        handleEvents(event, label, params);
      }
    });
  });
}

/**
 * Handles click and enter key events for snowfall switches.
 *
 * @param {Event} event - The event object.
 * @param {HTMLElement} label - The label element associated with the switch.
 * @param {Object} params - Snowfall parameters.
 */
function handleEvents(event, label, params) {
  if (snowfallState.isAnimationRunning) {
    stopAnimation(event, params);
    /* the enter key event does not check the checkbox automatically */
    if (label) {
      label.previousElementSibling.checked = false;
      label.previousElementSibling.ariaChecked = false;
    }
  } else {
    startAnimation(event, params);
    if (label) {
      label.previousElementSibling.checked = true;
      label.previousElementSibling.ariaChecked = true;
    }
  }
}

/**
 * Stops the snowfall animation and updates switch states.
 *
 * @param {Event} event - The event object.
 * @param {Object} params - Snowfall parameters.
 */
function stopAnimation(event, params) {
  snowfallState.snowfallInstance.destroy();
  snowfallState.isAnimationRunning = false;
  logInfo("Animation stopped.");
  if (params.switches.storeUserSettings)
    setUserSettings({ runSnowfallAnimation: false });
  syncStateOtherSwitches(event);
}

/**
 * Starts the snowfall animation and updates switch states.
 *
 * @param {Event} event - The event object.
 * @param {Object} params - Snowfall parameters.
 */
function startAnimation(event, params) {
  snowfallState.snowfallInstance = initSnowfall(params.snowfall);
  snowfallState.isAnimationRunning = true;
  logInfo("Animation started.");
  if (params.switches.storeUserSettings)
    setUserSettings({ runSnowfallAnimation: true });
  syncStateOtherSwitches(event);
}

/**
 * Syncs the state of other switches based on the current switch state.
 *
 * @param {Event} event - The event object.
 */
function syncStateOtherSwitches(event) {
  document.querySelectorAll(".snow-animation-switch__input").forEach((elem) => {
    if (elem.id !== event.target.previousElementSibling.id) {
      elem.checked = snowfallState.isAnimationRunning;
      elem.ariaChecked = snowfallState.isAnimationRunning;
      logInfo("Switch state synced.");
    }
  });
}
