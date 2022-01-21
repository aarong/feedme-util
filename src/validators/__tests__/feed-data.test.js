import vFeedData from "../feed-data";

describe("The feed-data validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedData("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if JSON expressiblity check is default and value is not a JSON-expressible object", () => {
      expect(vFeedData({ Data: undefined })).toBe("Not JSON-expressible.");
    });

    it("should return invalid if JSON expressiblity check is explicitly enabled and value is not a JSON-expressible object", () => {
      expect(vFeedData({ Data: undefined }, true)).toBe(
        "Not JSON-expressible."
      );
    });
  });

  describe("could return valid", () => {
    it("should return valid if JSON expressiblity check is default and value is a JSON-expressible object", () => {
      expect(vFeedData({ Feed: "Data" })).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly enabled and value is a JSON-expressible object", () => {
      expect(vFeedData({ Feed: "Data" }, true)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vFeedData({ Feed: "Data" }, false)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vFeedData({ Data: undefined }, false)).toBe("");
    });
  });
});
