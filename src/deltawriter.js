import check from "check-types";
import _filter from "lodash/filter";
import _isEqual from "lodash/isEqual";
import _remove from "lodash/remove";
import _each from "lodash/each";

/**
Applies delta operations to feed data.
*/
const deltaWriter = {};
export default deltaWriter;

/**
 * Walks to a specified path in some feed data, returning a reference.
 * Throws an error if the path endpoint does not exist.
 * @memberof deltaWriter
 * @private
 * @param {Object} feedData The feed data to navigate
 * @param {Array} path The path to walk to
 * @returns {Object} Reference to the path endpoint
 * @throws {Error} "INVALID_OPERATION: ..."
 */
deltaWriter._walkTo = function _walkTo(feedData, path) {
  let node = feedData;

  path.forEach(pathElement => {
    if (check.string(pathElement)) {
      // Object member reference
      if (!check.object(node)) {
        throw new Error(
          "INVALID_OPERATION: Path references a member of a non-object."
        );
      }
      if (!(pathElement in node)) {
        throw new Error(
          "INVALID_OPERATION: Path references a non-existent object member."
        );
      }
    } else {
      // Array element reference
      if (!check.array(node)) {
        throw new Error(
          "INVALID_OPERATION: Path references an element of a non-array."
        );
      }
      if (pathElement >= node.length) {
        throw new Error(
          "INVALID_OPERATION: Path references a non-existent array element."
        );
      }
    }
    node = node[pathElement];
  });

  return node;
};

/**
 * Return a path to the container/object for a given path (i.e. a copy
 * of the array with the last element chopped, or an error on empty input).
 * @memberof deltaWriter
 * @private
 * @param {Array} path The path to the contained data.
 * @returns {Array} The path to the container.
 * @throws {Error} "INVALID_OPERATION: ..."
 */
deltaWriter._containerPath = function _containerPath(path) {
  if (path.length === 0) {
    throw new Error(
      "INVALID_OPERATION: The feed data root does not have a container."
    );
  }
  return _filter(path, (val, idx) => idx < path.length - 1); // Don't modify original
};

/**
 * Apply a delta operation to feed data, throwing an error if the delta
 * is not valid given the current state of the feed data.
 * @memberof deltaWriter
 * @param {Object} feedData The current feed data.
 * @param {Object} delta A schema-valid feed delta is assumed (not checked).
 *                       The operation may or may
 *                       not be valid given the current state of the feed data.
 * @returns {Object} The post-operation feed data. This will be a reference
 *                   to feedData unless the root is being set, in which case
 *                   a reference to delta.
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

  // Camel case function name
  const fn = delta.Operation[0].toLowerCase() + delta.Operation.substring(1);
  return this._operations[fn](feedData, delta); // Cascade errors
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
deltaWriter._operations.set = function set(feedData, delta) {
  if (delta.Path.length === 0) {
    if (!check.object(delta.Value)) {
      throw new Error(
        "INVALID_OPERATION: The feed data root must be an object."
      );
    }
    return delta.Value;
  }
  const pathEndpoint = delta.Path[delta.Path.length - 1];
  const containerNode = deltaWriter._walkTo(
    feedData,
    deltaWriter._containerPath(delta.Path)
  );
  if (check.array(containerNode) && pathEndpoint > containerNode.length) {
    throw new Error(
      "INVALID_OPERATION: Cannot write non-contiguous elements to an array."
    );
  }
  containerNode[pathEndpoint] = delta.Value;
  return feedData;
};

/**
 * Delta operation: Delete
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.delete = function delete_(feedData, delta) {
  if (delta.Path.length === 0) {
    throw new Error("INVALID_OPERATION: Cannot delete the feed data root.");
  }
  const pathEndpoint = delta.Path[delta.Path.length - 1];
  const containerNode = deltaWriter._walkTo(
    feedData,
    deltaWriter._containerPath(delta.Path)
  );
  if (check.undefined(containerNode[pathEndpoint])) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent location in the feed data."
    );
  }
  // pathEndpoint exists, so we know containerNode is an object/array
  if (check.array(containerNode)) {
    containerNode.splice(pathEndpoint, 1);
  } else {
    delete containerNode[pathEndpoint];
  }
  return feedData;
};

/**
 * Delta operation: DeleteValue
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.deleteValue = function deleteValue(feedData, delta) {
  const containerNode = deltaWriter._walkTo(feedData, delta.Path);
  if (check.array(containerNode)) {
    _remove(containerNode, val => _isEqual(val, delta.Value));
  } else if (check.object(containerNode)) {
    _each(containerNode, (val, key) => {
      if (_isEqual(val, delta.Value)) {
        delete containerNode[key];
      }
    });
  } else {
    throw new Error(
      "INVALID_OPERATION: Can only delete from arrays and objects."
    );
  }
  return feedData;
};

/**
 * Delta operation: Prepend
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.prepend = function prepend(feedData, delta) {
  const containerNode = deltaWriter._walkTo(
    feedData,
    deltaWriter._containerPath(delta.Path)
  );
  const pathEndpoint = delta.Path[delta.Path.length - 1];
  if (check.undefined(containerNode[pathEndpoint])) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent location in the feed data."
    );
  } else if (check.string(containerNode[pathEndpoint])) {
    containerNode[pathEndpoint] = delta.Value + containerNode[pathEndpoint];
  } else {
    throw new Error("INVALID_OPERATION: Can only prepend to strings.");
  }
  return feedData;
};

/**
 * Delta operation: Append
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.append = function append(feedData, delta) {
  const containerNode = deltaWriter._walkTo(
    feedData,
    deltaWriter._containerPath(delta.Path)
  );
  const pathEndpoint = delta.Path[delta.Path.length - 1];
  if (check.undefined(containerNode[pathEndpoint])) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent location in the feed data."
    );
  } else if (check.string(containerNode[pathEndpoint])) {
    containerNode[pathEndpoint] += delta.Value;
  } else {
    throw new Error("INVALID_OPERATION: Can only append to strings.");
  }
  return feedData;
};

/**
 * Delta operation: Increment
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.increment = function increment(feedData, delta) {
  const containerNode = deltaWriter._walkTo(
    feedData,
    deltaWriter._containerPath(delta.Path)
  );
  const pathEndpoint = delta.Path[delta.Path.length - 1];
  if (check.undefined(containerNode[pathEndpoint])) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent location in the feed data."
    );
  } else if (check.number(containerNode[pathEndpoint])) {
    containerNode[pathEndpoint] += delta.Value;
  } else {
    throw new Error("INVALID_OPERATION: Can only increment numbers.");
  }
  return feedData;
};

/**
 * Delta operation: Decrement
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.decrement = function decrement(feedData, delta) {
  const containerNode = deltaWriter._walkTo(
    feedData,
    deltaWriter._containerPath(delta.Path)
  );
  const pathEndpoint = delta.Path[delta.Path.length - 1];
  if (check.undefined(containerNode[pathEndpoint])) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent location in the feed data."
    );
  } else if (check.number(containerNode[pathEndpoint])) {
    containerNode[pathEndpoint] -= delta.Value;
  } else {
    throw new Error("INVALID_OPERATION: Can only decrement numbers.");
  }
  return feedData;
};

/**
 * Delta operation: Toggle
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.toggle = function toggle(feedData, delta) {
  const containerNode = deltaWriter._walkTo(
    feedData,
    deltaWriter._containerPath(delta.Path)
  );
  const pathEndpoint = delta.Path[delta.Path.length - 1];
  if (check.undefined(containerNode[pathEndpoint])) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent location in the feed data."
    );
  } else if (check.boolean(containerNode[pathEndpoint])) {
    containerNode[pathEndpoint] = !containerNode[pathEndpoint];
  } else {
    throw new Error("INVALID_OPERATION: Can only toggle booleans.");
  }
  return feedData;
};

/**
 * Delta operation: InsertFirst
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.insertFirst = function insertFirst(feedData, delta) {
  const containerNode = deltaWriter._walkTo(feedData, delta.Path);
  if (check.array(containerNode)) {
    containerNode.unshift(delta.Value);
  } else {
    throw new Error("INVALID_OPERATION: Can only insert into arrays.");
  }
  return feedData;
};

/**
 * Delta operation: InsertLast
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.insertLast = function insertLast(feedData, delta) {
  const containerNode = deltaWriter._walkTo(feedData, delta.Path);
  if (check.array(containerNode)) {
    containerNode.push(delta.Value);
  } else {
    throw new Error("INVALID_OPERATION: Can only insert into arrays.");
  }
  return feedData;
};

/**
 * Delta operation: InsertBefore
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.insertBefore = function insertBefore(feedData, delta) {
  const containerNode = deltaWriter._walkTo(
    feedData,
    deltaWriter._containerPath(delta.Path)
  );
  const pathEndpoint = delta.Path[delta.Path.length - 1];
  if (check.undefined(containerNode[pathEndpoint])) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent location in the feed data."
    );
  }
  if (!check.array(containerNode)) {
    throw new Error("INVALID_OPERATION: Can only insert into arrays.");
  }
  containerNode.splice(pathEndpoint, 0, delta.Value);
  return feedData;
};

/**
 * Delta operation: InsertAfter
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.insertAfter = function insertAfter(feedData, delta) {
  const containerNode = deltaWriter._walkTo(
    feedData,
    deltaWriter._containerPath(delta.Path)
  );
  const pathEndpoint = delta.Path[delta.Path.length - 1];
  if (check.undefined(containerNode[pathEndpoint])) {
    throw new Error(
      "INVALID_OPERATION: Path references a non-existent location in the feed data."
    );
  }
  if (!check.array(containerNode)) {
    throw new Error("INVALID_OPERATION: Can only insert into arrays.");
  }
  containerNode.splice(pathEndpoint + 1, 0, delta.Value);
  return feedData;
};

/**
 * Delta operation: DeleteFirst
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.deleteFirst = function deleteFirst(feedData, delta) {
  const containerNode = deltaWriter._walkTo(feedData, delta.Path);
  if (check.array(containerNode)) {
    if (containerNode.length === 0) {
      throw new Error(
        "INVALID_OPERATION: Cannot delete elements from empty arrays."
      );
    }
    containerNode.shift(containerNode);
  } else {
    throw new Error("INVALID_OPERATION: Can only delete elements from arrays.");
  }
  return feedData;
};

/**
 * Delta operation: DeleteLast
 * @memberof deltaWriter._operations
 * @private
 */
deltaWriter._operations.deleteLast = function deleteLast(feedData, delta) {
  const containerNode = deltaWriter._walkTo(feedData, delta.Path);
  if (check.array(containerNode)) {
    if (containerNode.length === 0) {
      throw new Error(
        "INVALID_OPERATION: Cannot delete elements from empty arrays."
      );
    }
    containerNode.pop(containerNode);
  } else {
    throw new Error("INVALID_OPERATION: Can only delete elements from arrays.");
  }
  return feedData;
};
