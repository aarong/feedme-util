import validateAction from "../validateaction";

/* global expect:false, it:false, describe: false */

describe("The validateAction.check() function", () => {
  it("should throw on schema violation", () => {
    expect(() => {
      validateAction.check({ MessageType: "Action" }, false);
    }).toThrow(new Error("INVALID: Schema validation failed."));
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
      new Error("INVALID: Action arguments are not JSON-expressible.")
    );
  });
});
