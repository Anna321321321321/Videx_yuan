import { ServerError } from 'videx/server/core/error';

export default router => {
  // manage route not found
  router.get('*', (req, res, next) => {
    return next(new ServerError(404, new Error('Not Found')));
  });

  router.put('*', (req, res, next) => {
    return next(new ServerError(404, new Error('Not Found')));
  });

  router.delete('*', (req, res, next) => {
    return next(new ServerError(404, new Error('Not Found')));
  });

  router.post('*', (req, res, next) => {
    return next(new ServerError(404, new Error('Not Found')));
  });
};
