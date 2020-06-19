import { ServerError } from 'videx/server/core/error';
import edit from './edit';
import get from './get';

const handler = async (req, res, next) => {
  try {
    const value = req.query.edit;
    if (value && value !== 'true') {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    if (value && value === 'true') {
      await edit(req, res, next);
    } else {
      await get(req, res, next);
    }
  } catch (e) {
    return next(new ServerError(500, e));
  }
};

export default handler;
