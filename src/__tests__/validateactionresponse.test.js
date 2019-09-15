import validateActionResponse from "../validateactionresponse";

/* global expect:false, it:false, describe: false */

describe("The validateActionResponse.check() function", () => {
  it("should return correctly", () => {
    expect(() => {
      validateActionResponse.check({ MessageType: "ActionResponse" }, false);
    }).toThrow(new Error("INVALID: Schema validation failed."));
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
      }).toThrow(new Error("INVALID: Action data is not JSON-expressible."));
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
      }).toThrow(new Error("INVALID: Error data is not JSON-expressible."));
    });
  });
});
