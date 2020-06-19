import { ServerError } from 'videx/server/core/error';
import get from './get';
import search from './search';

export default async (req, res, next) => {
  try {
    const value = req.query.search;
    if (value) {
      await search(req, res, next);
    } else {
      await get(req, res, next);
    }
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
