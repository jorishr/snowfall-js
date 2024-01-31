import { params } from "./index.js";

/**
 * Logs an error message to the console.
 *
 * @param {string} message - The error message to be logged.
 */
export function logError(message) {
  console.error(`[ERROR] ${message}`);
}

/**
 * Logs a warning message to the console.
 *
 * @param {string} message - The warning message to be logged.
 */
export function logWarn(message) {
  if (params.logLevel === "info") {
    console.warn(`[WARN] ${message}`);
  }
}

/**
 * Logs an info message to the console.
 *
 * @param {string} message - The info message to be logged.
 */
export function logInfo(message) {
  if (params.logLevel === "info") {
    console.log(`[INFO] ${message}`);
  }
}
