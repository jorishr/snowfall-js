export default function checkDateRange() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // Define the start and end dates for the condition
  const startMonth = 12; // December
  const startDay = 15;
  const endMonth = 2; // February
  const endDay = 15;

  // Check if the current date is within the specified range
  const isInDateRange =
    (currentMonth === startMonth && currentDay >= startDay) ||
    currentMonth === 1 ||
    (currentMonth === endMonth && currentDay <= endDay);

  if (isInDateRange) {
    return true;
  } else {
    return false;
  }
}
