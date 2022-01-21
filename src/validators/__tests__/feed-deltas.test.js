import vFeedDeltas from "../feed-deltas";

describe("The feed-deltas validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an array", () => {
      expect(vFeedDeltas({})).toBe("Not an array.");
    });

    it("should return invalid if invalid delta - first", () => {
      expect(vFeedDeltas(["INVALID"])).toBe("Element 0 > Not an object.");
    });

    it("should return invalid if invalid delta - not first", () => {
      expect(vFeedDeltas([{ Operation: "Delete", Path: [] }, "INVALID"])).toBe(
        "Element 1 > Not an object."
      );
    });
  });

  describe("can return valid", () => {
    it("should return valid if empty", () => {
      expect(vFeedDeltas([])).toBe("");
    });

    it("should return valid if populated - one delta", () => {
      expect(vFeedDeltas([{ Operation: "Delete", Path: [] }])).toBe("");
    });

    it("should return valid if populated - multiple deltas", () => {
      expect(
        vFeedDeltas([
          { Operation: "Delete", Path: [] },
          { Operation: "Delete", Path: [] }
        ])
      ).toBe("");
    });
  });
});
