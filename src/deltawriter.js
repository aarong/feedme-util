import check from "check-types";
import _isEqual from "lodash/isEqual";
import _remove from "lodash/remove";
import _each from "lodash/each";

/**
Applies delta operations to feed data objects.
*/
const deltaWriter = {};
export default deltaWriter;

/**
 * Checks whether a path element is valid for some parent feed data node and throws
 * an error if it isn't.
 *
 * - String path elements can only be used within object nodes
 * - Number path elements can only be used within array nodes
 *
 * @memberof deltaWriter
 * @private
 * @param {*} feedDataNode
 * @param {string|number} pathElement
 * @returns {void}
 * @throws {Error} "INVALID_OPERATION: ..."
 */
deltaWriter._checkPathElement = function _checkPathElement(
  feedDataNode,
  pathElement
) {
  if (check.string(pathElement) && !check.object(feedDataNode)) {
    throw new Error(
      "INVALID_OPERATION: Path references an object property but feed data node is not an object."
    );
  }

  if (check.number(pathElement) && !check.array(feedDataNode)) {
    throw new Error(
      "INVALID_OPERATION: Path references an array element but feed data node is not an array."
    );
  }
};

/**
 * Checks whether the specified path element exists as a child of the supplied
 * feed data node and throws an error if it doesn't.
 * @memberof deltaWriter
 * @privatea
 * @param {*} feedDataNode
 * @param {string|number} pathElement
 * @returns {void}
 * @throws {Error} "INVALID_OPERATION: ..."
 */
deltaWriter._checkChildExists = function _checkChildExists(
  feedDataNode,
  pathElement
) {
  deltaWriter._checkPathElement(feedDataNode, pathElement); // Cascade

  if (check.string(pathElement) && !(pathElement in feedDataNode)) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent object property."
    );
  }

  if (check.number(pathElement) && pathElement >= feedDataNode.length) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent array element."
    );
  }
};

/**
 * Navigates to a path-specified node in the feed data and returns it.
 * Throws an error if the path is invalid given the state of the feed data
 * or if the path endpoint doesn't exist.
 * @memberof deltaWriter
 * @private
 * @param {Object} feedData
 * @param {Array} path
 * @returns {*}
 * @throws {Error} "INVALID_OPERATION: ..."
 */
deltaWriter._getNode = function _getNode(feedData, path) {
  let node = feedData;
  path.forEach(pathElement => {
    this._checkChildExists(node, pathElement); // Cascade
    node = node[pathElement];
  });
  return node;
};

/**
 * Navigates to the parent of a path-specified node in the feed data and returns
 * the parent node and child path element. The child node is not required to
 * exist, but an error is thrown if the parent does not exist. An error is also
 * thrown if the path endpoint type (string/number) is not consistent with the
 * parent node type (object/array).
 * @memberof deltaWriter
 * @private
 * @param {Object} feedData
 * @param {Array} path
 * @param {boolean} [childMustExist=true]
 * @returns {Object} { parentNode: object|array, childPathElement: string|number }
 * @throws {Error} "INVALID_OPERATION: ..."
 */
deltaWriter._getParentNode = function _getParentNode(
  feedData,
  path,
  childMustExist = true
) {
  if (path.length === 0) {
    throw new Error(
      "INVALID_OPERATION: Path must not reference feed data root."
    );
  }

  const parentPath = path.slice(0, path.length - 1); // Do not modify original
  const childPathElement = path[path.length - 1]; // Will exit

  const parentNode = deltaWriter._getNode(feedData, parentPath); // Cascade

  if (childMustExist) {
    deltaWriter._checkChildExists(parentNode, childPathElement); // Cascade - also checks path element
  } else {
    deltaWriter._checkPathElement(parentNode, childPathElement); // Cascade
  }

  return { parentNode, childPathElement };
};

/**
 * Apply a delta operation to feed data, throwing an error if the delta
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
 * @returns {Object} The post-delta feed data.
 * @throws {Error}    "INVALID_ARGUMENT: ..."
 *                    "INVALID_OPERATION: ..."
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
  return this._operations[delta.Operation](feedData, delta); // Cascade
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
      throw new Error(
        "INVALID_OPERATION: Feed data root may only be set to an object."
      );
    }
    return delta.Value;
  }

  // Set non-root data
  const { parentNode, childPathElement } = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    false // Child not required to exist
  ); // Cascade
  if (check.array(parentNode) && childPathElement > parentNode.length) {
    throw new Error(
      "INVALID_OPERATION: Cannot set a non-contiguous element of an array."
    );
  }
  parentNode[childPathElement] = delta.Value;
  return feedData;
};

/**
 * Delta operation: Delete
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Delete = function delete_(feedData, delta) {
  const { parentNode, childPathElement } = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  ); // Cascade
  if (check.object(parentNode)) {
    delete parentNode[childPathElement];
  } else {
    parentNode.splice(childPathElement, 1);
  }
  return feedData;
};

/**
 * Delta operation: DeleteValue
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.DeleteValue = function deleteValue(feedData, delta) {
  const parentNode = deltaWriter._getNode(feedData, delta.Path);
  if (check.object(parentNode)) {
    _each(parentNode, (val, key) => {
      if (_isEqual(val, delta.Value)) {
        delete parentNode[key];
      }
    });
  } else if (check.array(parentNode)) {
    _remove(parentNode, val => _isEqual(val, delta.Value));
  } else {
    throw new Error(
      "INVALID_OPERATION: Path must refer to an array or an object."
    );
  }
  return feedData;
};

/**
 * Delta operation: Prepend
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Prepend = function prepend(feedData, delta) {
  const { parentNode, childPathElement } = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  ); // Cascade
  if (check.string(parentNode[childPathElement])) {
    parentNode[childPathElement] = delta.Value + parentNode[childPathElement];
  } else {
    throw new Error("INVALID_OPERATION: Path must reference a string.");
  }
  return feedData;
};

/**
 * Delta operation: Append
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Append = function append(feedData, delta) {
  const { parentNode, childPathElement } = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  ); // Cascade
  if (check.string(parentNode[childPathElement])) {
    parentNode[childPathElement] += delta.Value;
  } else {
    throw new Error("INVALID_OPERATION: Path must reference a string.");
  }
  return feedData;
};

/**
 * Delta operation: Increment
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Increment = function increment(feedData, delta) {
  const { parentNode, childPathElement } = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  ); // Cascade
  if (check.number(parentNode[childPathElement])) {
    parentNode[childPathElement] += delta.Value;
  } else {
    throw new Error("INVALID_OPERATION: Path must reference a number.");
  }
  return feedData;
};

/**
 * Delta operation: Decrement
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Decrement = function decrement(feedData, delta) {
  const { parentNode, childPathElement } = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  ); // Cascade
  if (check.number(parentNode[childPathElement])) {
    parentNode[childPathElement] -= delta.Value;
  } else {
    throw new Error("INVALID_OPERATION: Path must reference a number.");
  }
  return feedData;
};

/**
 * Delta operation: Toggle
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.Toggle = function toggle(feedData, delta) {
  const { parentNode, childPathElement } = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  ); // Cascade
  if (check.boolean(parentNode[childPathElement])) {
    parentNode[childPathElement] = !parentNode[childPathElement];
  } else {
    throw new Error("INVALID_OPERATION: Path must reference a boolean.");
  }
  return feedData;
};

/**
 * Delta operation: InsertFirst
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.InsertFirst = function insertFirst(feedData, delta) {
  const parentNode = deltaWriter._getNode(feedData, delta.Path);
  if (check.array(parentNode)) {
    parentNode.unshift(delta.Value);
  } else {
    throw new Error("INVALID_OPERATION: Path must reference an array.");
  }
  return feedData;
};

/**
 * Delta operation: InsertLast
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.InsertLast = function insertLast(feedData, delta) {
  const parentNode = deltaWriter._getNode(feedData, delta.Path);
  if (check.array(parentNode)) {
    parentNode.push(delta.Value);
  } else {
    throw new Error("INVALID_OPERATION: Path must reference an array.");
  }
  return feedData;
};

/**
 * Delta operation: InsertBefore
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.InsertBefore = function insertBefore(feedData, delta) {
  const { parentNode, childPathElement } = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  ); // Cascade
  if (!check.array(parentNode)) {
    throw new Error("INVALID_OPERATION: Path must reference an array element.");
  }
  parentNode.splice(childPathElement, 0, delta.Value);
  return feedData;
};

/**
 * Delta operation: InsertAfter
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.InsertAfter = function insertAfter(feedData, delta) {
  const { parentNode, childPathElement } = deltaWriter._getParentNode(
    feedData,
    delta.Path,
    true // Child must exist
  ); // Cascade
  if (!check.array(parentNode)) {
    throw new Error("INVALID_OPERATION: Path must reference an array element.");
  }
  parentNode.splice(childPathElement + 1, 0, delta.Value);
  return feedData;
};

/**
 * Delta operation: DeleteFirst
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.DeleteFirst = function deleteFirst(feedData, delta) {
  const parentNode = deltaWriter._getNode(feedData, delta.Path);
  if (check.array(parentNode)) {
    if (parentNode.length === 0) {
      throw new Error(
        "INVALID_OPERATION: Path must reference a non-empty array."
      );
    }
    parentNode.shift();
  } else {
    throw new Error("INVALID_OPERATION: Path must reference an array.");
  }
  return feedData;
};

/**
 * Delta operation: DeleteLast
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.DeleteLast = function deleteLast(feedData, delta) {
  const parentNode = deltaWriter._getNode(feedData, delta.Path);
  if (check.array(parentNode)) {
    if (parentNode.length === 0) {
      throw new Error(
        "INVALID_OPERATION: Path must reference a non-empty array."
      );
    }
    parentNode.pop();
  } else {
    throw new Error("INVALID_OPERATION: Path must reference an array.");
  }
  return feedData;
};
