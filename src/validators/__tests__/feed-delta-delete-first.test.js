import vFeedDeltaDeleteFirst from "../feed-delta-delete-first";

describe("The feed-delta-delete-first validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDeltaDeleteFirst("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(
        vFeedDeltaDeleteFirst({
          Path: [],
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Path", () => {
      expect(
        vFeedDeltaDeleteFirst({
          Operation: "DeleteFirst",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vFeedDeltaDeleteFirst({
          Operation: "DeleteFirst",
          Path: [],
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDeltaDeleteFirst({
          Operation: "INVALID",
          Path: [],
        }),
      ).toBe("Operation > Not 'DeleteFirst'.");
    });

    it("should return invalid if invalid Path", () => {
      expect(
        vFeedDeltaDeleteFirst({
          Operation: "DeleteFirst",
          Path: "INVALID",
        }),
      ).toBe("Path > Not an array.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if delta is valid", () => {
      expect(
        vFeedDeltaDeleteFirst({
          Operation: "DeleteFirst",
          Path: [],
        }),
      ).toBe("");
    });
  });
});
