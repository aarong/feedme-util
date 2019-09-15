import checkt from "check-types";

/**
 * The validateServerMessage.check() function determines whether some Javascript
 * value is an Object with a valid server MessageType.
 *
 * Exposed as an object for consistency with specific message validators.
 *
 * @type {Object}
 */
const validateServerMessage = {};
export default validateServerMessage;

/**
 * @memberof validateServerMessage
 * @param {*} value
 * @returns {void}
 * @throws {Error} "INVALID: ..."
 */
validateServerMessage.check = function check(value) {
  if (!checkt.object(value)) {
    throw new Error("INVALID: Not an object.");
  }

  if (
    value.MessageType !== "ViolationResponse" &&
    value.MessageType !== "HandshakeResponse" &&
    value.MessageType !== "ActionResponse" &&
    value.MessageType !== "FeedOpenResponse" &&
    value.MessageType !== "FeedCloseResponse" &&
    value.MessageType !== "ActionRevelation" &&
    value.MessageType !== "FeedTermination"
  ) {
    throw new Error("INVALID: Invalid MessageType.");
  }
};
