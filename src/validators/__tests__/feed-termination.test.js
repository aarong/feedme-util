import vFeedTermination from "../feed-termination";

describe("The feed-termination validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedTermination("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vFeedTermination({
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedName", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing FeedArgs", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedName: "FEED_NAME",
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing ErrorCode", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing ErrorData", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vFeedTermination({
          MessageType: "INVALID",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
        }),
      ).toBe("MessageType > Not 'FeedTermination'.");
    });

    it("should return invalid if invalid FeedName", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedName: 123,
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
        }),
      ).toBe("FeedName > Not a string.");
    });

    it("should return invalid if invalid FeedArgs", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedName: "FEED_NAME",
          FeedArgs: "INVALID",
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
        }),
      ).toBe("FeedArgs > Not an object.");
    });

    it("should return invalid if invalid ErrorCode", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: 123,
          ErrorData: {},
        }),
      ).toBe("ErrorCode > Not a string.");
    });

    it("should return invalid if JSON-expressibility check is default and ErrorData is not a JSON-expressible object", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: { Data: undefined },
        }),
      ).toBe("ErrorData > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and ErrorData is not a JSON-expressible object", () => {
      expect(
        vFeedTermination(
          {
            MessageType: "FeedTermination",
            FeedName: "FEED_NAME",
            FeedArgs: {},
            ErrorCode: "ERROR_CODE",
            ErrorData: { Data: undefined },
          },
          true,
        ),
      ).toBe("ErrorData > Not JSON-expressible.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if JSON-expressiblity check is default and ErrorData is a JSON-expressible object", () => {
      expect(
        vFeedTermination({
          MessageType: "FeedTermination",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: { Error: "Data" },
        }),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and ErrorData is a JSON-expressible object", () => {
      expect(
        vFeedTermination(
          {
            MessageType: "FeedTermination",
            FeedName: "FEED_NAME",
            FeedArgs: {},
            ErrorCode: "ERROR_CODE",
            ErrorData: { Error: "Data" },
          },
          true,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and ErrorData is a JSON-expressible object", () => {
      expect(
        vFeedTermination(
          {
            MessageType: "FeedTermination",
            FeedName: "FEED_NAME",
            FeedArgs: {},
            ErrorCode: "ERROR_CODE",
            ErrorData: { Error: "Data" },
          },
          false,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and ErrorData is not a JSON-expressible object", () => {
      expect(
        vFeedTermination(
          {
            MessageType: "FeedTermination",
            FeedName: "FEED_NAME",
            FeedArgs: {},
            ErrorCode: "ERROR_CODE",
            ErrorData: { Data: undefined },
          },
          false,
        ),
      ).toBe("");
    });
  });
});
