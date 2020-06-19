import { ServerError } from 'videx/server/core/error';
import { ConsentModel, IConsent, ILesson, IUser } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const user: IUser = res.locals.videx.user;
    const { name, email, id } = user.toObject();
    const document: IConsent = await ConsentModel.create(id, email, name);

    res.status(200);
    res.json({ id: document.getId() });
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
