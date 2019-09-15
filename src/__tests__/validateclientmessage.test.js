import validateClientMessage from "../validateclientmessage";

/* global expect:false, it:false, describe: false */

describe("The validateClientMessage() function", () => {
  it("should throw on non-object", () => {
    expect(() => {
      validateClientMessage.check(123);
    }).toThrow(new Error("INVALID: Not an object."));
  });

  it("should throw on missing MessageType", () => {
    expect(() => {
      validateClientMessage.check({});
    }).toThrow(new Error("INVALID: Invalid MessageType."));
  });

  it("should throw on invalid MessageType type", () => {
    expect(() => {
      validateClientMessage.check({ MessageType: 123 });
    }).toThrow(new Error("INVALID: Invalid MessageType."));
  });

  it("should throw on invalid MessageType string", () => {
    expect(() => {
      validateClientMessage.check({ MessageType: "junk" });
    }).toThrow(new Error("INVALID: Invalid MessageType."));
  });

  it("should succeed on Handshake message type", () => {
    expect(validateClientMessage.check({ MessageType: "Handshake" })).toBe(
      undefined
    );
  });

  it("should succeed on Action message type", () => {
    expect(validateClientMessage.check({ MessageType: "Action" })).toBe(
      undefined
    );
  });

  it("should succeed on FeedOpen message type", () => {
    expect(validateClientMessage.check({ MessageType: "FeedOpen" })).toBe(
      undefined
    );
  });

  it("should succeed on FeedClose message type", () => {
    expect(validateClientMessage.check({ MessageType: "FeedClose" })).toBe(
      undefined
    );
  });
});
