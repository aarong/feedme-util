import validateFeedOpen from "../validatefeedopen";

describe("The validateFeedOpen.check() function", () => {
  it("should throw on invalid type", () => {
    expect(() => {
      validateFeedOpen.check(123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid MessageType", () => {
    expect(() => {
      validateFeedOpen.check({ MessageType: "junk" });
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on schema violation", () => {
    expect(() => {
      validateFeedOpen.check({ MessageType: "FeedOpen" });
    }).toThrow(new Error("INVALID_MESSAGE: Schema validation failed."));
  });

  it("should succeed on valid message", () => {
    expect(
      validateFeedOpen.check({
        MessageType: "FeedOpen",
        FeedName: "SOME_FEED_NAME",
        FeedArgs: { feed: "args" }
      })
    ).toBe(undefined);
  });
});
