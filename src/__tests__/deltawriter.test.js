import deltaWriter from "../deltawriter";

/* global expect:false, it:false, describe: false */

describe("The deltaWriter._walkTo() function", () => {
  it("should return correctly when path references root", () => {
    const feedData = {};
    const result = deltaWriter._walkTo(feedData, []);
    expect(result).toBe(feedData);
  });

  it("should throw if accessing an element of a non-array", () => {
    expect(() => {
      deltaWriter._walkTo({ num: 1 }, ["num", 0]);
    }).toThrow(
      new Error(
        "INVALID_DELTA: Path references an element of a non-array or a member of a non-object."
      )
    );
  });

  it("should throw if accessing a child of a non-object", () => {
    expect(() => {
      deltaWriter._walkTo({ num: 1 }, ["num", "foo"]);
    }).toThrow(
      new Error(
        "INVALID_DELTA: Path references an element of a non-array or a member of a non-object."
      )
    );
  });

  describe("when path references root nodes", () => {
    it("should throw if referencing a non-existing node", () => {
      expect(() => {
        deltaWriter._walkTo({}, ["foo"]);
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if referencing array element of root", () => {
      expect(() => {
        deltaWriter._walkTo({}, [0]);
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should return a reference to an existing root child", () => {
      const feedData = { child: {} };
      const result = deltaWriter._walkTo(feedData, ["child"]);
      expect(result).toBe(feedData.child);
    });
  });

  describe("when path references root grandchildren", () => {
    it("should throw if referencing non-existing root grandchild", () => {
      expect(() => {
        deltaWriter._walkTo({ child: {} }, ["child", "foo"]);
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if referencing array element of root child", () => {
      expect(() => {
        deltaWriter._walkTo({ child: {} }, ["child", 0]);
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should return a reference to an existing root grandchild", () => {
      const feedData = { child: { grandchild: {} } };
      const result = deltaWriter._walkTo(feedData, ["child", "grandchild"]);
      expect(result).toBe(feedData.child.grandchild);
    });
  });

  describe("when path references a root-level array", () => {
    it("should throw if referencing a non-existing array element", () => {
      expect(() => {
        deltaWriter._walkTo({ arr: [] }, ["arr", 0]);
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should return a reference to an existing array element", () => {
      const feedData = { arr: [{}] };
      const result = deltaWriter._walkTo(feedData, ["arr", 0]);
      expect(result).toBe(feedData.arr[0]);
    });
  });

  describe("when path references a child array", () => {
    it("should throw if referencing a non-existing array element", () => {
      expect(() => {
        deltaWriter._walkTo({ child: { arr: [] } }, ["child", "arr", 0]);
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should return a reference to an existing array element", () => {
      const feedData = { child: { arr: [{}] } };
      const result = deltaWriter._walkTo(feedData, ["child", "arr", 0]);
      expect(result).toBe(feedData.child.arr[0]);
    });
  });

  describe("when path references a 2d array", () => {
    it("should throw if referencing a non-existing array element", () => {
      expect(() => {
        deltaWriter._walkTo({ arr: [[]] }, ["arr", 0, 0]);
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should return a reference to an existing array element", () => {
      const feedData = { arr: [[{}]] };
      const result = deltaWriter._walkTo(feedData, ["arr", 0, 0]);
      expect(result).toBe(feedData.arr[0][0]);
    });
  });
});

describe("The deltaWriter._containerPath() function", () => {
  it("should throw for root", () => {
    expect(() => {
      deltaWriter._containerPath([]);
    }).toThrow(
      new Error("INVALID_DELTA: The feed data root does not have a container.")
    );
  });

  it("should return correctly for non-root", () => {
    expect(deltaWriter._containerPath(["child"])).toEqual([]);
    expect(deltaWriter._containerPath(["child", "grandchild"])).toEqual([
      "child"
    ]);
  });
});

describe("The deltaWrite.apply() function", () => {
  it("should throw if feedData argument is invalid", () => {
    expect(() => {
      deltaWriter.apply(1, { Operation: "Set", Path: [], Value: 1 });
    }).toThrow(new Error("INVALID_ARGUMENT: Invalid feed data object."));
  });

  it("should throw if delta argument is invalid", () => {
    expect(() => {
      deltaWriter.apply({}, 1);
    }).toThrow(new Error("INVALID_ARGUMENT: Invalid delta object."));
  });

  describe("when invoked with a Set delta operation", () => {
    it("should throw if path references root and value is non-object", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "Set", Path: [], Value: 1 });
      }).toThrow(
        new Error("INVALID_DELTA: The feed data root must be an object.")
      );
    });

    it("should return delta value reference if setting root", () => {
      const val = { some: "val" };
      expect(
        deltaWriter.apply({}, { Operation: "Set", Path: [], Value: val })
      ).toBe(val);
    });

    it("should return updated feed data when writing a new object child", () => {
      const feedData = { oldkey: "oldval" };
      const result = deltaWriter.apply(feedData, {
        Operation: "Set",
        Path: ["newkey"],
        Value: "newval"
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({
        oldkey: "oldval",
        newkey: "newval"
      });
    });

    it("should throw if writing would create a non-contiguous array", () => {
      expect(() => {
        deltaWriter.apply(
          { myArray: [] },
          { Operation: "Set", Path: ["myArray", 1], Value: 1 }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Cannot write non-contiguous elements to an array."
        )
      );
    });

    it("should return updated feed data when writing a first array element", () => {
      const feedData = { myArray: [] };
      const result = deltaWriter.apply(feedData, {
        Operation: "Set",
        Path: ["myArray", 0],
        Value: "myval"
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({
        myArray: ["myval"]
      });
    });

    it("should return updated feed data when writing a second contiguous array element", () => {
      const feedData = { myArray: ["first"] };
      const result = deltaWriter.apply(feedData, {
        Operation: "Set",
        Path: ["myArray", 1],
        Value: "second"
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({
        myArray: ["first", "second"]
      });
    });
  });

  describe("when invoked with a Delete delta operation", () => {
    it("should throw if path references root", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "Delete", Path: [] });
      }).toThrow(new Error("INVALID_DELTA: Cannot delete the feed data root."));
    });

    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "Delete", Path: ["foo"] });
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should return updated feed data when deleting an object child", () => {
      const feedData = { key: "val" };
      const result = deltaWriter.apply(feedData, {
        Operation: "Delete",
        Path: ["key"]
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({});
    });

    it("should return updated feed data when deleting an array element", () => {
      const feedData = { myArr: ["one", "two", "three"] };
      const result = deltaWriter.apply(feedData, {
        Operation: "Delete",
        Path: ["myArr", 1]
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myArr: ["one", "three"] });
    });
  });

  describe("when invoked with a DeleteValue delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "DeleteValue", Path: ["foo"] });
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than an array or object", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: 1 },
          { Operation: "DeleteValue", Path: ["foo"], Value: 123 }
        );
      }).toThrow(
        new Error("INVALID_DELTA: Can only delete from arrays and objects.")
      );
    });

    it("should return updated feed data when deleting object children", () => {
      const feedData = { key1: { sub: 1 }, key2: { sub: 2 }, key3: { sub: 1 } };
      const result = deltaWriter.apply(feedData, {
        Operation: "DeleteValue",
        Path: [],
        Value: { sub: 1 }
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ key2: { sub: 2 } });
    });

    it("should return updated feed data when deleting array elements", () => {
      const feedData = { arr: [{ sub: 1 }, { sub: 2 }, { sub: 1 }] };
      const result = deltaWriter.apply(feedData, {
        Operation: "DeleteValue",
        Path: ["arr"],
        Value: { sub: 1 }
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ arr: [{ sub: 2 }] });
    });
  });

  describe("when invoked with a Prepend delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "Prepend", Path: ["foo"], Value: "bar" }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than a string", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: 1 },
          { Operation: "Prepend", Path: ["foo"], Value: "bar" }
        );
      }).toThrow(new Error("INVALID_DELTA: Can only prepend to strings."));
    });

    it("should return updated feed data", () => {
      const feedData = { myString: "def" };
      const result = deltaWriter.apply(feedData, {
        Operation: "Prepend",
        Path: ["myString"],
        Value: "abc"
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myString: "abcdef" });
    });
  });

  describe("when invoked with a Append delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "Append", Path: ["foo"], Value: "bar" }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than a string", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: 1 },
          { Operation: "Append", Path: ["foo"], Value: "bar" }
        );
      }).toThrow(new Error("INVALID_DELTA: Can only append to strings."));
    });

    it("should return updated feed data", () => {
      const feedData = { myString: "abc" };
      const result = deltaWriter.apply(feedData, {
        Operation: "Append",
        Path: ["myString"],
        Value: "def"
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myString: "abcdef" });
    });
  });

  describe("when invoked with a Increment delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "Increment", Path: ["foo"], Value: 10 }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than a number", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "Increment", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_DELTA: Can only increment numbers."));
    });

    it("should return updated feed data", () => {
      const feedData = { myNumber: 1 };
      const result = deltaWriter.apply(feedData, {
        Operation: "Increment",
        Path: ["myNumber"],
        Value: 1
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myNumber: 2 });
    });
  });

  describe("when invoked with a Decrement delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "Decrement", Path: ["foo"], Value: 10 }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than a number", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "Decrement", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_DELTA: Can only decrement numbers."));
    });

    it("should return updated feed data", () => {
      const feedData = { myNumber: 1 };
      const result = deltaWriter.apply(feedData, {
        Operation: "Decrement",
        Path: ["myNumber"],
        Value: 1
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myNumber: 0 });
    });
  });

  describe("when invoked with a Toggle delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "Toggle", Path: ["foo"] });
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than a boolean", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "Toggle", Path: ["foo"] }
        );
      }).toThrow(new Error("INVALID_DELTA: Can only toggle booleans."));
    });

    it("should return updated feed data", () => {
      const feedData = { myBool: true };
      const result = deltaWriter.apply(feedData, {
        Operation: "Toggle",
        Path: ["myBool"]
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myBool: false });
    });
  });

  describe("when invoked with a InsertFirst delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "InsertFirst", Path: ["foo"], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertFirst", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_DELTA: Can only insert into arrays."));
    });

    it("should return updated feed data", () => {
      const feedData = { myArray: [2] };
      const result = deltaWriter.apply(feedData, {
        Operation: "InsertFirst",
        Path: ["myArray"],
        Value: 1
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myArray: [1, 2] });
    });
  });

  describe("when invoked with a InsertLast delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "InsertLast", Path: ["foo"], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertLast", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_DELTA: Can only insert into arrays."));
    });

    it("should return updated feed data", () => {
      const feedData = { myArray: [1] };
      const result = deltaWriter.apply(feedData, {
        Operation: "InsertLast",
        Path: ["myArray"],
        Value: 2
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myArray: [1, 2] });
    });
  });

  describe("when invoked with a InsertBefore delta operation", () => {
    it("should throw if the path container reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "InsertBefore", Path: ["foo", 0], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: [1, 2, 3] },
          { Operation: "InsertBefore", Path: ["foo", 3], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than an array element", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertBefore", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_DELTA: Can only insert into arrays."));
    });

    it("should return updated feed data", () => {
      const feedData = { myArray: [1, 3] };
      const result = deltaWriter.apply(feedData, {
        Operation: "InsertBefore",
        Path: ["myArray", 1],
        Value: 2
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myArray: [1, 2, 3] });
    });
  });

  describe("when invoked with a InsertAfter delta operation", () => {
    it("should throw if the path container reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "InsertAfter", Path: ["foo", 0], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: [1, 2, 3] },
          { Operation: "InsertAfter", Path: ["foo", 3], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than an array element", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertAfter", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_DELTA: Can only insert into arrays."));
    });

    it("should return updated feed data", () => {
      const feedData = { myArray: [1, 3] };
      const result = deltaWriter.apply(feedData, {
        Operation: "InsertAfter",
        Path: ["myArray", 0],
        Value: 2
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myArray: [1, 2, 3] });
    });
  });

  describe("when invoked with a DeleteFirst delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "DeleteFirst", Path: ["foo"] });
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "DeleteFirst", Path: ["foo"] }
        );
      }).toThrow(
        new Error("INVALID_DELTA: Can only delete elements from arrays.")
      );
    });

    it("should throw if path references an empty array", () => {
      expect(() => {
        deltaWriter.apply(
          { myArray: [] },
          { Operation: "DeleteFirst", Path: ["myArray"] }
        );
      }).toThrow(
        new Error("INVALID_DELTA: Cannot delete elements from empty arrays.")
      );
    });

    it("should return updated feed data", () => {
      const feedData = { myArray: [1, 2, 3] };
      const result = deltaWriter.apply(feedData, {
        Operation: "DeleteFirst",
        Path: ["myArray"]
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myArray: [2, 3] });
    });
  });

  describe("when invoked with a DeleteLast delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "DeleteLast", Path: ["foo"] });
      }).toThrow(
        new Error(
          "INVALID_DELTA: Path references a non-existent location in the feed data."
        )
      );
    });

    it("should throw if path references something other than an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "DeleteLast", Path: ["foo"] }
        );
      }).toThrow(
        new Error("INVALID_DELTA: Can only delete elements from arrays.")
      );
    });

    it("should throw if path references an empty array", () => {
      expect(() => {
        deltaWriter.apply(
          { myArray: [] },
          { Operation: "DeleteLast", Path: ["myArray"] }
        );
      }).toThrow(
        new Error("INVALID_DELTA: Cannot delete elements from empty arrays.")
      );
    });

    it("should return updated feed data", () => {
      const feedData = { myArray: [1, 2, 3] };
      const result = deltaWriter.apply(feedData, {
        Operation: "DeleteLast",
        Path: ["myArray"]
      });
      expect(result).toBe(feedData);
      expect(result).toEqual({ myArray: [1, 2] });
    });
  });
});
