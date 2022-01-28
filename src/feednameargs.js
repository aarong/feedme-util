import check from "check-types";
import _each from "lodash/each";
import _some from "lodash/some";
import _clone from "lodash/clone";

/**
 * Represents a valid feed name-argument combination and provides a mechanism
 * that can translate to/from a canonical serialization.
 *
 * Serialized using JSON-encoded arrays of the form:
 *
 *   [feedName, argName1, argVal1, ...]
 *
 * That way escaping is built-in and it is easy to unserialize.
 *
 * Constructor usage 1 parameters:
 *   feedName (string)
 *   feedArgs (Object of strings)
 *
 * Constructor usage 2 parameters:
 *   feedSerial (string)
 *
 * @throws {Error} "INVALID_ARGUMENT: ..."
 */
const FeedNameArgs = function FeedNameArgs(...args) {
  let feedName;
  let feedArgs;
  let feedSerial;

  // Validate and process arguments
  if (args.length === 1) {
    ({ feedName, feedArgs, feedSerial } = this._fromSerial(args[0]));
  } else if (args.length === 2) {
    ({ feedName, feedArgs, feedSerial } = this._fromNameArgs(args[0], args[1]));
  } else {
    throw new Error("INVALID_ARGUMENT: Expects either one or two arguments.");
  }

  // Success

  /**
   * Feed name. Never null.
   * @memberof FeedNameArgs
   * @instance
   * @private
   * @type {string}
   */
  this._feedName = feedName;

  /**
   * Feed arguments. Never null.
   * @memberof FeedNameArgs
   * @instance
   * @private
   * @type {Object}
   */
  this._feedArgs = feedArgs;

  /**
   * Feed serial. Null if instance created from name/args and there has not
   * been a call to serial().
   * @memberof FeedNameArgs
   * @instance
   * @private
   * @type {?string}
   */
  this._feedSerial = feedSerial;
};

/**
 * Validates initialization from a feed serial, which means parsing it.
 * So feed name/args are always stored up front, not generated on a lazy basis.
 * @param {string} feedSerial
 * @returns {Object} { feedName, feedArgs, feedSerial }
 * @throws {Error} "INVALID_ARGUMENT: ..."
 */
FeedNameArgs.prototype._fromSerial = function _fromSerial(feedSerial) {
  // Check string - JSON.parse will convert non-string inputs where possible
  if (!check.string(feedSerial)) {
    throw new Error("INVALID_ARGUMENT: Feed serial is not a string.");
  }

  // Check valid JSON
  let jsonArray;
  try {
    jsonArray = JSON.parse(feedSerial);
  } catch (e) {
    throw new Error("INVALID_ARGUMENT: Feed serial is not valid JSON.");
  }

  // Check JSON array
  if (!check.array(jsonArray)) {
    throw new Error("INVALID_ARGUMENT: Feed serial is not a JSON array.");
  }

  // Check name present and no extraneous elements
  if (jsonArray.length % 2 !== 1) {
    throw new Error(
      "INVALID_ARGUMENT: Feed serial JSON array has invalid length."
    );
  }

  // Check feed name, feed arg keys, and feed arg values are all strings
  if (_some(jsonArray, element => !check.string(element))) {
    throw new Error(
      "INVALID_ARGUMENT: Feed serial JSON array includes non-string element."
    );
  }

  // All elements are permitted to be empty by the spec

  // Build feed args object
  const feedName = jsonArray[0];
  const feedArgs = {};
  for (let i = 1; i < jsonArray.length; i += 2) {
    feedArgs[jsonArray[i]] = jsonArray[i + 1];
  }

  // Return instance properties
  return { feedName, feedArgs, feedSerial };
};

/**
 * Validates initialization from feed name/args. A feed serial is generated
 * on a lazy basis if serial() is called.
 * @param {string} feedName
 * @param {Object} feedArgs
 * @returns {Object} { feedName, feedArgs, feedSerial }
 * @throws {Error} "INVALID_ARGUMENT: ..."
 */
FeedNameArgs.prototype._fromNameArgs = function _fromNameArgs(
  feedName,
  feedArgs
) {
  // Check feed name - empty is spec-valid
  if (!check.string(feedName)) {
    throw new Error("INVALID_ARGUMENT: Invalid feed name.");
  }

  // Check feed args
  if (
    !check.object(feedArgs) || // Args is an object?
    _some(feedArgs, argVal => !check.string(argVal)) // Values are strings?
  ) {
    throw new Error("INVALID_ARGUMENT: Invalid feed arguments object.");
  }

  // Return instance properties
  return {
    feedName,
    feedArgs: _clone(feedArgs), // In case of outside changes to feedArgs object
    feedSerial: null // Lazy
  };
};

/**
 * Returns feed name.
 * @returns {string}
 */
FeedNameArgs.prototype.name = function name() {
  return this._feedName;
};

/**
 * Returns feed args.
 * @returns {Object}
 */
FeedNameArgs.prototype.args = function args() {
  return this._feedArgs;
};

/**
 * Returns feed serial, which may need to be generated.
 * @returns {string}
 */
FeedNameArgs.prototype.serial = function serial() {
  // Generate the serial?
  if (!this._feedSerial) {
    const serialArr = [this._feedName];
    const sortedArgNames = Object.keys(this._feedArgs).sort();
    _each(sortedArgNames, argName => {
      serialArr.push(argName, this._feedArgs[argName]);
    });
    this._feedSerial = JSON.stringify(serialArr);
  }

  return this._feedSerial;
};

// Exports

/**
 * Factory function.
 * @returns {FeedNameArgs}
 */
export default function createFeedNameArgs(...args) {
  return new FeedNameArgs(...args);
}
