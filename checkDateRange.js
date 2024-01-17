import { isValidDate } from "./helper";
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
    : console.error(
        "Invalid date range values provided in the config file. Check documentation for more information."
      );

  return result;
}

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
