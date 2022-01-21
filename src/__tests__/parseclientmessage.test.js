import parseClientMessage from "../parseclientmessage";

describe("The parseClientMessage() function", () => {
  it("should throw if argument is not string", () => {
    expect(() => {
      parseClientMessage(123);
    }).toThrow(new Error("INVALID_ARGUMENT: Message argument not a string."));
  });

  it("should return invalid if JSON parsing fails", () => {
    expect(parseClientMessage("{")).toEqual({
      valid: false,
      errorMessage: "Invalid JSON."
    });
  });

  it("should return invalid if the parsed JSON value is not a valid message", () => {
    expect(parseClientMessage("{}")).toEqual({
      valid: false,
      errorMessage: "MessageType > Missing or invalid."
    });
  });

  it("should return valid if the parsed JSON value is a valid message", () => {
    const result = parseClientMessage(
      JSON.stringify({
        MessageType: "Handshake",
        Versions: ["0.1"]
      })
    );
    expect(result.valid).toBe(true);
    expect(result.message).toEqual({
      MessageType: "Handshake",
      Versions: ["0.1"]
    });
  });
});
