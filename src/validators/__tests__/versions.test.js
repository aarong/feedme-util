import vVersions from "../versions";

describe("The versions validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an array", () => {
      expect(vVersions("INVALID")).toBe("Not an array.");
    });

    it("should return invalid if value is an empty array", () => {
      expect(vVersions([])).toBe("Empty array.");
    });

    it("should return invalid if the first version is invalid", () => {
      expect(vVersions([123])).toBe("Element 0 > Not a string.");
    });

    it("should return invalid if a subsequent version is invalid", () => {
      expect(vVersions(["0.1", 123])).toBe("Element 1 > Not a string.");
    });
  });

  describe("could return valid", () => {
    it("should return valid for one valid version", () => {
      expect(vVersions(["0.1"])).toBe("");
    });

    it("should return valid for multiple valid versions", () => {
      expect(vVersions(["0.1", "0.2"])).toBe("");
    });
  });
});
