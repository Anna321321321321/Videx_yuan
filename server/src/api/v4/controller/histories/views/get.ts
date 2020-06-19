import { ServerError } from 'videx/server/core/error';
import { IHistory } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const history: IHistory = res.locals.videx.history;
    res.status(200);
    res.json(history.getViews());
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
