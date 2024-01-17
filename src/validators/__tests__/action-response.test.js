import vActionResponse from "../action-response";

describe("The action-response validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vActionResponse("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(vActionResponse({ Success: true })).toBe(
        "MessageType > Missing or not 'ActionResponse'.",
      );
    });

    it("should return invalid if missing Success", () => {
      expect(vActionResponse({ MessageType: "ActionResponse" })).toBe(
        "Success > Missing or not boolean.",
      );
    });

    it("should return invalid if invalid MessageType", () => {
      expect(vActionResponse({ MessageType: "INVALID", Success: true })).toBe(
        "MessageType > Missing or not 'ActionResponse'.",
      );
    });

    it("should return invalid if invalid Success", () => {
      expect(
        vActionResponse({ MessageType: "ActionResponse", Success: "INVALID" }),
      ).toBe("Success > Missing or not boolean.");
    });

    it("should return invalid if invalid ActionResponse success message", () => {
      expect(
        vActionResponse({ MessageType: "ActionResponse", Success: true }),
      ).toBe("(Success) Missing or extraneous property.");
    });

    it("should return invalid if invalid ActionResponse failure message", () => {
      expect(
        vActionResponse({ MessageType: "ActionResponse", Success: false }),
      ).toBe("(Failure) Missing or extraneous property.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is a valid ActionResponse success", () => {
      expect(
        vActionResponse({
          MessageType: "ActionResponse",
          Success: true,
          CallbackId: "CALLBACK_ID",
          ActionData: {},
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid ActionResponse failure", () => {
      expect(
        vActionResponse({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
        }),
      ).toBe("");
    });
  });
});
