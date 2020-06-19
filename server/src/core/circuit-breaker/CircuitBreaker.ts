import log from 'videx/server/log';

type Circuit = 'mongodb' | 'redis';

export default class CircuitBreaker {
  private static status = {
    mongodb: false,
    redis: false
  };

  public static close(circuit: Circuit) {
    log.trace('info', `CircuitBreaker is closed`, { circuit });
    this.status[circuit] = true;
  }

  public static open(circuit: Circuit) {
    log.trace('critical', `CircuitBreaker is opened`, { circuit });
    this.status[circuit] = false;
  }

  public static getStatus() {
    return this.status.mongodb && this.status.redis;
  }
}
