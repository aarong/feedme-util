import deltaWriter from "./deltawriter";
import error from "./error";
import feedSerializer from "./feedserializer";
import jestExtender from "./jestextender";
import md5Calculator from "./md5calculator";

/**
 * A common access point for all modules. Used mainly for doc generation.
 */
export default {
  deltaWriter,
  error,
  feedSerializer,
  jestExtender,
  md5Calculator
};
