import { ServerError } from 'videx/server/core/error';
import { IUser } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const user: IUser = res.locals.videx.user;
    res.status(200);
    res.json(user.toObject());
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
