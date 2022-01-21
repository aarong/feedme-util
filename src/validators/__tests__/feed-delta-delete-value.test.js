import vFeedDeltaDeleteValue from "../feed-delta-delete-value";

describe("The feed-delta-delete-value validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaDeleteValue("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaDeleteValue({
          Path: [],
          Value: "VALUE"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaDeleteValue({
          Operation: "DeleteValue",
          Value: "VALUE"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaDeleteValue({
          Operation: "DeleteValue",
          Path: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaDeleteValue({
          Operation: "DeleteValue",
          Path: [],
          Value: "VALUE",
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaDeleteValue({
          Operation: "INVALID",
          Path: [],
          Value: "VALUE"
        })
      ).toBe("Operation > Not 'DeleteValue'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaDeleteValue({
          Operation: "DeleteValue",
          Path: "INVALID",
          Value: "VALUE"
        })
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if JSON-expressibility check is default and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaDeleteValue({
          Operation: "DeleteValue",
          Path: [],
          Value: undefined
        })
      ).toBe("Value > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaDeleteValue(
          {
            Operation: "DeleteValue",
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
        vFeedDeltaDeleteValue({
          Operation: "DeleteValue",
          Path: [],
          Value: "VALUE"
        })
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaDeleteValue(
          {
            Operation: "DeleteValue",
            Path: [],
            Value: "VALUE"
          },
          true
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is a JSON-expressible object", () => {
      expect(
        vFeedDeltaDeleteValue(
          {
            Operation: "DeleteValue",
            Path: [],
            Value: "VALUE"
          },
          false
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Value is not a JSON-expressible object", () => {
      expect(
        vFeedDeltaDeleteValue(
          {
            Operation: "DeleteValue",
            Path: [],
            Value: undefined
          },
          false
        )
      ).toBe("");
    });
  });
});
