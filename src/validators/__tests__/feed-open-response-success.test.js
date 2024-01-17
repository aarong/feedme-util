import vFeedOpenResponseSuccess from "../feed-open-response-success";

describe("The feed-open-response-success validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedOpenResponseSuccess("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vFeedOpenResponseSuccess({
          Success: true,
          FeedName: "FEED_NAME",
          FeedArgs: {},
          FeedData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Success", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          FeedData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedName", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          Success: true,
          FeedArgs: {},
          FeedData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedArgs", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          Success: true,
          FeedName: "FEED_NAME",
          FeedData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedData", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          Success: true,
          FeedName: "FEED_NAME",
          FeedArgs: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          Success: true,
          FeedName: "FEED_NAME",
          FeedArgs: {},
          FeedData: {},
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "INVALID",
          Success: true,
          FeedName: "FEED_NAME",
          FeedArgs: {},
          FeedData: {},
        }),
      ).toBe("MessageType > Not 'FeedOpenResponse'.");
    });

    it("should return invalid if invalid Success", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          Success: false,
          FeedName: "FEED_NAME",
          FeedArgs: {},
          FeedData: {},
        }),
      ).toBe("Success > Not true.");
    });

    it("should return invalid if invalid FeedName", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          Success: true,
          FeedName: 123,
          FeedArgs: {},
          FeedData: {},
        }),
      ).toBe("FeedName > Not a string.");
    });

    it("should return invalid if invalid FeedArgs", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          Success: true,
          FeedName: "FEED_NAME",
          FeedArgs: "INVALID",
          FeedData: {},
        }),
      ).toBe("FeedArgs > Not an object.");
    });

    it("should return invalid if JSON-expressibility check is default and FeedData is not a JSON-expressible object", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          Success: true,
          FeedName: "FEED_NAME",
          FeedArgs: {},
          FeedData: { Data: undefined },
        }),
      ).toBe("FeedData > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and FeedData is not a JSON-expressible object", () => {
      expect(
        vFeedOpenResponseSuccess(
          {
            MessageType: "FeedOpenResponse",
            Success: true,
            FeedName: "FEED_NAME",
            FeedArgs: {},
            FeedData: { Data: undefined },
          },
          true,
        ),
      ).toBe("FeedData > Not JSON-expressible.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if JSON-expressiblity check is default and FeedData is a JSON-expressible object", () => {
      expect(
        vFeedOpenResponseSuccess({
          MessageType: "FeedOpenResponse",
          Success: true,
          FeedName: "FEED_NAME",
          FeedArgs: {},
          FeedData: { Feed: "Data" },
        }),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and FeedData is a JSON-expressible object", () => {
      expect(
        vFeedOpenResponseSuccess(
          {
            MessageType: "FeedOpenResponse",
            Success: true,
            FeedName: "FEED_NAME",
            FeedArgs: {},
            FeedData: { Feed: "Data" },
          },
          true,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and FeedData is a JSON-expressible object", () => {
      expect(
        vFeedOpenResponseSuccess(
          {
            MessageType: "FeedOpenResponse",
            Success: true,
            FeedName: "FEED_NAME",
            FeedArgs: {},
            FeedData: { Feed: "Data" },
          },
          false,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and FeedData is not a JSON-expressible object", () => {
      expect(
        vFeedOpenResponseSuccess(
          {
            MessageType: "FeedOpenResponse",
            Success: true,
            FeedName: "FEED_NAME",
            FeedArgs: {},
            FeedData: { Data: undefined },
          },
          false,
        ),
      ).toBe("");
    });
  });
});
