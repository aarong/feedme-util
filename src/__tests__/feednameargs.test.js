import FeedNameArgs from "../feednameargs";

describe("The factory function - invalid usage", () => {
  it("should throw if no args", () => {
    expect(() => {
      FeedNameArgs();
    }).toThrow(
      new Error("INVALID_ARGUMENT: Expects either one or two arguments.")
    );
  });

  it("should throw if 3+ args", () => {
    expect(() => {
      FeedNameArgs(1, 2, 3);
    }).toThrow(
      new Error("INVALID_ARGUMENT: Expects either one or two arguments.")
    );
  });
});

describe("The factory function - feed serial usage", () => {
  describe("could fail", () => {
    it("should throw if non-string argument", () => {
      expect(() => {
        FeedNameArgs(123);
      }).toThrow(new Error("INVALID_ARGUMENT: Feed serial is not a string."));
    });

    it("should throw if invalid JSON", () => {
      expect(() => {
        FeedNameArgs("}{");
      }).toThrow(new Error("INVALID_ARGUMENT: Feed serial is not valid JSON."));
    });

    it("should throw if JSON value is not an array", () => {
      expect(() => {
        FeedNameArgs("{}");
      }).toThrow(
        new Error("INVALID_ARGUMENT: Feed serial is not a JSON array.")
      );
    });

    it("should throw if JSON array is not of odd length - zero", () => {
      expect(() => {
        FeedNameArgs("[]");
      }).toThrow(
        new Error(
          "INVALID_ARGUMENT: Feed serial JSON array has invalid length."
        )
      );
    });

    it("should throw if JSON array is not of odd length - two", () => {
      expect(() => {
        FeedNameArgs('["one", "two"]');
      }).toThrow(
        new Error(
          "INVALID_ARGUMENT: Feed serial JSON array has invalid length."
        )
      );
    });

    it("should throw if JSON array includes a non-string element - first", () => {
      expect(() => {
        FeedNameArgs("[1]");
      }).toThrow(
        new Error(
          "INVALID_ARGUMENT: Feed serial JSON array includes non-string element."
        )
      );
    });

    it("should throw if JSON array includes a non-string element - third", () => {
      expect(() => {
        FeedNameArgs('["one", "two", 3]');
      }).toThrow(
        new Error(
          "INVALID_ARGUMENT: Feed serial JSON array includes non-string element."
        )
      );
    });

    it("should throw if feed name is empty", () => {
      expect(() => {
        FeedNameArgs('[""]');
      }).toThrow(
        new Error("INVALID_ARGUMENT: Feed serial specifies empty feed name.")
      );
    });
  });

  describe("could succeed", () => {
    it("should return an object with functioning getters - no feed arguments", () => {
      const ser = '["SOME_FEED"]';
      const fna = FeedNameArgs(ser);
      expect(fna).toBeInstanceOf(Object);
      expect(fna.name()).toBe("SOME_FEED");
      expect(fna.args()).toEqual({});
      expect(fna.serial()).toEqual(ser);
    });

    it("should return an object with functioning getters - with feed arguments", () => {
      const ser = '["SOME_FEED", "ARG_1", "VAL_1", "ARG_2", "VAL_2"]';
      const fna = FeedNameArgs(ser);
      expect(fna).toBeInstanceOf(Object);
      expect(fna.name()).toBe("SOME_FEED");
      expect(fna.args()).toEqual({ ARG_1: "VAL_1", ARG_2: "VAL_2" });
      expect(fna.serial()).toEqual(ser);
    });
  });
});

describe("The factory function - feed name/arg usage", () => {
  describe("could fail", () => {
    it("should throw on invalid feed name - type", () => {
      expect(() => {
        FeedNameArgs(123, {});
      }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed name."));
    });

    it("should throw on invalid feed name - empty", () => {
      expect(() => {
        FeedNameArgs("", {});
      }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed name."));
    });

    it("should throw on invalid feed args - type", () => {
      expect(() => {
        FeedNameArgs("SOME_FEED", 123);
      }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed arguments object."));
    });

    it("should throw on invalid feed args - property type", () => {
      expect(() => {
        FeedNameArgs("SOME_FEED", { SOME_ARG: 123 });
      }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed arguments object."));
    });
  });

  describe("could succeed", () => {
    it("should return an object with functioning getters - no feed arguments", () => {
      const fna = FeedNameArgs("SOME_FEED", {});
      expect(fna).toBeInstanceOf(Object);
      expect(fna.name()).toBe("SOME_FEED");
      expect(fna.args()).toEqual({});
      expect(JSON.parse(fna.serial())).toEqual(["SOME_FEED"]);
    });

    it("should return an object with functioning getters - with feed arguments", () => {
      const fna = FeedNameArgs("SOME_FEED", { ARG_1: "VAL_1", ARG_2: "VAL_2" });
      expect(fna).toBeInstanceOf(Object);
      expect(fna.name()).toBe("SOME_FEED");
      expect(fna.args()).toEqual({ ARG_1: "VAL_1", ARG_2: "VAL_2" });
      expect(JSON.parse(fna.serial())).toEqual([
        "SOME_FEED",
        "ARG_1",
        "VAL_1",
        "ARG_2",
        "VAL_2"
      ]);
    });
  });
});
