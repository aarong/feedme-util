import vFeedDeltaDelete from "../feed-delta-delete";

describe("The feed-delta-delete validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaDelete("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaDelete({
          Path: [],
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaDelete({
          Operation: "Delete",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaDelete({
          Operation: "Delete",
          Path: [],
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaDelete({
          Operation: "INVALID",
          Path: [],
        }),
      ).toBe("Operation > Not 'Delete'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaDelete({
          Operation: "Delete",
          Path: "INVALID",
        }),
      ).toBe("Path > Not an array.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if delta is valid", () => {
      expect(
        vFeedDeltaDelete({
          Operation: "Delete",
          Path: [],
        }),
      ).toBe("");
    });
  });
});
