export default class InvalidRegexError extends Error {
  constructor(exp) {
    super(`This ${exp} is unsafe dude!`);
    this.name = "InvalidRegexError";
  }
}
