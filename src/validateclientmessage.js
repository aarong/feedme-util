import checkt from "check-types";

/**
 * The validateClientMessage.check() function determines whether some Javascript
 * value is an Object with a valid client MessageType.
 *
 * Exposed as an object for consistency with specific message validators.
 *
 * @type {Object}
 */
const validateClientMessage = {};
export default validateClientMessage;

/**
 * @memberof validateClientMessage
 * @param {*} value
 * @returns {void}
 * @throws {Error} "INVALID: ..."
 */
validateClientMessage.check = function check(value) {
  if (!checkt.object(value)) {
    throw new Error("INVALID: Not an object.");
  }

  if (
    value.MessageType !== "Handshake" &&
    value.MessageType !== "Action" &&
    value.MessageType !== "FeedOpen" &&
    value.MessageType !== "FeedClose"
  ) {
    throw new Error("INVALID: Invalid MessageType.");
  }
};
