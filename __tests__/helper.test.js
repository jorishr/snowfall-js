import {
  isObject,
  getAllObjectKeys,
  insertValue,
  getValueProps,
} from "../helper.js";

/* isObject fn */
describe("isObject function", () => {
  test("should return true for plain objects", () => {
    const obj = { key: "value" };
    expect(isObject(obj)).toBe(true);
  });

  test("should return false for arrays", () => {
    const arr = [1, 2, 3];
    expect(isObject(arr)).toBe(false);
  });

  test("should return false for functions", () => {
    const fn = () => {};
    expect(isObject(fn)).toBe(false);
  });

  test("should return false for null", () => {
    const nullValue = null;
    expect(isObject(nullValue)).toBe(false);
  });

  test("should return false for numbers", () => {
    const number = 3;
    expect(isObject(number)).toBe(false);
  });

  test("should return false for strings", () => {
    const str = "hello";
    expect(isObject(str)).toBe(false);
  });

  test("should return false for undefined", () => {
    const undefinedValue = undefined;
    expect(isObject(undefinedValue)).toBe(false);
  });
});

/* getAllObjectKeys fn */
describe("getAllObjectKeys function", () => {
  test("should return keys for a flat object", () => {
    const flatObject = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
    const result = getAllObjectKeys(flatObject);
    const expectedKeys = ["key1", "key2", "key3"];
    expect(result.sort()).toEqual(expectedKeys.sort());
  });

  test("should return all keys from an object and its nested objects", () => {
    const inputObject = {
      key1: "value1",
      key2: {
        nestedKey1: "nestedValue1",
        nestedKey2: {
          deeplyNestedKey: "deeplyNestedValue",
        },
      },
      key3: "value3",
    };

    const result = getAllObjectKeys(inputObject);
    const expectedKeys = [
      "key1",
      "key2",
      "nestedKey1",
      "nestedKey2",
      "deeplyNestedKey",
      "key3",
    ];
    expect(result).toEqual(expectedKeys);
  });

  test("should return an empty array for an empty object", () => {
    const emptyObject = {};
    const result = getAllObjectKeys(emptyObject);
    expect(result).toEqual([]);
  });

  test("should return an empty array for non-object input", () => {
    const nonObject = "not an object";
    const result = getAllObjectKeys(nonObject);
    expect(result).toEqual([]);
  });
});

/* insertValue fn */
describe("insertValue function", () => {
  test("should insert value into target key in a flat object", () => {
    const flatObject = {
      key1: "value1",
      key2: "value2",
    };

    const targetKey = "key2";
    const newValue = "newValue";
    insertValue(flatObject, targetKey, newValue);
    expect(flatObject.key2).toBe("newValue");
  });

  test("should insert value into target key in an object with nested objects", () => {
    const nestedObject = {
      level1: {
        level2: {
          targetKey: "originalValue",
        },
      },
    };

    const targetKey = "targetKey";
    const newValue = "newValue";
    insertValue(nestedObject, targetKey, newValue);
    expect(nestedObject.level1.level2.targetKey).toBe("newValue");
  });

  test("should do nothing if target key is not found", () => {
    const originalObject = {
      key1: "value1",
      key2: {
        nestedKey: "nestedValue",
      },
    };

    const targetKey = "nonExistentKey";
    const newValue = "newValue";
    insertValue(originalObject, targetKey, newValue);
    expect(originalObject).toEqual({
      key1: "value1",
      key2: {
        nestedKey: "nestedValue",
      },
    });
  });
});

/* getValueProps fn */
describe("getValueProps function", () => {
  test("should return the type and value of the target key in a flat object", () => {
    const flatObject = {
      key1: "value1",
      key2: 42,
      key3: true,
    };

    const targets = ["key1", "key2", "key3"];
    const result = [];
    targets.forEach((target) => {
      const props = getValueProps(flatObject, target);
      result.push(props);
    });
    expect(result).toEqual([
      { value: "value1", type: "string" },
      { value: 42, type: "number" },
      { value: true, type: "boolean" },
    ]);
  });

  test("should return the value and type of the target key in an object with nested objects", () => {
    const nestedObject = {
      switches: {
        stylesheetRoot: {
          bgClrOff: "stringValue",
        },
      },
    };

    const targetKey = "bgClrOff";
    const result = getValueProps(nestedObject, targetKey);
    expect(result).toEqual({ value: "stringValue", type: "string" });
  });

  test("should return object with undefined values if target key is not found", () => {
    const originalObject = {
      key1: "value1",
      key2: {
        nestedKey: "nestedValue",
      },
    };

    const targetKey = "nonExistentKey";
    const result = getValueProps(originalObject, targetKey);
    expect(result).toEqual({ value: undefined, type: undefined });
  });

  test("should return undefined for non-object input", () => {
    const nonObject = "not an object";
    const targetKey = "someKey";
    const result = getValueProps(nonObject, targetKey);

    expect(result).toEqual({ value: undefined, type: undefined });
  });
});
