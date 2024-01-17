import check from "check-types";
import _isEqual from "lodash/isEqual";
import vFeedName from "./feed-name";
import vFeedArgs from "./feed-args";
import vFeedData from "./feed-data";

const MESSAGE_KEYS = [
  "MessageType",
  "Success",
  "FeedName",
  "FeedArgs",
  "FeedData",
].sort();

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedOpenResponseSuccess(
  value,
  checkJsonExpressible = true,
) {
  // Validate value type - never tripped by feed-open-response validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate keys
  if (!_isEqual(Object.keys(value).sort(), MESSAGE_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate MessageType - never tripped by feed-open-response validator
  if (value.MessageType !== "FeedOpenResponse") {
    return "MessageType > Not 'FeedOpenResponse'.";
  }

  // Validate Success
  if (value.Success !== true) {
    return "Success > Not true.";
  }

  // Validate $refs
  let err;
  err = vFeedName(value.FeedName);
  if (err) {
    return `FeedName > ${err}`;
  }
  err = vFeedArgs(value.FeedArgs);
  if (err) {
    return `FeedArgs > ${err}`;
  }
  err = vFeedData(value.FeedData, checkJsonExpressible);
  if (err) {
    return `FeedData > ${err}`;
  }
  return "";
}
