import { ServerError } from 'videx/server/core/error';
import {
  AnnotationModel,
  CourseModel,
  HistoryModel,
  ReactionModel,
  UserModel
} from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(new ServerError(404, new Error('Not Found')));
    }
    if (!user.isStudent()) {
      return next(new ServerError(403, new Error('Forbidden')));
    }
    // remove user information from different collections
    const filter = { userId };
    await UserModel.remove({ _id: userId });
    await HistoryModel.remove(filter);
    await AnnotationModel.remove(filter);
    await ReactionModel.remove(filter);
    await CourseModel.update({}, { $pull: { subscribers: userId } });
    res.status(200);
    res.json({ id: user.getId() });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
