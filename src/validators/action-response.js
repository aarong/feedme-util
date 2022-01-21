import check from "check-types";
import vActionResponseSuccess from "./action-response-success";
import vActionResponseFailure from "./action-response-failure";

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateActionResponse(
  value,
  checkJsonExpressible = true
) {
  // Validate value type - never tripped by server-message validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate MessageType - never tripped by server-message validator
  if (value.MessageType !== "ActionResponse") {
    return "MessageType > Missing or not 'ActionResponse'.";
  }

  // Validate Success
  if (!check.boolean(value.Success)) {
    return "Success > Missing or not boolean.";
  }

  // Hand off to result-specific validator
  if (value.Success) {
    const err = vActionResponseSuccess(value, checkJsonExpressible);
    if (err) {
      return `(Success) ${err}`;
    }
  } else {
    const err = vActionResponseFailure(value, checkJsonExpressible);
    if (err) {
      return `(Failure) ${err}`;
    }
  }
  return "";
}
