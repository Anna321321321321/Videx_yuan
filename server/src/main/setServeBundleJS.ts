import * as httpProxy from 'http-proxy';
import * as path from 'path';
import log from 'videx/server/log';
import * as constants from './constants';

export default (app, root, dev: boolean) => {
  const cors = constants.corsOptions;
  if (!dev) {
    app.get('/dist/app.js', cors, (req, res) => {
      res.sendFile(path.join(root, 'dist', 'client', 'app.js'));
    });
    app.get('/dist/demo.js', cors, (req, res) => {
      res.sendFile(path.join(root, 'dist', 'demo', 'demo.js'));
    });
  } else {
    const proxy = httpProxy.createProxyServer();
    // Any requests to <our_server>/dist is proxied
    // to webpack-dev-server
    app.all('/dist/app.js', cors, (req, res) => {
      proxy.web(req, res, {
        secure: false,
        target: 'https://localhost:3000'
      });
    });
    app.all('/dist/demo.js', cors, (req, res) => {
      proxy.web(req, res, {
        secure: false,
        target: 'https://localhost:3001'
      });
    });
  }
};
