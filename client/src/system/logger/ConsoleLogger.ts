import { ILogger, LogLevel } from './index';

export default class ConsoleLog implements ILogger {
  private beautifyJSON = (object: { [key: string]: string }) =>
    JSON.stringify(object, null, 2);

  event(message: string, properties?: any) {
    console.log(
      `[EVENT] ${message}. Properties: ${this.beautifyJSON(properties)}`
    );
  }

  error(error: Error, properties?: any) {
    console.log(
      `[ERROR] ${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      )}. Properties: ${this.beautifyJSON(properties)}`
    );
  }
}
