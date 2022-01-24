import deltaWriter from "../deltawriter";

describe("The deltaWriter._checkPathElement() function", () => {
  describe("if pathElement is a string", () => {
    it("should throw if feedDataNode is not an object", () => {
      expect(() => {
        deltaWriter._checkPathElement([], "Child");
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references an object property but feed data node is not an object."
        )
      );
    });

    it("should succeed if feedDataNode is an object", () => {
      expect(deltaWriter._checkPathElement({}, "Child")).toEqual(undefined);
    });
  });

  describe("if pathElement is a number", () => {
    it("should throw if feedDataNode is not an array", () => {
      expect(() => {
        deltaWriter._checkPathElement({}, 0);
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references an array element but feed data node is not an array."
        )
      );
    });

    it("should succeed if feedDataNode is an array", () => {
      expect(deltaWriter._checkPathElement([], 0)).toEqual(undefined);
    });
  });
});

describe("The deltaWriter._checkChildExists() function", () => {
  describe("if pathElement is a string", () => {
    it("should throw if feedDataNode is not an object", () => {
      expect(() => {
        deltaWriter._checkChildExists([], "Child");
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references an object property but feed data node is not an object."
        )
      );
    });

    it("should throw if feedDataNode is an object and does not contain the specified property", () => {
      expect(() => {
        deltaWriter._checkChildExists({}, "Child");
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should succeed if feedDataNode is an object and contains the specified property", () => {
      expect(deltaWriter._checkChildExists({ Child: true }, "Child")).toEqual(
        undefined
      );
    });
  });

  describe("if pathElement is a number", () => {
    it("should throw if feedDataNode is not an array", () => {
      expect(() => {
        deltaWriter._checkChildExists({}, 0);
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references an array element but feed data node is not an array."
        )
      );
    });

    it("should throw if feedDataNode is an array and does not contain the specified element", () => {
      expect(() => {
        deltaWriter._checkChildExists([], 0);
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent array element."
        )
      );
    });

    it("should succeed if feedDataNode is an array and contains the specified element", () => {
      expect(deltaWriter._checkChildExists([true], 0)).toEqual(undefined);
    });
  });
});

describe("The deltaWriter._getNode() function", () => {
  describe("could fail", () => {
    it("should fail if path references non-existent object property - root - empty", () => {
      expect(() => {
        deltaWriter._getNode({}, ["Missing"]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent object property."
      );
    });

    it("should fail if path references non-existent object property - root - populated", () => {
      expect(() => {
        deltaWriter._getNode({ Present: true }, ["Missing"]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent object property."
      );
    });

    it("should fail if path references non-existent object property - within object - empty", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: {} }, ["Prop", "Missing"]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent object property."
      );
    });

    it("should fail if path references non-existent object property - within object - populated", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: { Present: true } }, ["Prop", "Missing"]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent object property."
      );
    });

    it("should fail if path references non-existent object property - within array - empty", () => {
      expect(() => {
        deltaWriter._getNode([{}], [0, "Missing"]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent object property."
      );
    });

    it("should fail if path references non-existent object property - within array - populated", () => {
      expect(() => {
        deltaWriter._getNode([{ Present: true }], [0, "Missing"]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent object property."
      );
    });

    it("should fail if path references non-existent array element - empty", () => {
      expect(() => {
        deltaWriter._getNode({ Arr: [] }, ["Arr", 0]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent array element."
      );
    });

    it("should fail if path references non-existent array element - populated", () => {
      expect(() => {
        deltaWriter._getNode({ Arr: [true] }, ["Arr", 1]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent array element."
      );
    });

    it("should fail if path references non-existent array element - within array - empty", () => {
      expect(() => {
        deltaWriter._getNode({ Arr: [[]] }, ["Arr", 0, 0]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent array element."
      );
    });

    it("should fail if path references non-existent array element - within array - populated", () => {
      expect(() => {
        deltaWriter._getNode({ Arr: [[]] }, ["Arr", 0, 0]);
      }).toThrow(
        "INVALID_OPERATION: Path references a non-existent array element."
      );
    });

    it("should fail if path references property of string", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: "STRING" }, ["Prop", "Child"]);
      }).toThrow(
        "INVALID_OPERATION: Path references an object property but feed data node is not an object."
      );
    });

    it("should fail if path references property of number", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: 123 }, ["Prop", "Child"]);
      }).toThrow(
        "INVALID_OPERATION: Path references an object property but feed data node is not an object."
      );
    });

    it("should fail if path references property of boolean", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: false }, ["Prop", "Child"]);
      }).toThrow(
        "INVALID_OPERATION: Path references an object property but feed data node is not an object."
      );
    });

    it("should fail if path references property of null", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: null }, ["Prop", "Child"]);
      }).toThrow(
        "INVALID_OPERATION: Path references an object property but feed data node is not an object."
      );
    });

    it("should fail if path references property of array", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: [] }, ["Prop", "Child"]);
      }).toThrow(
        "INVALID_OPERATION: Path references an object property but feed data node is not an object."
      );
    });

    it("should fail if path references element of string", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: "STRING" }, ["Prop", 0]);
      }).toThrow(
        "INVALID_OPERATION: Path references an array element but feed data node is not an array."
      );
    });

    it("should fail if path references element of number", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: 123 }, ["Prop", 0]);
      }).toThrow(
        "INVALID_OPERATION: Path references an array element but feed data node is not an array."
      );
    });

    it("should fail if path references element of boolean", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: false }, ["Prop", 0]);
      }).toThrow(
        "INVALID_OPERATION: Path references an array element but feed data node is not an array."
      );
    });

    it("should fail if path references element of null", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: null }, ["Prop", 0]);
      }).toThrow(
        "INVALID_OPERATION: Path references an array element but feed data node is not an array."
      );
    });

    it("should fail if path references element of object - root", () => {
      expect(() => {
        deltaWriter._getNode({}, [0]);
      }).toThrow(
        "INVALID_OPERATION: Path references an array element but feed data node is not an array."
      );
    });

    it("should fail if path references element of object - not root", () => {
      expect(() => {
        deltaWriter._getNode({ Prop: {} }, ["Prop", 0]);
      }).toThrow(
        "INVALID_OPERATION: Path references an array element but feed data node is not an array."
      );
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
          Array: [true]
        }
      },
      Array: [["STRING", 1, true, null, {}]]
    };

    it("should return correctly if path references root", () => {
      expect(deltaWriter._getNode(feedData, [])).toBe(feedData);
    });

    it("should return correctly if path references root > child object", () => {
      expect(deltaWriter._getNode(feedData, ["Child"])).toBe(feedData.Child);
    });

    it("should return correctly if path references root > child object > child object", () => {
      expect(deltaWriter._getNode(feedData, ["Child", "Grandchild"])).toBe(
        feedData.Child.Grandchild
      );
    });

    it("should return correctly if path references root > child object > child object > string", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "String"])
      ).toBe("STRING");
    });

    it("should return correctly if path references root > child object > child object > number", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Number"])
      ).toBe(1);
    });

    it("should return correctly if path references root > child object > child object > boolean", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Boolean"])
      ).toBe(true);
    });

    it("should return correctly if path references root > child object > child object > null", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Null"])
      ).toBe(null);
    });

    it("should return correctly if path references root > child object > child object > array", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Array"])
      ).toBe(feedData.Child.Grandchild.Array);
    });

    it("should return correctly if path references root > child object > child object > array > element", () => {
      expect(
        deltaWriter._getNode(feedData, ["Child", "Grandchild", "Array", 0])
      ).toBe(true);
    });

    it("should return correctly if path references root > child array", () => {
      expect(deltaWriter._getNode(feedData, ["Array"])).toBe(feedData.Array);
    });

    it("should return correctly if path references root > child array > array element", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0])).toBe(
        feedData.Array[0]
      );
    });

    it("should return correctly if path references root > child array > array element > string", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 0])).toBe("STRING");
    });

    it("should return correctly if path references root > child array > array element > number", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 1])).toBe(1);
    });

    it("should return correctly if path references root > child array > array element > boolean", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 2])).toBe(true);
    });

    it("should return correctly if path references root > child array > array element > null", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 3])).toBe(null);
    });

    it("should return correctly if path references root > child array > array element > object", () => {
      expect(deltaWriter._getNode(feedData, ["Array", 0, 4])).toBe(
        feedData.Array[0][4]
      );
    });
  });
});

describe("The deltaWriter._getParentNode() function", () => {
  describe("could fail", () => {
    it("should throw if path references root", () => {
      expect(() => {
        deltaWriter._getParentNode({}, []);
      }).toThrow(
        new Error("INVALID_OPERATION: Path must not reference feed data root.")
      );
    });

    it("should throw if the parent node does not exist", () => {
      expect(() => {
        deltaWriter._getParentNode({}, ["Obj1", "Obj2"]);
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if the parent is not an object or array", () => {
      expect(() => {
        deltaWriter._getParentNode({ Parent: "PARENT" }, ["Parent", "Child"]);
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references an object property but feed data node is not an object."
        )
      );
    });

    describe("if the child is required to exist (default)", () => {
      it("should throw if the parent is an object and the path endpoint is an array element", () => {
        expect(() => {
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", 0]);
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references an array element but feed data node is not an array."
          )
        );
      });

      it("should throw if the parent is an array and the path endpoint is an object property", () => {
        expect(() => {
          deltaWriter._getParentNode({ Parent: [] }, ["Parent", "Child"]);
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references an object property but feed data node is not an object."
          )
        );
      });

      it("should throw if child required to exist and doesn't - object", () => {
        expect(() => {
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", "Child"]);
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references a non-existent object property."
          )
        );
      });

      it("should throw if child required to exist and doesn't - object", () => {
        expect(() => {
          deltaWriter._getParentNode({ Parent: [] }, ["Parent", 0]);
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references a non-existent array element."
          )
        );
      });
    });

    describe("if the child is required to exist (explicit)", () => {
      it("should throw if the parent is an object and the path endpoint is an array element", () => {
        expect(() => {
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", 0], true);
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references an array element but feed data node is not an array."
          )
        );
      });

      it("should throw if the parent is an array and the path endpoint is an object property", () => {
        expect(() => {
          deltaWriter._getParentNode({ Parent: [] }, ["Parent", "Child"], true);
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references an object property but feed data node is not an object."
          )
        );
      });

      it("should throw if child required to exist and doesn't - object", () => {
        expect(() => {
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", "Child"], true);
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references a non-existent object property."
          )
        );
      });

      it("should throw if child required to exist and doesn't - object", () => {
        expect(() => {
          deltaWriter._getParentNode({ Parent: [] }, ["Parent", 0], true);
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references a non-existent array element."
          )
        );
      });
    });

    describe("if the child is not required to exist (explicit)", () => {
      it("should throw if the parent is an object and the path endpoint is an array element", () => {
        expect(() => {
          deltaWriter._getParentNode({ Parent: {} }, ["Parent", 0], false);
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references an array element but feed data node is not an array."
          )
        );
      });

      it("should throw if the parent is an array and the path endpoint is an object property", () => {
        expect(() => {
          deltaWriter._getParentNode(
            { Parent: [] },
            ["Parent", "Child"],
            false
          );
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references an object property but feed data node is not an object."
          )
        );
      });
    });
  });

  describe("could succeed", () => {
    it("should return correctly if child is required to exist (default) and does - object", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: { Child: "CHILD" }
          },
          ["Parent", "Child"]
        )
      ).toEqual({
        parentNode: { Child: "CHILD" },
        childPathElement: "Child"
      });
    });

    it("should return correctly if child is required to exist (default) and does - array", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: [true]
          },
          ["Parent", 0]
        )
      ).toEqual({
        parentNode: [true],
        childPathElement: 0
      });
    });

    it("should return correctly if child is required to exist (explicit) and does - object", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: { Child: "CHILD" }
          },
          ["Parent", "Child"],
          true
        )
      ).toEqual({
        parentNode: { Child: "CHILD" },
        childPathElement: "Child"
      });
    });

    it("should return correctly if child is required to exist (explicit) and does - array", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: [true]
          },
          ["Parent", 0],
          true
        )
      ).toEqual({
        parentNode: [true],
        childPathElement: 0
      });
    });

    it("should return correctly if child is not required to exist (explicit) and does - object", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: { Child: "CHILD" }
          },
          ["Parent", "Child"],
          false
        )
      ).toEqual({
        parentNode: { Child: "CHILD" },
        childPathElement: "Child"
      });
    });

    it("should return correctly if child is not required to exist (explicit) and does - array", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: [true]
          },
          ["Parent", 0],
          false
        )
      ).toEqual({
        parentNode: [true],
        childPathElement: 0
      });
    });

    it("should return correctly if child is not required to exist (explicit) and doesn't - object", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: {}
          },
          ["Parent", "Child"],
          false
        )
      ).toEqual({
        parentNode: {},
        childPathElement: "Child"
      });
    });

    it("should return correctly if child is not required to exist (explicit) and doesn't - array", () => {
      expect(
        deltaWriter._getParentNode(
          {
            Parent: []
          },
          ["Parent", 0],
          false
        )
      ).toEqual({
        parentNode: [],
        childPathElement: 0
      });
    });
  });
});

describe("The deltaWriter.apply() function", () => {
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
    describe("path references root", () => {
      it("should throw if value is not an object", () => {
        expect(() => {
          deltaWriter.apply({}, { Operation: "Set", Path: [], Value: 1 });
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Feed data root may only be set to an object."
          )
        );
      });

      it("should return delta value reference value is an object", () => {
        const val = { some: "val" };
        expect(
          deltaWriter.apply({}, { Operation: "Set", Path: [], Value: val })
        ).toBe(val);
      });
    });

    describe("path does not reference root", () => {
      it("should throw if parent doesn't exist", () => {
        expect(() => {
          deltaWriter.apply(
            {},
            { Operation: "Set", Path: ["Parent", "Child"], Value: "VALUE" }
          );
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references a non-existent object property."
          )
        );
      });

      it("should throw if parent is not an array/object", () => {
        expect(() => {
          deltaWriter.apply(
            { Parent: false },
            { Operation: "Set", Path: ["Parent", "Child"], Value: "VALUE" }
          );
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references an object property but feed data node is not an object."
          )
        );
      });

      describe("if parent is an object", () => {
        it("should write new child correctly - empty", () => {
          expect(
            deltaWriter.apply(
              { Parent: {} },
              { Operation: "Set", Path: ["Parent", "Child"], Value: "VALUE" }
            )
          ).toEqual({ Parent: { Child: "VALUE" } });
        });

        it("should write new child correctly - populated", () => {
          expect(
            deltaWriter.apply(
              { Parent: { Existing: true } },
              { Operation: "Set", Path: ["Parent", "Child"], Value: "VALUE" }
            )
          ).toEqual({ Parent: { Child: "VALUE", Existing: true } });
        });

        it("should overwrite existing child correctly", () => {
          expect(
            deltaWriter.apply(
              { Parent: { Existing: true } },
              { Operation: "Set", Path: ["Parent", "Existing"], Value: "VALUE" }
            )
          ).toEqual({ Parent: { Existing: "VALUE" } });
        });
      });

      describe("if parent is an array", () => {
        it("should throw if element is non-contiguous - empty", () => {
          expect(() => {
            deltaWriter.apply(
              { Parent: [] },
              { Operation: "Set", Path: ["Parent", 1], Value: "VALUE" }
            );
          }).toThrow(
            new Error(
              "INVALID_OPERATION: Cannot set a non-contiguous element of an array."
            )
          );
        });

        it("should throw if element is non-contiguous - populated", () => {
          expect(() => {
            deltaWriter.apply(
              { Parent: [1] },
              { Operation: "Set", Path: ["Parent", 2], Value: "VALUE" }
            );
          }).toThrow(
            new Error(
              "INVALID_OPERATION: Cannot set a non-contiguous element of an array."
            )
          );
        });

        it("should write new child correctly - empty", () => {
          expect(
            deltaWriter.apply(
              { Parent: [] },
              { Operation: "Set", Path: ["Parent", 0], Value: "VALUE" }
            )
          ).toEqual({ Parent: ["VALUE"] });
        });

        it("should write new child correctly - populated", () => {
          expect(
            deltaWriter.apply(
              { Parent: [0] },
              { Operation: "Set", Path: ["Parent", 1], Value: "VALUE" }
            )
          ).toEqual({ Parent: [0, "VALUE"] });
        });

        it("should overwrite existing child correctly", () => {
          expect(
            deltaWriter.apply(
              { Parent: [true] },
              { Operation: "Set", Path: ["Parent", 0], Value: "VALUE" }
            )
          ).toEqual({ Parent: ["VALUE"] });
        });
      });
    });
  });

  describe("when invoked with a Delete delta operation", () => {
    it("should throw if path references root", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "Delete", Path: [] });
      }).toThrow(
        new Error("INVALID_OPERATION: Path must not reference feed data root.")
      );
    });

    it("should throw if parent doesn't exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "Delete", Path: ["Parent", "Child"] }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if parent is not an object/array", () => {});

    describe("if parent is an object", () => {
      it("should throw if parent is ok but property doesn't exist - parent is root", () => {
        expect(() => {
          deltaWriter.apply({}, { Operation: "Delete", Path: ["Child"] });
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references a non-existent object property."
          )
        );
      });

      it("should throw if parent is ok but property doesn't exist - parent is not root", () => {
        expect(() => {
          deltaWriter.apply(
            { Parent: {} },
            { Operation: "Delete", Path: ["Parent", "Child"] }
          );
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references a non-existent object property."
          )
        );
      });

      it("should delete the property if it does exist - parent is root", () => {
        expect(
          deltaWriter.apply(
            { Child: true },
            { Operation: "Delete", Path: ["Child"] }
          )
        ).toEqual({});
      });

      it("should delete the property if it does exist - parent is not root", () => {
        expect(
          deltaWriter.apply(
            { Parent: { Child: true } },
            { Operation: "Delete", Path: ["Parent", "Child"] }
          )
        ).toEqual({ Parent: {} });
      });
    });

    describe("if parent is an array", () => {
      it("should throw if element doesn't exist - empty", () => {
        expect(() => {
          deltaWriter.apply(
            { Array: [] },
            { Operation: "Delete", Path: ["Array", 0] }
          );
        }).toThrow(
          new Error(
            "INVALID_OPERATION: Path references a non-existent array element."
          )
        );
      });

      it("should delete the element if it does exist - only", () => {
        expect(
          deltaWriter.apply(
            { Array: [1] },
            { Operation: "Delete", Path: ["Array", 0] }
          )
        ).toEqual({ Array: [] });
      });

      it("should delete the element if it does exist - first", () => {
        expect(
          deltaWriter.apply(
            { Array: [1, 2, 3] },
            { Operation: "Delete", Path: ["Array", 0] }
          )
        ).toEqual({ Array: [2, 3] });
      });

      it("should delete the element if it does exist - mid", () => {
        expect(
          deltaWriter.apply(
            { Array: [1, 2, 3] },
            { Operation: "Delete", Path: ["Array", 1] }
          )
        ).toEqual({ Array: [1, 3] });
      });

      it("should delete the element if it does exist - last", () => {
        expect(
          deltaWriter.apply(
            { Array: [1, 2, 3] },
            { Operation: "Delete", Path: ["Array", 2] }
          )
        ).toEqual({ Array: [1, 2] });
      });
    });
  });

  describe("when invoked with a DeleteValue delta operation", () => {
    it("should throw if path endpoint does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "DeleteValue", Path: ["Foo"], Value: 123 }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path endpoint does not refer to object/array", () => {
      expect(() => {
        deltaWriter.apply(
          { Foo: 1 },
          { Operation: "DeleteValue", Path: ["Foo"], Value: 123 }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path must refer to an array or an object."
        )
      );
    });

    describe("if path endpoint is an object - root", () => {
      it("should return correctly if no matches", () => {
        expect(
          deltaWriter.apply(
            {
              key1: { sub: 1 },
              key2: { sub: 2 }
            },
            {
              Operation: "DeleteValue",
              Path: [],
              Value: { sub: 3 }
            }
          )
        ).toEqual({ key1: { sub: 1 }, key2: { sub: 2 } });
      });

      it("should return correctly if some matches", () => {
        expect(
          deltaWriter.apply(
            {
              key1: { sub: 1 },
              key2: { sub: 2 }
            },
            {
              Operation: "DeleteValue",
              Path: [],
              Value: { sub: 2 }
            }
          )
        ).toEqual({ key1: { sub: 1 } });
      });

      it("should return correctly if all matches", () => {
        expect(
          deltaWriter.apply(
            {
              key1: { sub: 1 },
              key2: { sub: 1 }
            },
            {
              Operation: "DeleteValue",
              Path: [],
              Value: { sub: 1 }
            }
          )
        ).toEqual({});
      });
    });

    describe("if path endpoint is an object - not root", () => {
      it("should return correctly if no matches", () => {
        expect(
          deltaWriter.apply(
            {
              Something: { key1: { sub: 1 }, key2: { sub: 2 } }
            },
            {
              Operation: "DeleteValue",
              Path: ["Something"],
              Value: { sub: 3 }
            }
          )
        ).toEqual({ Something: { key1: { sub: 1 }, key2: { sub: 2 } } });
      });

      it("should return correctly if some matches", () => {
        expect(
          deltaWriter.apply(
            {
              Something: { key1: { sub: 1 }, key2: { sub: 2 } }
            },
            {
              Operation: "DeleteValue",
              Path: ["Something"],
              Value: { sub: 2 }
            }
          )
        ).toEqual({ Something: { key1: { sub: 1 } } });
      });

      it("should return correctly if all matches", () => {
        expect(
          deltaWriter.apply(
            {
              Something: { key1: { sub: 1 }, key2: { sub: 1 } }
            },
            {
              Operation: "DeleteValue",
              Path: ["Something"],
              Value: { sub: 1 }
            }
          )
        ).toEqual({ Something: {} });
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
              Value: { sub: 3 }
            }
          )
        ).toEqual({ arr: [{ sub: 1 }, { sub: 2 }] });
      });

      it("should return correctly if some matches", () => {
        expect(
          deltaWriter.apply(
            { arr: [{ sub: 1 }, { sub: 2 }] },
            {
              Operation: "DeleteValue",
              Path: ["arr"],
              Value: { sub: 1 }
            }
          )
        ).toEqual({ arr: [{ sub: 2 }] });
      });

      it("should return correctly if all matches", () => {
        expect(
          deltaWriter.apply(
            { arr: [{ sub: 1 }, { sub: 1 }] },
            {
              Operation: "DeleteValue",
              Path: ["arr"],
              Value: { sub: 1 }
            }
          )
        ).toEqual({ arr: [] });
      });
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
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path references something other than a string", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: 1 },
          { Operation: "Prepend", Path: ["foo"], Value: "bar" }
        );
      }).toThrow(new Error("INVALID_OPERATION: Path must reference a string."));
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myString: "def" },
          {
            Operation: "Prepend",
            Path: ["myString"],
            Value: "abc"
          }
        )
      ).toEqual({ myString: "abcdef" });
    });
  });

  describe("when invoked with an Append delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "Append", Path: ["foo"], Value: "bar" }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path references something other than a string", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: 1 },
          { Operation: "Append", Path: ["foo"], Value: "bar" }
        );
      }).toThrow(new Error("INVALID_OPERATION: Path must reference a string."));
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myString: "abc" },
          {
            Operation: "Append",
            Path: ["myString"],
            Value: "def"
          }
        )
      ).toEqual({ myString: "abcdef" });
    });
  });

  describe("when invoked with an Increment delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "Increment", Path: ["foo"], Value: 10 }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path references something other than a number", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "Increment", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_OPERATION: Path must reference a number."));
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myNumber: 1 },
          {
            Operation: "Increment",
            Path: ["myNumber"],
            Value: 1
          }
        )
      ).toEqual({ myNumber: 2 });
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
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path references something other than a number", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "Decrement", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_OPERATION: Path must reference a number."));
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myNumber: 1 },
          {
            Operation: "Decrement",
            Path: ["myNumber"],
            Value: 1
          }
        )
      ).toEqual({ myNumber: 0 });
    });
  });

  describe("when invoked with a Toggle delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "Toggle", Path: ["foo"] });
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path references something other than a boolean", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "Toggle", Path: ["foo"] }
        );
      }).toThrow(
        new Error("INVALID_OPERATION: Path must reference a boolean.")
      );
    });

    it("should return updated feed data", () => {
      expect(
        deltaWriter.apply(
          { myBool: true },
          {
            Operation: "Toggle",
            Path: ["myBool"]
          }
        )
      ).toEqual({ myBool: false });
    });
  });

  describe("when invoked with an InsertFirst delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "InsertFirst", Path: ["foo"], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path references something other than an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertFirst", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_OPERATION: Path must reference an array."));
    });

    it("should return updated feed data - first element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [] },
          {
            Operation: "InsertFirst",
            Path: ["myArray"],
            Value: 1
          }
        )
      ).toEqual({ myArray: [1] });
    });

    it("should return updated feed data - second element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [2] },
          {
            Operation: "InsertFirst",
            Path: ["myArray"],
            Value: 1
          }
        )
      ).toEqual({ myArray: [1, 2] });
    });
  });

  describe("when invoked with an InsertLast delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "InsertLast", Path: ["foo"], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path references something other than an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertLast", Path: ["foo"], Value: 1 }
        );
      }).toThrow(new Error("INVALID_OPERATION: Path must reference an array."));
    });

    it("should return updated feed data - first element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [] },
          {
            Operation: "InsertLast",
            Path: ["myArray"],
            Value: 1
          }
        )
      ).toEqual({ myArray: [1] });
    });

    it("should return updated feed data - second element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1] },
          {
            Operation: "InsertLast",
            Path: ["myArray"],
            Value: 2
          }
        )
      ).toEqual({ myArray: [1, 2] });
    });
  });

  describe("when invoked with an InsertBefore delta operation", () => {
    it("should throw if the parent reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "InsertBefore", Path: ["foo", 0], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if the parent does not reference an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: {} },
          { Operation: "InsertBefore", Path: ["foo", 0], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references an array element but feed data node is not an array."
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
          "INVALID_OPERATION: Path references a non-existent array element."
        )
      );
    });

    it("should throw if path references something other than an array element", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertBefore", Path: ["foo"], Value: 1 }
        );
      }).toThrow(
        new Error("INVALID_OPERATION: Path must reference an array element.")
      );
    });

    it("should return updated feed data - first", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertBefore",
            Path: ["myArray", 0],
            Value: "INS"
          }
        )
      ).toEqual({ myArray: ["INS", 1, 2, 3] });
    });

    it("should return updated feed data - mid", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertBefore",
            Path: ["myArray", 1],
            Value: "INS"
          }
        )
      ).toEqual({ myArray: [1, "INS", 2, 3] });
    });

    it("should return updated feed data - last", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertBefore",
            Path: ["myArray", 2],
            Value: "INS"
          }
        )
      ).toEqual({ myArray: [1, 2, "INS", 3] });
    });
  });

  describe("when invoked with an InsertAfter delta operation", () => {
    it("should throw if the parent reference does not exist", () => {
      expect(() => {
        deltaWriter.apply(
          {},
          { Operation: "InsertAfter", Path: ["foo", 0], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if the parent does not reference an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: {} },
          { Operation: "InsertAfter", Path: ["foo", 0], Value: "abc" }
        );
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references an array element but feed data node is not an array."
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
          "INVALID_OPERATION: Path references a non-existent array element."
        )
      );
    });

    it("should throw if path references something other than an array element", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "InsertAfter", Path: ["foo"], Value: 1 }
        );
      }).toThrow(
        new Error("INVALID_OPERATION: Path must reference an array element.")
      );
    });

    it("should return updated feed data - first", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertAfter",
            Path: ["myArray", 0],
            Value: "INS"
          }
        )
      ).toEqual({ myArray: [1, "INS", 2, 3] });
    });

    it("should return updated feed data - mid", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertAfter",
            Path: ["myArray", 1],
            Value: "INS"
          }
        )
      ).toEqual({ myArray: [1, 2, "INS", 3] });
    });

    it("should return updated feed data - last", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "InsertAfter",
            Path: ["myArray", 2],
            Value: "INS"
          }
        )
      ).toEqual({ myArray: [1, 2, 3, "INS"] });
    });
  });

  describe("when invoked with a DeleteFirst delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "DeleteFirst", Path: ["foo"] });
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path references something other than an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "DeleteFirst", Path: ["foo"] }
        );
      }).toThrow(new Error("INVALID_OPERATION: Path must reference an array."));
    });

    it("should throw if path references an empty array", () => {
      expect(() => {
        deltaWriter.apply(
          { myArray: [] },
          { Operation: "DeleteFirst", Path: ["myArray"] }
        );
      }).toThrow(
        new Error("INVALID_OPERATION: Path must reference a non-empty array.")
      );
    });

    it("should return updated feed data - not last element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "DeleteFirst",
            Path: ["myArray"]
          }
        )
      ).toEqual({ myArray: [2, 3] });
    });

    it("should return updated feed data - last element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1] },
          {
            Operation: "DeleteFirst",
            Path: ["myArray"]
          }
        )
      ).toEqual({ myArray: [] });
    });
  });

  describe("when invoked with a DeleteLast delta operation", () => {
    it("should throw if the path reference does not exist", () => {
      expect(() => {
        deltaWriter.apply({}, { Operation: "DeleteLast", Path: ["foo"] });
      }).toThrow(
        new Error(
          "INVALID_OPERATION: Path references a non-existent object property."
        )
      );
    });

    it("should throw if path references something other than an array", () => {
      expect(() => {
        deltaWriter.apply(
          { foo: "abc" },
          { Operation: "DeleteLast", Path: ["foo"] }
        );
      }).toThrow(new Error("INVALID_OPERATION: Path must reference an array."));
    });

    it("should throw if path references an empty array", () => {
      expect(() => {
        deltaWriter.apply(
          { myArray: [] },
          { Operation: "DeleteLast", Path: ["myArray"] }
        );
      }).toThrow(
        new Error("INVALID_OPERATION: Path must reference a non-empty array.")
      );
    });

    it("should return updated feed data - not last element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1, 2, 3] },
          {
            Operation: "DeleteLast",
            Path: ["myArray"]
          }
        )
      ).toEqual({ myArray: [1, 2] });
    });

    it("should return updated feed data - last element", () => {
      expect(
        deltaWriter.apply(
          { myArray: [1] },
          {
            Operation: "DeleteLast",
            Path: ["myArray"]
          }
        )
      ).toEqual({ myArray: [] });
    });
  });
});
