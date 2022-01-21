import vFeedDeltaPath from "../feed-delta-path";

describe("The feed-delta-path validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an array", () => {
      expect(vFeedDeltaPath(123)).toBe("Not an array.");
    });

    it("should return invalid if array contains invalid element type - first", () => {
      expect(vFeedDeltaPath([false])).toBe(
        "Element 0 > Not a string or non-negative integer."
      );
    });

    it("should return invalid if array contains invalid element type - not first", () => {
      expect(vFeedDeltaPath(["VAL", false])).toBe(
        "Element 1 > Not a string or non-negative integer."
      );
    });

    it("should return invalid if array contains negative integer element", () => {
      expect(vFeedDeltaPath([-1])).toBe(
        "Element 0 > Not a string or non-negative integer."
      );
    });

    it("should return invalid if array contains decimal number element", () => {
      expect(vFeedDeltaPath([1.5])).toBe(
        "Element 0 > Not a string or non-negative integer."
      );
    });
  });

  describe("could return valid", () => {
    it("should return valid if empty", () => {
      expect(vFeedDeltaPath([])).toBe("");
    });

    it("should return valid if one string element", () => {
      expect(vFeedDeltaPath(["VAL"])).toBe("");
    });

    it("should return valid if one numeric element", () => {
      expect(vFeedDeltaPath([0])).toBe("");
    });

    it("should return valid if mixed element types", () => {
      expect(vFeedDeltaPath(["VAL", 0])).toBe("");
    });
  });
});
