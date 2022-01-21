import vAction from "../action";

describe("The action validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vAction("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(
        vAction({
          ActionName: "ACTION_NAME",
          ActionArgs: {},
          CallbackId: "CALLBACK_ID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing ActionName", () => {
      expect(
        vAction({
          MessageType: "Action",
          ActionArgs: {},
          CallbackId: "CALLBACK_ID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing ActionArgs", () => {
      expect(
        vAction({
          MessageType: "Action",
          ActionName: "ACTION_NAME",
          CallbackId: "CALLBACK_ID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if missing CallbackId", () => {
      expect(
        vAction({
          MessageType: "Action",
          ActionName: "ACTION_NAME",
          ActionArgs: {}
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if extraneous key", () => {
      expect(
        vAction({
          MessageType: "Action",
          ActionName: "ACTION_NAME",
          ActionArgs: {},
          CallbackId: "CALLBACK_ID",
          Extraneous: "INVALID"
        })
      ).toBe("Missing or extraneous property.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(
        vAction({
          MessageType: "INVALID",
          ActionName: "ACTION_NAME",
          ActionArgs: {},
          CallbackId: "CALLBACK_ID"
        })
      ).toBe("MessageType > Not 'Action'.");
    });

    it("should return invalid if invalid ActionName", () => {
      expect(
        vAction({
          MessageType: "Action",
          ActionName: 123,
          ActionArgs: {},
          CallbackId: "CALLBACK_ID"
        })
      ).toBe("ActionName > Not a string.");
    });

    it("should return invalid if invalid ActionArgs", () => {
      expect(
        vAction({
          MessageType: "Action",
          ActionName: "ACTION_NAME",
          ActionArgs: "INVALID",
          CallbackId: "CALLBACK_ID"
        })
      ).toBe("ActionArgs > Not an object.");
    });

    it("should return invalid if invalid CallbackId", () => {
      expect(
        vAction({
          MessageType: "Action",
          ActionName: "ACTION_NAME",
          ActionArgs: {},
          CallbackId: 123
        })
      ).toBe("CallbackId > Not a string.");
    });

    it("should return invalid if JSON-expressibility check is default and ActionArgs is not a JSON-expressible object", () => {
      expect(
        vAction({
          MessageType: "Action",
          ActionName: "ACTION_NAME",
          ActionArgs: { Arg: undefined },
          CallbackId: "CALLBACK_ID"
        })
      ).toBe("ActionArgs > Not JSON-expressible.");
    });

    it("should return invalid if JSON-expressibility check is explicitly enabled and ActionArgs is not a JSON-expressible object", () => {
      expect(
        vAction(
          {
            MessageType: "Action",
            ActionName: "ACTION_NAME",
            ActionArgs: { Arg: undefined },
            CallbackId: "CALLBACK_ID"
          },
          true
        )
      ).toBe("ActionArgs > Not JSON-expressible.");
    });
  });

  describe("can return valid", () => {
    it("should return valid if JSON-expressiblity check is default and ActionArgs is a JSON-expressible object", () => {
      expect(
        vAction({
          MessageType: "Action",
          ActionName: "ACTION_NAME",
          ActionArgs: {},
          CallbackId: "CALLBACK_ID"
        })
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly enabled and ActionArgs is a JSON-expressible object", () => {
      expect(
        vAction(
          {
            MessageType: "Action",
            ActionName: "ACTION_NAME",
            ActionArgs: {},
            CallbackId: "CALLBACK_ID"
          },
          true
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and ActionArgs is a JSON-expressible object", () => {
      expect(
        vAction(
          {
            MessageType: "Action",
            ActionName: "ACTION_NAME",
            ActionArgs: {},
            CallbackId: "CALLBACK_ID"
          },
          false
        )
      ).toBe("");
    });

    it("should return valid if JSON-expressiblity check is explicitly disabled and ActionArgs is not a JSON-expressible object", () => {
      expect(
        vAction(
          {
            MessageType: "Action",
            ActionName: "ACTION_NAME",
            ActionArgs: { Arg: undefined },
            CallbackId: "CALLBACK_ID"
          },
          false
        )
      ).toBe("");
    });
  });
});
