import check from "check-types";
import * as index from "..";

describe("The index module", () => {
  it("should export all modules", () => {
    expect(check.object(index.deltaWriter)).toBe(true);
    expect(check.function(index.FeedNameArgs)).toBe(true);
    expect(check.object(index.md5Calculator)).toBe(true);
  });
});
