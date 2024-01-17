export function isObject(arg) {
  return Object.prototype.toString.call(arg) === "[object Object]";
}

export function getAllObjectKeys(obj) {
  let keys = [];
  if (!isObject(obj)) return keys;

  findObjectKeys(obj);

  function findObjectKeys(obj) {
    for (const key in obj) {
      if (isObject(obj[key])) {
        keys.push(key);
        const nestedKeys = findObjectKeys(obj[key]);
        keys.concat(nestedKeys);
      } else keys.push(key);
    }
  }
  return keys;
}

export function insertValue(obj, targetKey, value) {
  for (const key in obj) {
    if (key === targetKey) {
      obj[key] = value;
      return;
    } else if (isObject(obj[key])) {
      insertValue(obj[key], targetKey, value);
    }
  }
}

export function getValueProps(obj, targetKey) {
  for (const key in obj) {
    if (key === targetKey) {
      return { value: obj[key], type: typeof obj[key] };
    } else if (isObject(obj[key])) {
      const result = getValueProps(obj[key], targetKey);
      if (result.value != undefined) return result;
    }
  }
  return { value: undefined, type: undefined };
}

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
