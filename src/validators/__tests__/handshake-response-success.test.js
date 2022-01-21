import vHandshakeResponseSuccess from "../handshake-response-success";

describe("The handshake-response-success validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vHandshakeResponseSuccess("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vHandshakeResponseSuccess({
          Success: true,
          Version: "0.1"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Success", () => {
      expect(
        vHandshakeResponseSuccess({
          MessageType: "HandshakeResponse",
          Version: "0.1"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Version", () => {
      expect(
        vHandshakeResponseSuccess({
          MessageType: "HandshakeResponse",
          Success: true
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vHandshakeResponseSuccess({
          MessageType: "HandshakeResponse",
          Success: true,
          Version: "0.1",
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vHandshakeResponseSuccess({
          MessageType: "INVALID",
          Success: true,
          Version: "0.1"
        })
      ).toBe("MessageType > Not 'HandshakeResponse'.");
    });

    it("should return invalid if invalid Success", () => {
      expect(
        vHandshakeResponseSuccess({
          MessageType: "HandshakeResponse",
          Success: false,
          Version: "0.1"
        })
      ).toBe("Success > Not true.");
    });

    it("should return invalid if invalid Version", () => {
      expect(
        vHandshakeResponseSuccess({
          MessageType: "HandshakeResponse",
          Success: true,
          Version: 123
        })
      ).toBe("Version > Not a string.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is valid", () => {
      expect(
        vHandshakeResponseSuccess({
          MessageType: "HandshakeResponse",
          Success: true,
          Version: "0.1"
        })
      ).toBe("");
    });
  });
});
