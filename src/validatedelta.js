import checkt from "check-types";
import Ajv from "ajv";
import jsonExpressible from "json-expressible";

/**
 * The validateDelta.check() function determines whether some value is a
 * structurally valid delta object.
 *
 * Exposed as an object so that the AJV validators are only compiled once.
 *
 * @type {Object}
 */
const validateDelta = {};
export default validateDelta;

const ajv = new Ajv();
const validators = {
  Set: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["Set"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {}
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  Delete: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["Delete"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          }
        },
        "required": ["Operation", "Path"],
        "additionalProperties": false
      }
    `)
  ),
  DeleteValue: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["DeleteValue"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {}
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  Prepend: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["Prepend"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {
            "type": "string"
          }
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  Append: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["Append"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {
            "type": "string"
          }
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  Increment: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["Increment"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {
            "type": "number"
          }
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  Decrement: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["Decrement"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {
            "type": "number"
          }
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  Toggle: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["Toggle"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          }
        },
        "required": ["Operation", "Path"],
        "additionalProperties": false
      }
    `)
  ),
  InsertFirst: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["InsertFirst"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {}
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  InsertLast: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["InsertLast"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {}
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  InsertBefore: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["InsertBefore"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {}
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  InsertAfter: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["InsertAfter"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          },
          "Value": {}
        },
        "required": ["Operation", "Path", "Value"],
        "additionalProperties": false
      }
    `)
  ),
  DeleteFirst: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["DeleteFirst"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          }
        },
        "required": ["Operation", "Path"],
        "additionalProperties": false
      }
    `)
  ),
  DeleteLast: ajv.compile(
    JSON.parse(`
      {
        "type": "object",
        "properties": {
          "Operation": {
            "type": "string",
            "enum": ["DeleteLast"]
          },
          "Path": {
            "type": "array",
            "items": [
              {
                "type": "string",
                "minLength": 1
              }
            ],
            "additionalItems": {
              "oneOf": [
                {
                  "type": "string",
                  "minLength": 1
                },
                {
                  "type": "number",
                  "multipleOf": 1,
                  "minimum": 0
                }
              ]
            }
          }
        },
        "required": ["Operation", "Path"],
        "additionalProperties": false
      }
    `)
  )
};

/**
 * @memberof validateDelta
 * @param {*} value
 * @param {bool} checkJsonExpressible Toggles expressiblity check on delta.Value (if required)
 * @returns {void}
 * @throws {Error} "INVALID_ARGUMENT: ..."
 * @throws {Error} "INVALID_DELTA: ..."
 */
validateDelta.check = function check(value, checkJsonExpressible) {
  // Check value type
  if (!checkt.object(value)) {
    throw new Error("INVALID_ARGUMENT: Not an object.");
  }

  // Validate checkJsonExpressible
  if (!checkt.boolean(checkJsonExpressible)) {
    throw new Error("INVALID_ARGUMENT: Invalid checkJsonExpressible argument.");
  }

  // Check delta operation
  if (
    value.Operation !== "Set" &&
    value.Operation !== "Delete" &&
    value.Operation !== "DeleteValue" &&
    value.Operation !== "Prepend" &&
    value.Operation !== "Append" &&
    value.Operation !== "Increment" &&
    value.Operation !== "Decrement" &&
    value.Operation !== "Toggle" &&
    value.Operation !== "InsertFirst" &&
    value.Operation !== "InsertLast" &&
    value.Operation !== "InsertBefore" &&
    value.Operation !== "InsertAfter" &&
    value.Operation !== "DeleteFirst" &&
    value.Operation !== "DeleteLast"
  ) {
    throw new Error("INVALID_DELTA: Invalid delta operation.");
  }

  // Validate against the schema for this delta operation
  if (!validators[value.Operation](value)) {
    throw new Error("INVALID_DELTA: Schema validation failed.");
  }

  // If desired, check whether the value is JSON-expressible
  if (
    checkJsonExpressible &&
    (value.Operation === "Set" ||
      value.Operation === "DeleteValue" ||
      value.Operation === "InsertFirst" ||
      value.Operation === "InsertLast" ||
      value.Operation === "InsertBefore" ||
      value.Operation === "InsertAfter") &&
    !jsonExpressible(value.Value)
  ) {
    throw new Error("INVALID_DELTA: Delta value is not JSON-expressible.");
  }
};
