import chalk from "chalk";
class OutputType {
  static INFO = "INFO";
  static ERROR = "ERROR";
  static WARNING = "WARNING";
  static SUCCESS = "SUCCESS";
}

function print(message, outputType) {
  switch (outputType) {
    case OutputType.INFO:
      console.log(chalk.white(message));
      break;
    case OutputType.ERROR:
      console.log(chalk.red(message));
      break;
    case OutputType.WARNING:
      console.log(chalk.yellow(message));
      break;
    case OutputType.SUCCESS:
      console.log(chalk.green(message));
      break;
    default:
      console.log(message);
  }
}

export { print, OutputType };
