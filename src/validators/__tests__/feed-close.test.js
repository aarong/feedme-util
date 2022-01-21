import vFeedClose from "../feed-close";

describe("The feed-close validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedClose("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vFeedClose({
          FeedName: "FEED_NAME",
          FeedArgs: {}
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedName", () => {
      expect(
        vFeedClose({
          MessageType: "FeedClose",
          FeedArgs: {}
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedArgs", () => {
      expect(
        vFeedClose({
          MessageType: "FeedClose",
          FeedName: "FEED_NAME"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedClose({
          MessageType: "FeedClose",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vFeedClose({
          MessageType: "INVALID",
          FeedName: "FEED_NAME",
          FeedArgs: {}
        })
      ).toBe("MessageType > Not 'FeedClose'.");
    });

    it("should return invalid if invalid FeedName", () => {
      expect(
        vFeedClose({
          MessageType: "FeedClose",
          FeedName: 123,
          FeedArgs: {}
        })
      ).toBe("FeedName > Not a string.");
    });

    it("should return invalid if invalid FeedFeedArgsName", () => {
      expect(
        vFeedClose({
          MessageType: "FeedClose",
          FeedName: "FEED_NAME",
          FeedArgs: "INVALID"
        })
      ).toBe("FeedArgs > Not an object.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if with no feed args", () => {
      expect(
        vFeedClose({
          MessageType: "FeedClose",
          FeedName: "FEED_NAME",
          FeedArgs: {}
        })
      ).toBe("");
    });

    it("should return valid if with feed args", () => {
      expect(
        vFeedClose({
          MessageType: "FeedClose",
          FeedName: "FEED_NAME",
          FeedArgs: { Arg: "ARG" }
        })
      ).toBe("");
    });
  });
});
