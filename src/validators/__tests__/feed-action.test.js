import vFeedAction from "../feed-action";

describe("The feed-action validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedAction("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vFeedAction({
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedName", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedArgs", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing ActionName", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing ActionData", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          FeedDeltas: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedDeltas", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {}
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: [],
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vFeedAction({
          MessageType: "INVALID",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("MessageType > Not 'FeedAction'.");
    });

    it("should return invalid if invalid FeedName", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: 123,
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("FeedName > Not a string.");
    });

    it("should return invalid if invalid FeedArgs", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: "INVALID",
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("FeedArgs > Not an object.");
    });

    it("should return invalid if invalid ActionName", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: 123,
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("ActionName > Not a string.");
    });

    it("should return invalid if invalid ActionData", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: "INVALID",
          FeedDeltas: []
        })
      ).toBe("ActionData > Not an object.");
    });

    it("should return invalid if invalid FeedDeltas", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: "INVALID"
        })
      ).toBe("FeedDeltas > Not an array.");
    });

    it("should return invalid if invalid FeedMd5", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: [],
          FeedMd5: "INVALID"
        })
      ).toBe("FeedMd5 > Not 24 characters long.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if valid message - without FeedMd5", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("");
    });

    it("should return valid if valid message - with FeedMd5", () => {
      expect(
        vFeedAction({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: [],
          FeedMd5: "012345678901234567890123"
        })
      ).toBe("");
    });
  });
});
