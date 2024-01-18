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

function getDaysInMonth(month) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month - 1];
}
