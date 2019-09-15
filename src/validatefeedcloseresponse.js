import Ajv from "ajv";
import checkt from "check-types";

/**
 * The validateFeedCloseResponse.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateServerMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateFeedCloseResponse = {};
export default validateFeedCloseResponse;

const ajv = new Ajv();
const validator = ajv.compile(
  JSON.parse(`
  {
    "type": "object",
    "properties": {
      "MessageType": {
        "type": "string",
        "enum": ["FeedCloseResponse"]
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
      }
    },
    "required": ["MessageType", "FeedName", "FeedArgs"],
    "additionalProperties": false
  }
  `)
);

/**
 * @memberof validateFeedCloseResponse
 * @param {Object} msg
 * @returns {void}
 * @throws {Error} "INVALID_ARGUMENT: ..."
 * @throws {Error} "INVALID_MESSAGE: ..."
 */
validateFeedCloseResponse.check = function check(msg) {
  // Validate msg
  if (!checkt.object(msg) || msg.MessageType !== "FeedCloseResponse") {
    throw new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.");
  }

  // Validate against the schema for this message type
  if (!validator(msg)) {
    throw new Error("INVALID_MESSAGE: Schema validation failed.");
  }
};
