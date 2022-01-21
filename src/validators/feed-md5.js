import check from "check-types";

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedMd5(value) {
  // Validate value type
  if (!check.string(value)) {
    return "Not a string.";
  }

  // Validate length
  if (value.length !== 24) {
    return "Not 24 characters long.";
  }

  return "";
}
