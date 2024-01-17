import vFeedDeltaDecrement from "../feed-delta-decrement";

describe("The feed-delta-decrement validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaDecrement("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaDecrement({
          Path: [],
          Value: 1,
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaDecrement({
          Operation: "Decrement",
          Value: 1,
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaDecrement({
          Operation: "Decrement",
          Path: [],
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaDecrement({
          Operation: "Decrement",
          Path: [],
          Value: 1,
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaDecrement({
          Operation: "INVALID",
          Path: [],
          Value: 1,
        }),
      ).toBe("Operation > Not 'Decrement'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaDecrement({
          Operation: "Decrement",
          Path: "INVALID",
          Value: 1,
        }),
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if invalid Value", () => {
      expect(
        vFeedDeltaDecrement({
          Operation: "Decrement",
          Path: [],
          Value: "INVALID",
        }),
      ).toBe("Value > Not a number.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if delta is valid", () => {
      expect(
        vFeedDeltaDecrement({
          Operation: "Decrement",
          Path: [],
          Value: 1,
        }),
      ).toBe("");
    });
  });
});
