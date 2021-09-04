import validateFeedOpenResponse from "../validatefeedopenresponse";

describe("The validateFeedOpenResponse.check() function", () => {
  it("should throw on invalid type", () => {
    expect(() => {
      validateFeedOpenResponse.check(123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid MessageType", () => {
    expect(() => {
      validateFeedOpenResponse.check({ MessageType: "junk" });
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid checkJsonExpressible", () => {
    expect(() => {
      validateFeedOpenResponse.check({ MessageType: "FeedOpenResponse" }, 123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Invalid checkJsonExpressible argument.")
    );
  });

  it("should throw on schema violation", () => {
    expect(() => {
      validateFeedOpenResponse.check(
        { MessageType: "FeedOpenResponse" },
        false
      );
    }).toThrow(new Error("INVALID_MESSAGE: Schema validation failed."));
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
      }).toThrow(
        new Error("INVALID_MESSAGE: Feed data is not JSON-expressible.")
      );
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
      }).toThrow(
        new Error("INVALID_MESSAGE: Error data is not JSON-expressible.")
      );
    });
  });
});
