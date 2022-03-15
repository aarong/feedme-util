import check from "check-types";
import _each from "lodash/each";
import _some from "lodash/some";
import _clone from "lodash/clone";

/**
 * Validates and represents a feed name-argument combinations with serialize
 * and unserialize functionality.
 *
 * Does not throw errors if arguments are invalid, as this may not represent
 * an error condition for user code. Instead, provides an error() method
 * indicating whether processing was successful. However, the module does throw
 * if there is a call to name(), args(), or serial() when error() is not null.
 *
 * Serialization uses JSON-encoded arrays of the form:
 *
 *   [feedName, argName1, argVal1, ...]
 *
 * That way escaping is built-in and it is easy to unserialize.
 *
 * Factory usage 1 parameters:
 *   feedName (string)
 *   feedArgs (Object of strings)
 *
 * Factory usage 2 parameters:
 *   feedSerial (string)
 *
 */
const FeedNameArgs = function FeedNameArgs(...args) {
  /**
   * Error message if feed name/arg/serial arguments were invalid.
   * Null if valid.
   * @memberof FeedNameArgs
   * @instance
   * @private
   * @type {string}
   */
  this._error = null;

  /**
   * Feed name. Null if error.
   * @memberof FeedNameArgs
   * @instance
   * @private
   * @type {?string}
   */
  this._feedName = null;

  /**
   * Feed arguments. Null if error.
   * @memberof FeedNameArgs
   * @instance
   * @private
   * @type {?Object}
   */
  this._feedArgs = null;

  /**
   * Feed serial. Null if error or if instance created from name/args and there
   * has not been a call to serial().
   * @memberof FeedNameArgs
   * @instance
   * @private
   * @type {?string}
   */
  this._feedSerial = null;

  // Process arguments
  if (args.length === 1) {
    this._fromSerial(args[0]);
  } else if (args.length === 2) {
    this._fromNameArgs(args[0], args[1]);
  } else {
    this._error = "Expects either one or two arguments.";
  }
};

/**
 * Validates initialization from a feed serial, which means parsing it.
 * So feed name/args are always stored up front, not generated on a lazy basis.
 * @param {string} feedSerial
 * @returns {void}
 */
FeedNameArgs.prototype._fromSerial = function _fromSerial(feedSerial) {
  // Check string - JSON.parse will convert non-string inputs where possible
  if (!check.string(feedSerial)) {
    this._error = "Feed serial is not a string.";
    return; // Stop
  }

  // Check valid JSON
  let jsonArray;
  try {
    jsonArray = JSON.parse(feedSerial);
  } catch (e) {
    this._error = "Feed serial is not valid JSON.";
    return; // Stop
  }

  // Check JSON array
  if (!check.array(jsonArray)) {
    this._error = "Feed serial is not a JSON array.";
    return; // Stop
  }

  // Check name present and no extraneous elements
  if (jsonArray.length % 2 !== 1) {
    this._error = "Feed serial JSON array must have odd length.";
    return; // Stop
  }

  // Check feed name, feed arg keys, and feed arg values are all strings
  if (_some(jsonArray, element => !check.string(element))) {
    this._error = "Feed serial JSON array includes non-string element.";
    return; // Stop
  }

  // All elements are permitted to be empty by the spec

  // Save feed name/args/serial
  this._feedName = jsonArray[0]; // eslint-disable-line prefer-destructuring
  this._feedArgs = {};
  for (let i = 1; i < jsonArray.length; i += 2) {
    this._feedArgs[jsonArray[i]] = jsonArray[i + 1];
  }
  this._feedSerial = feedSerial;
};

/**
 * Validates initialization from feed name/args. A feed serial is generated
 * on a lazy basis if serial() is called.
 * @param {string} feedName
 * @param {Object} feedArgs
 * @returns {void}
 */
FeedNameArgs.prototype._fromNameArgs = function _fromNameArgs(
  feedName,
  feedArgs
) {
  // Check feed name - empty is spec-valid
  if (!check.string(feedName)) {
    this._error = "Invalid feed name.";
    return; // Stop
  }

  // Check feed args
  if (
    !check.object(feedArgs) || // Args is an object?
    _some(feedArgs, argVal => !check.string(argVal)) // Values are strings?
  ) {
    this._error = "Invalid feed arguments object.";
    return; // Stop
  }

  // Save feed name and args
  this._feedName = feedName;
  this._feedArgs = _clone(feedArgs); // In case of outside changes to feedArgs object
};

/**
 * Returns error message or null if none.
 * @returns {?string}
 */
FeedNameArgs.prototype.error = function error() {
  return this._error;
};

/**
 * Returns feed name.
 * @returns {string}
 * @throws {Error}
 */
FeedNameArgs.prototype.name = function name() {
  if (this._error) {
    throw new Error(this._error);
  }
  return this._feedName;
};

/**
 * Returns feed args.
 * @returns {Object}
 * @throws {Error}
 */
FeedNameArgs.prototype.args = function args() {
  if (this._error) {
    throw new Error(this._error);
  }
  return this._feedArgs;
};

/**
 * Returns feed serial, which may need to be generated.
 * @returns {string}
 * @throws {Error}
 */
FeedNameArgs.prototype.serial = function serial() {
  if (this._error) {
    throw new Error(this._error);
  }

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
