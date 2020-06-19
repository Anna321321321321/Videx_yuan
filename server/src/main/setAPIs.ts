import * as cors from 'cors';
import * as API from '../api';
import getPassportMiddleware from './getPassportMiddleware';

export default (app, passport, ensureAuthenticated) => {
  app.use(
    '/api/v4',
    cors(),
    getPassportMiddleware(passport),
    ensureAuthenticated,
    API.v4
  );
};
