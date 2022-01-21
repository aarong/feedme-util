import vErrorData from "../error-data";

describe("The error-data validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vErrorData("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if JSON expressiblity check is default and value is not a JSON-expressible object", () => {
      expect(vErrorData({ Data: undefined })).toBe("Not JSON-expressible.");
    });

    it("should return invalid if JSON expressiblity check is explicitly enabled and value is not a JSON-expressible object", () => {
      expect(vErrorData({ Data: undefined }, true)).toBe(
        "Not JSON-expressible."
      );
    });
  });

  describe("could return valid", () => {
    it("should return valid if JSON expressiblity check is default and value is a JSON-expressible object", () => {
      expect(vErrorData({ Error: "Data" })).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly enabled and value is a JSON-expressible object", () => {
      expect(vErrorData({ Error: "Data" }, true)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vErrorData({ Error: "Data" }, false)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vErrorData({ Data: undefined }, false)).toBe("");
    });
  });
});
