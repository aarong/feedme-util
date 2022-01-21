import vClientMessage from "../client-message";

describe("The client-message validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vClientMessage("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing MessageType", () => {
      expect(vClientMessage({})).toBe("MessageType > Missing or invalid.");
    });

    it("should return invalid if invalid MessageType", () => {
      expect(vClientMessage({ MessageType: "INVALID " })).toBe(
        "MessageType > Missing or invalid."
      );
    });

    it("should return invalid if invalid Handshake message", () => {
      expect(vClientMessage({ MessageType: "Handshake" })).toBe(
        "(Handshake Message) Missing or extraneous property."
      );
    });

    it("should return invalid if invalid Action message", () => {
      expect(vClientMessage({ MessageType: "Action" })).toBe(
        "(Action Message) Missing or extraneous property."
      );
    });

    it("should return invalid if invalid FeedOpen message", () => {
      expect(vClientMessage({ MessageType: "FeedOpen" })).toBe(
        "(FeedOpen Message) Missing or extraneous property."
      );
    });

    it("should return invalid if invalid FeedClose message", () => {
      expect(vClientMessage({ MessageType: "FeedClose" })).toBe(
        "(FeedClose Message) Missing or extraneous property."
      );
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is a valid Handshake", () => {
      expect(
        vClientMessage({
          MessageType: "Handshake",
          Versions: ["0.1"]
        })
      ).toBe("");
    });

    it("should return valid if message is a valid Action", () => {
      expect(
        vClientMessage({
          MessageType: "Action",
          ActionName: "ACTION_NAME",
          ActionArgs: {},
          CallbackId: "CALLBACK_ID"
        })
      ).toBe("");
    });

    it("should return valid if message is a valid FeedOpen", () => {
      expect(
        vClientMessage({
          MessageType: "FeedOpen",
          FeedName: "FEED_NAME",
          FeedArgs: {}
        })
      ).toBe("");
    });

    it("should return valid if message is a valid FeedClose", () => {
      expect(
        vClientMessage({
          MessageType: "FeedClose",
          FeedName: "FEED_NAME",
          FeedArgs: {}
        })
      ).toBe("");
    });
  });

  describe("checkJsonExpressible argument must propagate correctly", () => {
    describe("Action message > ActionArgs", () => {
      it("should return invalid if not JSON-expressible and checkJsonExpressible is true", () => {
        expect(
          vClientMessage(
            {
              MessageType: "Action",
              ActionName: "ACTION_NAME",
              ActionArgs: { Arg: undefined },
              CallbackId: "CALLBACK_ID"
            },
            true
          )
        ).toBe("(Action Message) ActionArgs > Not JSON-expressible.");
      });

      it("should return valid if not JSON-expressible and checkJsonExpressible is false", () => {
        expect(
          vClientMessage(
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
});
