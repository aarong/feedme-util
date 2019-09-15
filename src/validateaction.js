import Ajv from "ajv";
import jsonExpressible from "json-expressible";
import checkt from "check-types";

/**
 * The validateAction.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateClientMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateAction = {};
export default validateAction;

const ajv = new Ajv();
const validator = ajv.compile(
  JSON.parse(`
  {
    "type": "object",
    "properties": {
      "MessageType": {
        "type": "string",
        "enum": ["Action"]
      },
      "ActionName": {
        "type": "string",
        "minLength": 1
      },
      "ActionArgs": {
        "type": "object"
      },
      "CallbackId": {
        "type": "string",
        "minLength": 1
      }
    },
    "required": ["MessageType", "ActionName", "ActionArgs", "CallbackId"],
    "additionalProperties": false
  }
  `)
);

/**
 * @memberof validateAction
 * @param {Object} msg
 * @param {bool} checkJsonExpressible Toggles expressiblity check on msg.ActionArgs
 * @returns {void}
 * @throws {Error} "INVALID_ARGUMENT: ..."
 * @throws {Error} "INVALID_MESSAGE: ..."
 */
validateAction.check = function check(msg, checkJsonExpressible) {
  // Validate msg
  if (!checkt.object(msg) || msg.MessageType !== "Action") {
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

  // If desired, check whether action arguments are JSON-expressible
  if (checkJsonExpressible && !jsonExpressible(msg.ActionArgs)) {
    throw new Error(
      "INVALID_MESSAGE: Action arguments are not JSON-expressible."
    );
  }
};
