import { ServerError } from 'videx/server/core/error';
import { IUser, IConsent, ConsentModel } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const user: IUser = res.locals.videx.user;
    const userConsent: IConsent = await ConsentModel.findByUserId(user.getId());
    res.status(200);
    res.json(userConsent);
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
