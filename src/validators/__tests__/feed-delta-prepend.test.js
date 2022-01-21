import vFeedDeltaPrepend from "../feed-delta-prepend";

describe("The feed-delta-prepend validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaPrepend("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaPrepend({
          Path: [],
          Value: "VALUE"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaPrepend({
          Operation: "Prepend",
          Value: "VALUE"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Value", () => {
      expect(
        vFeedDeltaPrepend({
          Operation: "Prepend",
          Path: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaPrepend({
          Operation: "Prepend",
          Path: [],
          Value: "VALUE",
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaPrepend({
          Operation: "INVALID",
          Path: [],
          Value: "VALUE"
        })
      ).toBe("Operation > Not 'Prepend'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaPrepend({
          Operation: "Prepend",
          Path: "INVALID",
          Value: "VALUE"
        })
      ).toBe("Path > Not an array.");
    });

    it("should return invalid if invalid Value", () => {
      expect(
        vFeedDeltaPrepend({
          Operation: "Prepend",
          Path: [],
          Value: 123
        })
      ).toBe("Value > Not a string.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if delta is valid", () => {
      expect(
        vFeedDeltaPrepend({
          Operation: "Prepend",
          Path: [],
          Value: "VALUE"
        })
      ).toBe("");
    });
  });
});
