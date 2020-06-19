import { CLIENT } from 'config';
import ApplicationInsightsLogger from './ApplicationInsightsLogger';
import ConsoleLogger from './ConsoleLogger';
import { parseProperties } from './helpers';

export enum LogLevel {
  Verbose = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
  Critical = 4
}

export interface ILogger {
  // Log interesting events, e.g. user behaviors
  event(message: string, properties?: any);

  // Log an error
  error(error: Error, properties?: any);
}

const appInsightsKey =
  CLIENT.AZURE && CLIENT.AZURE.APPINSIGHTS && CLIENT.AZURE.APPINSIGHTS.SECRET
    ? CLIENT.AZURE.APPINSIGHTS.SECRET
    : null;

let log: ILogger;
if (process.env.NODE_ENV === 'test') {
  log = new ConsoleLogger();
} else {
  log = appInsightsKey
    ? new ApplicationInsightsLogger(appInsightsKey)
    : new ConsoleLogger();
}

export const event = async (message: string, properties?: any) => {
  log.event(message, await parseProperties(properties));
};

export const error = async (error: Error, properties?: any) => {
  log.error(error, properties);
};
