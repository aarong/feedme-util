import check from "check-types";
import _isEqual from "lodash/isEqual";
import vFeedName from "./feed-name";
import vFeedArgs from "./feed-args";
import vActionName from "./action-name";
import vActionData from "./action-data";
import vFeedDeltas from "./feed-deltas";
import vFeedMd5 from "./feed-md5";

const REQ_MESSAGE_KEYS = [
  "MessageType",
  "FeedName",
  "FeedArgs",
  "ActionName",
  "ActionData",
  "FeedDeltas"
].sort();

const FEED_MD5 = "FeedMd5";

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedAction(value, checkJsonExpressible = true) {
  // Validate value type - never tripped by server-message validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Check if FeedMd5 is present and sequester other keys
  const reqKeys = [];
  let hasFeedMd5 = false;
  Object.keys(value).forEach(val => {
    if (val === FEED_MD5) {
      hasFeedMd5 = true;
    } else {
      reqKeys.push(val);
    }
  });

  // Validate required keys
  if (!_isEqual(reqKeys.sort(), REQ_MESSAGE_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate MessageType - never tripped by server-message validator
  if (value.MessageType !== "FeedAction") {
    return "MessageType > Not 'FeedAction'.";
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
  err = vActionName(value.ActionName);
  if (err) {
    return `ActionName > ${err}`;
  }
  err = vActionData(value.ActionData, checkJsonExpressible);
  if (err) {
    return `ActionData > ${err}`;
  }
  err = vFeedDeltas(value.FeedDeltas, checkJsonExpressible);
  if (err) {
    return `FeedDeltas > ${err}`;
  }
  if (hasFeedMd5) {
    err = vFeedMd5(value.FeedMd5);
    if (err) {
      return `FeedMd5 > ${err}`;
    }
  }
  return "";
}
