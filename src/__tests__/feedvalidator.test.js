import feedValidator from "../feedvalidator";

/* global expect:false, describe:false, it:false */

describe("the .validate() function", () => {
  it("should throw if feed name is invalid", () => {
    expect(() => {
      feedValidator.validate(1, {});
    }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed name."));
  });

  it("should throw if feed args type is invalid", () => {
    expect(() => {
      feedValidator.validate("someFeed", 1);
    }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed arguments object."));
  });

  it("should throw if feed arg value type is invalid", () => {
    expect(() => {
      feedValidator.validate("someFeed", { arg: 1 });
    }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed arguments object."));
  });

  it("should return correctly", () => {
    expect(feedValidator.validate("myFeed", {})).toBe(undefined);
    expect(feedValidator.validate("myFeed", { arg: "val" })).toBe(undefined);
    expect(
      feedValidator.validate("myFeed", { arg2: "val2", arg1: "val1" })
    ).toBe(undefined);
  });
});
