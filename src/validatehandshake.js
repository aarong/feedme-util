import Ajv from "ajv";

/**
 * The validateHandshake.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateClientMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateHandshake = {};
export default validateHandshake;

const ajv = new Ajv();
const validator = ajv.compile(
  JSON.parse(`
    {
      "type": "object",
      "properties": {
        "MessageType": {
          "type": "string",
          "enum": ["Handshake"]
        },
        "Versions": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string"
          }
        }
      },
      "required": ["MessageType", "Versions"],
      "additionalProperties": false
    }
  `)
);

/**
 * @memberof validateHandshake
 * @param {Object} msg
 * @returns {void}
 * @throws {Error} "INVALID: ..."
 */
validateHandshake.check = function check(msg) {
  // Validate against the schema for this message type
  if (!validator(msg)) {
    throw new Error("INVALID: Schema validation failed.");
  }
};
