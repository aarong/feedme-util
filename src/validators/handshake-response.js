import check from "check-types";
import vHandshakeResponseSuccess from "./handshake-response-success";
import vHandshakeResponseFailure from "./handshake-response-failure";

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateHandshakeResponse(value) {
  // Validate value type - never tripped by server-message validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate MessageType - never tripped by server-message validator
  if (value.MessageType !== "HandshakeResponse") {
    return "MessageType > Missing or not 'HandshakeResponse'.";
  }

  // Validate Success
  if (!check.boolean(value.Success)) {
    return "Success > Missing or not boolean.";
  }

  // Hand off to result-specific validator
  if (value.Success) {
    const err = vHandshakeResponseSuccess(value);
    if (err) {
      return `(Success) ${err}`;
    }
  } else {
    const err = vHandshakeResponseFailure(value);
    if (err) {
      return `(Failure) ${err}`;
    }
  }
  return "";
}
