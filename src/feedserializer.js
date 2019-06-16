import _each from "lodash/each";
import check from "check-types";

/**
 * Translates feed name-argument combinations into canonicalized serializations
 * to be used as object keys, and then back again.
 *
 * The serialization is a JSON serialization of a nested array.
 * Only one way to serialize, escaping is built-in, and easy to unserialize.
 */
const feedSerializer = {};
export default feedSerializer;

/**
 * Serialize a feed.
 * @param {string} name
 * @param {Object} args
 * @returns {string}
 * @throws {Error} "INVALID_ARGUMENT: ..."
 */
feedSerializer.serialize = function serialize(name, args) {
  // Check name
  if (!check.string(name)) {
    throw new Error("INVALID_ARGUMENT: Invalid feed name.");
  }

  // Check args
  if (!check.object(args)) {
    throw new Error("INVALID_ARGUMENT: Invalid feed arguments object.");
  }
  let ok = true;
  _each(args, val => {
    if (!check.string(val)) {
      ok = false;
    }
  });
  if (!ok) {
    throw new Error("INVALID_ARGUMENT: Invalid feed arguments object.");
  }

  // Get ordered list of arg names
  const argNames = [];
  _each(args, (val, key) => {
    argNames.push(key);
  });
  argNames.sort();

  // Create an array of the form [feedName, [argName1, argVal1], ...]
  const arr = [name];
  _each(argNames, argName => {
    arr.push([argName, args[argName]]);
  });

  return JSON.stringify(arr);
};

/**
 * Unserialize a feed.
 * @param {string} serialization
 * @returns {Object} { feedName: "string", feedArgs: { arg1: "string", ...} }
 */
feedSerializer.unserialize = function unserialize(serial) {
  const arr = JSON.parse(serial);
  const ret = {
    feedName: arr[0],
    feedArgs: {}
  };
  for (let i = 1; i < arr.length; i += 1) {
    const argName = arr[i][0];
    const argVal = arr[i][1];
    ret.feedArgs[argName] = argVal;
  }
  return ret;
};
