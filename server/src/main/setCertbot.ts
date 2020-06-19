import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import log from 'videx/server/log';
import * as constants from './constants';

export default (app, root: string, dev: boolean) => {
  // For requesting certificate from letsencrypt.org using certbot
  // https://certbot.eff.org/#ubuntutrusty-other
  if (!dev) {
    const certPath = path.join(root, 'cert', 'certbot', '.well-known');
    if (fs.existsSync(certPath)) {
      app.use('/.well-known', constants.corsOptions, express.static(certPath));
    } else {
      log.trace('critical', 'Cannot find .well-know');
    }
  }
};
