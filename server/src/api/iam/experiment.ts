import { Server } from 'tls';
import { ServerError } from 'videx/server/core/error';
import { IUser } from 'videx/server/entities';

export default class Experiment {
  public static async cudAccess(req, res, next) {
    try {
      const user: IUser = res.locals.videx.user;
      if (!user.isGlobalAdministrator()) {
        return next(new ServerError(403, new Error('Forbidden')));
      }
      return next();
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }
}
