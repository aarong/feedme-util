import vActionResponseSuccess from "../action-response-success";

describe("The action-response-success validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vActionResponseSuccess("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vActionResponseSuccess({
          Success: true,
          CallbackId: "CALLBACK_ID",
          ActionData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing Success", () => {
      expect(
        vActionResponseSuccess({
          MessageType: "ActionResponse",
          CallbackId: "CALLBACK_ID",
          ActionData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing CallbackId", () => {
      expect(
        vActionResponseSuccess({
          MessageType: "ActionResponse",
          Success: true,
          ActionData: {},
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing ActionData", () => {
      expect(
        vActionResponseSuccess({
          MessageType: "ActionResponse",
          Success: true,
          CallbackId: "CALLBACK_ID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vActionResponseSuccess({
          MessageType: "ActionResponse",
          Success: true,
          CallbackId: "CALLBACK_ID",
          ActionData: {},
          Extraneous: "INVALID",
        }),
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vActionResponseSuccess({
          MessageType: "INVALID",
          Success: true,
          CallbackId: "CALLBACK_ID",
          ActionData: {},
        }),
      ).toBe("MessageType > Not 'ActionResponse'.");
    });

    it("should return invalid if invalid Success", () => {
      expect(
        vActionResponseSuccess({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ActionData: {},
        }),
      ).toBe("Success > Not true.");
    });

    it("should return invalid if invalid CallbackId", () => {
      expect(
        vActionResponseSuccess({
          MessageType: "ActionResponse",
          Success: true,
          CallbackId: 123,
          ActionData: {},
        }),
      ).toBe("CallbackId > Not a string.");
    });

    it("should return invalid if JSON-expressibility check is default and ActionData is not a JSON-expressible object", () => {
      expect(
        vActionResponseSuccess({
          MessageType: "ActionResponse",
          Success: true,
          CallbackId: "CALLBACK_ID",
          ActionData: { Data: undefined },
        }),
      ).toBe("ActionData > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and ActionData is not a JSON-expressible object", () => {
      expect(
        vActionResponseSuccess(
          {
            MessageType: "ActionResponse",
            Success: true,
            CallbackId: "CALLBACK_ID",
            ActionData: { Data: undefined },
          },
          true,
        ),
      ).toBe("ActionData > Not JSON-expressible.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if JSON-expressiblity check is default and ActionData is a JSON-expressible object", () => {
      expect(
        vActionResponseSuccess({
          MessageType: "ActionResponse",
          Success: true,
          CallbackId: "CALLBACK_ID",
          ActionData: { Action: "Data" },
        }),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and ActionData is a JSON-expressible object", () => {
      expect(
        vActionResponseSuccess(
          {
            MessageType: "ActionResponse",
            Success: true,
            CallbackId: "CALLBACK_ID",
            ActionData: { Action: "Data" },
          },
          true,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and ActionData is a JSON-expressible object", () => {
      expect(
        vActionResponseSuccess(
          {
            MessageType: "ActionResponse",
            Success: true,
            CallbackId: "CALLBACK_ID",
            ActionData: { Action: "Data" },
          },
          false,
        ),
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and ActionData is not a JSON-expressible object", () => {
      expect(
        vActionResponseSuccess(
          {
            MessageType: "ActionResponse",
            Success: true,
            CallbackId: "CALLBACK_ID",
            ActionData: { Data: undefined },
          },
          false,
        ),
      ).toBe("");
    });
  });
});
