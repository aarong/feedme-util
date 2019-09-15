import Ajv from "ajv";
import jsonExpressible from "json-expressible";
import validateDelta from "./validatedelta";

/**
 * The validateActionRevelation.check() function determines whether some object
 * satisfies the associated Feedme schema. The object is assumed
 * to have passed validateServerMessage.check().
 *
 * Exposed as an object so that the AJV validator is only compiled once.
 *
 * @type {Object}
 */
const validateActionRevelation = {};
export default validateActionRevelation;

const ajv = new Ajv();
const validator = ajv.compile(
  JSON.parse(`
  {
    "type": "object",
    "properties": {
      "MessageType": {
        "type": "string",
        "enum": ["ActionRevelation"]
      },
      "ActionName": {
        "type": "string",
        "minLength": 1
      },
      "ActionData": {
        "type": "object"
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
      "FeedDeltas": {
        "type": "array",
        "items": {
          "type": "object"
        }
      },
      "FeedMd5": {
        "type": "string",
        "minLength": 24,
        "maxLength": 24
      }
    },
    "required": [
      "MessageType",
      "ActionName",
      "ActionData",
      "FeedName",
      "FeedArgs",
      "FeedDeltas"
    ],
    "additionalProperties": false
  }
  `)
);

/**
 * @memberof validateActionRevelation
 * @param {Object} msg
 * @param {bool} checkJsonExpressible Toggles expressiblity check on msg.ActionData and delta values
 * @returns {void}
 * @throws {Error} "INVALID: ..."
 */
validateActionRevelation.check = function check(msg, checkJsonExpressible) {
  // Validate against the schema for this message type
  if (!validator(msg)) {
    throw new Error("INVALID: Schema validation failed.");
  }

  // Validate all deltas (includes JSON-expressibility check if desired)
  msg.FeedDeltas.forEach(delta => {
    validateDelta.check(delta, checkJsonExpressible);
  });

  // If desired, check whether action data is JSON-expressible
  if (checkJsonExpressible && !jsonExpressible(msg.ActionData)) {
    throw new Error("INVALID: Action data is not JSON-expressible.");
  }
};
