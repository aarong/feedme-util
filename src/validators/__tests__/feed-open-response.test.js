import vFeedOpenResponse from "../feed-open-response";

describe("The feed-open-response validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedOpenResponse("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(vFeedOpenResponse({ Success: true })).toBe(
        "MessageType > Missing or not 'FeedOpenResponse'.",
      );
    });

    it("should return invalid if missing Success", () => {
      expect(vFeedOpenResponse({ MessageType: "FeedOpenResponse" })).toBe(
        "Success > Missing or not boolean.",
      );
    });

    it("should return invalid if invalid MessageType", () => {
      expect(vFeedOpenResponse({ MessageType: "INVALID", Success: true })).toBe(
        "MessageType > Missing or not 'FeedOpenResponse'.",
      );
    });

    it("should return invalid if invalid Success", () => {
      expect(
        vFeedOpenResponse({
          MessageType: "FeedOpenResponse",
          Success: "INVALID",
        }),
      ).toBe("Success > Missing or not boolean.");
    });

    it("should return invalid if invalid FeedOpenResponse success message", () => {
      expect(
        vFeedOpenResponse({ MessageType: "FeedOpenResponse", Success: true }),
      ).toBe("(Success) Missing or extraneous property.");
    });

    it("should return invalid if invalid FeedOpenResponse failure message", () => {
      expect(
        vFeedOpenResponse({ MessageType: "FeedOpenResponse", Success: false }),
      ).toBe("(Failure) Missing or extraneous property.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is a valid FeedOpenResponse success", () => {
      expect(
        vFeedOpenResponse({
          MessageType: "FeedOpenResponse",
          Success: true,
          FeedName: "FEED_NAME",
          FeedArgs: {},
          FeedData: {},
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid FeedOpenResponse failure", () => {
      expect(
        vFeedOpenResponse({
          MessageType: "FeedOpenResponse",
          Success: false,
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
        }),
      ).toBe("");
    });
  });
});
