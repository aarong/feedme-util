import validateFeedClose from "../validatefeedclose";

/* global expect:false, it:false, describe: false */

describe("The validateFeedClose.check() function", () => {
  it("should throw on schema violation", () => {
    expect(() => {
      validateFeedClose.check({ MessageType: "FeedClose" });
    }).toThrow(new Error("INVALID: Schema validation failed."));
  });

  it("should succeed on valid message", () => {
    expect(
      validateFeedClose.check({
        MessageType: "FeedClose",
        FeedName: "SOME_FEED_NAME",
        FeedArgs: { feed: "args" }
      })
    ).toBe(undefined);
  });
});
