import vFeedDeltaInsertBefore from "../feed-delta-insert-before";

describe("The feed-delta-insert-before validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaInsertBefore("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaInsertBefore({
          Path: [],
          Value: "VALUE"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaInsertBefore({
          Operation: "InsertBefore",
          Value: "VALUE"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaInsertBefore({
          Operation: "InsertBefore",
          Path: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaInsertBefore({
          Operation: "InsertBefore",
          Path: [],
          Value: "VALUE",
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaInsertBefore({
          Operation: "INVALID",
          Path: [],
          Value: "VALUE"
        })
      ).toBe("Operation > Not 'InsertBefore'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaInsertBefore({
          Operation: "InsertBefore",
          Path: "INVALID",
          Value: "VALUE"
        })
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if JSON-expressibility check is default and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertBefore({
          Operation: "InsertBefore",
          Path: [],
          Value: undefined
        })
      ).toBe("Value > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertBefore(
          {
            Operation: "InsertBefore",
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
        vFeedDeltaInsertBefore({
          Operation: "InsertBefore",
          Path: [],
          Value: "VALUE"
        })
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertBefore(
          {
            Operation: "InsertBefore",
            Path: [],
            Value: "VALUE"
          },
          true
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertBefore(
          {
            Operation: "InsertBefore",
            Path: [],
            Value: "VALUE"
          },
          false
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertBefore(
          {
            Operation: "InsertBefore",
            Path: [],
            Value: undefined
          },
          false
        )
      ).toBe("");
    });
  });
});
