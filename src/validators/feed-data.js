import check from "check-types";
import jsonExpressible from "json-expressible";

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedData(value, checkJsonExpressible = true) {
  // Validate value type
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Check JSON expressibility
  if (checkJsonExpressible && !jsonExpressible(value)) {
    return "Not JSON-expressible.";
  }

  return "";
}
