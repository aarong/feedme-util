import vFeedDeltaIncrement from "../feed-delta-increment";

describe("The feed-delta-increment validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaIncrement("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaIncrement({
          Path: [],
          Value: 1
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaIncrement({
          Operation: "Increment",
          Value: 1
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaIncrement({
          Operation: "Increment",
          Path: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaIncrement({
          Operation: "Increment",
          Path: [],
          Value: 1,
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaIncrement({
          Operation: "INVALID",
          Path: [],
          Value: 1
        })
      ).toBe("Operation > Not 'Increment'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaIncrement({
          Operation: "Increment",
          Path: "INVALID",
          Value: 1
        })
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if invalid Value", () => {
      expect(
        vFeedDeltaIncrement({
          Operation: "Increment",
          Path: [],
          Value: "INVALID"
        })
      ).toBe("Value > Not a number.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if delta is valid", () => {
      expect(
        vFeedDeltaIncrement({
          Operation: "Increment",
          Path: [],
          Value: 1
        })
      ).toBe("");
    });
  });
});
