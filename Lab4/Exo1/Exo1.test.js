const { expect, test, describe } = require("@jest/globals");
const { exf } = require("../../Lab3/Exo1/echo");
const { mean } = require("../../Lab3/Exo2/notation");

describe("Exo 1 exf function", () => {
  test("exf('hello') will type hello 5 times ", () => {
    expect(exf("hello", 5)).toBe("hellohellohellohellohello");
  });
});

describe("Exo 2 mean function", () => {
  test("mean(arr) will be 6", () => {
    expect(mean([6, 3, 20, -5, 0, 8, 10])).toBe(6);
  });
});
