import Ajv from "ajv";
import checkt from "check-types";

/**
 * The validateFeedClose.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateClientMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateFeedClose = {};
export default validateFeedClose;

const ajv = new Ajv();
const validator = ajv.compile(
  JSON.parse(`
  {
    "type": "object",
    "properties": {
      "MessageType": {
        "type": "string",
        "enum": ["FeedClose"]
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
 * @memberof validateFeedClose
 * @param {Object} msg
 * @returns {void}
 * @throws {Error} "INVALID_ARGUMENT: ..."
 * @throws {Error} "INVALID_MESSAGE: ..."
 */
validateFeedClose.check = function check(msg) {
  // Validate msg
  if (!checkt.object(msg) || msg.MessageType !== "FeedClose") {
    throw new Error("INVALID_ARGUMENT: Not an object or invalid MessageType.");
  }

  // Validate against the schema for this message type
  if (!validator(msg)) {
    throw new Error("INVALID_MESSAGE: Schema validation failed.");
  }
};
