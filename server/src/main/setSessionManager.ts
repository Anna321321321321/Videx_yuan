import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import log from 'videx/server/log';
import { Redis } from 'videx/server/redis';

export default app => {
  app.use(
    session({
      secret: 'onenote videx',
      store: new (connectRedis(session))({ client: Redis.getClient() }),
      resave: false,
      saveUninitialized: false
    })
  );
};
