import * as crypto from 'crypto';
import log from 'videx/server/log';
import RedisClient from './RedisClient';

export default class Redis {
  private static client_ = new RedisClient();

  public static getClient(): any {
    return Redis.client_.getClient();
  }

  public static async flushall(): Promise<any> {
    log.trace('verbose', 'Redis request flushall');
    await Redis.client_.flushallAsync();
    log.trace('verbose', 'Redis flushall complete');
  }

  public static async get(key, nullable?: boolean): Promise<any> {
    log.trace('verbose', 'Redis request get', { key });
    const hexKey = crypto
      .createHash('md5')
      .update(key)
      .digest('hex');
    const value = JSON.parse(await Redis.client_.getAsync(hexKey));
    if (nullable) {
      log.trace('verbose', 'Redis get complete', { key });
      return value;
    } else {
      if (value) {
        log.trace('verbose', 'Redis get complete', { key });
        return value;
      } else {
        throw new Error('Redis get error');
      }
    }
  }

  public static async set(key, value: object): Promise<any> {
    log.trace('verbose', 'Redis request set', {
      key,
      value: JSON.stringify(value)
    });
    const hexKey = crypto
      .createHash('md5')
      .update(key)
      .digest('hex');
    await Redis.client_.setAsync(hexKey, JSON.stringify(value));
    log.trace('verbose', 'Redis set complete', {
      key,
      value: JSON.stringify(value)
    });
  }

  public static async setex(key, seconds, value: object): Promise<any> {
    log.trace('verbose', 'Redis request setex', {
      key,
      seconds,
      value: JSON.stringify(value)
    });
    const hexKey = crypto
      .createHash('md5')
      .update(key)
      .digest('hex');
    await Redis.client_.setexAsync(hexKey, seconds, JSON.stringify(value));
    log.trace('verbose', 'Redis setex complete', {
      key,
      seconds,
      value: JSON.stringify(value)
    });
  }
}
