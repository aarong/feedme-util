import check from "check-types";
import _isEqual from "lodash/isEqual";
import jsonExpressible from "json-expressible";
import vFeedDeltaPath from "./feed-delta-path";

const DELTA_KEYS = ["Operation", "Path", "Value"].sort();

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedDeltaDeleteValue(
  value,
  checkJsonExpressible = true,
) {
  // Validate value type - never tripped by feed-delta validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate keys
  if (!_isEqual(Object.keys(value).sort(), DELTA_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate Operation - never tripped by feed-delta validator
  if (value.Operation !== "DeleteValue") {
    return "Operation > Not 'DeleteValue'.";
  }

  // Validate Value
  if (checkJsonExpressible && !jsonExpressible(value.Value)) {
    return "Value > Not JSON-expressible.";
  }

  // Validate $refs
  const err = vFeedDeltaPath(value.Path);
  if (err) {
    return `Path > ${err}`;
  }
  return "";
}
