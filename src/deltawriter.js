import check from "check-types";
import _isEqual from "lodash/isEqual";
import _remove from "lodash/remove";
import _each from "lodash/each";

/**
Validates delta objects given some feed data and applies them.
*/
const deltaWriter = {};
export default deltaWriter;

/**
 * Checks whether a path element is valid for some parent feed data node.
 *
 * - String path elements can only be used within object nodes
 * - Number path elements can only be used within array nodes
 *
 * @memberof deltaWriter
 * @private
 * @param {*} feedDataNode
 * @param {string|number} pathElement
 * @returns {Object} { valid: true } or { valid: false, reason: string }
 */
deltaWriter._checkPathElement = function _checkPathElement(
  feedDataNode,
  pathElement
) {
  if (check.string(pathElement) && !check.object(feedDataNode)) {
    return {
      valid: false,
      reason:
        "Path references an object property but feed data node is not an object."
    };
  }

  if (check.number(pathElement) && !check.array(feedDataNode)) {
    return {
      valid: false,
      reason:
        "Path references an array element but feed data node is not an array."
    };
  }

  return { valid: true };
};

/**
 * Checks whether the specified path element exists as a child of the supplied
 * feed data node and returns an error if it doesn't.
 * @memberof deltaWriter
 * @privatea
 * @param {*} feedDataNode
 * @param {string|number} pathElement
 * @returns {Object} { valid: true } or { valid: false, reason: string }
 */
deltaWriter._checkChildExists = function _checkChildExists(
  feedDataNode,
  pathElement
) {
  const result = deltaWriter._checkPathElement(feedDataNode, pathElement);
  if (!result.valid) {
    return result;
  }

  if (check.string(pathElement) && !(pathElement in feedDataNode)) {
    return {
      valid: false,
      reason: "Path references a non-existent object property."
    };
  }

  if (check.number(pathElement) && pathElement >= feedDataNode.length) {
    return {
      valid: false,
      reason: "Path references a non-existent array element."
    };
  }

  return { valid: true };
};

/**
 * Navigates to a path-specified node in the feed data and returns it.
 * Returns an error if the path is invalid given the state of the feed data
 * or if the path endpoint doesn't exist.
 * @memberof deltaWriter
 * @private
 * @param {Object} feedData
 * @param {Array} path
 * @returns {Object} { valid: true, node: value } or { valid: false, reason: string }
 */
deltaWriter._getNode = function _getNode(feedData, path) {
  let node = feedData;
  for (let i = 0; i < path.length; i += 1) {
    const pathElement = path[i];
    const result = this._checkChildExists(node, pathElement);
    if (!result.valid) {
      return result;
    }
    node = node[pathElement];
  }
  return { valid: true, node };
};

/**
 * Navigates to the parent of a path-specified node in the feed data and returns
 * the parent node and child path element. The child node is not required to
 * exist, but an error is returned if the parent does not exist. An error is also
 * returned if the path endpoint type (string/number) is not consistent with the
 * parent node type (object/array).
 * @memberof deltaWriter
 * @private
 * @param {Object} feedData
 * @param {Array} path
 * @param {boolean} [childMustExist=true]
 * @returns {Object} { valid: false, reason: string }
 *                   or
 *                   {
 *                     valid:            true,
 *                     parentNode:       object|array,
 *                     childPathElement: string|number
 *                   }
 */
deltaWriter._getParentNode = function _getParentNode(
  feedData,
  path,
  childMustExist = true
) {
  if (path.length === 0) {
    return { valid: false, reason: "Path must not reference feed data root." };
  }

  const parentPath = path.slice(0, path.length - 1); // Do not modify original
  const childPathElement = path[path.length - 1]; // Will exit

  let result = deltaWriter._getNode(feedData, parentPath);
  if (!result.valid) {
    return result;
  }
  const parentNode = result.node;

  if (childMustExist) {
    result = deltaWriter._checkChildExists(parentNode, childPathElement); // Also checks path element
  } else {
    result = deltaWriter._checkPathElement(parentNode, childPathElement);
  }
  if (!result.valid) {
    return result;
  }

  return { valid: true, parentNode, childPathElement };
};

/**
 * Apply a delta operation to feed data, returning an error if the delta
 * is not valid given the current state of the feed data.
 *
 * The feedData argument is generally modified and returned, except when
 * performing a Set operation on the root of the feed data, in which case
 * delta.Value is returned.
 *
 * If delta.Value is being inserted somewhere in feedData, the insertion is
 * done by reference. So if delta.Value is an array or object and is modified
 * after the call to apply(), it can affect feedData.
 * @memberof deltaWriter
 * @param {Object} feedData The pre-delta feed data.
 * @param {Object} delta A schema-valid feed delta is assumed (not checked).
 *                       The operation may or may not be valid given the current
 *                       state of the feed data.
 * @returns {Object} { valid: true, feedData: object }
 *                   or
 *                   { valid: false, reason: string}
 * @throws {Error}    "INVALID_ARGUMENT: ..."
 */
deltaWriter.apply = function apply(feedData, delta) {
  // Check feed data arg
  if (!check.object(feedData)) {
    throw new Error("INVALID_ARGUMENT: Invalid feed data object.");
  }

  // Check delta arg
  if (!check.object(delta)) {
    throw new Error("INVALID_ARGUMENT: Invalid delta object.");
  }

  // Pass to operation-specific processor
  return this._operations[delta.Operation](feedData, delta);
};

/**
 * Container for delta operation functions.
 * @memberof deltaWriter
 * @private
 */
deltaWriter._operations = {};

/**
 * Delta operation: Set
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Set = function set(feedData, delta) {
  // Set root data
  if (delta.Path.length === 0) {
    if (!check.object(delta.Value)) {
      return {
        valid: false,
        reason: "Feed data root may only be set to an object."
      };
    }
    return { valid: true, feedData: delta.Value };
  }

  // Set non-root data
  const result = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    false // Child not required to exist
  );
  if (!result.valid) {
    return result;
  }
  const { parentNode, childPathElement } = result;

  if (check.array(parentNode) && childPathElement > parentNode.length) {
    return {
      valid: false,
      reason: "Cannot set a non-contiguous element of an array."
    };
  }
  parentNode[childPathElement] = delta.Value;
  return { valid: true, feedData };
};

/**
 * Delta operation: Delete
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Delete = function delete_(feedData, delta) {
  const result = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  );
  if (!result.valid) {
    return result;
  }
  const { parentNode, childPathElement } = result;

  if (check.object(parentNode)) {
    delete parentNode[childPathElement];
  } else {
    parentNode.splice(childPathElement, 1);
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: DeleteValue
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.DeleteValue = function deleteValue(feedData, delta) {
  const result = deltaWriter._getNode(feedData, delta.Path);
  if (!result.valid) {
    return result;
  }
  const parentNode = result.node;

  if (check.object(parentNode)) {
    _each(parentNode, (val, key) => {
      if (_isEqual(val, delta.Value)) {
        delete parentNode[key];
      }
    });
  } else if (check.array(parentNode)) {
    _remove(parentNode, val => _isEqual(val, delta.Value));
  } else {
    return {
      valid: false,
      reason: "Path must refer to an array or an object."
    };
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: Prepend
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Prepend = function prepend(feedData, delta) {
  const result = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  );
  if (!result.valid) {
    return result;
  }
  const { parentNode, childPathElement } = result;

  if (check.string(parentNode[childPathElement])) {
    parentNode[childPathElement] = delta.Value + parentNode[childPathElement];
  } else {
    return { valid: false, reason: "Path must reference a string." };
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: Append
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Append = function append(feedData, delta) {
  const result = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  );
  if (!result.valid) {
    return result;
  }
  const { parentNode, childPathElement } = result;

  if (check.string(parentNode[childPathElement])) {
    parentNode[childPathElement] += delta.Value;
  } else {
    return { valid: false, reason: "Path must reference a string." };
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: Increment
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Increment = function increment(feedData, delta) {
  const result = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  );
  if (!result.valid) {
    return result;
  }
  const { parentNode, childPathElement } = result;

  if (check.number(parentNode[childPathElement])) {
    parentNode[childPathElement] += delta.Value;
  } else {
    return { valid: false, reason: "Path must reference a number." };
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: Decrement
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Decrement = function decrement(feedData, delta) {
  const result = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  );
  if (!result.valid) {
    return result;
  }
  const { parentNode, childPathElement } = result;

  if (check.number(parentNode[childPathElement])) {
    parentNode[childPathElement] -= delta.Value;
  } else {
    return { valid: false, reason: "Path must reference a number." };
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: Toggle
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Toggle = function toggle(feedData, delta) {
  const result = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  );
  if (!result.valid) {
    return result;
  }
  const { parentNode, childPathElement } = result;

  if (check.boolean(parentNode[childPathElement])) {
    parentNode[childPathElement] = !parentNode[childPathElement];
  } else {
    return { valid: false, reason: "Path must reference a boolean." };
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: InsertFirst
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.InsertFirst = function insertFirst(feedData, delta) {
  const result = deltaWriter._getNode(feedData, delta.Path);
  if (!result.valid) {
    return result;
  }
  const parentNode = result.node;

  if (check.array(parentNode)) {
    parentNode.unshift(delta.Value);
  } else {
    return { valid: false, reason: "Path must reference an array." };
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: InsertLast
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.InsertLast = function insertLast(feedData, delta) {
  const result = deltaWriter._getNode(feedData, delta.Path);
  if (!result.valid) {
    return result;
  }
  const parentNode = result.node;

  if (check.array(parentNode)) {
    parentNode.push(delta.Value);
  } else {
    return { valid: false, reason: "Path must reference an array." };
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: InsertBefore
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.InsertBefore = function insertBefore(feedData, delta) {
  const result = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  );
  if (!result.valid) {
    return result;
  }
  const { parentNode, childPathElement } = result;

  if (!check.array(parentNode)) {
    return { valid: false, reason: "Path must reference an array element." };
  }
  parentNode.splice(childPathElement, 0, delta.Value);
  return { valid: true, feedData };
};

/**
 * Delta operation: InsertAfter
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.InsertAfter = function insertAfter(feedData, delta) {
  const result = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  );
  if (!result.valid) {
    return result;
  }
  const { parentNode, childPathElement } = result;

  if (!check.array(parentNode)) {
    return { valid: false, reason: "Path must reference an array element." };
  }
  parentNode.splice(childPathElement + 1, 0, delta.Value);
  return { valid: true, feedData };
};

/**
 * Delta operation: DeleteFirst
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.DeleteFirst = function deleteFirst(feedData, delta) {
  const result = deltaWriter._getNode(feedData, delta.Path);
  if (!result.valid) {
    return result;
  }
  const parentNode = result.node;

  if (check.array(parentNode)) {
    if (parentNode.length === 0) {
      return { valid: false, reason: "Path must reference a non-empty array." };
    }
    parentNode.shift();
  } else {
    return { valid: false, reason: "Path must reference an array." };
  }
  return { valid: true, feedData };
};

/**
 * Delta operation: DeleteLast
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.DeleteLast = function deleteLast(feedData, delta) {
  const result = deltaWriter._getNode(feedData, delta.Path);
  if (!result.valid) {
    return result;
  }
  const parentNode = result.node;

  if (check.array(parentNode)) {
    if (parentNode.length === 0) {
      return { valid: false, reason: "Path must reference a non-empty array." };
    }
    parentNode.pop();
  } else {
    return { valid: false, reason: "Path must reference an array." };
  }
  return { valid: true, feedData };
};
