import vFeedDeltaSet from "../feed-delta-set";

describe("The feed-delta-set validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaSet("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaSet({
          Path: [],
          Value: "VALUE"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaSet({
          Operation: "Set",
          Value: "VALUE"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaSet({
          Operation: "Set",
          Path: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaSet({
          Operation: "Set",
          Path: [],
          Value: "VALUE",
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaSet({
          Operation: "INVALID",
          Path: [],
          Value: "VALUE"
        })
      ).toBe("Operation > Not 'Set'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaSet({
          Operation: "Set",
          Path: "INVALID",
          Value: "VALUE"
        })
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if JSON-expressibility check is default and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaSet({
          Operation: "Set",
          Path: [],
          Value: undefined
        })
      ).toBe("Value > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaSet(
          {
            Operation: "Set",
            Path: [],
            Value: undefined
          },
          true
        )
      ).toBe("Value > Not JSON-expressible.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if JSON-expressiblity check is default and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaSet({
          Operation: "Set",
          Path: [],
          Value: "VALUE"
        })
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaSet(
          {
            Operation: "Set",
            Path: [],
            Value: "VALUE"
          },
          true
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaSet(
          {
            Operation: "Set",
            Path: [],
            Value: "VALUE"
          },
          false
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaSet(
          {
            Operation: "Set",
            Path: [],
            Value: undefined
          },
          false
        )
      ).toBe("");
    });
  });
});
