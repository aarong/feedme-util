import check from "check-types";
import vFeedDelta from "./feed-delta";

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedDeltas(value, checkJsonExpressible = true) {
  // Validate value type
  if (!check.array(value)) {
    return "Not an array.";
  }

  // Validate $refs
  for (let i = 0; i < value.length; i += 1) {
    const err = vFeedDelta(value[i], checkJsonExpressible);
    if (err) {
      return `Element ${i} > ${err}`;
    }
  }
  return "";
}
