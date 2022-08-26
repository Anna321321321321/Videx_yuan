import { ServerError } from 'videx/server/core/error';
import { IShare, IUser, ShareModel } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const userId: string = res.locals.videx.user.getId();
    const lessonId = req.params.lessonId;
    let share: IShare;
    share = await ShareModel.findByDoubleId(userId, lessonId);
    if (!share) {
      share = await ShareModel.create(userId, lessonId);
    }
    res.status(200);
    res.json({ link: share.toObject().link });
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
