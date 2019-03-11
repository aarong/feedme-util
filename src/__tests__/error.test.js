import jestExtender from "../jestextender";
import error from "../error";

jestExtender.extend(expect);

/* global expect:false, describe:false, it:false */

describe("The error() function", () => {
  it("should return an Error object", () => {
    expect(error("NAME", "Message")).toBeInstanceOf(Error);
  });
  it("should have the correct name and message", () => {
    expect(error("NAME", "Message")).toBeCustom("NAME", "Message");
  });
});
