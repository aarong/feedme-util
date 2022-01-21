import vHandshakeResponseFailure from "../handshake-response-failure";

describe("The handshake-response-failure validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vHandshakeResponseFailure("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vHandshakeResponseFailure({
          Success: false
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Success", () => {
      expect(
        vHandshakeResponseFailure({
          MessageType: "HandshakeResponse"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vHandshakeResponseFailure({
          MessageType: "HandshakeResponse",
          Success: false,
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vHandshakeResponseFailure({
          MessageType: "INVALID",
          Success: false
        })
      ).toBe("MessageType > Not 'HandshakeResponse'.");
    });

    it("should return invalid if invalid Success", () => {
      expect(
        vHandshakeResponseFailure({
          MessageType: "HandshakeResponse",
          Success: true
        })
      ).toBe("Success > Not false.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is valid", () => {
      expect(
        vHandshakeResponseFailure({
          MessageType: "HandshakeResponse",
          Success: false
        })
      ).toBe("");
    });
  });
});
