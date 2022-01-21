import vVersion from "../version";

describe("The version validator", () => {
  it("should return invalid if value is not a string", () => {
    expect(vVersion(123)).toBe("Not a string.");
  });

  it("should return valid if value is an empty string", () => {
    expect(vVersion("")).toBe("");
  });

  it("should return valid if value is a non-empty string", () => {
    expect(vVersion("VERSION")).toBe("");
  });
});
