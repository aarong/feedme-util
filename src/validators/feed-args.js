import check from "check-types";

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedArgs(value) {
  // Validate value type
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Check child value types
  let err = "";
  Object.values(value).some(arg => {
    if (!check.string(arg)) {
      err = "One or more properties is not a string.";
    }
    return !!err; // Stop if error
  });
  return err;
}
