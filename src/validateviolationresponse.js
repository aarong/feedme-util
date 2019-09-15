import Ajv from "ajv";
import jsonExpressible from "json-expressible";
import checkt from "check-types";

/**
 * The validateViolationResponse.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateServerMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateViolationResponse = {};
export default validateViolationResponse;

const ajv = new Ajv();
const validator = ajv.compile(
  JSON.parse(`
  {
    "type": "object",
    "properties": {
      "MessageType": {
        "type": "string",
        "enum": ["ViolationResponse"]
      },
      "Diagnostics": {
        "type": "object"
      }
    },
    "required": ["MessageType", "Diagnostics"],
    "additionalProperties": false
  }
  `)
);

/**
 * @memberof validateViolationResponse
 * @param {Object} msg
 * @param {bool} checkJsonExpressible Toggles expressiblity check on msg.Diagnostics
 * @returns {void}
 * @throws {Error} "INVALID_ARGUMENT: ..."
 * @throws {Error} "INVALID_MESSAGE: ..."
 */
validateViolationResponse.check = function check(msg, checkJsonExpressible) {
  // Validate msg
  if (!checkt.object(msg) || msg.MessageType !== "ViolationResponse") {
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

  // If desired, check whether diagnostics are JSON-expressible
  if (checkJsonExpressible && !jsonExpressible(msg.Diagnostics)) {
    throw new Error("INVALID_MESSAGE: Diagnostics are not JSON-expressible.");
  }
};
