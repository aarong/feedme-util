import check from "check-types";

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateVersion(value) {
  // Validate value type
  if (!check.string(value)) {
    return "Not a string.";
  }

  return "";
}
