import vCallbackId from "../callback-id";

describe("The callback-id validator", () => {
  it("should return invalid if value is not a string", () => {
    expect(vCallbackId(123)).toBe("Not a string.");
  });

  it("should return valid if value is an empty string", () => {
    expect(vCallbackId("")).toBe("");
  });

  it("should return valid if value is a non-empty string", () => {
    expect(vCallbackId("ACTION_NAME")).toBe("");
  });
});
