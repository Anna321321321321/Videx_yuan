import * as helmet from 'helmet';
import * as _ from 'lodash';
import * as uuid from 'uuid';

export default app => {
  app.use((req, res, next) => {
    res.locals.nonce = uuid.v4();
    return next();
  });
  app.use(helmet());
};
