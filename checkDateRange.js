import { logError, logInfo } from "./logger.js";

/**
 * Checks if the date range values are valid and if the current date is within the specified date range.
 *
 * @param {Object} dateRange - Object containing startMonth, startDay, endMonth, and endDay.
 * @returns {boolean} - True if the current date is within the range, false otherwise.
 */
export function checkDateRange(dateRange = {}) {
  let result = false;
  let validDateRange = true;
  if (Object.keys(dateRange).length !== 0) {
    validDateRange =
      isValidDate(dateRange.startMonth, dateRange.startDay) &&
      isValidDate(dateRange.endMonth, dateRange.endDay);
    if (
      dateRange.startMonth === dateRange.endMonth &&
      dateRange.startDay >= dateRange.endDay
    ) {
      validDateRange = false;
    }
  }

  validDateRange
    ? (result = checkCurrentDate(dateRange))
    : logError(
        "Invalid date range values provided in the config file. Check documentation for more information."
      );

  logInfo(`Check Date Range Result: ${result}`);
  return result;
}

/**
 * Validates the currentDate and passes the currentDate and dateRange values to the final verification check.
 *
 * @param {Object} dateRange - Object containing startMonth, startDay, endMonth, and endDay.
 * @returns {boolean} - True if the current date is within the range, false otherwise.
 */
function checkCurrentDate(dateRange) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // Define the start and end dates for the condition, fallback to default
  const startMonth = dateRange.startMonth || 12; // December
  const startDay = dateRange.startDay || 15;
  const endMonth = dateRange.endMonth || 2; // February
  const endDay = dateRange.endDay || 15;

  return isInDateRange(
    currentMonth,
    currentDay,
    startMonth,
    endMonth,
    startDay,
    endDay
  );
}

/**
 * Checks if the current date is within the specified date range.
 *
 * @param {number} currentMonth - Current month.
 * @param {number} currentDay - Current day.
 * @param {number} startMonth - Start month of the date range.
 * @param {number} endMonth - End month of the date range.
 * @param {number} startDay - Start day of the date range.
 * @param {number} endDay - End day of the date range.
 * @returns {boolean} - True if the current date is within the range, false otherwise.
 */
function isInDateRange(
  currentMonth,
  currentDay,
  startMonth,
  endMonth,
  startDay,
  endDay
) {
  if (startMonth < endMonth) {
    return (
      (currentMonth === startMonth && currentDay >= startDay) ||
      (currentMonth > startMonth && currentMonth < endMonth) ||
      (currentMonth === endMonth && currentDay <= endDay)
    );
  } else if (startMonth === endMonth) {
    return currentDay >= startDay && currentDay <= endDay;
  } else {
    return (
      (currentMonth === startMonth && currentDay >= startDay) ||
      (currentMonth > startMonth && currentMonth <= 12) ||
      (currentMonth >= 1 && currentMonth < endMonth) ||
      (currentMonth === endMonth && currentDay <= endDay)
    );
  }
}

/**
 * Helper function to checks if the provided month and day form a valid date.
 *
 * @param {number} month - Month to check.
 * @param {number} day - Day to check.
 * @returns {boolean} - True if the provided month and day form a valid date, false otherwise.
 */
export function isValidDate(month, day) {
  if (typeof month !== "number" || typeof day !== "number") {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  // Check if the day is in the valid range based on the month
  if (day < 1 || day > getDaysInMonth(month)) {
    return false;
  }

  return true;
}

/**
 * Gets the number of days in a given month.
 *
 * @param {number} month - Month for which to get the number of days.
 * @returns {number} - Number of days in the specified month.
 */
function getDaysInMonth(month) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month - 1];
}
