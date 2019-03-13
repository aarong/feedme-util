import feedSerializer from "../feedserializer";

/* global expect:false, describe:false, it:false */

describe("the .serialize() function", () => {
  it("should throw if feed name is invalid", () => {
    expect(() => {
      feedSerializer.serialize(1, {});
    }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed name."));
  });

  it("should throw if feed args is invalid", () => {
    expect(() => {
      feedSerializer.serialize("someFeed", 1);
    }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed arguments object."));
  });

  it("should throw if feed args is invalid", () => {
    expect(() => {
      feedSerializer.serialize("someFeed", { arg: 1 });
    }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed arguments object."));
  });

  it("should return correctly", () => {
    expect(feedSerializer.serialize("myFeed", {})).toBe('["myFeed"]');
    expect(feedSerializer.serialize("myFeed", { arg: "val" })).toBe(
      '["myFeed",["arg","val"]]'
    );
    expect(
      feedSerializer.serialize("myFeed", { arg2: "val2", arg1: "val1" })
    ).toBe('["myFeed",["arg1","val1"],["arg2","val2"]]');
  });
});

describe("the .unserialize() function", () => {
  it("should return correctly", () => {
    expect(feedSerializer.unserialize('["myFeed"]')).toEqual({
      feedName: "myFeed",
      feedArgs: {}
    });
    expect(feedSerializer.unserialize('["myFeed",["arg","val"]]')).toEqual({
      feedName: "myFeed",
      feedArgs: { arg: "val" }
    });
    expect(
      feedSerializer.unserialize('["myFeed",["arg1","val1"],["arg2","val2"]]')
    ).toEqual({
      feedName: "myFeed",
      feedArgs: { arg1: "val1", arg2: "val2" }
    });
  });
});
