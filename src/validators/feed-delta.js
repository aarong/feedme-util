import check from "check-types";
import vSet from "./feed-delta-set";
import vDelete from "./feed-delta-delete";
import vDeleteValue from "./feed-delta-delete-value";
import vPrepend from "./feed-delta-prepend";
import vAppend from "./feed-delta-append";
import vIncrement from "./feed-delta-increment";
import vDecrement from "./feed-delta-decrement";
import vToggle from "./feed-delta-toggle";
import vInsertFirst from "./feed-delta-insert-first";
import vInsertLast from "./feed-delta-insert-last";
import vInsertBefore from "./feed-delta-insert-before";
import vInsertAfter from "./feed-delta-insert-after";
import vDeleteFirst from "./feed-delta-delete-first";
import vDeleteLast from "./feed-delta-delete-last";

const DELTA_VALIDATORS = {
  Set: vSet,
  Delete: vDelete,
  DeleteValue: vDeleteValue,
  Prepend: vPrepend,
  Append: vAppend,
  Increment: vIncrement,
  Decrement: vDecrement,
  Toggle: vToggle,
  InsertFirst: vInsertFirst,
  InsertLast: vInsertLast,
  InsertBefore: vInsertBefore,
  InsertAfter: vInsertAfter,
  DeleteFirst: vDeleteFirst,
  DeleteLast: vDeleteLast
};

/**
 * @param {*} value
 * @param {bool} [checkJsonExpressible=true]
 * @returns {string} If valid: ""
 *                   If invalid: "Error message."
 */
export default function validateFeedDelta(value, checkJsonExpressible = true) {
  // Validate value type
  if (!check.object(value)) {
    return "Not an object.";
  }

  // Validate Operation
  if (!(value.Operation in DELTA_VALIDATORS)) {
    return "Operation > Missing or invalid.";
  }

  // Hand off to operation-specific validator
  // Strictly speaking, not all sub-validators require checkJsonExpressible
  const err = DELTA_VALIDATORS[value.Operation](value, checkJsonExpressible);
  if (err) {
    return `(${value.Operation} Delta) ${err}`;
  }
  return "";
}
