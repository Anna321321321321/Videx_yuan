import * as express from 'express';
import * as path from 'path';
import * as constants from './constants';

export default (app, root, dev: boolean) => {
  const cors = constants.corsOptions;

  app.use(
    '/static',
    cors,
    express.static(path.join(root, 'server', 'resources', 'static'))
  );

  if (!dev) {
    app.get('/dist/licenses.txt', cors, (req, res) => {
      res.sendFile(path.join(root, 'dist', 'client', 'licenses.txt'));
    });
  }
};
