import { initSnowfall, snowfallState } from "../index.js";
import { getDefaultParams } from "../params.js";
import { switchesToggleOn } from "../switch.js";

export function handleForm() {
  const form = document.getElementById("form");
  const defaultButton = document.getElementById("default");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let newParams = { snowfall: {}, switches: {} };
    const snowParamElems = [...form.elements].filter((elem) =>
      elem.classList.contains("snowParam")
    );
    for (let input of snowParamElems) {
      if (input.name) {
        newParams.snowfall[input.name] = input.value;
      }
    }
    newParams = handleSwitchParameterChange(newParams);
    reloadAnimation(newParams);

    //set page background
    const bgInput = document.querySelector(".pageParam");
    document.body.classList.remove("bg-light"); //remove Bootstrap class
    document.body.style.backgroundColor = bgInput.value;
  });

  defaultButton.addEventListener("click", () => {
    reloadAnimation();
    stylesReset();
  });
}

function reloadAnimation(params) {
  if (snowfallState.isAnimationRunning) {
    snowfallState.snowfallInstance.destroy();
    snowfallState.isAnimationRunning = false;
  }
  if (params) {
    snowfallState.snowfallInstance = initSnowfall(params.snowfall);
    snowfallState.isAnimationRunning = true;
    switchesToggleOn();
  } else {
    document.body.classList.add("bg-light");
    form.reset();
    stylesReset();
    const defaultParams = getDefaultParams();
    snowfallState.snowfallInstance = initSnowfall(defaultParams.snowfall);
    snowfallState.isAnimationRunning = true;
    switchesToggleOn();
  }
}

function handleSwitchParameterChange(newParams) {
  const hideSwitches = Boolean(
    document.querySelector('input[name="hideSwitches"]:checked').value
  );
  const switches = document.querySelectorAll(".snow-animation-switch");
  if (hideSwitches) {
    switches.forEach((elem) =>
      elem.classList.remove("snow-animation-switch--show")
    );
    return newParams;
  } else
    switches.forEach((elem) => {
      if (!elem.classList.contains("snow-animation-switch--show")) {
        elem.classList.add("snow-animation-switch--show");
      }
    });

  const switchParamElems = [...form.elements].filter((elem) =>
    elem.classList.contains("switchParam")
  );
  for (let input of switchParamElems) {
    newParams.switches[input.name] = input.value;
    switch (input.name) {
      case "bgClrOn":
        document.documentElement.style.setProperty(
          "--snow-animation-switch-bgClrOn",
          input.value
        );
        break;
      case "bgClrOff":
        document.documentElement.style.setProperty(
          "--snow-animation-switch-bgClrOff",
          input.value
        );
        break;
      case "toggleClr":
        document.documentElement.style.setProperty(
          "--snow-animation-switch-toggleClr",
          input.value
        );
        break;
      case "txtClr":
        document.documentElement.style.setProperty(
          "--snow-animation-switch-txtClr",
          input.value
        );
        break;
      case "txtPosition":
        document.documentElement.style.setProperty(
          "--snow-animation-switch-txtPosition",
          input.value
        );
        if (input.value === "1") {
          document
            .querySelectorAll(".snow-animation-switch__text")
            .forEach((node) => {
              node.style.marginRight = "0.75em";
              node.style.marginLeft = "0";
            });
        } else {
          document
            .querySelectorAll(".snow-animation-switch__text")
            .forEach((node) => {
              node.style.marginRight = "0";
              node.style.marginLeft = "0.75em";
            });
        }
        break;
      case "txtContent":
        document
          .querySelectorAll(".snow-animation-switch__text")
          .forEach((node) => (node.textContent = input.value));
        break;
      default:
        break;
    }
  }

  return newParams;
}

function stylesReset() {
  const styles = getDefaultParams().switches.stylesheetRoot;
  const switches = document.querySelectorAll(".snow-animation-switch");
  Object.keys(styles).forEach((style) =>
    document.documentElement.style.setProperty(
      `--snow-animation-switch-${style}`,
      styles[style]
    )
  );
  switches.forEach((elem) => {
    if (!elem.classList.contains("snow-animation-switch--show")) {
      elem.classList.add("snow-animation-switch--show");
    }
  });
  document.querySelectorAll(".snow-animation-switch__text").forEach((node) => {
    node.style.marginRight = "unset";
    node.style.marginLeft = "0.75em";
  });
}
