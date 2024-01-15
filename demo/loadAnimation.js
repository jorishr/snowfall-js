import { animationStart, snowfallState } from "../index.js";
import { handleForm } from "./form.js";

function loadAnimation() {
  animationStart();
  handleForm();
}

loadAnimation();
