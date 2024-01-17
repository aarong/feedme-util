import vFeedOpen from "../feed-open";

describe("The feed-open validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedOpen("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vFeedOpen({
          FeedName: "FEED_NAME",
          FeedArgs: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedName", () => {
      expect(
        vFeedOpen({
          MessageType: "FeedOpen",
          FeedArgs: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedArgs", () => {
      expect(
        vFeedOpen({
          MessageType: "FeedOpen",
          FeedName: "FEED_NAME",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedOpen({
          MessageType: "FeedOpen",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vFeedOpen({
          MessageType: "INVALID",
          FeedName: "FEED_NAME",
          FeedArgs: {},
        }),
      ).toBe("MessageType > Not 'FeedOpen'.");
    });

    it("should return invalid if invalid FeedName", () => {
      expect(
        vFeedOpen({
          MessageType: "FeedOpen",
          FeedName: 123,
          FeedArgs: {},
        }),
      ).toBe("FeedName > Not a string.");
    });

    it("should return invalid if invalid FeedFeedArgsName", () => {
      expect(
        vFeedOpen({
          MessageType: "FeedOpen",
          FeedName: "FEED_NAME",
          FeedArgs: "INVALID",
        }),
      ).toBe("FeedArgs > Not an object.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if with no feed args", () => {
      expect(
        vFeedOpen({
          MessageType: "FeedOpen",
          FeedName: "FEED_NAME",
          FeedArgs: {},
        }),
      ).toBe("");
    });

    it("should return valid if with feed args", () => {
      expect(
        vFeedOpen({
          MessageType: "FeedOpen",
          FeedName: "FEED_NAME",
          FeedArgs: { Arg: "ARG" },
        }),
      ).toBe("");
    });
  });
});
