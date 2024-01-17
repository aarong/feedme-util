import vFeedDeltaAppend from "../feed-delta-append";

describe("The feed-delta-append validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaAppend("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaAppend({
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaAppend({
          Operation: "Append",
          Value: "VALUE",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaAppend({
          Operation: "Append",
          Path: [],
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaAppend({
          Operation: "Append",
          Path: [],
          Value: "VALUE",
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaAppend({
          Operation: "INVALID",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("Operation > Not 'Append'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaAppend({
          Operation: "Append",
          Path: "INVALID",
          Value: "VALUE",
        }),
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if invalid Value", () => {
      expect(
        vFeedDeltaAppend({
          Operation: "Append",
          Path: [],
          Value: 123,
        }),
      ).toBe("Value > Not a string.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if delta is valid", () => {
      expect(
        vFeedDeltaAppend({
          Operation: "Append",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });
  });
});
