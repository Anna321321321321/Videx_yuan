import * as config from 'config';
import ApplicationInsightsLog from './ApplicationInsightsLog';
import ConsoleLog from './ConsoleLog';
import Log from './Log';

let log: Log;
const nodeEnv: string = config.util.getEnv('NODE_ENV');

switch (nodeEnv) {
  case 'development':
  case 'test':
    log = new ConsoleLog();
    break;
  case 'staging':
  case 'production':
    log = new ApplicationInsightsLog(
      config.get<string>('AZURE.APPINSIGHTS.SECRET')
    );
    break;
}

export default log;
