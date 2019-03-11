/**
Jest's toThrow() matcher only verifies that the error message
is as expected, even when you pass an error object.
This custom matcher checks error name and message.
@param {function} expect Jest's expect function
*/
export default {
  extend: expect => {
    expect.extend({
      toThrowCustom(received, expName, expMessage) {
        let err;
        try {
          received();
        } catch (e) {
          err = e;
        }

        return {
          pass: !!err && err.name === expName && err.message === expMessage,
          message() {
            return `expected to throw Error with name "${expName}" and message "${expMessage}" but got: ${err}`;
          }
        };
      },
      toBeCustom(received, expName, expMessage) {
        return {
          pass:
            !!received &&
            received.name === expName &&
            received.message === expMessage,
          message() {
            return `expected to throw Error with name "${expName}" and message "${expMessage}" but got: ${received}`;
          }
        };
      }
    });
  }
};
