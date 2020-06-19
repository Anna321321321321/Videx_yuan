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
    if (annotation.getUserId() === user.getId()) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    const reaction: IReaction = await ReactionModel.create(
      user.getId(),
      annotation.getId()
    );
    res.status(200);
    res.json({ id: reaction.getId() });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
