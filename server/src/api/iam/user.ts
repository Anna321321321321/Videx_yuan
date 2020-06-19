import { ServerError } from 'videx/server/core/error';
import { IUser } from 'videx/server/entities';

// Lesson IAM should be put behind Course IAM
export default class User {
  public static async uAccess(req, res, next) {
    try {
      const user: IUser = res.locals.videx.user;
      if (user.isGlobalAdministrator()) {
        return next();
      } else {
        return next(new ServerError(403, new Error('Forbidden')));
      }
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }
}
