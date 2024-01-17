import check from "check-types";
import _isEqual from "lodash/isEqual";
import vActionName from "./action-name";
import vActionArgs from "./action-args";
import vCallbackId from "./callback-id";

const MESSAGE_KEYS = [
  "MessageType",
  "ActionName",
  "ActionArgs",
  "CallbackId",
].sort();

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateAction(value, checkJsonExpressible = true) {
  // Validate value type - never tripped by client-message validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate keys
  if (!_isEqual(Object.keys(value).sort(), MESSAGE_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate MessageType - never tripped by client-message validator
  if (value.MessageType !== "Action") {
    return "MessageType > Not 'Action'.";
  }

  // Validate $refs
  let err;
  err = vActionName(value.ActionName);
  if (err) {
    return `ActionName > ${err}`;
  }
  err = vActionArgs(value.ActionArgs, checkJsonExpressible);
  if (err) {
    return `ActionArgs > ${err}`;
  }
  err = vCallbackId(value.CallbackId);
  if (err) {
    return `CallbackId > ${err}`;
  }
  return "";
}
