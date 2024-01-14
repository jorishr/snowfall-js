import { getUserSettings, setUserSettings } from "../userSettings.js";
import { jest } from "@jest/globals";

describe("getUserSettings", () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
  };

  beforeEach(() => {
    global.localStorage = localStorageMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns empty object when localStorage is empty", () => {
    localStorageMock.getItem.mockReturnValueOnce(null);

    const result = getUserSettings();

    expect(localStorageMock.getItem).toHaveBeenCalledWith("userSettings");
    expect(result).toEqual({});
  });

  test("returns user settings object when valid JSON is stored in localStorage", () => {
    const validSettings = { runSnowfallAnimation: true };
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(validSettings));

    const result = getUserSettings();

    expect(localStorageMock.getItem).toHaveBeenCalledWith("userSettings");
    expect(result).toEqual(validSettings);
  });

  test("returns null and logs an error when invalid JSON is stored in localStorage", () => {
    const invalidJSON = "invalidJSONString";
    localStorageMock.getItem.mockReturnValueOnce(invalidJSON);

    // Spy on console.error
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = getUserSettings();

    expect(localStorageMock.getItem).toHaveBeenCalledWith("userSettings");
    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error retrieving user settings:",
      expect.any(SyntaxError)
    );

    // Restore the original console.error implementation
    consoleErrorSpy.mockRestore();
  });
});

describe("setUserSettings", () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  // Spy on console.log
  const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  beforeEach(() => {
    global.localStorage = localStorageMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore the original console.log implementation after all tests
    consoleLogSpy.mockRestore();
  });

  test("merges and saves new settings with existing settings in localStorage", () => {
    const existingSettings = { theme: "light", language: "en" };
    const newSettings = { language: "fr", fontSize: "medium" };

    // Mock existing settings in localStorage
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify(existingSettings)
    );

    setUserSettings(newSettings);

    expect(localStorageMock.getItem).toHaveBeenCalledWith("userSettings");
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "userSettings",
      JSON.stringify({ theme: "light", language: "fr", fontSize: "medium" })
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "User settings saved successfully."
    );
  });

  test("saves new settings when localStorage is initially empty", () => {
    const newSettings = { theme: "dark", fontSize: "large" };

    // Mock empty localStorage
    localStorageMock.getItem.mockReturnValueOnce(null);

    setUserSettings(newSettings);

    expect(localStorageMock.getItem).toHaveBeenCalledWith("userSettings");
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "userSettings",
      JSON.stringify(newSettings)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "User settings saved successfully."
    );
  });
});
