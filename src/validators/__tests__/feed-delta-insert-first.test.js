import vFeedDeltaInsertFirst from "../feed-delta-insert-first";

describe("The feed-delta-insert-first validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaInsertFirst("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaInsertFirst({
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaInsertFirst({
          Operation: "InsertFirst",
          Value: "VALUE",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaInsertFirst({
          Operation: "InsertFirst",
          Path: [],
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaInsertFirst({
          Operation: "InsertFirst",
          Path: [],
          Value: "VALUE",
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaInsertFirst({
          Operation: "INVALID",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("Operation > Not 'InsertFirst'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaInsertFirst({
          Operation: "InsertFirst",
          Path: "INVALID",
          Value: "VALUE",
        }),
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if JSON-expressibility check is default and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertFirst({
          Operation: "InsertFirst",
          Path: [],
          Value: undefined,
        }),
      ).toBe("Value > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertFirst(
          {
            Operation: "InsertFirst",
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
        vFeedDeltaInsertFirst({
          Operation: "InsertFirst",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertFirst(
          {
            Operation: "InsertFirst",
            Path: [],
            Value: "VALUE",
          },
          true,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertFirst(
          {
            Operation: "InsertFirst",
            Path: [],
            Value: "VALUE",
          },
          false,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaInsertFirst(
          {
            Operation: "InsertFirst",
            Path: [],
            Value: undefined,
          },
          false,
        ),
      ).toBe("");
    });
  });
});
