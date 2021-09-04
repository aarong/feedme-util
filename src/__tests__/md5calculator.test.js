import crypto from "crypto";
import md5Calculator from "../md5calculator";

/*

A different MD5 hash implementation is used for testing purposes (crypto).
The module itself uses the browser-friendly crypto-js component, whereas here
Node's built-in crypto component is used here.

*/

// Convenience function
const md5 = str =>
  crypto
    .createHash("md5")
    .update(str)
    .digest("base64");

describe("The md5Calculator._canonicalJson() function", () => {
  it("should return correctly for base cases", () => {
    expect(md5Calculator._canonicalJson("test")).toEqual('"test"');
    expect(md5Calculator._canonicalJson("test\\")).toEqual('"test\\\\"');
    expect(md5Calculator._canonicalJson(123)).toEqual("123");
    expect(md5Calculator._canonicalJson(true)).toEqual("true");
    expect(md5Calculator._canonicalJson(false)).toEqual("false");
    expect(md5Calculator._canonicalJson(null)).toEqual("null");
  });
  it("should return correctly for object case", () => {
    expect(md5Calculator._canonicalJson({})).toEqual("{}");
    expect(md5Calculator._canonicalJson({ a: 1 })).toEqual('{"a":1}');
    expect(md5Calculator._canonicalJson({ b: 1, a: 1 })).toEqual(
      '{"a":1,"b":1}'
    );
  });
  it("should return correctly for array case", () => {
    expect(md5Calculator._canonicalJson([])).toEqual("[]");
    expect(md5Calculator._canonicalJson([1, "2"])).toEqual('[1,"2"]');
  });
  it("should return correctly on recurse", () => {
    const o = {
      b: [1, 2],
      a: { y: false, x: true }
    };
    o["c\\"] = 1;
    expect(md5Calculator._canonicalJson(o)).toEqual(
      '{"a":{"x":true,"y":false},"b":[1,2],"c\\\\":1}'
    );
  });
});

describe("The md5Calculator.calculate() function", () => {
  it("should throw on invalid feed data object", () => {
    expect(() => {
      md5Calculator.calculate("garbage");
    }).toThrow(new Error("INVALID_ARGUMENT: Feed data must be an object."));
  });

  it("should return a correct hash on a simple object", () => {
    expect(md5Calculator.calculate({})).toEqual(md5("{}"));
  });

  it("should return a correct hash on a complex object", () => {
    const o = {
      b: [1, null],
      a: { y: false, x: true }
    };
    o["c\\"] = 1;
    expect(md5Calculator.calculate(o)).toEqual(
      md5('{"a":{"x":true,"y":false},"b":[1,null],"c\\\\":1}')
    );
  });
});
