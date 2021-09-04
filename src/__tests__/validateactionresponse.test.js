import validateActionResponse from "../validateactionresponse";

describe("The validateActionResponse.check() function", () => {
  it("should throw on invalid type", () => {
    expect(() => {
      validateActionResponse.check(123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid MessageType", () => {
    expect(() => {
      validateActionResponse.check({ MessageType: "junk" });
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid checkJsonExpressible", () => {
    expect(() => {
      validateActionResponse.check({ MessageType: "ActionResponse" }, 123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Invalid checkJsonExpressible argument.")
    );
  });

  it("should throw on schema violation", () => {
    expect(() => {
      validateActionResponse.check({ MessageType: "ActionResponse" }, false);
    }).toThrow(new Error("INVALID_MESSAGE: Schema validation failed."));
  });

  describe("if not checking JSON-expressibility", () => {
    it("should return success on valid response success", () => {
      expect(
        validateActionResponse.check(
          {
            MessageType: "ActionResponse",
            CallbackId: "SOME_CALLBACK_ID",
            Success: true,
            ActionData: { action: "data" }
          },
          false
        )
      ).toBe(undefined);
    });

    it("should return success on valid response failure", () => {
      expect(
        validateActionResponse.check(
          {
            MessageType: "ActionResponse",
            CallbackId: "SOME_CALLBACK_ID",
            Success: false,
            ErrorCode: "SOME_ERROR_CODE",
            ErrorData: { error: "data" }
          },
          false
        )
      ).toBe(undefined);
    });

    it("should return success on non-expressible response success", () => {
      expect(
        validateActionResponse.check(
          {
            MessageType: "ActionResponse",
            CallbackId: "SOME_CALLBACK_ID",
            Success: true,
            ActionData: { action: undefined }
          },
          false
        )
      ).toBe(undefined);
    });

    it("should return success on non-expressible response failure", () => {
      expect(
        validateActionResponse.check(
          {
            MessageType: "ActionResponse",
            CallbackId: "SOME_CALLBACK_ID",
            Success: false,
            ErrorCode: "SOME_ERROR_CODE",
            ErrorData: { error: undefined }
          },
          false
        )
      ).toBe(undefined);
    });
  });

  describe("if checking JSON-expressibility", () => {
    it("should return success on valid response success", () => {
      expect(
        validateActionResponse.check(
          {
            MessageType: "ActionResponse",
            CallbackId: "SOME_CALLBACK_ID",
            Success: true,
            ActionData: { action: "data" }
          },
          true
        )
      ).toBe(undefined);
    });

    it("should return success on valid response failure", () => {
      expect(
        validateActionResponse.check(
          {
            MessageType: "ActionResponse",
            CallbackId: "SOME_CALLBACK_ID",
            Success: false,
            ErrorCode: "SOME_ERROR_CODE",
            ErrorData: { error: "data" }
          },
          true
        )
      ).toBe(undefined);
    });

    it("should throw on non-expressible response success", () => {
      expect(() => {
        validateActionResponse.check(
          {
            MessageType: "ActionResponse",
            CallbackId: "SOME_CALLBACK_ID",
            Success: true,
            ActionData: { action: undefined }
          },
          true
        );
      }).toThrow(
        new Error("INVALID_MESSAGE: Action data is not JSON-expressible.")
      );
    });

    it("should throw on non-expressible response failure", () => {
      expect(() => {
        validateActionResponse.check(
          {
            MessageType: "ActionResponse",
            CallbackId: "SOME_CALLBACK_ID",
            Success: false,
            ErrorCode: "SOME_ERROR_CODE",
            ErrorData: { error: undefined }
          },
          true
        );
      }).toThrow(
        new Error("INVALID_MESSAGE: Error data is not JSON-expressible.")
      );
    });
  });
});
