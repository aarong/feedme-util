import check from "check-types";
import _isEqual from "lodash/isEqual";
import vDiagnostics from "./diagnostics";

const MESSAGE_KEYS = ["MessageType", "Diagnostics"].sort();

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateViolationResponse(
  value,
  checkJsonExpressible = true
) {
  // Validate value type - never tripped by server-message validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate keys
  if (!_isEqual(Object.keys(value).sort(), MESSAGE_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate MessageType - never tripped by server-message validator
  if (value.MessageType !== "ViolationResponse") {
    return "MessageType > Not 'ViolationResponse'.";
  }

  // Validate $refs
  const err = vDiagnostics(value.Diagnostics, checkJsonExpressible);
  if (err) {
    return `Diagnostics > ${err}`;
  }
  return "";
}
