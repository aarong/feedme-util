/**
 * Convenience utility to create Javascript errors with a given name and message.
 * @param {string} name
 * @param {string} message
 * @returns {Error}
 */
export default function error(name, message) {
  const err = new Error();
  err.name = name;
  err.message = message;
  return err;
}
