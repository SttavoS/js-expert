import safeRegex from "safe-regex";
import InvalidRegexError from "../errors/InvalidRegexError.js";

export const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp);
  if (isSafe) return exp;

  throw new InvalidRegexError(exp);
};
