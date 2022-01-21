import vActionData from "../action-data";

describe("The action-data validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vActionData("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if JSON expressiblity check is default and value is not a JSON-expressible object", () => {
      expect(vActionData({ Data: undefined })).toBe("Not JSON-expressible.");
    });

    it("should return invalid if JSON expressiblity check is explicitly enabled and value is not a JSON-expressible object", () => {
      expect(vActionData({ Data: undefined }, true)).toBe(
        "Not JSON-expressible."
      );
    });
  });

  describe("could return valid", () => {
    it("should return valid if JSON expressiblity check is default and value is a JSON-expressible object", () => {
      expect(vActionData({ Action: "Data" })).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly enabled and value is a JSON-expressible object", () => {
      expect(vActionData({ Action: "Data" }, true)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vActionData({ Action: "Data" }, false)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vActionData({ Data: undefined }, false)).toBe("");
    });
  });
});
