import log from 'videx/server/log';
import CustomError from './CustomError';

export default class ServerError implements CustomError {
  code = null;
  error = null;
  properties = null;

  constructor(code, error: Error, properties = {}) {
    this.code = code;
    this.error = error;
    this.properties = properties;
    log.exception(error, properties);
  }
}
