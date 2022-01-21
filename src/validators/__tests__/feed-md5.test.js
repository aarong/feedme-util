import vFeedMd5 from "../feed-md5";

describe("The feed-md5 validator", () => {
  it("should return invalid if value is not a string", () => {
    expect(vFeedMd5(123)).toBe("Not a string.");
  });

  it("should return invalid if too short", () => {
    expect(vFeedMd5("01234567890123456789012")).toBe("Not 24 characters long.");
  });

  it("should return invalid if too long", () => {
    expect(vFeedMd5("0123456789012345678901234")).toBe(
      "Not 24 characters long."
    );
  });

  it("should return valid if 24 characters", () => {
    expect(vFeedMd5("012345678901234567890123")).toBe("");
  });
});
