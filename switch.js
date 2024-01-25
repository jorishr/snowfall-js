import { setUserSettings } from "./userSettings.js";
import { initSnowfall, snowfallState } from "./index.js";
import { logInfo, logWarn } from "./logger.js";

/* Find container elements in the DOM */
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

function buildSwitch(i, params) {
  const inputElem = document.createElement("input");
  const label = document.createElement("label");
  const textElem = document.createElement("span");

  inputElem.classList.add("snow-animation-switch__input");
  inputElem.type = "checkbox";
  inputElem.id = `snow-animation-switch__input${i}`;

  label.classList.add("snow-animation-switch__label");
  label.role = "checkbox";
  label.htmlFor = `snow-animation-switch__input${i}`;
  label.ariaChecked = false;
  label.tabIndex = 0;

  textElem.classList.add("snow-animation-switch__text");
  textElem.textContent = params.switches.txt;

  return [inputElem, label, textElem];
}

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

export function switchesToggleOn() {
  const inputElems = document.querySelectorAll(".snow-animation-switch__input");
  inputElems.forEach((elem) => {
    elem.checked = true;
    elem.ariaChecked = true;
    logInfo("Switch toggled ON");
  });
}

/* the label element is the visible part of the switch */
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

function stopAnimation(event, params) {
  snowfallState.snowfallInstance.destroy();
  snowfallState.isAnimationRunning = false;
  logInfo("Animation stopped.");
  if (params.switches.storeUserSettings)
    setUserSettings({ runSnowfallAnimation: false });
  syncStateOtherSwitches(event);
}

function startAnimation(event, params) {
  snowfallState.snowfallInstance = initSnowfall();
  snowfallState.isAnimationRunning = true;
  logInfo("Animation started.");
  if (params.switches.storeUserSettings)
    setUserSettings({ runSnowfallAnimation: true });
  syncStateOtherSwitches(event);
}

function syncStateOtherSwitches(event) {
  document.querySelectorAll(".snow-animation-switch__input").forEach((elem) => {
    if (elem.id !== event.target.previousElementSibling.id) {
      elem.checked = snowfallState.isAnimationRunning;
      elem.ariaChecked = snowfallState.isAnimationRunning;
      logInfo("Switch state synced.");
    }
  });
}
