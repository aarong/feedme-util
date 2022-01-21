import check from "check-types";
import vClientMessage from "./validators/client-message";

/**
 * @param {string} message
 * @param {bool} [checkJsonExpressible=true]
 * @returns {Object} If message is valid JSON and satisfies spec schemas:
 *                     { valid: true, message: Object }
 *                   If message is not valid JSON or violates spec schemas:
 *                     { valid: false, errorMessage: string }
 * @throws {Error} "INVALD_ARGUMENT: ..."
 */
export default function parseClientMessage(message) {
  // Check string - JSON.parse() may try to convert
  if (!check.string(message)) {
    throw new Error("INVALID_ARGUMENT: Message argument not a string.");
  }

  // Try to parse JSON
  let parsedMessage;
  try {
    parsedMessage = JSON.parse(message);
  } catch (e) {
    return { valid: false, errorMessage: "Invalid JSON." };
  }

  // Validate value and return result
  const validationError = vClientMessage(parsedMessage, false); // No need to check JSON expressibility
  return validationError
    ? { valid: false, errorMessage: validationError }
    : { valid: true, message: parsedMessage };
}
