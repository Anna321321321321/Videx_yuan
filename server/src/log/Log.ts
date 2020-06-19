type Severity = 'verbose' | 'info' | 'warning' | 'error' | 'critical';

export default interface Log {
  // Log interesting events, e.g. user behaviors
  event(name: string, properties?: { [key: string]: string });

  // Log diagnostic traces to help debug and determine root cause of errors
  trace(
    severity: Severity,
    message: string,
    properties?: { [key: string]: string }
  );

  // Log an exception
  exception(exception: Error, properties?: { [key: string]: string | number });

  // Log a metric
  metric(name: string, value: number, properties?: { [key: string]: string });
}
