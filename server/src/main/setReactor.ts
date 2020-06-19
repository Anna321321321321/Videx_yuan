import * as constants from './constants';

export default (app, root, reactor, ensureAuthenticatedRedirect) => {
  /**
   * Experiment Framework
   */
  app.get('/experiment', ensureAuthenticatedRedirect, (req, res) => {
    return reactor.render(req, res, '/experiment', req.query);
  });

  /**
   * Manage Course
   */
  app.get('/course', ensureAuthenticatedRedirect, (req, res) => {
    return reactor.render(req, res, '/course', req.query);
  });

  /**
   * Manage User
   */
  app.get('/user', ensureAuthenticatedRedirect, (req, res) => {
    return reactor.render(req, res, '/user', req.query);
  });

  /**
   * Retrieve Link
   */
  app.get('/link', ensureAuthenticatedRedirect, (req, res) => {
    return reactor.render(req, res, '/link', req.query);
  });

  /**
   * Remove User
   */
  app.get('/remove', ensureAuthenticatedRedirect, (req, res) => {
    return reactor.render(req, res, '/remove', req.query);
  });

  app.get(
    '/register',
    constants.corsOptions,
    ensureAuthenticatedRedirect,
    (req, res) => {
      return reactor.render(req, res, '/register', req.query);
    }
  );
};
