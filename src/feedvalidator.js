import _each from "lodash/each";
import check from "check-types";

/**
 * Validates feed arguments and throws an error on invalid name/arg type.
 */
const feedValidator = {};
export default feedValidator;

/**
 * Validate feed arguments.
 * @param {string} name
 * @param {Object} args
 * @returns {void}
 * @throws {Error} "INVALID_ARGUMENT: ..."
 */
feedValidator.validate = function validate(name, args) {
  // Check name
  if (!check.nonEmptyString(name)) {
    throw new Error("INVALID_ARGUMENT: Invalid feed name.");
  }

  // Check args
  if (!check.object(args)) {
    throw new Error("INVALID_ARGUMENT: Invalid feed arguments object.");
  }
  _each(args, val => {
    if (!check.string(val)) {
      throw new Error("INVALID_ARGUMENT: Invalid feed arguments object.");
    }
  });
};
