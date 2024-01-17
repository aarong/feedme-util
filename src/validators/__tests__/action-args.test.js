import vActionArgs from "../action-args";

describe("The action-args validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vActionArgs("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if JSON expressiblity check is default and value is not a JSON-expressible object", () => {
      expect(vActionArgs({ Arg: undefined })).toBe("Not JSON-expressible.");
    });

    it("should return invalid if JSON expressiblity check is explicitly enabled and value is not a JSON-expressible object", () => {
      expect(vActionArgs({ Arg: undefined }, true)).toBe(
        "Not JSON-expressible.",
      );
    });
  });

  describe("could return valid", () => {
    it("should return valid if JSON expressiblity check is default and value is a JSON-expressible object", () => {
      expect(vActionArgs({ Action: "Args" })).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly enabled and value is a JSON-expressible object", () => {
      expect(vActionArgs({ Action: "Args" }, true)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vActionArgs({ Action: "Args" }, false)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vActionArgs({ Arg: undefined }, false)).toBe("");
    });
  });
});
