import vServerMessage from "../server-message";

describe("The server-message validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vServerMessage("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(vServerMessage({})).toBe("MessageType > Missing or invalid.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(vServerMessage({ MessageType: "INVALID " })).toBe(
        "MessageType > Missing or invalid."
      );
    });

    it("should return invalid if invalid ViolationResponse message", () => {
      expect(vServerMessage({ MessageType: "ViolationResponse" })).toBe(
        "(ViolationResponse Message) Missing or extraneous property."
      );
    });

    it("should return invalid if invalid HandshakeResponse message", () => {
      expect(vServerMessage({ MessageType: "HandshakeResponse" })).toBe(
        "(HandshakeResponse Message) Success > Missing or not boolean."
      );
    });

    it("should return invalid if invalid ActionResponse message", () => {
      expect(vServerMessage({ MessageType: "ActionResponse" })).toBe(
        "(ActionResponse Message) Success > Missing or not boolean."
      );
    });

    it("should return invalid if invalid FeedOpenResponse message", () => {
      expect(vServerMessage({ MessageType: "FeedOpenResponse" })).toBe(
        "(FeedOpenResponse Message) Success > Missing or not boolean."
      );
    });

    it("should return invalid if invalid FeedCloseResponse message", () => {
      expect(vServerMessage({ MessageType: "FeedCloseResponse" })).toBe(
        "(FeedCloseResponse Message) Missing or extraneous property."
      );
    });

    it("should return invalid if invalid FeedAction message", () => {
      expect(vServerMessage({ MessageType: "FeedAction" })).toBe(
        "(FeedAction Message) Missing or extraneous property."
      );
    });

    it("should return invalid if invalid FeedTermination message", () => {
      expect(vServerMessage({ MessageType: "FeedTermination" })).toBe(
        "(FeedTermination Message) Missing or extraneous property."
      );
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is a valid ViolationResponse", () => {
      expect(
        vServerMessage({
          MessageType: "ViolationResponse",
          Diagnostics: {}
        })
      ).toBe("");
    });

    it("should return valid if message is a valid HandshakeResponse", () => {
      expect(
        vServerMessage({
          MessageType: "HandshakeResponse",
          Success: false
        })
      ).toBe("");
    });

    it("should return valid if message is a valid ActionResponse", () => {
      expect(
        vServerMessage({
          MessageType: "ActionResponse",
          Success: false,
          CallbackId: "CALLBACK_ID",
          ErrorCode: "ERROR_CODE",
          ErrorData: {}
        })
      ).toBe("");
    });

    it("should return valid if message is a valid FeedOpenResponse", () => {
      expect(
        vServerMessage({
          MessageType: "FeedOpenResponse",
          Success: false,
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: {}
        })
      ).toBe("");
    });

    it("should return valid if message is a valid FeedCloseResponse", () => {
      expect(
        vServerMessage({
          MessageType: "FeedCloseResponse",
          FeedName: "FEED_NAME",
          FeedArgs: {}
        })
      ).toBe("");
    });

    it("should return valid if message is a valid FeedAction", () => {
      expect(
        vServerMessage({
          MessageType: "FeedAction",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ActionName: "ACTION_NAME",
          ActionData: {},
          FeedDeltas: []
        })
      ).toBe("");
    });

    it("should return valid if message is a valid FeedTermination", () => {
      expect(
        vServerMessage({
          MessageType: "FeedTermination",
          FeedName: "FEED_NAME",
          FeedArgs: {},
          ErrorCode: "ERROR_CODE",
          ErrorData: {}
        })
      ).toBe("");
    });
  });

  describe("checkJsonExpressible argument must propagate correctly to sub-validators", () => {
    describe("ViolationResponse message > Diagnostics", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "ViolationResponse",
              Diagnostics: { Diag: undefined }
            },
            true
          )
        ).toBe(
          "(ViolationResponse Message) Diagnostics > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "ViolationResponse",
              Diagnostics: { Diag: undefined }
            },
            false
          )
        ).toBe("");
      });
    });

    describe("ActionResponse success message > ActionData", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "ActionResponse",
              Success: true,
              CallbackId: "CALLBACK_ID",
              ActionData: { Data: undefined }
            },
            true
          )
        ).toBe(
          "(ActionResponse Message) (Success) ActionData > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "ActionResponse",
              Success: true,
              CallbackId: "CALLBACK_ID",
              ActionData: { Data: undefined }
            },
            false
          )
        ).toBe("");
      });
    });

    describe("ActionResponse failure message > ErrorData", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "ActionResponse",
              Success: false,
              CallbackId: "CALLBACK_ID",
              ErrorCode: "ERROR_CODE",
              ErrorData: { Data: undefined }
            },
            true
          )
        ).toBe(
          "(ActionResponse Message) (Failure) ErrorData > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
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

    describe("FeedOpenResponse success message > FeedData", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedOpenResponse",
              Success: true,
              FeedName: "FEED_NAME",
              FeedArgs: {},
              FeedData: { Data: undefined }
            },
            true
          )
        ).toBe(
          "(FeedOpenResponse Message) (Success) FeedData > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedOpenResponse",
              Success: true,
              FeedName: "FEED_NAME",
              FeedArgs: {},
              FeedData: { Data: undefined }
            },
            false
          )
        ).toBe("");
      });
    });

    describe("FeedOpenResponse failure message > ErrorData", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedOpenResponse",
              Success: false,
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ErrorCode: "ERROR_CODE",
              ErrorData: { Data: undefined }
            },
            true
          )
        ).toBe(
          "(FeedOpenResponse Message) (Failure) ErrorData > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedOpenResponse",
              Success: false,
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ErrorCode: "ERROR_CODE",
              ErrorData: { Data: undefined }
            },
            false
          )
        ).toBe("");
      });
    });

    describe("FeedAction message > ActionData", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: { Data: undefined },
              FeedDeltas: []
            },
            true
          )
        ).toBe("(FeedAction Message) ActionData > Not JSON-expressible.");
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: { Data: undefined },
              FeedDeltas: []
            },
            false
          )
        ).toBe("");
      });
    });

    describe("FeedAction message > Set delta value", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [{ Operation: "Set", Path: [], Value: undefined }]
            },
            true
          )
        ).toBe(
          "(FeedAction Message) FeedDeltas > Element 0 > (Set Delta) Value > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [{ Operation: "Set", Path: [], Value: undefined }]
            },
            false
          )
        ).toBe("");
      });
    });

    describe("FeedAction message > DeleteValue delta value", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "DeleteValue", Path: [], Value: undefined }
              ]
            },
            true
          )
        ).toBe(
          "(FeedAction Message) FeedDeltas > Element 0 > (DeleteValue Delta) Value > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "DeleteValue", Path: [], Value: undefined }
              ]
            },
            false
          )
        ).toBe("");
      });
    });

    describe("FeedAction message > InsertFirst delta value", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "InsertFirst", Path: [], Value: undefined }
              ]
            },
            true
          )
        ).toBe(
          "(FeedAction Message) FeedDeltas > Element 0 > (InsertFirst Delta) Value > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "InsertFirst", Path: [], Value: undefined }
              ]
            },
            false
          )
        ).toBe("");
      });
    });

    describe("FeedAction message > InsertLast delta value", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "InsertLast", Path: [], Value: undefined }
              ]
            },
            true
          )
        ).toBe(
          "(FeedAction Message) FeedDeltas > Element 0 > (InsertLast Delta) Value > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "InsertLast", Path: [], Value: undefined }
              ]
            },
            false
          )
        ).toBe("");
      });
    });

    describe("FeedAction message > InsertBefore delta value", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "InsertBefore", Path: [], Value: undefined }
              ]
            },
            true
          )
        ).toBe(
          "(FeedAction Message) FeedDeltas > Element 0 > (InsertBefore Delta) Value > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "InsertBefore", Path: [], Value: undefined }
              ]
            },
            false
          )
        ).toBe("");
      });
    });

    describe("FeedAction message > InsertAfter delta value", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "InsertAfter", Path: [], Value: undefined }
              ]
            },
            true
          )
        ).toBe(
          "(FeedAction Message) FeedDeltas > Element 0 > (InsertAfter Delta) Value > Not JSON-expressible."
        );
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedAction",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ActionName: "ACTION_NAME",
              ActionData: {},
              FeedDeltas: [
                { Operation: "InsertAfter", Path: [], Value: undefined }
              ]
            },
            false
          )
        ).toBe("");
      });
    });

    describe("FeedTermination message > ErrorData", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedTermination",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ErrorCode: "ERROR_CODE",
              ErrorData: { Data: undefined }
            },
            true
          )
        ).toBe("(FeedTermination Message) ErrorData > Not JSON-expressible.");
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vServerMessage(
            {
              MessageType: "FeedTermination",
              FeedName: "FEED_NAME",
              FeedArgs: {},
              ErrorCode: "ERROR_CODE",
              ErrorData: { Data: undefined }
            },
            false
          )
        ).toBe("");
      });
    });
  });
});
