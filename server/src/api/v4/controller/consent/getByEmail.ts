import { ServerError } from 'videx/server/core/error';
import { IUser, IConsent, ConsentModel } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const user: IUser = res.locals.videx.user;
    const userConsent: IConsent = await ConsentModel.findByUserEmail(
      user.getUserPrincipalName()
    );
    res.status(200);
    if (userConsent !== null) {
      res.json(userConsent[0]);
    } else {
      res.json(null);
    }
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
