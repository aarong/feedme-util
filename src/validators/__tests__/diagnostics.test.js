import vDiagnostics from "../diagnostics";

describe("The diagnostics validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vDiagnostics("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if JSON expressiblity check is default and value is not a JSON-expressible object", () => {
      expect(vDiagnostics({ Arg: undefined })).toBe("Not JSON-expressible.");
    });

    it("should return invalid if JSON expressiblity check is explicitly enabled and value is not a JSON-expressible object", () => {
      expect(vDiagnostics({ Arg: undefined }, true)).toBe(
        "Not JSON-expressible.",
      );
    });
  });

  describe("could return valid", () => {
    it("should return valid if JSON expressiblity check is default and value is a JSON-expressible object", () => {
      expect(vDiagnostics({ Action: "Args" })).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly enabled and value is a JSON-expressible object", () => {
      expect(vDiagnostics({ Action: "Args" }, true)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vDiagnostics({ Action: "Args" }, false)).toBe("");
    });

    it("should return valid if JSON expressiblity check is explicitly disabled and value is a JSON-expressible object", () => {
      expect(vDiagnostics({ Arg: undefined }, false)).toBe("");
    });
  });
});
