import { setUserSettings } from "userSettings.js";

export function switchesAppendToDOM() {
  const switchContainers = [
    ...document.querySelectorAll(".snowfall-animation-switch"),
  ];
  if (switchContainers.length > 0) {
    switchContainers.forEach((container, i) => {
      const switchElement = buildSwitch(i);
      container.appendChild(switchElement);
    });
    console.log(
      `{${switchContainers.length} switch container elements found and ${switchContainers.length} switch toggles appended to the DOM`
    );
  } else {
    console.warn("No switchContainers found in the DOM");
    return null;
  }
}

function buildSwitch(i) {
  //html + in-lines css?
  const inputElem = document.createElement("input");
  const label = document.createElement("label");
  const text = document.createElement("span");

  inputElem.classList.add("snow-animation-switch__input");
  inputElem.setAttribute("type", "checkbox");
  inputElem.setAttribute("id", `snow-animation-switch__input${i}`);

  label.classList.add("snow-animation-switch__label");
  label.setAttribute("role", "checkbox");
  label.setAttribute("for", `snow-animation-switch__input${i}`);
  label.setAttribute("aria-checked", "false");

  text.classList.add("snow-animation-switch__text");
}

element.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    e.preventDefault(); // prevent the click event on buttons
    if (args) {
      handler(...args);
    } else handler();
  }
});

const snowToggleContainers = [...document.querySelectorAll(".snow-toggle")];
const snowToggleCheckboxes = [
  ...document.querySelectorAll(".snow-toggle__checkbox"),
];
const snowToggleLabels = [...document.querySelectorAll(".snow-toggle__label")];

snowToggleContainers.forEach((container) => {
  container.classList.add("snow-toggle--show");
});

snowToggleCheckboxes.forEach((checkbox) => {
  checkbox.checked = true;
});

snowToggleLabels.forEach((label) => {
  label.addEventListener("click", (event) => {
    if (isRunning) {
      snowfall.destroy();
      isRunning = false;
      updateOtherCheckboxesState(event);
      setUserSettings({ runSnowfallAnimation: false });
    } else {
      snowfall = initSnowFall();
      isRunning = true;
      updateOtherCheckboxesState(event);
      setUserSettings({ runSnowfallAnimation: true });
    }
  });
});

const updateOtherCheckboxesState = (event) => {
  [...document.querySelectorAll(".snow-toggle__checkbox")].forEach(
    (checkbox) => {
      if (checkbox.id !== event.target.previousElementSibling.id) {
        checkbox.checked = isRunning;
      }
    }
  );
};
