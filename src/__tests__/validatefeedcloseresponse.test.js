import validateFeedCloseResponse from "../validatefeedcloseresponse";

describe("The validateFeedCloseResponse.check() function", () => {
  it("should throw on invalid type", () => {
    expect(() => {
      validateFeedCloseResponse.check(123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid MessageType", () => {
    expect(() => {
      validateFeedCloseResponse.check({ MessageType: "junk" });
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on schema violation", () => {
    expect(() => {
      validateFeedCloseResponse.check({ MessageType: "FeedCloseResponse" });
    }).toThrow(new Error("INVALID_MESSAGE: Schema validation failed."));
  });

  it("should succeed on valid message", () => {
    expect(
      validateFeedCloseResponse.check({
        MessageType: "FeedCloseResponse",
        FeedName: "SOME_FEED_NAME",
        FeedArgs: { feed: "arg" }
      })
    ).toBe(undefined);
  });
});
