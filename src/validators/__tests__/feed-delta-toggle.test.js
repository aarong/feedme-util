import vFeedDeltaToggle from "../feed-delta-toggle";

describe("The feed-delta-toggle validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaToggle("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaToggle({
          Path: [],
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaToggle({
          Operation: "Toggle",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaToggle({
          Operation: "Toggle",
          Path: [],
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaToggle({
          Operation: "INVALID",
          Path: [],
        }),
      ).toBe("Operation > Not 'Toggle'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaToggle({
          Operation: "Toggle",
          Path: "INVALID",
        }),
      ).toBe("Path > Not an array.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if delta is valid", () => {
      expect(
        vFeedDeltaToggle({
          Operation: "Toggle",
          Path: [],
        }),
      ).toBe("");
    });
  });
});
