import * as applicationinsights from 'applicationinsights';
import Log from './Log';

export default class ApplicationInsightsLog implements Log {
  private client_: applicationinsights.TelemetryClient;

  private severity2number_(severity) {
    switch (severity) {
      case 'verbose':
        return 0;
      case 'info':
        return 1;
      case 'warning':
        return 2;
      case 'error':
        return 3;
      case 'critical':
        return 4;
    }
  }

  constructor(secret: string) {
    applicationinsights
      .setup(secret)
      .setAutoDependencyCorrelation(false)
      .start();
    this.client_ = applicationinsights.defaultClient;
  }

  public event(name: string, properties?: { [key: string]: string }) {
    try {
      this.client_.trackEvent({ name, properties });
    } catch (e) {
      console.log(e);
    }
  }

  public trace(
    severityLevel,
    message: string,
    properties?: { [key: string]: string }
  ) {
    try {
      this.client_.trackTrace({
        message,
        properties,
        severity: this.severity2number_(severityLevel)
      });
    } catch (e) {
      console.log(e);
    }
  }

  public exception(exception: Error, properties?: { [key: string]: string }) {
    try {
      this.client_.trackException({ exception, properties });
    } catch (e) {
      console.log(e);
    }
  }

  public metric(
    name: string,
    value: number,
    properties?: { [key: string]: string }
  ) {
    try {
      this.client_.trackMetric({ name, value, properties });
    } catch (e) {
      console.log(e);
    }
  }
}
