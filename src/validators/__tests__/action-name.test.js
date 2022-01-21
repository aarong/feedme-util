import vActionName from "../action-name";

describe("The action-name validator", () => {
  it("should return invalid if value is not a string", () => {
    expect(vActionName(123)).toBe("Not a string.");
  });

  it("should return valid if value is an empty string", () => {
    expect(vActionName("")).toBe("");
  });

  it("should return valid if value is a non-empty string", () => {
    expect(vActionName("ACTION_NAME")).toBe("");
  });
});
