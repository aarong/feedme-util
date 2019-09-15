import Ajv from "ajv";
import jsonExpressible from "json-expressible";
import checkt from "check-types";

/**
 * The validateFeedOpenResponse.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateServerMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateFeedOpenResponse = {};
export default validateFeedOpenResponse;

const ajv = new Ajv();
const validator = ajv.compile(
  JSON.parse(`
  {
    "oneOf": [
      {
        "type": "object",
        "properties": {
          "MessageType": {
            "type": "string",
            "enum": ["FeedOpenResponse"]
          },
          "Success": {
            "type": "boolean",
            "enum": [true]
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
          "FeedData": {
            "type": "object"
          }
        },
        "required": [
          "MessageType",
          "Success",
          "FeedName",
          "FeedArgs",
          "FeedData"
        ],
        "additionalProperties": false
      },
      {
        "type": "object",
        "properties": {
          "MessageType": {
            "type": "string",
            "enum": ["FeedOpenResponse"]
          },
          "Success": {
            "type": "boolean",
            "enum": [false]
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
        "required": [
          "MessageType",
          "Success",
          "FeedName",
          "FeedArgs",
          "ErrorCode",
          "ErrorData"
        ],
        "additionalProperties": false
      }
    ]
  }
  `)
);

/**
 * @memberof validateFeedOpenResponse
 * @param {Object} msg
 * @param {bool} checkJsonExpressible Toggles expressiblity check on msg.FeedData and msg.ErrorData
 * @returns {void}
 * @throws {Error} "INVALID_ARGUMENT: ..."
 * @throws {Error} "INVALID_MESSAGE: ..."
 */
validateFeedOpenResponse.check = function check(msg, checkJsonExpressible) {
  // Validate msg
  if (!checkt.object(msg) || msg.MessageType !== "FeedOpenResponse") {
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

  // If desired, check whether feed/error data is JSON-expressible
  if (checkJsonExpressible) {
    if (msg.Success && !jsonExpressible(msg.FeedData)) {
      throw new Error("INVALID_MESSAGE: Feed data is not JSON-expressible.");
    }
    if (!msg.Success && !jsonExpressible(msg.ErrorData)) {
      throw new Error("INVALID_MESSAGE: Error data is not JSON-expressible.");
    }
  }
};
