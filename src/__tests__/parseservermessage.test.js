import parseServerMessage from "../parseservermessage";

describe("The parseServerMessage() function", () => {
  it("should throw if argument is not string", () => {
    expect(() => {
      parseServerMessage(123);
    }).toThrow(new Error("INVALID_ARGUMENT: Message argument not a string."));
  });

  it("should return invalid if JSON parsing fails", () => {
    expect(parseServerMessage("{")).toEqual({
      valid: false,
      errorMessage: "Invalid JSON."
    });
  });

  it("should return invalid if the parsed JSON value is not a valid message", () => {
    expect(parseServerMessage("{}")).toEqual({
      valid: false,
      errorMessage: "MessageType > Missing or invalid."
    });
  });

  it("should return valid if the parsed JSON value is a valid message", () => {
    const result = parseServerMessage(
      JSON.stringify({
        MessageType: "ViolationResponse",
        Diagnostics: {}
      })
    );
    expect(result.valid).toBe(true);
    expect(result.message).toEqual({
      MessageType: "ViolationResponse",
      Diagnostics: {}
    });
  });
});
