import vActionResponseFailure from "../action-response-failure";

describe("The action-response-failure validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vActionResponseFailure("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vActionResponseFailure({
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE",
          ErrorData: {}
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Success", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE",
          ErrorData: {}
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing CallbackId", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          Success: false,
          ErrorCode: "ERROR_CODE",
          ErrorData: {}
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing ErrorCode", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorData: {}
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing ErrorData", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE",
          ErrorData: {},
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vActionResponseFailure({
          MessageType: "INVALID",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE",
          ErrorData: {}
        })
      ).toBe("MessageType > Not 'ActionResponse'.");
    });

    it("should return invalid if invalid Success", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          Success: true,
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE",
          ErrorData: {}
        })
      ).toBe("Success > Not false.");
    });

    it("should return invalid if invalid CallbackId", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: 123,
          ErrorCode: "ERROR_CODE",
          ErrorData: {}
        })
      ).toBe("CallbackId > Not a string.");
    });

    it("should return invalid if invalid ErrorCode", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorCode: 123,
          ErrorData: {}
        })
      ).toBe("ErrorCode > Not a string.");
    });

    it("should return invalid if JSON-expressibility check is default and ErrorData is not a JSON-expressible object", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE",
          ErrorData: { Data: undefined }
        })
      ).toBe("ErrorData > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and ErrorData is not a JSON-expressible object", () => {
      expect(
        vActionResponseFailure(
          {
            MessageType: "ActionResponse",
            Success: false,
            CallbackId: "CALLBACK_ID",
            ErrorCode: "ERROR_CODE",
            ErrorData: { Data: undefined }
          },
          true
        )
      ).toBe("ErrorData > Not JSON-expressible.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if JSON-expressiblity check is default and ErrorData is a JSON-expressible object", () => {
      expect(
        vActionResponseFailure({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE",
          ErrorData: { Error: "Data" }
        })
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and ErrorData is a JSON-expressible object", () => {
      expect(
        vActionResponseFailure(
          {
            MessageType: "ActionResponse",
            Success: false,
            CallbackId: "CALLBACK_ID",
            ErrorCode: "ERROR_CODE",
            ErrorData: { Error: "Data" }
          },
          true
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and ErrorData is a JSON-expressible object", () => {
      expect(
        vActionResponseFailure(
          {
            MessageType: "ActionResponse",
            Success: false,
            CallbackId: "CALLBACK_ID",
            ErrorCode: "ERROR_CODE",
            ErrorData: { Error: "Data" }
          },
          false
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and ErrorData is not a JSON-expressible object", () => {
      expect(
        vActionResponseFailure(
          {
            MessageType: "ActionResponse",
            Success: false,
            CallbackId: "CALLBACK_ID",
            ErrorCode: "ERROR_CODE",
            ErrorData: { Data: undefined }
          },
          false
        )
      ).toBe("");
    });
  });
});
