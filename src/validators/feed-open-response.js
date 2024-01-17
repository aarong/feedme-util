import check from "check-types";
import vFeedOpenResponseSuccess from "./feed-open-response-success";
import vFeedOpenResponseFailure from "./feed-open-response-failure";

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedOpenResponse(
  value,
  checkJsonExpressible = true,
) {
  // Validate value type - never tripped by server-message validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate MessageType - never tripped by server-message validator
  if (value.MessageType !== "FeedOpenResponse") {
    return "MessageType > Missing or not 'FeedOpenResponse'.";
  }

  // Validate Success
  if (!check.boolean(value.Success)) {
    return "Success > Missing or not boolean.";
  }

  // Hand off to result-specific validator
  if (value.Success) {
    const err = vFeedOpenResponseSuccess(value, checkJsonExpressible);
    if (err) {
      return `(Success) ${err}`;
    }
  } else {
    const err = vFeedOpenResponseFailure(value, checkJsonExpressible);
    if (err) {
      return `(Failure) ${err}`;
    }
  }
  return "";
}
