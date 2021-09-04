import validateAction from "../validateaction";

describe("The validateAction.check() function", () => {
  it("should throw on invalid type", () => {
    expect(() => {
      validateAction.check(123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid MessageType", () => {
    expect(() => {
      validateAction.check({ MessageType: "junk" });
    }).toThrow(
      new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.")
    );
  });

  it("should throw on invalid checkJsonExpressible", () => {
    expect(() => {
      validateAction.check({ MessageType: "Action" }, 123);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Invalid checkJsonExpressible argument.")
    );
  });

  it("should throw on schema violation", () => {
    expect(() => {
      validateAction.check({ MessageType: "Action" }, false);
    }).toThrow(new Error("INVALID_MESSAGE: Schema validation failed."));
  });

  it("if not checking JSON-expressibility, should succeed on valid message", () => {
    expect(
      validateAction.check(
        {
          MessageType: "Action",
          ActionName: "SOME_ACTION_NAME",
          ActionArgs: { action: "args" },
          CallbackId: "SOME_CALLBACK_ID"
        },
        false
      )
    ).toBe(undefined);
  });

  it("if not checking JSON-expressibility, should succeed on non-expressible message", () => {
    expect(
      validateAction.check(
        {
          MessageType: "Action",
          ActionName: "SOME_ACTION_NAME",
          ActionArgs: { action: undefined },
          CallbackId: "SOME_CALLBACK_ID"
        },
        false
      )
    ).toBe(undefined);
  });

  it("if checking JSON-expressibility, should succeed on valid message", () => {
    expect(
      validateAction.check(
        {
          MessageType: "Action",
          ActionName: "SOME_ACTION_NAME",
          ActionArgs: { action: "args" },
          CallbackId: "SOME_CALLBACK_ID"
        },
        true
      )
    ).toBe(undefined);
  });

  it("if checking JSON-expressibility, should throw on non-expressible message", () => {
    expect(() => {
      validateAction.check(
        {
          MessageType: "Action",
          ActionName: "SOME_ACTION_NAME",
          ActionArgs: { action: undefined },
          CallbackId: "SOME_CALLBACK_ID"
        },
        true
      );
    }).toThrow(
      new Error("INVALID_MESSAGE: Action arguments are not JSON-expressible.")
    );
  });
});
