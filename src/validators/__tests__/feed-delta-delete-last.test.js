import vFeedDeltaDeleteLast from "../feed-delta-delete-last";

describe("The feed-delta-delete-last validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaDeleteLast("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaDeleteLast({
          Path: []
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaDeleteLast({
          Operation: "DeleteLast"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaDeleteLast({
          Operation: "DeleteLast",
          Path: [],
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaDeleteLast({
          Operation: "INVALID",
          Path: []
        })
      ).toBe("Operation > Not 'DeleteLast'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaDeleteLast({
          Operation: "DeleteLast",
          Path: "INVALID"
        })
      ).toBe("Path > Not an array.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if delta is valid", () => {
      expect(
        vFeedDeltaDeleteLast({
          Operation: "DeleteLast",
          Path: []
        })
      ).toBe("");
    });
  });
});
