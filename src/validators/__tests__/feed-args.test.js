import vFeedArgs from "../feed-args";

describe("The feed-args validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedArgs("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if the sole argument is invalid", () => {
      expect(vFeedArgs({ Arg: 123 })).toBe(
        "One or more properties is not a string."
      );
    });

    it("should return invalid if one of multiple arguments is invalid", () => {
      expect(vFeedArgs({ Arg1: "OK", Arg2: 123 })).toBe(
        "One or more properties is not a string."
      );
    });
  });

  describe("could return valid", () => {
    it("should return valid for no arguments", () => {
      expect(vFeedArgs({})).toBe("");
    });

    it("should return valid for one valid argument", () => {
      expect(vFeedArgs({ Arg1: "OK" })).toBe("");
    });

    it("should return valid for two valid arguments", () => {
      expect(vFeedArgs({ Arg1: "OK", Arg2: "OK" })).toBe("");
    });
  });
});
