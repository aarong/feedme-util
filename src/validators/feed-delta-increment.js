import check from "check-types";
import _isEqual from "lodash/isEqual";
import vFeedDeltaPath from "./feed-delta-path";

const DELTA_KEYS = ["Operation", "Path", "Value"].sort();

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedDeltaIncrement(value) {
  // Validate value type - never tripped by feed-delta validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate keys
  if (!_isEqual(Object.keys(value).sort(), DELTA_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate Operation - never tripped by feed-delta validator
  if (value.Operation !== "Increment") {
    return "Operation > Not 'Increment'.";
  }

  // Validate Value
  if (!check.number(value.Value)) {
    return "Value > Not a number.";
  }

  // Validate $refs
  const err = vFeedDeltaPath(value.Path);
  if (err) {
    return `Path > ${err}`;
  }
  return "";
}
