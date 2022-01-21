import check from "check-types";
import _isEqual from "lodash/isEqual";
import vVersions from "./versions";

const MESSAGE_KEYS = ["MessageType", "Versions"].sort();

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateHandshake(value) {
  // Validate value type - never tripped by client-message validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate keys
  if (!_isEqual(Object.keys(value).sort(), MESSAGE_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate MessageType - never tripped by client-message validator
  if (value.MessageType !== "Handshake") {
    return "MessageType > Not 'Handshake'.";
  }

  // Validate $refs
  const err = vVersions(value.Versions);
  if (err) {
    return `Versions > ${err}`;
  }
  return "";
}
