import vErrorCode from "../error-code";

describe("The error-code validator", () => {
  it("should return invalid if value is not a string", () => {
    expect(vErrorCode(123)).toBe("Not a string.");
  });

  it("should return valid if value is an empty string", () => {
    expect(vErrorCode("")).toBe("");
  });

  it("should return valid if value is a non-empty string", () => {
    expect(vErrorCode("ERROR_CODE")).toBe("");
  });
});
