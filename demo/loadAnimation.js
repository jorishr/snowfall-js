import { snowAnimationStart } from "../index.js";
import { handleForm } from "./form.js";

function loadAnimation() {
  snowAnimationStart({
    logLevel: "info",
  });
  handleForm();
}

loadAnimation();
