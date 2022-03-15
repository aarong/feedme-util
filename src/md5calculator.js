import check from "check-types";
import md5 from "crypto-js/md5";
import base64 from "crypto-js/enc-base64";

/**
 * Calculates MD5 hashes for feed data objects in the manner prescribed by
 * the spec.
 */
const md5Calculator = {};
export default md5Calculator;

/**
 * Calculate an MD5 hash for a given feed data object.
 * @param {Object} feedData The post-delta feed data object
 * @returns {string} Base64 representation of the calculated hash
 * @throws {Error}
 */
md5Calculator.calculate = function calculate(feedData) {
  // Object?
  if (!check.object(feedData)) {
    throw new Error("Feed data must be an object.");
  }

  // Get the canonical JSON
  const json = this._canonicalJson(feedData);

  // Calculate and return the MD5 hash
  return base64.stringify(md5(json));
};

/**
 * Generate the canonical JSON for a node of the feed data object.
 * Recurse on objects and arrays. Base case is everything else.
 * @param {anything} node A node in the feed data structure (any type)
 * @returns {string} Canonical JSON representation of that node
 */
md5Calculator._canonicalJson = function _canonicalJson(node) {
  let json = "";
  if (check.object(node)) {
    json += "{";
    // Get object keys
    const keys = Object.keys(node);
    // Sort the keys explicitly
    keys.sort();
    // For each key (in lex order)
    let first = true;
    keys.forEach((element, index) => {
      if (!first) {
        json += ",";
      }
      first = false;
      json += JSON.stringify(String(element)); // Encode - could be special chars
      json += ":";
      json += this._canonicalJson(node[keys[index]]);
    });
    json += "}";
  } else if (check.array(node)) {
    json += "[";
    for (let i = 0; i < node.length; i += 1) {
      if (i > 0) {
        json += ",";
      }
      json += this._canonicalJson(node[i]);
    }
    json += "]";
  } else {
    json = JSON.stringify(node);
  }
  return json;
};
