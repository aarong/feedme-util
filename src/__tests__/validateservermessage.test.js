import validateServerMessage from "../validateservermessage";

/* global expect:false, it:false, describe: false */

describe("The validateServerMessage.check() function", () => {
  it("should throw on non-object", () => {
    expect(() => {
      validateServerMessage.check(123);
    }).toThrow(new Error("INVALID: Not an object."));
  });

  it("should throw on missing MessageType", () => {
    expect(() => {
      validateServerMessage.check({});
    }).toThrow(new Error("INVALID: Invalid MessageType."));
  });

  it("should throw on invalid MessageType type", () => {
    expect(() => {
      validateServerMessage.check({ MessageType: 123 });
    }).toThrow(new Error("INVALID: Invalid MessageType."));
  });

  it("should throw on invalid MessageType string", () => {
    expect(() => {
      validateServerMessage.check({ MessageType: "junk" });
    }).toThrow(new Error("INVALID: Invalid MessageType."));
  });

  it("should succeed on ViolationResponse message", () => {
    expect(
      validateServerMessage.check({ MessageType: "ViolationResponse" })
    ).toBe(undefined);
  });

  it("should succeed on HandshakeResponse message", () => {
    expect(
      validateServerMessage.check({ MessageType: "HandshakeResponse" })
    ).toBe(undefined);
  });

  it("should succeed on ActionResponse message", () => {
    expect(validateServerMessage.check({ MessageType: "ActionResponse" })).toBe(
      undefined
    );
  });

  it("should succeed on FeedOpenResponse message", () => {
    expect(
      validateServerMessage.check({ MessageType: "FeedOpenResponse" })
    ).toBe(undefined);
  });

  it("should succeed on FeedCloseResponse message", () => {
    expect(
      validateServerMessage.check({ MessageType: "FeedCloseResponse" })
    ).toBe(undefined);
  });

  it("should succeed on ActionRevelation message", () => {
    expect(
      validateServerMessage.check({ MessageType: "ActionRevelation" })
    ).toBe(undefined);
  });

  it("should succeed on FeedTermination message", () => {
    expect(
      validateServerMessage.check({ MessageType: "FeedTermination" })
    ).toBe(undefined);
  });
});
