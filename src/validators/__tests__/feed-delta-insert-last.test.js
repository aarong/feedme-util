import vFeedDeltaInsertLast from "../feed-delta-insert-last";

describe("The feed-delta-insert-last validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaInsertLast("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaInsertLast({
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaInsertLast({
          Operation: "InsertLast",
          Value: "VALUE",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaInsertLast({
          Operation: "InsertLast",
          Path: [],
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaInsertLast({
          Operation: "InsertLast",
          Path: [],
          Value: "VALUE",
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaInsertLast({
          Operation: "INVALID",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("Operation > Not 'InsertLast'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaInsertLast({
          Operation: "InsertLast",
          Path: "INVALID",
          Value: "VALUE",
        }),
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if JSON-expressibility check is default and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertLast({
          Operation: "InsertLast",
          Path: [],
          Value: undefined,
        }),
      ).toBe("Value > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertLast(
          {
            Operation: "InsertLast",
            Path: [],
            Value: undefined,
          },
          true,
        ),
      ).toBe("Value > Not JSON-expressible.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if JSON-expressiblity check is default and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertLast({
          Operation: "InsertLast",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertLast(
          {
            Operation: "InsertLast",
            Path: [],
            Value: "VALUE",
          },
          true,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertLast(
          {
            Operation: "InsertLast",
            Path: [],
            Value: "VALUE",
          },
          false,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertLast(
          {
            Operation: "InsertLast",
            Path: [],
            Value: undefined,
          },
          false,
        ),
      ).toBe("");
    });
  });
});
