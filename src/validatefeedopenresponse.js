import Ajv from "ajv";
import jsonExpressible from "json-expressible";

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
 * @throws {Error} "INVALID: ..."
 */
validateFeedOpenResponse.check = function check(msg, checkJsonExpressible) {
  // Validate against the schema for this message type
  if (!validator(msg)) {
    throw new Error("INVALID: Schema validation failed.");
  }

  // If desired, check whether feed/error data is JSON-expressible
  if (checkJsonExpressible) {
    if (msg.Success && !jsonExpressible(msg.FeedData)) {
      throw new Error("INVALID: Feed data is not JSON-expressible.");
    }
    if (!msg.Success && !jsonExpressible(msg.ErrorData)) {
      throw new Error("INVALID: Error data is not JSON-expressible.");
    }
  }
};
