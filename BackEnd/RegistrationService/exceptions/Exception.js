import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error {
  constructor(message, validationErrors = {}) {
    super(message);
    this.name = this.constructor.name;

    print(message, OutputType.ERROR);
    this.validationErrors = validationErrors;
  }
}
