import validateDelta from "../validatedelta";

/* global expect:false, it:false, describe: false */

describe("The validateDelta.check() function", () => {
  it("should throw on non-object", () => {
    // Throw on non-object
    expect(() => {
      validateDelta.check(123, true);
    }).toThrow(new Error("INVALID: Not an object."));
  });

  it("should throw on invalid delta.Operation", () => {
    expect(() => {
      validateDelta.check({ Operation: "junk" }, true);
    }).toThrow(new Error("INVALID: Invalid delta operation."));
  });

  describe("the Set operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({ Operation: "Set" }, true);
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    describe("if not checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "Set",
              Path: ["something"],
              Value: 123
            },
            false
          )
        ).toBe(undefined);
      });

      it("should return success if not JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "Set",
              Path: ["something"],
              Value: { something: undefined }
            },
            false
          )
        ).toBe(undefined);
      });
    });

    describe("if checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "Set",
              Path: ["something"],
              Value: 123
            },
            true
          )
        ).toBe(undefined);
      });

      it("should throw if not JSON-expressible", () => {
        expect(() => {
          validateDelta.check(
            {
              Operation: "Set",
              Path: ["something"],
              Value: { something: undefined }
            },
            true
          );
        }).toThrow(new Error("INVALID: Delta value is not JSON-expressible."));
      });
    });
  });

  describe("the Delete operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({ Operation: "Delete" });
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    it("should return success if schema-valid", () => {
      expect(
        validateDelta.check({
          Operation: "Delete",
          Path: ["something"]
        })
      ).toBe(undefined);
    });
  });

  describe("the DeleteValue operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({ Operation: "DeleteValue" }, true);
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    describe("if not checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "DeleteValue",
              Path: ["something"],
              Value: 123
            },
            false
          )
        ).toBe(undefined);
      });

      it("should return success if not JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "DeleteValue",
              Path: ["something"],
              Value: { something: undefined }
            },
            false
          )
        ).toBe(undefined);
      });
    });

    describe("if checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "DeleteValue",
              Path: ["something"],
              Value: 123
            },
            true
          )
        ).toBe(undefined);
      });

      it("should throw if not JSON-expressible", () => {
        expect(() => {
          validateDelta.check(
            {
              Operation: "DeleteValue",
              Path: ["something"],
              Value: { something: undefined }
            },
            true
          );
        }).toThrow(new Error("INVALID: Delta value is not JSON-expressible."));
      });
    });
  });

  describe("the Prepend operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({
          Operation: "Prepend",
          Path: ["something"],
          Value: 123
        });
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    it("should return success if schema-valid", () => {
      expect(
        validateDelta.check({
          Operation: "Prepend",
          Path: ["something"],
          Value: "abc"
        })
      ).toBe(undefined);
    });
  });

  describe("the Append operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({
          Operation: "Append",
          Path: ["something"],
          Value: 123
        });
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    it("should return success if schema-valid", () => {
      expect(
        validateDelta.check({
          Operation: "Append",
          Path: ["something"],
          Value: "abc"
        })
      ).toBe(undefined);
    });
  });

  describe("the Increment operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({
          Operation: "Increment",
          Path: ["something"],
          Value: "abc"
        });
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    it("should return success if schema-valid", () => {
      expect(
        validateDelta.check({
          Operation: "Increment",
          Path: ["something"],
          Value: 123
        })
      ).toBe(undefined);
    });
  });

  describe("the Decrement operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({
          Operation: "Decrement",
          Path: ["something"],
          Value: "abc"
        });
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    it("should return success if schema-valid", () => {
      expect(
        validateDelta.check({
          Operation: "Decrement",
          Path: ["something"],
          Value: 123
        })
      ).toBe(undefined);
    });
  });

  describe("the Toggle operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({
          Operation: "Toggle"
        });
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    it("should return success if schema-valid", () => {
      expect(
        validateDelta.check({
          Operation: "Toggle",
          Path: ["something"]
        })
      ).toBe(undefined);
    });
  });

  describe("the InsertLast operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({ Operation: "InsertLast" }, true);
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    describe("if not checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertLast",
              Path: ["something"],
              Value: 123
            },
            false
          )
        ).toBe(undefined);
      });

      it("should return success if not JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertLast",
              Path: ["something"],
              Value: { something: undefined }
            },
            false
          )
        ).toBe(undefined);
      });
    });

    describe("if checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertLast",
              Path: ["something"],
              Value: 123
            },
            true
          )
        ).toBe(undefined);
      });

      it("should throw if not JSON-expressible", () => {
        expect(() => {
          validateDelta.check(
            {
              Operation: "InsertLast",
              Path: ["something"],
              Value: { something: undefined }
            },
            true
          );
        }).toThrow(new Error("INVALID: Delta value is not JSON-expressible."));
      });
    });
  });

  describe("the InsertLast operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({ Operation: "InsertLast" }, true);
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    describe("if not checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertLast",
              Path: ["something"],
              Value: 123
            },
            false
          )
        ).toBe(undefined);
      });

      it("should return success if not JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertLast",
              Path: ["something"],
              Value: { something: undefined }
            },
            false
          )
        ).toBe(undefined);
      });
    });

    describe("if checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertLast",
              Path: ["something"],
              Value: 123
            },
            true
          )
        ).toBe(undefined);
      });

      it("should throw if not JSON-expressible", () => {
        expect(() => {
          validateDelta.check(
            {
              Operation: "InsertLast",
              Path: ["something"],
              Value: { something: undefined }
            },
            true
          );
        }).toThrow(new Error("INVALID: Delta value is not JSON-expressible."));
      });
    });
  });

  describe("the InsertBefore operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({ Operation: "InsertBefore" }, true);
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    describe("if not checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertBefore",
              Path: ["something"],
              Value: 123
            },
            false
          )
        ).toBe(undefined);
      });

      it("should return success if not JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertBefore",
              Path: ["something"],
              Value: { something: undefined }
            },
            false
          )
        ).toBe(undefined);
      });
    });

    describe("if checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertBefore",
              Path: ["something"],
              Value: 123
            },
            true
          )
        ).toBe(undefined);
      });

      it("should throw if not JSON-expressible", () => {
        expect(() => {
          validateDelta.check(
            {
              Operation: "InsertBefore",
              Path: ["something"],
              Value: { something: undefined }
            },
            true
          );
        }).toThrow(new Error("INVALID: Delta value is not JSON-expressible."));
      });
    });
  });

  describe("the InsertAfter operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({ Operation: "InsertAfter" }, true);
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    describe("if not checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertAfter",
              Path: ["something"],
              Value: 123
            },
            false
          )
        ).toBe(undefined);
      });

      it("should return success if not JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertAfter",
              Path: ["something"],
              Value: { something: undefined }
            },
            false
          )
        ).toBe(undefined);
      });
    });

    describe("if checking JSON-expressibility", () => {
      it("should return success if JSON-expressible", () => {
        expect(
          validateDelta.check(
            {
              Operation: "InsertAfter",
              Path: ["something"],
              Value: 123
            },
            true
          )
        ).toBe(undefined);
      });

      it("should throw if not JSON-expressible", () => {
        expect(() => {
          validateDelta.check(
            {
              Operation: "InsertAfter",
              Path: ["something"],
              Value: { something: undefined }
            },
            true
          );
        }).toThrow(new Error("INVALID: Delta value is not JSON-expressible."));
      });
    });
  });

  describe("the DeleteFirst operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({
          Operation: "DeleteFirst"
        });
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    it("should return success if schema-valid", () => {
      expect(
        validateDelta.check({
          Operation: "DeleteFirst",
          Path: ["something"]
        })
      ).toBe(undefined);
    });
  });

  describe("the DeleteLast operation", () => {
    it("should throw on schema violation", () => {
      expect(() => {
        validateDelta.check({
          Operation: "DeleteLast"
        });
      }).toThrow(new Error("INVALID: Schema validation failed."));
    });

    it("should return success if schema-valid", () => {
      expect(
        validateDelta.check({
          Operation: "DeleteLast",
          Path: ["something"]
        })
      ).toBe(undefined);
    });
  });
});
