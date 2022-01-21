import check from "check-types";
import _isEqual from "lodash/isEqual";
import vFeedName from "./feed-name";
import vFeedArgs from "./feed-args";

const MESSAGE_KEYS = ["MessageType", "FeedName", "FeedArgs"].sort();

/**
 * @param {*} value
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedClose(value) {
  // Validate value type - never tripped by client-message validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate keys
  if (!_isEqual(Object.keys(value).sort(), MESSAGE_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate MessageType - never tripped by client-message validator
  if (value.MessageType !== "FeedClose") {
    return "MessageType > Not 'FeedClose'.";
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
  return "";
}
