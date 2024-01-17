import check from "check-types";
import _isEqual from "lodash/isEqual";
import vCallbackId from "./callback-id";
import vActionData from "./action-data";

const MESSAGE_KEYS = [
  "MessageType",
  "Success",
  "CallbackId",
  "ActionData",
].sort();

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateActionResponseSuccess(
  value,
  checkJsonExpressible = true,
) {
  // Validate value type - never tripped by action-response validator
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate keys
  if (!_isEqual(Object.keys(value).sort(), MESSAGE_KEYS)) {
    return "Missing or extraneous property.";
  }

  // Validate MessageType - never tripped by action-response validator
  if (value.MessageType !== "ActionResponse") {
    return "MessageType > Not 'ActionResponse'.";
  }

  // Validate Success
  if (value.Success !== true) {
    return "Success > Not true.";
  }

  // Validate $refs
  let err;
  err = vCallbackId(value.CallbackId);
  if (err) {
    return `CallbackId > ${err}`;
  }
  err = vActionData(value.ActionData, checkJsonExpressible);
  if (err) {
    return `ActionData > ${err}`;
  }
  return "";
}
