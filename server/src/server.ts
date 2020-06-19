import * as config from 'config';
import * as express from 'express';
import * as next from 'next';
import * as path from 'path';

import log from 'videx/server/log';
import { JobMonitor } from 'videx/server/cloud/job-monitor';
import * as main from './main';
import * as security from './security';

export default async () => {
  const root = path.resolve(__dirname, '../..');
  const dev =
    config.util.getEnv('NODE_ENV') !== 'production' &&
    config.util.getEnv('NODE_ENV') !== 'staging';

  log.event(`server: running in ${config.util.getEnv('NODE_ENV')} mode`);

  await main.setDatabase();
  const reactor = next({ dev, dir: path.resolve(__dirname, 'next') });
  await reactor.prepare();

  const app = express();
  main.setPug(app, root);
  main.setUnprotected(app, reactor);

  main.setSessionManager(app);
  security.passport.configure(app);
  const passport = security.passport.getPassport();

  main.setReactor(
    app,
    root,
    reactor,
    security.passport.ensureAuthenticatedRedirect
  );

  security.helmet.configure(app);
  main.setBodyParser(app);
  main.setAPIs(app, passport, security.passport.ensureAuthenticated);
  main.setCertbot(app, root, dev);
  main.setServeBundleJS(app, root, dev);
  main.setServeStatic(app, root, dev);
  main.setBodyParser(app);

  main.setAuthentication(app, passport);

  app.get('/demo', main.constants.corsOptions, (req, res) =>
    res.render('demo', { nonce: res.locals.nonce })
  );

  app.get(
    '*',
    main.constants.corsOptions,
    security.passport.ensureAuthenticatedRedirect,
    (req, res) => res.render('index', { nonce: res.locals.nonce })
  );

  main.setHttpsServer(app, main.getHttpsOptions(root, dev));
  main.setErrorHandler(app);

  await JobMonitor.create();
  return app;
};
