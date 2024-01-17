import vFeedDelta from "../feed-delta";

describe("The feed-delta validator", () => {
  describe("could return invalid", () => {
    it("should return invalid if value is not an object", () => {
      expect(vFeedDelta("INVALID")).toBe("Not an object.");
    });

    it("should return invalid if missing Operation", () => {
      expect(vFeedDelta({})).toBe("Operation > Missing or invalid.");
    });

    it("should return invalid if invalid Operation", () => {
      expect(
        vFeedDelta({
          Operation: "INVALID",
        }),
      ).toBe("Operation > Missing or invalid.");
    });

    it("should return invalid if invalid Set delta", () => {
      expect(vFeedDelta({ Operation: "Set" })).toBe(
        "(Set Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid Delete delta", () => {
      expect(vFeedDelta({ Operation: "Delete" })).toBe(
        "(Delete Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid DeleteValue delta", () => {
      expect(vFeedDelta({ Operation: "DeleteValue" })).toBe(
        "(DeleteValue Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid Prepend delta", () => {
      expect(vFeedDelta({ Operation: "Prepend" })).toBe(
        "(Prepend Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid Append delta", () => {
      expect(vFeedDelta({ Operation: "Append" })).toBe(
        "(Append Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid Increment delta", () => {
      expect(vFeedDelta({ Operation: "Increment" })).toBe(
        "(Increment Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid Decrement delta", () => {
      expect(vFeedDelta({ Operation: "Decrement" })).toBe(
        "(Decrement Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid Toggle delta", () => {
      expect(vFeedDelta({ Operation: "Toggle" })).toBe(
        "(Toggle Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid InsertFirst delta", () => {
      expect(vFeedDelta({ Operation: "InsertFirst" })).toBe(
        "(InsertFirst Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid InsertLast delta", () => {
      expect(vFeedDelta({ Operation: "InsertLast" })).toBe(
        "(InsertLast Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid InsertBefore delta", () => {
      expect(vFeedDelta({ Operation: "InsertBefore" })).toBe(
        "(InsertBefore Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid InsertAfter delta", () => {
      expect(vFeedDelta({ Operation: "InsertAfter" })).toBe(
        "(InsertAfter Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid DeleteFirst delta", () => {
      expect(vFeedDelta({ Operation: "DeleteFirst" })).toBe(
        "(DeleteFirst Delta) Missing or extraneous property.",
      );
    });

    it("should return invalid if invalid DeleteLast delta", () => {
      expect(vFeedDelta({ Operation: "DeleteLast" })).toBe(
        "(DeleteLast Delta) Missing or extraneous property.",
      );
    });
  });

  describe("can return valid", () => {
    it("should return valid if message is a valid Set delta", () => {
      expect(
        vFeedDelta({
          Operation: "Set",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid Delete delta", () => {
      expect(
        vFeedDelta({
          Operation: "Delete",
          Path: [],
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid DeleteValue delta", () => {
      expect(
        vFeedDelta({
          Operation: "DeleteValue",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid Prepend delta", () => {
      expect(
        vFeedDelta({
          Operation: "Prepend",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid Append delta", () => {
      expect(
        vFeedDelta({
          Operation: "Append",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid Increment delta", () => {
      expect(
        vFeedDelta({
          Operation: "Increment",
          Path: [],
          Value: 1,
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid Decrement delta", () => {
      expect(
        vFeedDelta({
          Operation: "Decrement",
          Path: [],
          Value: 1,
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid Toggle delta", () => {
      expect(
        vFeedDelta({
          Operation: "Toggle",
          Path: [],
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid InsertFirst delta", () => {
      expect(
        vFeedDelta({
          Operation: "InsertFirst",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid InsertLast delta", () => {
      expect(
        vFeedDelta({
          Operation: "InsertLast",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid InsertBefore delta", () => {
      expect(
        vFeedDelta({
          Operation: "InsertBefore",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid InsertAfter delta", () => {
      expect(
        vFeedDelta({
          Operation: "InsertAfter",
          Path: [],
          Value: "VALUE",
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid DeleteFirst delta", () => {
      expect(
        vFeedDelta({
          Operation: "DeleteFirst",
          Path: [],
        }),
      ).toBe("");
    });

    it("should return valid if message is a valid DeleteLast delta", () => {
      expect(
        vFeedDelta({
          Operation: "DeleteLast",
          Path: [],
        }),
      ).toBe("");
    });
  });
});
