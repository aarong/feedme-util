import deltaWriter from "../deltawriter";

describe("The deltaWriter._checkPathElement() function", () => {
  describe("if pathElement is a string", () => {
    it("should return invalid if feedDataNode is not an object", () => {
      expect(deltaWriter._checkPathElement([], "Child")).toEqual({
        valid: false,
        reason:
          "Path references an object property but feed data node is not an object.",
      });
    });

    it("should succeed if feedDataNode is an object", () => {
      expect(deltaWriter._checkPathElement({}, "Child")).toEqual({
        valid: true,
      });
    });
  });

  describe("if pathElement is a number", () => {
    it("should return invalid if feedDataNode is not an array", () => {
      expect(deltaWriter._checkPathElement({}, 0)).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });

    it("should succeed if feedDataNode is an array", () => {
      expect(deltaWriter._checkPathElement([], 0)).toEqual({ valid: true });
    });
  });
});

describe("The deltaWriter._checkChildExists() function", () => {
  describe("if pathElement is a string", () => {
    it("should return invalid if feedDataNode is not an object", () => {
      expect(deltaWriter._checkChildExists([], "Child")).toEqual({
        valid: false,
        reason:
          "Path references an object property but feed data node is not an object.",
      });
    });

    it("should return invalid if feedDataNode is an object and does not contain the specified property", () => {
      expect(deltaWriter._checkChildExists({}, "Child")).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should succeed if feedDataNode is an object and contains the specified property", () => {
      expect(deltaWriter._checkChildExists({ Child: true }, "Child")).toEqual({
        valid: true,
      });
    });
  });

  describe("if pathElement is a number", () => {
    it("should return invalid if feedDataNode is not an array", () => {
      expect(deltaWriter._checkChildExists({}, 0)).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });

    it("should return invalid if feedDataNode is an array and does not contain the specified element", () => {
      expect(deltaWriter._checkChildExists([], 0)).toEqual({
        valid: false,
        reason: "Path references a non-existent array element.",
      });
    });

    it("should succeed if feedDataNode is an array and contains the specified element", () => {
      expect(deltaWriter._checkChildExists([true], 0)).toEqual({ valid: true });
    });
  });
});

describe("The deltaWriter._getNode() function", () => {
  describe("could fail", () => {
    it("should fail if path references non-existent object property - root - empty", () => {
      expect(deltaWriter._getNode({}, ["Missing"])).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should fail if path references non-existent object property - root - populated", () => {
      expect(deltaWriter._getNode({ Present: true }, ["Missing"])).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should fail if path references non-existent object property - within object - empty", () => {
      expect(deltaWriter._getNode({ Prop: {} }, ["Prop", "Missing"])).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should fail if path references non-existent object property - within object - populated", () => {
      expect(
        deltaWriter._getNode({ Prop: { Present: true } }, ["Prop", "Missing"]),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should fail if path references non-existent object property - within array - empty", () => {
      expect(deltaWriter._getNode([{}], [0, "Missing"])).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should fail if path references non-existent object property - within array - populated", () => {
      expect(deltaWriter._getNode([{ Present: true }], [0, "Missing"])).toEqual(
        {
          valid: false,
          reason: "Path references a non-existent object property.",
        },
      );
    });

    it("should fail if path references non-existent array element - empty", () => {
      expect(deltaWriter._getNode({ Arr: [] }, ["Arr", 0])).toEqual({
        valid: false,
        reason: "Path references a non-existent array element.",
      });
    });

    it("should fail if path references non-existent array element - populated", () => {
      expect(deltaWriter._getNode({ Arr: [true] }, ["Arr", 1])).toEqual({
        valid: false,
        reason: "Path references a non-existent array element.",
      });
    });

    it("should fail if path references non-existent array element - within array - empty", () => {
      expect(deltaWriter._getNode({ Arr: [[]] }, ["Arr", 0, 0])).toEqual({
        valid: false,
        reason: "Path references a non-existent array element.",
      });
    });

    it("should fail if path references non-existent array element - within array - populated", () => {
      expect(deltaWriter._getNode({ Arr: [[]] }, ["Arr", 0, 0])).toEqual({
        valid: false,
        reason: "Path references a non-existent array element.",
      });
    });

    it("should fail if path references property of string", () => {
      expect(
        deltaWriter._getNode({ Prop: "STRING" }, ["Prop", "Child"]),
      ).toEqual({
        valid: false,
        reason:
          "Path references an object property but feed data node is not an object.",
      });
    });

    it("should fail if path references property of number", () => {
      expect(deltaWriter._getNode({ Prop: 123 }, ["Prop", "Child"])).toEqual({
        valid: false,
        reason:
          "Path references an object property but feed data node is not an object.",
      });
    });

    it("should fail if path references property of boolean", () => {
      expect(deltaWriter._getNode({ Prop: false }, ["Prop", "Child"])).toEqual({
        valid: false,
        reason:
          "Path references an object property but feed data node is not an object.",
      });
    });

    it("should fail if path references property of null", () => {
      expect(deltaWriter._getNode({ Prop: null }, ["Prop", "Child"])).toEqual({
        valid: false,
        reason:
          "Path references an object property but feed data node is not an object.",
      });
    });

    it("should fail if path references property of array", () => {
      expect(deltaWriter._getNode({ Prop: [] }, ["Prop", "Child"])).toEqual({
        valid: false,
        reason:
          "Path references an object property but feed data node is not an object.",
      });
    });

    it("should fail if path references element of string", () => {
      expect(deltaWriter._getNode({ Prop: "STRING" }, ["Prop", 0])).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });

    it("should fail if path references element of number", () => {
      expect(deltaWriter._getNode({ Prop: 123 }, ["Prop", 0])).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });

    it("should fail if path references element of boolean", () => {
      expect(deltaWriter._getNode({ Prop: false }, ["Prop", 0])).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });

    it("should fail if path references element of null", () => {
      expect(deltaWriter._getNode({ Prop: null }, ["Prop", 0])).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });

    it("should fail if path references element of object - root", () => {
      expect(deltaWriter._getNode({}, [0])).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });

    it("should fail if path references element of object - not root", () => {
      expect(deltaWriter._getNode({ Prop: {} }, ["Prop", 0])).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });
  });

  describe("could succeed", () => {
    const feedData = {
      Child: {
        Grandchild: {
          String: "STRING",
          Number: 1,
          Boolean: true,
          Null: null,
          Array: [true],
        },
      },
      Array: [["STRING", 1, true, null, {}]],
    };

    it("should return correctly if path references root", () => {
      expect(deltaWriter._getNode(feedData, [])).toEqual({
        valid: true,
        node: feedData,
      });
    });

    it("should return correctly if path references root > child object", () => {
      expect(deltaWriter._getNode(feedData, ["Child"])).toEqual({
        valid: true,
        node: feedData.Child,
      });
    });

    it("should return correctly if path references root > child object > child object", () => {
      expect(deltaWriter._getNode(feedData, ["Child", "Grandchild"])).toEqual({
        valid: true,
        node: feedData.Child.Grandchild,
      });
    });

    it("should return correctly if path references root > child object > child object > string", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "String"]),
      ).toEqual({
        valid: true,
        node: "STRING",
      });
    });

    it("should return correctly if path references root > child object > child object > number", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Number"]),
      ).toEqual({
        valid: true,
        node: 1,
      });
    });

    it("should return correctly if path references root > child object > child object > boolean", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Boolean"]),
      ).toEqual({
        valid: true,
        node: true,
      });
    });

    it("should return correctly if path references root > child object > child object > null", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Null"]),
      ).toEqual({
        valid: true,
        node: null,
      });
    });

    it("should return correctly if path references root > child object > child object > array", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Array"]),
      ).toEqual({
        valid: true,
        node: feedData.Child.Grandchild.Array,
      });
    });

    it("should return correctly if path references root > child object > child object > array > element", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Array", 0]),
      ).toEqual({
        valid: true,
        node: true,
      });
    });

    it("should return correctly if path references root > child array", () => {
      expect(deltaWriter._getNode(feedData, ["Array"])).toEqual({
        valid: true,
        node: feedData.Array,
      });
    });

    it("should return correctly if path references root > child array > array element", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0])).toEqual({
        valid: true,
        node: feedData.Array[0],
      });
    });

    it("should return correctly if path references root > child array > array element > string", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 0])).toEqual({
        valid: true,
        node: "STRING",
      });
    });

    it("should return correctly if path references root > child array > array element > number", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 1])).toEqual({
        valid: true,
        node: 1,
      });
    });

    it("should return correctly if path references root > child array > array element > boolean", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 2])).toEqual({
        valid: true,
        node: true,
      });
    });

    it("should return correctly if path references root > child array > array element > null", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 3])).toEqual({
        valid: true,
        node: null,
      });
    });

    it("should return correctly if path references root > child array > array element > object", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 4])).toEqual({
        valid: true,
        node: feedData.Array[0][4],
      });
    });
  });
});

describe("The deltaWriter._getParentNode() function", () => {
  describe("could fail", () => {
    it("should return invalid if path references root", () => {
      expect(deltaWriter._getParentNode({}, [])).toEqual({
        valid: false,
        reason: "Path must not reference feed data root.",
      });
    });

    it("should return invalid if the parent node does not exist", () => {
      expect(deltaWriter._getParentNode({}, ["Obj1", "Obj2"])).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if the parent is not an object or array", () => {
      expect(
        deltaWriter._getParentNode({ Parent: "PARENT" }, ["Parent", "Child"]),
      ).toEqual({
        valid: false,
        reason:
          "Path references an object property but feed data node is not an object.",
      });
    });

    describe("if the child is required to exist (default)", () => {
      it("should return invalid if the parent is an object and the path endpoint is an array element", () => {
        expect(
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", 0]),
        ).toEqual({
          valid: false,
          reason:
            "Path references an array element but feed data node is not an array.",
        });
      });

      it("should return invalid if the parent is an array and the path endpoint is an object property", () => {
        expect(
          deltaWriter._getParentNode({ Parent: [] }, ["Parent", "Child"]),
        ).toEqual({
          valid: false,
          reason:
            "Path references an object property but feed data node is not an object.",
        });
      });

      it("should return invalid if child required to exist and doesn't - object", () => {
        expect(
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", "Child"]),
        ).toEqual({
          valid: false,
          reason: "Path references a non-existent object property.",
        });
      });

      it("should return invalid if child required to exist and doesn't - object", () => {
        expect(
          deltaWriter._getParentNode({ Parent: [] }, ["Parent", 0]),
        ).toEqual({
          valid: false,
          reason: "Path references a non-existent array element.",
        });
      });
    });

    describe("if the child is required to exist (explicit)", () => {
      it("should return invalid if the parent is an object and the path endpoint is an array element", () => {
        expect(
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", 0], true),
        ).toEqual({
          valid: false,
          reason:
            "Path references an array element but feed data node is not an array.",
        });
      });

      it("should return invalid if the parent is an array and the path endpoint is an object property", () => {
        expect(
          deltaWriter._getParentNode({ Parent: [] }, ["Parent", "Child"], true),
        ).toEqual({
          valid: false,
          reason:
            "Path references an object property but feed data node is not an object.",
        });
      });

      it("should return invalid if child required to exist and doesn't - object", () => {
        expect(
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", "Child"], true),
        ).toEqual({
          valid: false,
          reason: "Path references a non-existent object property.",
        });
      });

      it("should return invalid if child required to exist and doesn't - object", () => {
        expect(
          deltaWriter._getParentNode({ Parent: [] }, ["Parent", 0], true),
        ).toEqual({
          valid: false,
          reason: "Path references a non-existent array element.",
        });
      });
    });

    describe("if the child is not required to exist (explicit)", () => {
      it("should return invalid if the parent is an object and the path endpoint is an array element", () => {
        expect(
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", 0], false),
        ).toEqual({
          valid: false,
          reason:
            "Path references an array element but feed data node is not an array.",
        });
      });

      it("should return invalid if the parent is an array and the path endpoint is an object property", () => {
        expect(
          deltaWriter._getParentNode(
            { Parent: [] },
            ["Parent", "Child"],
            false,
          ),
        ).toEqual({
          valid: false,
          reason:
            "Path references an object property but feed data node is not an object.",
        });
      });
    });
  });

  describe("could succeed", () => {
    it("should return correctly if child is required to exist (default) and does - object", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: { Child: "CHILD" },
          },
          ["Parent", "Child"],
        ),
      ).toEqual({
        valid: true,
        parentNode: { Child: "CHILD" },
        childPathElement: "Child",
      });
    });

    it("should return correctly if child is required to exist (default) and does - array", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: [true],
          },
          ["Parent", 0],
        ),
      ).toEqual({
        valid: true,
        parentNode: [true],
        childPathElement: 0,
      });
    });

    it("should return correctly if child is required to exist (explicit) and does - object", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: { Child: "CHILD" },
          },
          ["Parent", "Child"],
          true,
        ),
      ).toEqual({
        valid: true,
        parentNode: { Child: "CHILD" },
        childPathElement: "Child",
      });
    });

    it("should return correctly if child is required to exist (explicit) and does - array", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: [true],
          },
          ["Parent", 0],
          true,
        ),
      ).toEqual({
        valid: true,
        parentNode: [true],
        childPathElement: 0,
      });
    });

    it("should return correctly if child is not required to exist (explicit) and does - object", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: { Child: "CHILD" },
          },
          ["Parent", "Child"],
          false,
        ),
      ).toEqual({
        valid: true,
        parentNode: { Child: "CHILD" },
        childPathElement: "Child",
      });
    });

    it("should return correctly if child is not required to exist (explicit) and does - array", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: [true],
          },
          ["Parent", 0],
          false,
        ),
      ).toEqual({
        valid: true,
        parentNode: [true],
        childPathElement: 0,
      });
    });

    it("should return correctly if child is not required to exist (explicit) and doesn't - object", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: {},
          },
          ["Parent", "Child"],
          false,
        ),
      ).toEqual({
        valid: true,
        parentNode: {},
        childPathElement: "Child",
      });
    });

    it("should return correctly if child is not required to exist (explicit) and doesn't - array", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: [],
          },
          ["Parent", 0],
          false,
        ),
      ).toEqual({
        valid: true,
        parentNode: [],
        childPathElement: 0,
      });
    });
  });
});

describe("The deltaWriter.apply() function", () => {
  it("should return invalid if feedData argument is invalid", () => {
    expect(() => {
      deltaWriter.apply(1, { Operation: "Set", Path: [], Value: 1 });
    }).toThrow(new Error("Invalid feed data object."));
  });

  it("should return invalid if delta argument is invalid", () => {
    expect(() => {
      deltaWriter.apply({}, 1);
    }).toThrow(new Error("Invalid delta object."));
  });

  describe("when invoked with a Set delta operation", () => {
    describe("path references root", () => {
      it("should return invalid if value is not an object", () => {
        expect(
          deltaWriter.apply({}, { Operation: "Set", Path: [], Value: 1 }),
        ).toEqual({
          valid: false,
          reason: "Feed data root may only be set to an object.",
        });
      });

      it("should return delta value reference value is an object", () => {
        const val = { some: "val" };
        expect(
          deltaWriter.apply({}, { Operation: "Set", Path: [], Value: val }),
        ).toEqual({
          valid: true,
          feedData: val,
        });
      });
    });

    describe("path does not reference root", () => {
      it("should return invalid if parent doesn't exist", () => {
        expect(
          deltaWriter.apply(
            {},
            { Operation: "Set", Path: ["Parent", "Child"], Value: "VALUE" },
          ),
        ).toEqual({
          valid: false,
          reason: "Path references a non-existent object property.",
        });
      });

      it("should return invalid if parent is not an array/object", () => {
        expect(
          deltaWriter.apply(
            { Parent: false },
            { Operation: "Set", Path: ["Parent", "Child"], Value: "VALUE" },
          ),
        ).toEqual({
          valid: false,
          reason:
            "Path references an object property but feed data node is not an object.",
        });
      });

      describe("if parent is an object", () => {
        it("should write new child correctly - empty", () => {
          expect(
            deltaWriter.apply(
              { Parent: {} },
              { Operation: "Set", Path: ["Parent", "Child"], Value: "VALUE" },
            ),
          ).toEqual({ valid: true, feedData: { Parent: { Child: "VALUE" } } });
        });

        it("should write new child correctly - populated", () => {
          expect(
            deltaWriter.apply(
              { Parent: { Existing: true } },
              { Operation: "Set", Path: ["Parent", "Child"], Value: "VALUE" },
            ),
          ).toEqual({
            valid: true,
            feedData: { Parent: { Child: "VALUE", Existing: true } },
          });
        });

        it("should overwrite existing child correctly", () => {
          expect(
            deltaWriter.apply(
              { Parent: { Existing: true } },
              {
                Operation: "Set",
                Path: ["Parent", "Existing"],
                Value: "VALUE",
              },
            ),
          ).toEqual({
            valid: true,
            feedData: { Parent: { Existing: "VALUE" } },
          });
        });
      });

      describe("if parent is an array", () => {
        it("should return invalid if element is non-contiguous - empty", () => {
          expect(
            deltaWriter.apply(
              { Parent: [] },
              { Operation: "Set", Path: ["Parent", 1], Value: "VALUE" },
            ),
          ).toEqual({
            valid: false,
            reason: "Cannot set a non-contiguous element of an array.",
          });
        });

        it("should return invalid if element is non-contiguous - populated", () => {
          expect(
            deltaWriter.apply(
              { Parent: [1] },
              { Operation: "Set", Path: ["Parent", 2], Value: "VALUE" },
            ),
          ).toEqual({
            valid: false,
            reason: "Cannot set a non-contiguous element of an array.",
          });
        });

        it("should write new child correctly - empty", () => {
          expect(
            deltaWriter.apply(
              { Parent: [] },
              { Operation: "Set", Path: ["Parent", 0], Value: "VALUE" },
            ),
          ).toEqual({ valid: true, feedData: { Parent: ["VALUE"] } });
        });

        it("should write new child correctly - populated", () => {
          expect(
            deltaWriter.apply(
              { Parent: [0] },
              { Operation: "Set", Path: ["Parent", 1], Value: "VALUE" },
            ),
          ).toEqual({ valid: true, feedData: { Parent: [0, "VALUE"] } });
        });

        it("should overwrite existing child correctly", () => {
          expect(
            deltaWriter.apply(
              { Parent: [true] },
              { Operation: "Set", Path: ["Parent", 0], Value: "VALUE" },
            ),
          ).toEqual({ valid: true, feedData: { Parent: ["VALUE"] } });
        });
      });
    });
  });

  describe("when invoked with a Delete delta operation", () => {
    it("should return invalid if path references root", () => {
      expect(deltaWriter.apply({}, { Operation: "Delete", Path: [] })).toEqual({
        valid: false,
        reason: "Path must not reference feed data root.",
      });
    });

    it("should return invalid if parent doesn't exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "Delete", Path: ["Parent", "Child"] },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if parent is not an object/array", () => {
      expect(
        deltaWriter.apply(
          { Parent: "INVALID" },
          { Operation: "Delete", Path: ["Parent", "Child"] },
        ),
      ).toEqual({
        valid: false,
        reason:
          "Path references an object property but feed data node is not an object.",
      });
    });

    describe("if parent is an object", () => {
      it("should return invalid if parent is ok but property doesn't exist - parent is root", () => {
        expect(
          deltaWriter.apply({}, { Operation: "Delete", Path: ["Child"] }),
        ).toEqual({
          valid: false,
          reason: "Path references a non-existent object property.",
        });
      });

      it("should return invalid if parent is ok but property doesn't exist - parent is not root", () => {
        expect(
          deltaWriter.apply(
            { Parent: {} },
            { Operation: "Delete", Path: ["Parent", "Child"] },
          ),
        ).toEqual({
          valid: false,
          reason: "Path references a non-existent object property.",
        });
      });

      it("should delete the property if it does exist - parent is root", () => {
        expect(
          deltaWriter.apply(
            { Child: true },
            { Operation: "Delete", Path: ["Child"] },
          ),
        ).toEqual({ valid: true, feedData: {} });
      });

      it("should delete the property if it does exist - parent is not root", () => {
        expect(
          deltaWriter.apply(
            { Parent: { Child: true } },
            { Operation: "Delete", Path: ["Parent", "Child"] },
          ),
        ).toEqual({ valid: true, feedData: { Parent: {} } });
      });
    });

    describe("if parent is an array", () => {
      it("should return invalid if element doesn't exist - empty", () => {
        expect(
          deltaWriter.apply(
            { Array: [] },
            { Operation: "Delete", Path: ["Array", 0] },
          ),
        ).toEqual({
          valid: false,
          reason: "Path references a non-existent array element.",
        });
      });

      it("should delete the element if it does exist - only", () => {
        expect(
          deltaWriter.apply(
            { Array: [1] },
            { Operation: "Delete", Path: ["Array", 0] },
          ),
        ).toEqual({ valid: true, feedData: { Array: [] } });
      });

      it("should delete the element if it does exist - first", () => {
        expect(
          deltaWriter.apply(
            { Array: [1, 2, 3] },
            { Operation: "Delete", Path: ["Array", 0] },
          ),
        ).toEqual({ valid: true, feedData: { Array: [2, 3] } });
      });

      it("should delete the element if it does exist - mid", () => {
        expect(
          deltaWriter.apply(
            { Array: [1, 2, 3] },
            { Operation: "Delete", Path: ["Array", 1] },
          ),
        ).toEqual({ valid: true, feedData: { Array: [1, 3] } });
      });

      it("should delete the element if it does exist - last", () => {
        expect(
          deltaWriter.apply(
            { Array: [1, 2, 3] },
            { Operation: "Delete", Path: ["Array", 2] },
          ),
        ).toEqual({ valid: true, feedData: { Array: [1, 2] } });
      });
    });
  });

  describe("when invoked with a DeleteValue delta operation", () => {
    it("should return invalid if path endpoint does not exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "DeleteValue", Path: ["Foo"], Value: 123 },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path endpoint does not refer to object/array", () => {
      expect(
        deltaWriter.apply(
          { Foo: 1 },
          { Operation: "DeleteValue", Path: ["Foo"], Value: 123 },
        ),
      ).toEqual({
        valid: false,
        reason: "Path must refer to an array or an object.",
      });
    });

    describe("if path endpoint is an object - root", () => {
      it("should return correctly if no matches", () => {
        expect(
          deltaWriter.apply(
            {
              key1: { sub: 1 },
              key2: { sub: 2 },
            },
            {
              Operation: "DeleteValue",
              Path: [],
              Value: { sub: 3 },
            },
          ),
        ).toEqual({
          valid: true,
          feedData: { key1: { sub: 1 }, key2: { sub: 2 } },
        });
      });

      it("should return correctly if some matches", () => {
        expect(
          deltaWriter.apply(
            {
              key1: { sub: 1 },
              key2: { sub: 2 },
            },
            {
              Operation: "DeleteValue",
              Path: [],
              Value: { sub: 2 },
            },
          ),
        ).toEqual({ valid: true, feedData: { key1: { sub: 1 } } });
      });

      it("should return correctly if all matches", () => {
        expect(
          deltaWriter.apply(
            {
              key1: { sub: 1 },
              key2: { sub: 1 },
            },
            {
              Operation: "DeleteValue",
              Path: [],
              Value: { sub: 1 },
            },
          ),
        ).toEqual({ valid: true, feedData: {} });
      });
    });

    describe("if path endpoint is an object - not root", () => {
      it("should return correctly if no matches", () => {
        expect(
          deltaWriter.apply(
            {
              Something: { key1: { sub: 1 }, key2: { sub: 2 } },
            },
            {
              Operation: "DeleteValue",
              Path: ["Something"],
              Value: { sub: 3 },
            },
          ),
        ).toEqual({
          valid: true,
          feedData: { Something: { key1: { sub: 1 }, key2: { sub: 2 } } },
        });
      });

      it("should return correctly if some matches", () => {
        expect(
          deltaWriter.apply(
            {
              Something: { key1: { sub: 1 }, key2: { sub: 2 } },
            },
            {
              Operation: "DeleteValue",
              Path: ["Something"],
              Value: { sub: 2 },
            },
          ),
        ).toEqual({
          valid: true,
          feedData: { Something: { key1: { sub: 1 } } },
        });
      });

      it("should return correctly if all matches", () => {
        expect(
          deltaWriter.apply(
            {
              Something: { key1: { sub: 1 }, key2: { sub: 1 } },
            },
            {
              Operation: "DeleteValue",
              Path: ["Something"],
              Value: { sub: 1 },
            },
          ),
        ).toEqual({
          valid: true,
          feedData: { Something: {} },
        });
      });
    });

    describe("if path endpoint is an array", () => {
      it("should return correctly if no matches", () => {
        expect(
          deltaWriter.apply(
            { arr: [{ sub: 1 }, { sub: 2 }] },
            {
              Operation: "DeleteValue",
              Path: ["arr"],
              Value: { sub: 3 },
            },
          ),
        ).toEqual({ valid: true, feedData: { arr: [{ sub: 1 }, { sub: 2 }] } });
      });

      it("should return correctly if some matches", () => {
        expect(
          deltaWriter.apply(
            { arr: [{ sub: 1 }, { sub: 2 }] },
            {
              Operation: "DeleteValue",
              Path: ["arr"],
              Value: { sub: 1 },
            },
          ),
        ).toEqual({ valid: true, feedData: { arr: [{ sub: 2 }] } });
      });

      it("should return correctly if all matches", () => {
        expect(
          deltaWriter.apply(
            { arr: [{ sub: 1 }, { sub: 1 }] },
            {
              Operation: "DeleteValue",
              Path: ["arr"],
              Value: { sub: 1 },
            },
          ),
        ).toEqual({ valid: true, feedData: { arr: [] } });
      });
    });
  });

  describe("when invoked with a Prepend delta operation", () => {
    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "Prepend", Path: ["foo"], Value: "bar" },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path references something other than a string", () => {
      expect(
        deltaWriter.apply(
          { foo: 1 },
          { Operation: "Prepend", Path: ["foo"], Value: "bar" },
        ),
      ).toEqual({ valid: false, reason: "Path must reference a string." });
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myString: "def" },
          {
            Operation: "Prepend",
            Path: ["myString"],
            Value: "abc",
          },
        ),
      ).toEqual({ valid: true, feedData: { myString: "abcdef" } });
    });
  });

  describe("when invoked with an Append delta operation", () => {
    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "Append", Path: ["foo"], Value: "bar" },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path references something other than a string", () => {
      expect(
        deltaWriter.apply(
          { foo: 1 },
          { Operation: "Append", Path: ["foo"], Value: "bar" },
        ),
      ).toEqual({ valid: false, reason: "Path must reference a string." });
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myString: "abc" },
          {
            Operation: "Append",
            Path: ["myString"],
            Value: "def",
          },
        ),
      ).toEqual({ valid: true, feedData: { myString: "abcdef" } });
    });
  });

  describe("when invoked with an Increment delta operation", () => {
    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "Increment", Path: ["foo"], Value: 10 },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path references something other than a number", () => {
      expect(
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "Increment", Path: ["foo"], Value: 1 },
        ),
      ).toEqual({ valid: false, reason: "Path must reference a number." });
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myNumber: 1 },
          {
            Operation: "Increment",
            Path: ["myNumber"],
            Value: 1,
          },
        ),
      ).toEqual({ valid: true, feedData: { myNumber: 2 } });
    });
  });

  describe("when invoked with a Decrement delta operation", () => {
    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "Decrement", Path: ["foo"], Value: 10 },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path references something other than a number", () => {
      expect(
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "Decrement", Path: ["foo"], Value: 1 },
        ),
      ).toEqual({ valid: false, reason: "Path must reference a number." });
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myNumber: 1 },
          {
            Operation: "Decrement",
            Path: ["myNumber"],
            Value: 1,
          },
        ),
      ).toEqual({ valid: true, feedData: { myNumber: 0 } });
    });
  });

  describe("when invoked with a Toggle delta operation", () => {
    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply({}, { Operation: "Toggle", Path: ["foo"] }),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path references something other than a boolean", () => {
      expect(
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "Toggle", Path: ["foo"] },
        ),
      ).toEqual({ valid: false, reason: "Path must reference a boolean." });
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myBool: true },
          {
            Operation: "Toggle",
            Path: ["myBool"],
          },
        ),
      ).toEqual({ valid: true, feedData: { myBool: false } });
    });
  });

  describe("when invoked with an InsertFirst delta operation", () => {
    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "InsertFirst", Path: ["foo"], Value: "abc" },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path references something other than an array", () => {
      expect(
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertFirst", Path: ["foo"], Value: 1 },
        ),
      ).toEqual({ valid: false, reason: "Path must reference an array." });
    });

    it("should return updated feed data - first element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [] },
          {
            Operation: "InsertFirst",
            Path: ["myArray"],
            Value: 1,
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1] } });
    });

    it("should return updated feed data - second element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [2] },
          {
            Operation: "InsertFirst",
            Path: ["myArray"],
            Value: 1,
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1, 2] } });
    });
  });

  describe("when invoked with an InsertLast delta operation", () => {
    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "InsertLast", Path: ["foo"], Value: "abc" },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path references something other than an array", () => {
      expect(
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertLast", Path: ["foo"], Value: 1 },
        ),
      ).toEqual({ valid: false, reason: "Path must reference an array." });
    });

    it("should return updated feed data - first element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [] },
          {
            Operation: "InsertLast",
            Path: ["myArray"],
            Value: 1,
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1] } });
    });

    it("should return updated feed data - second element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1] },
          {
            Operation: "InsertLast",
            Path: ["myArray"],
            Value: 2,
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1, 2] } });
    });
  });

  describe("when invoked with an InsertBefore delta operation", () => {
    it("should return invalid if the parent reference does not exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "InsertBefore", Path: ["foo", 0], Value: "abc" },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if the parent does not reference an array", () => {
      expect(
        deltaWriter.apply(
          { foo: {} },
          { Operation: "InsertBefore", Path: ["foo", 0], Value: "abc" },
        ),
      ).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });

    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply(
          { foo: [1, 2, 3] },
          { Operation: "InsertBefore", Path: ["foo", 3], Value: "abc" },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent array element.",
      });
    });

    it("should return invalid if path references something other than an array element", () => {
      expect(
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertBefore", Path: ["foo"], Value: 1 },
        ),
      ).toEqual({
        valid: false,
        reason: "Path must reference an array element.",
      });
    });

    it("should return updated feed data - first", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertBefore",
            Path: ["myArray", 0],
            Value: "INS",
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: ["INS", 1, 2, 3] } });
    });

    it("should return updated feed data - mid", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertBefore",
            Path: ["myArray", 1],
            Value: "INS",
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1, "INS", 2, 3] } });
    });

    it("should return updated feed data - last", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertBefore",
            Path: ["myArray", 2],
            Value: "INS",
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1, 2, "INS", 3] } });
    });
  });

  describe("when invoked with an InsertAfter delta operation", () => {
    it("should return invalid if the parent reference does not exist", () => {
      expect(
        deltaWriter.apply(
          {},
          { Operation: "InsertAfter", Path: ["foo", 0], Value: "abc" },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if the parent does not reference an array", () => {
      expect(
        deltaWriter.apply(
          { foo: {} },
          { Operation: "InsertAfter", Path: ["foo", 0], Value: "abc" },
        ),
      ).toEqual({
        valid: false,
        reason:
          "Path references an array element but feed data node is not an array.",
      });
    });

    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply(
          { foo: [1, 2, 3] },
          { Operation: "InsertAfter", Path: ["foo", 3], Value: "abc" },
        ),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent array element.",
      });
    });

    it("should return invalid if path references something other than an array element", () => {
      expect(
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertAfter", Path: ["foo"], Value: 1 },
        ),
      ).toEqual({
        valid: false,
        reason: "Path must reference an array element.",
      });
    });

    it("should return updated feed data - first", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertAfter",
            Path: ["myArray", 0],
            Value: "INS",
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1, "INS", 2, 3] } });
    });

    it("should return updated feed data - mid", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertAfter",
            Path: ["myArray", 1],
            Value: "INS",
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1, 2, "INS", 3] } });
    });

    it("should return updated feed data - last", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertAfter",
            Path: ["myArray", 2],
            Value: "INS",
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1, 2, 3, "INS"] } });
    });
  });

  describe("when invoked with a DeleteFirst delta operation", () => {
    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply({}, { Operation: "DeleteFirst", Path: ["foo"] }),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path references something other than an array", () => {
      expect(
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "DeleteFirst", Path: ["foo"] },
        ),
      ).toEqual({ valid: false, reason: "Path must reference an array." });
    });

    it("should return invalid if path references an empty array", () => {
      expect(
        deltaWriter.apply(
          { myArray: [] },
          { Operation: "DeleteFirst", Path: ["myArray"] },
        ),
      ).toEqual({
        valid: false,
        reason: "Path must reference a non-empty array.",
      });
    });

    it("should return updated feed data - not last element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "DeleteFirst",
            Path: ["myArray"],
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [2, 3] } });
    });

    it("should return updated feed data - last element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1] },
          {
            Operation: "DeleteFirst",
            Path: ["myArray"],
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [] } });
    });
  });

  describe("when invoked with a DeleteLast delta operation", () => {
    it("should return invalid if the path reference does not exist", () => {
      expect(
        deltaWriter.apply({}, { Operation: "DeleteLast", Path: ["foo"] }),
      ).toEqual({
        valid: false,
        reason: "Path references a non-existent object property.",
      });
    });

    it("should return invalid if path references something other than an array", () => {
      expect(
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "DeleteLast", Path: ["foo"] },
        ),
      ).toEqual({ valid: false, reason: "Path must reference an array." });
    });

    it("should return invalid if path references an empty array", () => {
      expect(
        deltaWriter.apply(
          { myArray: [] },
          { Operation: "DeleteLast", Path: ["myArray"] },
        ),
      ).toEqual({
        valid: false,
        reason: "Path must reference a non-empty array.",
      });
    });

    it("should return updated feed data - not last element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "DeleteLast",
            Path: ["myArray"],
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [1, 2] } });
    });

    it("should return updated feed data - last element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1] },
          {
            Operation: "DeleteLast",
            Path: ["myArray"],
          },
        ),
      ).toEqual({ valid: true, feedData: { myArray: [] } });
    });
  });
});
