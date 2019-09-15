import Ajv from "ajv";
import jsonExpressible from "json-expressible";
import checkt from "check-types";

/**
 * The validateFeedTermination.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateServerMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateFeedTermination = {};
export default validateFeedTermination;

const ajv = new Ajv();
const validator = ajv.compile(
  JSON.parse(`
  {
    "type": "object",
    "properties": {
      "MessageType": {
        "type": "string",
        "enum": ["FeedTermination"]
      },
      "FeedName": {
        "type": "string",
        "minLength": 1
      },
      "FeedArgs": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        }
      },
      "ErrorCode": {
        "type": "string",
        "minLength": 1
      },
      "ErrorData": {
        "type": "object"
      }
    },
    "required": ["MessageType", "FeedName", "FeedArgs", "ErrorCode", "ErrorData"],
    "additionalProperties": false
  }
  `)
);

/**
 * @memberof validateFeedTermination
 * @param {Object} msg
 * @param {bool} checkJsonExpressible Toggles expressiblity check on msg.ErrorData
 * @returns {void}
 * @throws {Error} "INVALID_ARGUMENT: ..."
 * @throws {Error} "INVALID_MESSAGE: ..."
 */
validateFeedTermination.check = function check(msg, checkJsonExpressible) {
  // Validate msg
  if (!checkt.object(msg) || msg.MessageType !== "FeedTermination") {
    throw new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.");
  }

  // Validate checkJsonExpressible
  if (!checkt.boolean(checkJsonExpressible)) {
    throw new Error("INVALID_ARGUMENT: Invalid checkJsonExpressible argument.");
  }

  // Validate against the schema for this message type
  if (!validator(msg)) {
    throw new Error("INVALID_MESSAGE: Schema validation failed.");
  }

  // If desired, check whether error data is JSON-expressible
  if (checkJsonExpressible && !jsonExpressible(msg.ErrorData)) {
    throw new Error("INVALID_MESSAGE: Error data is not JSON-expressible.");
  }
};
