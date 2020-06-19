import { ServerError } from 'videx/server/core/error';
import Redis from '../Redis';

export default async (req, res, next) => {
  try {
    const url = req.originalUrl;
    const value = await Redis.get(url, true);
    if (value) {
      res.status(200);
      res.json(value);
      return;
    } else {
      return next();
    }
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
