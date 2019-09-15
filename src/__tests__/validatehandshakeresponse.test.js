import validateHandshakeResponse from "../validatehandshakeresponse";

/* global expect:false, it:false, describe: false */

describe("The validateHandshakeResponse.check() function", () => {
  it("should throw on invalid type", () => {
    expect(() => {
      validateHandshakeResponse.check(123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid MessageType", () => {
    expect(() => {
      validateHandshakeResponse.check({ MessageType: "junk" });
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on schema validation", () => {
    expect(() => {
      validateHandshakeResponse.check({ MessageType: "HandshakeResponse" });
    }).toThrow(new Error("INVALID_MESSAGE: Schema validation failed."));
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
