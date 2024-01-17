import check from "check-types";
import vHandshake from "./handshake";
import vAction from "./action";
import vFeedOpen from "./feed-open";
import vFeedClose from "./feed-close";

const MESSAGE_VALIDATORS = {
  Handshake: vHandshake,
  Action: vAction,
  FeedOpen: vFeedOpen,
  FeedClose: vFeedClose,
};

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateClientMessage(
  value,
  checkJsonExpressible = true,
) {
  // Validate value type
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate MessageType
  if (!(value.MessageType in MESSAGE_VALIDATORS)) {
    return "MessageType > Missing or invalid.";
  }

  // Hand off to message-specific validator
  // Strictly speaking, not all sub-validators require checkJsonExpressible
  const err = MESSAGE_VALIDATORS[value.MessageType](
    value,
    checkJsonExpressible,
  );
  if (err) {
    return `(${value.MessageType} Message) ${err}`;
  }
  return "";
}
