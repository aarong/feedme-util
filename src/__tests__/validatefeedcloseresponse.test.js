import validateFeedCloseResponse from "../validatefeedcloseresponse";

/* global expect:false, it:false, describe: false */

describe("The validateFeedCloseResponse.check() function", () => {
  it("should throw on schema violation", () => {
    expect(() => {
      validateFeedCloseResponse.check({ MessageType: "FeedCloseResponse" });
    }).toThrow(new Error("INVALID: Schema validation failed."));
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
