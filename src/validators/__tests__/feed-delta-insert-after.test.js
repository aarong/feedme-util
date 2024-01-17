import vFeedDeltaInsertAfter from "../feed-delta-insert-after";

describe("The feed-delta-insert-after validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaInsertAfter("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaInsertAfter({
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaInsertAfter({
          Operation: "InsertAfter",
          Value: "VALUE",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaInsertAfter({
          Operation: "InsertAfter",
          Path: [],
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaInsertAfter({
          Operation: "InsertAfter",
          Path: [],
          Value: "VALUE",
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaInsertAfter({
          Operation: "INVALID",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("Operation > Not 'InsertAfter'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaInsertAfter({
          Operation: "InsertAfter",
          Path: "INVALID",
          Value: "VALUE",
        }),
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if JSON-expressibility check is default and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertAfter({
          Operation: "InsertAfter",
          Path: [],
          Value: undefined,
        }),
      ).toBe("Value > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertAfter(
          {
            Operation: "InsertAfter",
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
        vFeedDeltaInsertAfter({
          Operation: "InsertAfter",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertAfter(
          {
            Operation: "InsertAfter",
            Path: [],
            Value: "VALUE",
          },
          true,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertAfter(
          {
            Operation: "InsertAfter",
            Path: [],
            Value: "VALUE",
          },
          false,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertAfter(
          {
            Operation: "InsertAfter",
            Path: [],
            Value: undefined,
          },
          false,
        ),
      ).toBe("");
    });
  });
});
