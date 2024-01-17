import vHandshake from "../handshake";

describe("The handshake validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vHandshake("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vHandshake({
          Versions: ["0.1"],
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Versions", () => {
      expect(
        vHandshake({
          MessageType: "Handshake",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vHandshake({
          MessageType: "Handshake",
          Versions: ["0.1"],
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vHandshake({
          MessageType: "INVALID",
          Versions: ["0.1"],
        }),
      ).toBe("MessageType > Not 'Handshake'.");
    });

    it("should return invalid if invalid Versions", () => {
      expect(
        vHandshake({
          MessageType: "Handshake",
          Versions: "INVALID",
        }),
      ).toBe("Versions > Not an array.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is valid", () => {
      expect(
        vHandshake({
          MessageType: "Handshake",
          Versions: ["0.1"],
        }),
      ).toBe("");
    });
  });
});
