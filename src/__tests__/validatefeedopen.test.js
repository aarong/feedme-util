import validateFeedOpen from "../validatefeedopen";

/* global expect:false, it:false, describe: false */

describe("The validateFeedOpen.check() function", () => {
  it("should throw on schema violation", () => {
    expect(() => {
      validateFeedOpen.check({ MessageType: "FeedOpen" });
    }).toThrow(new Error("INVALID: Schema validation failed."));
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
