import check from "check-types";
import vVersion from "./version";

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateVersions(value) {
  // Validate value type
  if (!check.array(value)) {
    return "Not an array.";
  }

  // Validate array length
  if (value.length < 1) {
    return "Empty array.";
  }

  // Validate $refs
  for (let i = 0; i < value.length; i += 1) {
    const err = vVersion(value[i]);
    if (err) {
      return `Element ${i} > ${err}`;
    }
  }
  return "";
}
