import * as config from 'config';
import * as redis from 'redis';
import { promisify } from 'util';
import CircuitBreaker from 'videx/server/core/circuit-breaker';
import log from 'videx/server/log';

const baseOptions = {
  port: '6379',
  host: config.get('DATABASE.REDIS.HOST'),
  // https://github.com/NodeRedis/node_redis
  retry_strategy: options => {
    if (options.attempt > Number.MAX_SAFE_INTEGER) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return 15 * 1000;
  }
};

const NODE_ENV = config.util.getEnv('NODE_ENV');

const options =
  NODE_ENV === 'production' || NODE_ENV === 'staging'
    ? {
        ...baseOptions,
        password: config.get('DATABASE.REDIS.SECRET')
      }
    : baseOptions;

export default class RedisClient {
  private client_;
  public getAsync;
  public flushallAsync;
  public setAsync;
  public setexAsync;

  constructor() {
    log.trace('verbose', 'RedisClient start');
    this.client_ = redis.createClient(options);
    this.client_.on('connect', () =>
      log.trace('info', 'RedisClient connected to server')
    );
    this.client_.on('ready', () => {
      log.trace('info', 'RedisClient is ready');
      CircuitBreaker.close('redis');
    });
    this.client_.on('reconnecting', () =>
      log.trace('critical', 'RedisClient reconnecting to server')
    );
    this.client_.on('error', error => log.exception(error));
    this.client_.on('end', () => {
      log.trace('critical', 'RedisClient disconnected from server');
      CircuitBreaker.open('redis');
    });

    this.getAsync = promisify(this.client_.get).bind(this.client_);
    this.flushallAsync = promisify(this.client_.flushall).bind(this.client_);
    this.setAsync = promisify(this.client_.set).bind(this.client_);
    this.setexAsync = promisify(this.client_.setex).bind(this.client_);
    log.trace('verbose', 'RedisClient complete');
  }

  public getClient() {
    return this.client_;
  }
}
