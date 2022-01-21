import check from "check-types";

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedDeltaPath(value) {
  // Validate value type
  if (!check.array(value)) {
    return "Not an array.";
  }

  // Check value elements
  for (let i = 0; i < value.length; i += 1) {
    const element = value[i];
    if (!check.string(element) && (!check.integer(element) || element < 0)) {
      return `Element ${i} > Not a string or non-negative integer.`;
    }
  }
  return "";
}
