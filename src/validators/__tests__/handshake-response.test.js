import vHandshakeResponse from "../handshake-response";

describe("The handshake-response validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vHandshakeResponse("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing HandshakeResponse", () => {
      expect(
        vHandshakeResponse({
          Success: true,
        }),
      ).toBe("MessageType > Missing or not 'HandshakeResponse'.");
    });

    it("should return invalid if missing Success", () => {
      expect(
        vHandshakeResponse({
          MessageType: "HandshakeResponse",
        }),
      ).toBe("Success > Missing or not boolean.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vHandshakeResponse({
          MessageType: "INVALID",
          Success: true,
        }),
      ).toBe("MessageType > Missing or not 'HandshakeResponse'.");
    });

    it("should return invalid if invalid Success", () => {
      expect(
        vHandshakeResponse({
          MessageType: "HandshakeResponse",
          Success: "INVALID",
        }),
      ).toBe("Success > Missing or not boolean.");
    });

    it("should return invalid if invalid HandshakeResponse success message", () => {
      expect(
        vHandshakeResponse({
          MessageType: "HandshakeResponse",
          Success: true,
        }),
      ).toBe("(Success) Missing or extraneous property.");
    });

    it("should return invalid if invalid HandshakeResponse failure message", () => {
      expect(
        vHandshakeResponse({
          MessageType: "HandshakeResponse",
          Success: false,
          Extraneous: "INVALID",
        }),
      ).toBe("(Failure) Missing or extraneous property.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is a valid HandshakeResponse success", () => {
      expect(
        vHandshakeResponse({
          MessageType: "HandshakeResponse",
          Success: true,
          Version: "0.1",
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid HandshakeResponse failure", () => {
      expect(
        vHandshakeResponse({
          MessageType: "HandshakeResponse",
          Success: false,
        }),
      ).toBe("");
    });
  });
});
