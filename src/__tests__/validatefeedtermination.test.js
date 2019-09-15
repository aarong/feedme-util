import validateFeedTermination from "../validatefeedtermination";

/* global expect:false, it:false, describe: false */

describe("The validateFeedTermination.check() function", () => {
  it("should throw on schema violation", () => {
    expect(() => {
      validateFeedTermination.check({ MessageType: "FeedTermination" }, false);
    }).toThrow(new Error("INVALID: Schema validation failed."));
  });

  it("if not checking JSON-expressibility, should succeed if expressible", () => {
    expect(
      validateFeedTermination.check(
        {
          MessageType: "FeedTermination",
          FeedName: "SOME_FEED_NAME",
          FeedArgs: { feed: "arg" },
          ErrorCode: "SOME_ERROR_CODE",
          ErrorData: { error: "data" }
        },
        false
      )
    ).toBe(undefined);
  });

  it("if not checking JSON-expressibility, should succeed if not expressible", () => {
    expect(
      validateFeedTermination.check(
        {
          MessageType: "FeedTermination",
          FeedName: "SOME_FEED_NAME",
          FeedArgs: { feed: "arg" },
          ErrorCode: "SOME_ERROR_CODE",
          ErrorData: { error: undefined }
        },
        false
      )
    ).toBe(undefined);
  });

  it("if checking JSON-expressibility, should succeed if expressible", () => {
    expect(
      validateFeedTermination.check(
        {
          MessageType: "FeedTermination",
          FeedName: "SOME_FEED_NAME",
          FeedArgs: { feed: "arg" },
          ErrorCode: "SOME_ERROR_CODE",
          ErrorData: { error: "data" }
        },
        true
      )
    ).toBe(undefined);
  });

  it("if not checking JSON-expressibility, should throw if not expressible", () => {
    expect(() => {
      validateFeedTermination.check(
        {
          MessageType: "FeedTermination",
          FeedName: "SOME_FEED_NAME",
          FeedArgs: { feed: "arg" },
          ErrorCode: "SOME_ERROR_CODE",
          ErrorData: { error: undefined }
        },
        true
      );
    }).toThrow(new Error("INVALID: Error data is not JSON-expressible."));
  });
});
