import * as config from 'config';
import * as fs from 'fs';
import * as path from 'path';
import log from 'videx/server/log';

export default (root, dev: boolean) => {
  const defaultOptions = {
    key: fs.readFileSync('./ssl-key.pem'),
    cert: fs.readFileSync('./ssl-cert.pem'),
    passphrase: 'videxpilot'
  };
  if (!dev) {
    const certPath = path.join(
      root,
      'cert',
      'ssl',
      'live',
      config.get('SERVER.CERTIFICATION_PATH')
    );
    if (fs.existsSync(certPath)) {
      try {
        return {
          key: fs.readFileSync(path.join(certPath, 'privkey.pem')),
          cert: fs.readFileSync(path.join(certPath, 'fullchain.pem'))
        };
      } catch (e) {
        log.trace('critical', 'Failed to load SSL certs');
        return defaultOptions;
      }
    }
  } else {
    return defaultOptions;
  }
};
