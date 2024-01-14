import { setUserSettings } from "./userSettings.js";
import { initSnowFall } from "./index.js";

export function switchesAppendToDOM() {
  const switchContainers = [
    ...document.querySelectorAll(".snow-animation-switch"),
  ];
  if (switchContainers.length > 0) {
    switchContainers.forEach((container, i) => {
      const switchElements = buildSwitch(i);
      switchElements.forEach((switchElement) =>
        container.appendChild(switchElement)
      );
      container.classList.add("snow-animation-switch--show");
    });
    injectCSS();
    console.log(
      `{${switchContainers.length} switch container elements found and ${switchContainers.length} switch toggles appended to the DOM`
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

  textElem.classList.add("snow-animation-switch__text");
  textElem.textContent = "Snow on/off";

  return [inputElem, label, textElem];
}

function injectCSS() {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.type = "text/css";
  linkElement.href = "../checkbox-styles.css";
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

export function switchesSetupEventHandlers(isAnimationRunning, snowfall) {
  const labelElems = [
    ...document.querySelectorAll(".snow-animation-switch__label"),
  ];
  labelElems.forEach((label) => {
    label.addEventListener("click", (event) => {
      if (isAnimationRunning) {
        snowfall.destroy();
        isAnimationRunning = false;
        setUserSettings({ runSnowfallAnimation: false });
        syncStateOtherSwitches(event, isAnimationRunning);
      } else {
        snowfall = initSnowFall();
        isAnimationRunning = true;
        setUserSettings({ runSnowfallAnimation: true });
        syncStateOtherSwitches(event, isAnimationRunning);
      }
    });
  });
}

function syncStateOtherSwitches(event, isAnimationRunning) {
  [...document.querySelectorAll(".snow-animation-switch__input")].forEach(
    (elem) => {
      if (elem.id !== event.target.previousElementSibling.id) {
        elem.checked = isAnimationRunning;
        elem.ariaChecked = isAnimationRunning;
      }
    }
  );
}

/* element.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    e.preventDefault(); // prevent the click event on buttons
    if (args) {
      handler(...args);
    } else handler();
  }
}); */
