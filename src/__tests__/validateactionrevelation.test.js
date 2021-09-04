import validateActionRevelation from "../validateactionrevelation";

describe("The validateActionRevelation.check() function", () => {
  it("should throw on invalid type", () => {
    expect(() => {
      validateActionRevelation.check(123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid MessageType", () => {
    expect(() => {
      validateActionRevelation.check({ MessageType: "junk" });
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid checkJsonExpressible", () => {
    expect(() => {
      validateActionRevelation.check({ MessageType: "ActionRevelation" }, 123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Invalid checkJsonExpressible argument.")
    );
  });

  it("should throw on schema violation", () => {
    // Throw on non-object
    expect(() => {
      validateActionRevelation.check({ MessageType: "ActionRevelation" }, true);
    }).toThrow(new Error("INVALID_MESSAGE: Schema validation failed."));
  });

  describe("if not checking JSON-expressibility", () => {
    it("should return success if JSON-expressible", () => {
      expect(
        validateActionRevelation.check(
          {
            MessageType: "ActionRevelation",
            ActionName: "some_action",
            ActionData: { action: "data" },
            FeedName: "some_feed",
            FeedArgs: { feed: "arg" },
            FeedDeltas: [
              { Operation: "Set", Path: [], Value: { some: "thing" } }
            ],
            FeedMd5: "123456789012345678901234"
          },
          false
        )
      ).toBe(undefined);
    });

    it("should return success if action data not JSON-expressible", () => {
      expect(
        validateActionRevelation.check(
          {
            MessageType: "ActionRevelation",
            ActionName: "some_action",
            ActionData: { action: undefined },
            FeedName: "some_feed",
            FeedArgs: { feed: "arg" },
            FeedDeltas: [
              { Operation: "Set", Path: [], Value: { some: "thing" } }
            ],
            FeedMd5: "123456789012345678901234"
          },
          false
        )
      ).toBe(undefined);
    });

    it("should return success if delta operation value is not JSON-expressible", () => {
      expect(
        validateActionRevelation.check(
          {
            MessageType: "ActionRevelation",
            ActionName: "some_action",
            ActionData: { action: "data" },
            FeedName: "some_feed",
            FeedArgs: { feed: "arg" },
            FeedDeltas: [
              { Operation: "Set", Path: [], Value: { some: undefined } }
            ],
            FeedMd5: "123456789012345678901234"
          },
          false
        )
      ).toBe(undefined);
    });
  });

  describe("if checking JSON-expressibility", () => {
    it("should return success if JSON-expressible", () => {
      expect(
        validateActionRevelation.check(
          {
            MessageType: "ActionRevelation",
            ActionName: "some_action",
            ActionData: { action: "data" },
            FeedName: "some_feed",
            FeedArgs: { feed: "arg" },
            FeedDeltas: [
              { Operation: "Set", Path: [], Value: { some: "thing" } }
            ],
            FeedMd5: "123456789012345678901234"
          },
          true
        )
      ).toBe(undefined);
    });

    it("should throw if action data not JSON-expressible", () => {
      expect(() => {
        validateActionRevelation.check(
          {
            MessageType: "ActionRevelation",
            ActionName: "some_action",
            ActionData: { action: undefined },
            FeedName: "some_feed",
            FeedArgs: { feed: "arg" },
            FeedDeltas: [
              { Operation: "Set", Path: [], Value: { some: "thing" } }
            ],
            FeedMd5: "123456789012345678901234"
          },
          true
        );
      }).toThrow(
        new Error("INVALID_MESSAGE: Action data is not JSON-expressible.")
      );
    });

    it("should throw if delta operation value is not JSON-expressible", () => {
      expect(() => {
        validateActionRevelation.check(
          {
            MessageType: "ActionRevelation",
            ActionName: "some_action",
            ActionData: { action: "data" },
            FeedName: "some_feed",
            FeedArgs: { feed: "arg" },
            FeedDeltas: [
              { Operation: "Set", Path: [], Value: { some: undefined } }
            ],
            FeedMd5: "123456789012345678901234"
          },
          true
        );
      }).toThrow(new Error("INVALID_MESSAGE: Invalid delta."));
    });
  });
});
