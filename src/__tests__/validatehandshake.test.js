import validateHandshake from "../validatehandshake";

describe("The validateHandshake.check() function", () => {
  it("should throw on invalid type", () => {
    expect(() => {
      validateHandshake.check(123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid MessageType", () => {
    expect(() => {
      validateHandshake.check({ MessageType: "junk" });
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on schema violation", () => {
    expect(() => {
      validateHandshake.check({ MessageType: "Handshake" });
    }).toThrow(new Error("INVALID_MESSAGE: Schema validation failed."));
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
