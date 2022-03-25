import FeedNameArgs from "../feednameargs";

describe("Invalid usage", () => {
  it("should produce error if no args", () => {
    const errMsg = "Expects either one or two arguments.";
    const fna = FeedNameArgs();
    expect(fna.error()).toBe(errMsg);
    expect(() => {
      fna.name();
    }).toThrow(new Error(errMsg));
    expect(() => {
      fna.args();
    }).toThrow(new Error(errMsg));
    expect(() => {
      fna.serial();
    }).toThrow(new Error(errMsg));
  });

  it("should produce error if 3+ args", () => {
    const errMsg = "Expects either one or two arguments.";
    const fna = FeedNameArgs();
    expect(fna.error()).toBe(errMsg);
    expect(() => {
      fna.name();
    }).toThrow(new Error(errMsg));
    expect(() => {
      fna.args();
    }).toThrow(new Error(errMsg));
    expect(() => {
      fna.serial();
    }).toThrow(new Error(errMsg));
  });
});

describe("Feed serial usage", () => {
  describe("could fail", () => {
    it("should produce error if non-string argument", () => {
      const errMsg = "Feed serial is not a string.";
      const fna = FeedNameArgs(123);
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if non-string argument", () => {
      const errMsg = "Feed serial is not valid JSON.";
      const fna = FeedNameArgs("}{");
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if JSON value is not an array", () => {
      const errMsg = "Feed serial is not a JSON array.";
      const fna = FeedNameArgs("{}");
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if JSON array is not of odd length - zero", () => {
      const errMsg = "Feed serial JSON array must have odd length.";
      const fna = FeedNameArgs("[]");
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if JSON array is not of odd length - two", () => {
      const errMsg = "Feed serial JSON array must have odd length.";
      const fna = FeedNameArgs('["1", "2"]');
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if JSON array includes a non-string element - first - truthy", () => {
      const errMsg = "Feed serial JSON array includes non-string element.";
      const fna = FeedNameArgs("[1]");
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if JSON array includes a non-string element - first - falsy", () => {
      const errMsg = "Feed serial JSON array includes non-string element.";
      const fna = FeedNameArgs("[0]");
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if JSON array includes a non-string element - third", () => {
      const errMsg = "Feed serial JSON array includes non-string element.";
      const fna = FeedNameArgs('["one", "two", 3]');
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });
  });

  describe("could succeed", () => {
    it("should return an object with functioning getters - empty name", () => {
      const ser = '[""]';
      const fna = FeedNameArgs(ser);
      expect(fna.error()).toBe(null);
      expect(fna.name()).toBe("");
      expect(fna.args()).toEqual({});
      expect(fna.serial()).toBe(ser);
    });

    it("should return an object with functioning getters - no feed arguments", () => {
      const ser = '["SOME_FEED"]';
      const fna = FeedNameArgs(ser);
      expect(fna.error()).toBe(null);
      expect(fna.name()).toBe("SOME_FEED");
      expect(fna.args()).toEqual({});
      expect(fna.serial()).toBe(ser);
    });

    it("should return an object with functioning getters - with feed arguments", () => {
      const ser = '["SOME_FEED", "ARG_1", "VAL_1", "ARG_2", "VAL_2"]';
      const fna = FeedNameArgs(ser);
      expect(fna.error()).toBe(null);
      expect(fna.name()).toBe("SOME_FEED");
      expect(fna.args()).toEqual({ ARG_1: "VAL_1", ARG_2: "VAL_2" });
      expect(fna.serial()).toBe(ser);
    });

    it("should freeze the returned feed args object", () => {
      const ser = '["SOME_FEED", "ARG_1", "VAL_1", "ARG_2", "VAL_2"]';
      const fna = FeedNameArgs(ser);
      const args = fna.args();
      expect(() => {
        args.NEW = 123;
      }).toThrow(TypeError); // TypeError: Cannot add property NEW, object is not extensible
    });
  });
});

describe("Feed name/arg usage", () => {
  describe("could fail", () => {
    it("should produce error if invalid feed name type", () => {
      const errMsg = "Invalid feed name.";
      const fna = FeedNameArgs(123, {});
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if invalid feed args type", () => {
      const errMsg = "Invalid feed arguments object.";
      const fna = FeedNameArgs("SOME_FEED", 123);
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if invalid feed args - property type - falsy", () => {
      const errMsg = "Invalid feed arguments object.";
      const fna = FeedNameArgs("SOME_FEED", { SOME_ARG: 0 });
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });

    it("should produce error if invalid feed args - property type - truthy", () => {
      const errMsg = "Invalid feed arguments object.";
      const fna = FeedNameArgs("SOME_FEED", { SOME_ARG: 1 });
      expect(fna.error()).toBe(errMsg);
      expect(() => {
        fna.name();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.args();
      }).toThrow(new Error(errMsg));
      expect(() => {
        fna.serial();
      }).toThrow(new Error(errMsg));
    });
  });

  describe("could succeed", () => {
    it("should return an object with functioning getters - empty name", () => {
      const fna = FeedNameArgs("", {});
      expect(fna.error()).toBe(null);
      expect(fna.name()).toBe("");
      expect(fna.args()).toEqual({});
      expect(JSON.parse(fna.serial())).toEqual([""]);
    });

    it("should return an object with functioning getters - no feed args", () => {
      const fna = FeedNameArgs("SOME_FEED", {});
      expect(fna.error()).toBe(null);
      expect(fna.name()).toBe("SOME_FEED");
      expect(fna.args()).toEqual({});
      expect(JSON.parse(fna.serial())).toEqual(["SOME_FEED"]);
    });

    it("should return an object with functioning getters - with feed args", () => {
      const fna = FeedNameArgs("SOME_FEED", { ARG_1: "VAL_1", ARG_2: "VAL_2" });
      expect(fna.error()).toBe(null);
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

    it("should not change results if the outside args object changes", () => {
      const args = {
        ORIG: "ORIG"
      };
      const fna = FeedNameArgs("SOME_FEED", args);
      args.NEW = "NEW";
      expect(fna.error()).toBe(null);
      expect(fna.name()).toBe("SOME_FEED");
      expect(fna.args()).toEqual({ ORIG: "ORIG" });
      expect(JSON.parse(fna.serial())).toEqual(["SOME_FEED", "ORIG", "ORIG"]);
    });

    it("should freeze the returned feed args object", () => {
      const fna = FeedNameArgs("SOME_FEED", { feed: "args" });
      const args = fna.args();
      expect(() => {
        args.NEW = 123;
      }).toThrow(TypeError); // TypeError: Cannot add property NEW, object is not extensible
    });
  });
});
