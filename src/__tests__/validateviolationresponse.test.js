import validateViolationResponse from "../validateviolationresponse";

/* global expect:false, it:false, describe: false */

describe("The validateViolationResponse.check() function", () => {
  it("should throw on schema violation", () => {
    expect(() => {
      validateViolationResponse.check(
        { MessageType: "ViolationResponse" },
        false
      );
    }).toThrow(new Error("INVALID: Schema validation failed."));
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
    }).toThrow(new Error("INVALID: Diagnostics are not JSON-expressible."));
  });
});
