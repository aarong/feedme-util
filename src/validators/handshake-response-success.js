import check from "check-types";
import _isEqual from "lodash/isEqual";
import vVersion from "./version";

const MESSAGE_KEYS = ["MessageType", "Success", "Version"].sort();

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateHandshakeResponseSuccess(value) {
  // Validate value type - never tripped by handshake-response validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate keys
  if (!_isEqual(Object.keys(value).sort(), MESSAGE_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate MessageType - never tripped by handshake-response validator
  if (value.MessageType !== "HandshakeResponse") {
    return "MessageType > Not 'HandshakeResponse'.";
  }

  // Validate Success - never tripped by handshake-response validator
  if (value.Success !== true) {
    return "Success > Not true.";
  }

  // Validate $refs
  const err = vVersion(value.Version);
  if (err) {
    return `Version > ${err}`;
  }
  return "";
}
