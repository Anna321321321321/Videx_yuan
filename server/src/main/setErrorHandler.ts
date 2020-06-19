import { ServerError } from 'videx/server/core/error';
import log from 'videx/server/log';

export default app => {
  app.use((e, req, res, next) => {
    if (e instanceof ServerError) {
      res.status(e.code);
      let message;
      switch (e.code) {
        case 400:
          message = 'Bad Request';
          break;
        case 401:
          message = 'Unauthorized Access';
          break;
        case 403:
          message = 'Forbidden';
        case 404:
          message = 'Not Found';
          break;
        case 500:
          message = 'Internal Error';
          break;
        default:
          throw new Error('Unexpected Error Code');
      }
      res.json(message);
      return;
    } else {
      throw e;
    }
  });

  process.on('unhandledRejection', e => log.exception(e));
  process.on('uncaughtException', e => log.exception(e));
};
