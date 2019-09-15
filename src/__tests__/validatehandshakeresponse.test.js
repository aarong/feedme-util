import validateHandshakeResponse from "../validatehandshakeresponse";

/* global expect:false, it:false, describe: false */

describe("The validateHandshakeResponse.check() function", () => {
  it("should throw on schema validation", () => {
    expect(() => {
      validateHandshakeResponse.check({ MessageType: "HandshakeResponse" });
    }).toThrow(new Error("INVALID: Schema validation failed."));
  });

  it("should succeed on valid message", () => {
    expect(
      validateHandshakeResponse.check({
        MessageType: "HandshakeResponse",
        Success: false
      })
    ).toBe(undefined);
  });
});
