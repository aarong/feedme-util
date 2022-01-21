import check from "check-types";
import vViolationResponse from "./violation-response";
import vHandshakeResponse from "./handshake-response";
import vActionResponse from "./action-response";
import vFeedOpenResponse from "./feed-open-response";
import vFeedCloseResponse from "./feed-close-response";
import vFeedAction from "./feed-action";
import vFeedTermination from "./feed-termination";

const MESSAGE_VALIDATORS = {
  ViolationResponse: vViolationResponse,
  HandshakeResponse: vHandshakeResponse,
  ActionResponse: vActionResponse,
  FeedOpenResponse: vFeedOpenResponse,
  FeedCloseResponse: vFeedCloseResponse,
  FeedAction: vFeedAction,
  FeedTermination: vFeedTermination
};

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateServerMessage(
  value,
  checkJsonExpressible = true
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
    checkJsonExpressible
  );
  if (err) {
    return `(${value.MessageType} Message) ${err}`;
  }
  return "";
}
