import { AppInsights } from 'applicationinsights-js';
import { ILogger, LogLevel } from './index';

export default class ApplicationInsightsLogger implements ILogger {
  constructor(key: string) {
    AppInsights.downloadAndSetup({ instrumentationKey: key });
  }

  event(message: string, properties?: any) {
    AppInsights.trackEvent(message, properties);
  }

  error(error: Error, properties?: any) {
    AppInsights.trackException(error, 'unhandled', properties);
  }
}
