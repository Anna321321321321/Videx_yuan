import * as constants from './constants';

export default (app, passport) => {
  const cors = constants.corsOptions;

  app.get('/auth/oauth2/login', cors, (req, res, next) => {
    passport.authenticate('msft', {
      response: res,
      failureRedirect: '/',
    })(req, res, next);
  });

  app.get(
    '/auth/oauth2/callback',
    cors,
    (req, res, next) => {
      passport.authenticate('msft', {
        response: res,
        failureRedirect: '/',
      })(req, res, next);
    },
    (req: any, res, next) => {
      res.redirect(req.session.returnTo || '/');
      delete req.session.returnTo;
    }
  );

  // 'logout' route, logout from passport, and destroy the session with AAD.
  app.get('/logout', cors, (req: any, res) => {
    req.session.destroy((err) => {
      const redirectUrl = `${req.protocol}://${req.get('host')}`;
      req.logout();
      // The url you need to go to destroy the session with AAD
      res.redirect(
        `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${redirectUrl}`
      );
    });
  });
};
