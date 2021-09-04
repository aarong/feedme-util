import check from "check-types";
import * as index from "..";

describe("The index module", () => {
  it("should export all modules", () => {
    expect(check.object(index.deltaWriter)).toBe(true);
    expect(check.object(index.feedSerializer)).toBe(true);
    expect(check.object(index.md5Calculator)).toBe(true);
    expect(check.object(index.validateAction)).toBe(true);
    expect(check.object(index.validateActionResponse)).toBe(true);
    expect(check.object(index.validateActionRevelation)).toBe(true);
    expect(check.object(index.validateClientMessage)).toBe(true);
    expect(check.object(index.validateDelta)).toBe(true);
    expect(check.object(index.validateFeedClose)).toBe(true);
    expect(check.object(index.validateFeedCloseResponse)).toBe(true);
    expect(check.object(index.validateFeedOpen)).toBe(true);
    expect(check.object(index.validateFeedOpenResponse)).toBe(true);
    expect(check.object(index.validateFeedTermination)).toBe(true);
    expect(check.object(index.validateHandshake)).toBe(true);
    expect(check.object(index.validateHandshakeResponse)).toBe(true);
    expect(check.object(index.validateServerMessage)).toBe(true);
    expect(check.object(index.validateViolationResponse)).toBe(true);
  });
});
