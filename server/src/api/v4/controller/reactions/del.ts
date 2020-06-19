import { ServerError } from 'videx/server/core/error';
import {
  IAnnotation,
  IReaction,
  IUser,
  ReactionModel
} from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const annotation: IAnnotation = res.locals.videx.annotation;
    const user: IUser = res.locals.videx.user;
    const reaction: ReactionModel = await ReactionModel.findByIds(
      user.getId(),
      annotation.getId()
    );
    if (!reaction) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    await ReactionModel.findByIdsAndRemove(user.getId(), annotation.getId());
    res.status(200);
    res.json({ id: ReactionModel.getId(user.getId(), annotation.getId()) });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
