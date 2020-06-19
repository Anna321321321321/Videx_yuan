import { ServerError } from 'videx/server/core/error';
import { ConsentModel, IConsent, IUser } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const consent: IConsent = res.locals.videx.consent;
    const user: IUser = res.locals.videx.user;
    const { name, email, id } = user.toObject();
    consent.setNameEmailId(name, email, id);
    res.status(200);
    res.json({ id: consent.getId() });
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
