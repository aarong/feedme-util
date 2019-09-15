import validateViolationResponse from "../validateviolationresponse";

/* global expect:false, it:false, describe: false */

describe("The validateViolationResponse.check() function", () => {
  it("should throw on invalid type", () => {
    expect(() => {
      validateViolationResponse.check(123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid MessageType", () => {
    expect(() => {
      validateViolationResponse.check({ MessageType: "junk" });
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid checkJsonExpressible", () => {
    expect(() => {
      validateViolationResponse.check(
        { MessageType: "ViolationResponse" },
        123
      );
    }).toThrow(
      new Error("INVALID_ARGUMENT: Invalid checkJsonExpressible argument.")
    );
  });

  it("should throw on schema violation", () => {
    expect(() => {
      validateViolationResponse.check(
        { MessageType: "ViolationResponse" },
        false
      );
    }).toThrow(new Error("INVALID_MESSAGE: Schema validation failed."));
  });

  it("if not checking JSON-expressibility, should succeed if expressible", () => {
    expect(
      validateViolationResponse.check(
        {
          MessageType: "ViolationResponse",
          Diagnostics: { diagnostic: "data" }
        },
        false
      )
    ).toBe(undefined);
  });

  it("if not checking JSON-expressibility, should succeed if not expressible", () => {
    expect(
      validateViolationResponse.check(
        {
          MessageType: "ViolationResponse",
          Diagnostics: { diagnostic: undefined }
        },
        false
      )
    ).toBe(undefined);
  });

  it("if checking JSON-expressibility, should succeed if expressible", () => {
    expect(
      validateViolationResponse.check(
        {
          MessageType: "ViolationResponse",
          Diagnostics: { diagnostic: "data" }
        },
        true
      )
    ).toBe(undefined);
  });

  it("if checking JSON-expressibility, should throw if not expressible", () => {
    expect(() => {
      validateViolationResponse.check(
        {
          MessageType: "ViolationResponse",
          Diagnostics: { diagnostics: undefined }
        },
        true
      );
    }).toThrow(
      new Error("INVALID_MESSAGE: Diagnostics are not JSON-expressible.")
    );
  });
});
