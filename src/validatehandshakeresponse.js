import Ajv from "ajv";

/**
 * The validateHandshakeResponse.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateServerMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateHandshakeResponse = {};
export default validateHandshakeResponse;

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
            "enum": ["HandshakeResponse"]
          },
          "Success": {
            "type": "boolean",
            "enum": [true]
          },
          "Version": {
            "type": "string",
            "minLength": 1
          },
          "ClientId": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": ["MessageType", "Success", "Version", "ClientId"],
        "additionalProperties": false
      },
      {
        "type": "object",
        "properties": {
          "MessageType": {
            "type": "string",
            "enum": ["HandshakeResponse"]
          },
          "Success": {
            "type": "boolean",
            "enum": [false]
          }
        },
        "required": ["MessageType", "Success"],
        "additionalProperties": false
      }
    ]
  }
  `)
);

/**
 * @memberof validateHandshakeResponse
 * @param {Object} msg
 * @returns {void}
 * @throws {Error} "INVALID: ..."
 */
validateHandshakeResponse.check = function check(msg) {
  // Validate against the schema for this message type
  if (!validator(msg)) {
    throw new Error("INVALID: Schema validation failed.");
  }
};
