import vFeedCloseResponse from "../feed-close-response";

describe("The feed-close-response validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedCloseResponse("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vFeedCloseResponse({
          FeedName: "FEED_NAME",
          FeedArgs: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vFeedCloseResponse({
          MessageType: "FeedName",
          FeedArgs: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedArgs", () => {
      expect(
        vFeedCloseResponse({
          MessageType: "FeedCloseResponse",
          FeedName: "FEED_NAME",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedCloseResponse({
          MessageType: "FeedCloseResponse",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vFeedCloseResponse({
          MessageType: "INVALID",
          FeedName: "FEED_NAME",
          FeedArgs: {},
        }),
      ).toBe("MessageType > Not 'FeedCloseResponse'.");
    });

    it("should return invalid if invalid FeedName", () => {
      expect(
        vFeedCloseResponse({
          MessageType: "FeedCloseResponse",
          FeedName: 123,
          FeedArgs: {},
        }),
      ).toBe("FeedName > Not a string.");
    });

    it("should return invalid if invalid FeedArgs", () => {
      expect(
        vFeedCloseResponse({
          MessageType: "FeedCloseResponse",
          FeedName: "FEED_NAME",
          FeedArgs: "INVALID",
        }),
      ).toBe("FeedArgs > Not an object.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is valid", () => {
      expect(
        vFeedCloseResponse({
          MessageType: "FeedCloseResponse",
          FeedName: "FEED_NAME",
          FeedArgs: {},
        }),
      ).toBe("");
    });
  });
});
