import vFeedName from "../feed-name";

describe("The feed-name validator", () => {
  it("should return invalid if value is not a string", () => {
    expect(vFeedName(123)).toBe("Not a string.");
  });

  it("should return valid if value is an empty string", () => {
    expect(vFeedName("")).toBe("");
  });

  it("should return valid if value is a non-empty string", () => {
    expect(vFeedName("FEED_NAME")).toBe("");
  });
});
