import { setUserSettings } from "./userSettings.js";
import { initSnowfall, snowfallState } from "./index.js";

/* Find container elements in the DOM */
export function switchesAppendToDOM() {
  const switchContainers = [
    ...document.querySelectorAll(".snow-animation-switch"),
  ];
  if (switchContainers.length > 0) {
    switchContainers.forEach((container, i) => {
      const switchElements = buildSwitch(i);
      switchElements.forEach((elem) => container.appendChild(elem));
      container.classList.add("snow-animation-switch--show");
    });
    injectCSS();
    console.log(
      `${switchContainers.length} switch container elements found and ${switchContainers.length} switch toggles appended to the DOM`
    );
  } else {
    console.warn("No switchContainers found in the DOM");
    return null;
  }
}

function buildSwitch(i) {
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
  textElem.textContent = "Snow on/off";

  return [inputElem, label, textElem];
}

function injectCSS() {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.type = "text/css";
  linkElement.href = "../snowAnimationSwitchStyles.css";
  document.head.appendChild(linkElement);
}

export function switchesToggleOn() {
  const inputElems = [
    ...document.querySelectorAll(".snow-animation-switch__input"),
  ];
  inputElems.forEach((elem) => {
    elem.checked = true;
    elem.ariaChecked = true;
  });
}

/* the label element is the visible part of the switch */
export function switchesSetupEventHandlers() {
  const labelElems = document.querySelectorAll(".snow-animation-switch__label");
  labelElems.forEach((label) => {
    label.addEventListener("click", (event) => handleEvents(event));
    label.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.key === "Enter" || event.keyCode === 13) {
        handleEvents(event, label);
      }
    });
  });
}

function handleEvents(event, label) {
  if (snowfallState.isAnimationRunning) {
    stopAnimation(event);
    /* the enter key event does not check the checkbox automatically */
    if (label) {
      label.previousElementSibling.checked = false;
      label.previousElementSibling.ariaChecked = false;
    }
  } else {
    startAnimation(event);
    if (label) {
      label.previousElementSibling.checked = true;
      label.previousElementSibling.ariaChecked = true;
    }
  }
}

function stopAnimation(event) {
  snowfallState.snowfallInstance.destroy();
  snowfallState.isAnimationRunning = false;
  setUserSettings({ runSnowfallAnimation: false });
  syncStateOtherSwitches(event);
}

function startAnimation(event) {
  snowfallState.snowfallInstance = initSnowfall();
  snowfallState.isAnimationRunning = true;
  setUserSettings({ runSnowfallAnimation: true });
  syncStateOtherSwitches(event);
}

function syncStateOtherSwitches(event) {
  document.querySelectorAll(".snow-animation-switch__input").forEach((elem) => {
    if (elem.id !== event.target.previousElementSibling.id) {
      elem.checked = snowfallState.isAnimationRunning;
      elem.ariaChecked = snowfallState.isAnimationRunning;
    }
  });
}
