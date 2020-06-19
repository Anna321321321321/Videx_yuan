import chalk from 'chalk';
import * as PrettyError from 'pretty-error';
import Log from './Log';
const pe = new PrettyError();

export default class ConsoleLog implements Log {
  private beautifyJSON_ = (properties: { [key: string]: string }) =>
    JSON.stringify({ ...properties, timestamp: new Date().toLocaleString() });

  private newline_() {
    console.log();
  }

  event(name: string, properties: { [key: string]: string } = {}) {
    this.newline_();
    console.log(`${chalk.white('[EVENT]')}`);
    console.log(`${name}`);
    console.log(`${this.beautifyJSON_(properties)}`);
    this.newline_();
  }

  trace(
    severityLevel,
    message: string,
    properties: { [key: string]: string } = {}
  ) {
    if (severityLevel !== 'verbose') {
      this.newline_();
      console.log(`${chalk.blue('[TRACE]')}`);
      switch (severityLevel) {
        case 'verbose':
          console.log(chalk.cyan(`${severityLevel}: ${message}`));
          break;
        case 'info':
          console.log(chalk.green(`${severityLevel}: ${message}`));
          break;
        case 'warning':
          console.log(chalk.yellow(`${severityLevel}: ${message}`));
          break;
        case 'error':
          console.log(chalk.red(`${severityLevel}: ${message}`));
          break;
        case 'critical':
          console.log(chalk.magenta(`${severityLevel}: ${message}`));
          break;
      }
      console.log(`${this.beautifyJSON_(properties)}`);
      this.newline_();
    }
  }

  exception(exception: Error, properties: { [key: string]: string } = {}) {
    this.newline_();
    console.log(`${chalk.red('[ERROR]')}`);
    console.log(`${pe.render(exception)}`);
    console.log(`${this.beautifyJSON_(properties)}`);
    this.newline_();
  }

  metric(
    name: string,
    value: number,
    properties: { [key: string]: string } = {}
  ) {
    console.log(
      `[METRIC] ${name}. Value: ${value}. Properties: ${this.beautifyJSON_(
        properties
      )}`
    );
  }
}
