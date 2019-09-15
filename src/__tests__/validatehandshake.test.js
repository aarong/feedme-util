import validateHandshake from "../validatehandshake";

/* global expect:false, it:false, describe: false */

describe("The validateHandshake.check() function", () => {
  it("should throw on schema violation", () => {
    expect(() => {
      validateHandshake.check({ MessageType: "Handshake" });
    }).toThrow(new Error("INVALID: Schema validation failed."));
  });

  it("should succeed on valid message", () => {
    expect(
      validateHandshake.check({
        MessageType: "Handshake",
        Versions: ["0.1"]
      })
    ).toBe(undefined);
  });
});
