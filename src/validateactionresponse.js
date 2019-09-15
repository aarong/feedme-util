import Ajv from "ajv";
import jsonExpressible from "json-expressible";

/**
 * The validateActionResponse.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateServerMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateActionResponse = {};
export default validateActionResponse;

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
            "enum": ["ActionResponse"]
          },
          "CallbackId": {
            "type": "string",
            "minLength": 1
          },
          "Success": {
            "type": "boolean",
            "enum": [true]
          },
          "ActionData": {
            "type": "object"
          }
        },
        "required": ["MessageType", "CallbackId", "Success", "ActionData"],
        "additionalProperties": false
      },
      {
        "type": "object",
        "properties": {
          "MessageType": {
            "type": "string",
            "enum": ["ActionResponse"]
          },
          "CallbackId": {
            "type": "string",
            "minLength": 1
          },
          "Success": {
            "type": "boolean",
            "enum": [false]
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
          "CallbackId",
          "Success",
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
 * @memberof validateActionResponse
 * @param {Object} msg
 * @param {bool} checkJsonExpressible Toggles expressiblity check on msg.ActionData and msg.ErrorData
 * @returns {void}
 * @throws {Error} "INVALID: ..."
 */
validateActionResponse.check = function check(msg, checkJsonExpressible) {
  // Validate against the schema for this message type
  if (!validator(msg)) {
    throw new Error("INVALID: Schema validation failed.");
  }

  // If desired, check whether action/error data is JSON-expressible
  if (checkJsonExpressible) {
    if (msg.Success && !jsonExpressible(msg.ActionData)) {
      throw new Error("INVALID: Action data is not JSON-expressible.");
    }
    if (!msg.Success && !jsonExpressible(msg.ErrorData)) {
      throw new Error("INVALID: Error data is not JSON-expressible.");
    }
  }
};
