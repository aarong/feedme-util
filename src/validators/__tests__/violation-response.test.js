import vViolationResponse from "../violation-response";

describe("The violation-response validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vViolationResponse("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vViolationResponse({
          Diagnostics: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Diagnostics", () => {
      expect(
        vViolationResponse({
          MessageType: "ViolationResponse",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vViolationResponse({
          MessageType: "ViolationResponse",
          Diagnostics: {},
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vViolationResponse({
          MessageType: "INVALID",
          Diagnostics: {},
        }),
      ).toBe("MessageType > Not 'ViolationResponse'.");
    });

    it("should return invalid if invalid Diagnostics", () => {
      expect(
        vViolationResponse({
          MessageType: "ViolationResponse",
          Diagnostics: "INVALID",
        }),
      ).toBe("Diagnostics > Not an object.");
    });

    it("should return invalid if JSON-expressibility check is default and Diagnostics is not a JSON-expressible object", () => {
      expect(
        vViolationResponse({
          MessageType: "ViolationResponse",
          Diagnostics: { Something: undefined },
        }),
      ).toBe("Diagnostics > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and Diagnostics is not a JSON-expressible object", () => {
      expect(
        vViolationResponse(
          {
            MessageType: "ViolationResponse",
            Diagnostics: { Something: undefined },
          },
          true,
        ),
      ).toBe("Diagnostics > Not JSON-expressible.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if JSON-expressiblity check is default and Diagnostics is a JSON-expressible object", () => {
      expect(
        vViolationResponse({
          MessageType: "ViolationResponse",
          Diagnostics: {},
        }),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and Diagnostics is a JSON-expressible object", () => {
      expect(
        vViolationResponse(
          {
            MessageType: "ViolationResponse",
            Diagnostics: {},
          },
          true,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Diagnostics is a JSON-expressible object", () => {
      expect(
        vViolationResponse(
          {
            MessageType: "ViolationResponse",
            Diagnostics: {},
          },
          false,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and Diagnostics is not a JSON-expressible object", () => {
      expect(
        vViolationResponse(
          {
            MessageType: "ViolationResponse",
            Diagnostics: { Something: undefined },
          },
          false,
        ),
      ).toBe("");
    });
  });
});
