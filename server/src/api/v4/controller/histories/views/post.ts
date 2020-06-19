import { ServerError } from 'videx/server/core/error';
import { IHistory } from 'videx/server/entities';
import * as helpers from './helpers/index';

export default async (req, res, next) => {
  try {
    const views: number[] = req.body.views;
    const history: IHistory = res.locals.videx.history;
    if (!views || views.length === 0) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    await history.setViews(
      helpers.mergeViews(history.getViews(), helpers.groupClientViews(views))
    );
    await history.setPlayhead(Math.max(...views));
    res.status(200);
    res.json({ id: history.getId() });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
