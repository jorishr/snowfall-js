import { params } from "./index.js";

export function logError(message) {
  console.error(`[ERROR] ${message}`);
}

export function logWarn(message) {
  if (params.logLevel === "info") {
    console.warn(`[WARN] ${message}`);
  }
}

export function logInfo(message) {
  if (params.logLevel === "info") {
    console.log(`[INFO] ${message}`);
  }
}
