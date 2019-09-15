import validateFeedOpenResponse from "../validatefeedopenresponse";

/* global expect:false, it:false, describe: false */

describe("The validateFeedOpenResponse.check() function", () => {
  it("should throw on schema violation", () => {
    expect(() => {
      validateFeedOpenResponse.check(
        { MessageType: "FeedOpenResponse" },
        false
      );
    }).toThrow(new Error("INVALID: Schema validation failed."));
  });

  describe("if not checking JSON-expressibility", () => {
    it("should return success on valid response success", () => {
      expect(
        validateFeedOpenResponse.check(
          {
            MessageType: "FeedOpenResponse",
            Success: true,
            FeedName: "SOME_FEED_NAME",
            FeedArgs: { feed: "arg" },
            FeedData: { feed: "data" }
          },
          false
        )
      ).toBe(undefined);
    });

    it("should return success on valid response failure", () => {
      expect(
        validateFeedOpenResponse.check(
          {
            MessageType: "FeedOpenResponse",
            Success: false,
            FeedName: "SOME_FEED_NAME",
            FeedArgs: { feed: "arg" },
            ErrorCode: "SOME_ERROR_CODE",
            ErrorData: { error: "data" }
          },
          false
        )
      ).toBe(undefined);
    });

    it("should return success on non-expressible response success", () => {
      expect(
        validateFeedOpenResponse.check(
          {
            MessageType: "FeedOpenResponse",
            Success: true,
            FeedName: "SOME_FEED_NAME",
            FeedArgs: { feed: "arg" },
            FeedData: { feed: undefined }
          },
          false
        )
      ).toBe(undefined);
    });

    it("should return success on non-expressible response failure", () => {
      expect(
        validateFeedOpenResponse.check(
          {
            MessageType: "FeedOpenResponse",
            Success: false,
            FeedName: "SOME_FEED_NAME",
            FeedArgs: { feed: "arg" },
            ErrorCode: "SOME_ERROR_CODE",
            ErrorData: { error: undefined }
          },
          false
        )
      ).toBe(undefined);
    });
  });

  describe("if checking JSON-expressibility", () => {
    it("should return success on valid response success", () => {
      expect(
        validateFeedOpenResponse.check(
          {
            MessageType: "FeedOpenResponse",
            Success: true,
            FeedName: "SOME_FEED_NAME",
            FeedArgs: { feed: "arg" },
            FeedData: { feed: "data" }
          },
          true
        )
      ).toBe(undefined);
    });

    it("should return success on valid response failure", () => {
      expect(
        validateFeedOpenResponse.check(
          {
            MessageType: "FeedOpenResponse",
            Success: false,
            FeedName: "SOME_FEED_NAME",
            FeedArgs: { feed: "arg" },
            ErrorCode: "SOME_ERROR_CODE",
            ErrorData: { error: "data" }
          },
          true
        )
      ).toBe(undefined);
    });

    it("should throw on non-expressible response success", () => {
      expect(() => {
        validateFeedOpenResponse.check(
          {
            MessageType: "FeedOpenResponse",
            Success: true,
            FeedName: "SOME_FEED_NAME",
            FeedArgs: { feed: "arg" },
            FeedData: { feed: undefined }
          },
          true
        );
      }).toThrow(new Error("INVALID: Feed data is not JSON-expressible."));
    });

    it("should throw on non-expressible response failure", () => {
      expect(() => {
        validateFeedOpenResponse.check(
          {
            MessageType: "FeedOpenResponse",
            Success: false,
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
});
