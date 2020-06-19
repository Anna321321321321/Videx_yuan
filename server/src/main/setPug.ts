import * as path from 'path';

export default (app, root) => {
  // view engine setup
  app.set('views', path.join(root, 'server', 'src', 'views'));
  app.set('view engine', 'pug');
};
