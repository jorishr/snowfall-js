import { animationStart } from "../index.js";
import { handleForm } from "./form.js";

function loadAnimation() {
  animationStart({ logLevel: "info" });
  handleForm();
}

loadAnimation();
