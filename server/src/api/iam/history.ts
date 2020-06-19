import { ServerError } from 'videx/server/core/error';
import { HistoryModel, IHistory, ILesson, IUser } from 'videx/server/entities';

// Lesson IAM should be put behind Course IAM
export default class UserLesson {
  public static async rudAccess(req, res, next) {
    try {
      const user: IUser = res.locals.videx.user;
      const lesson: ILesson = res.locals.videx.lesson;

      // check if document exist, if not create new
      let document: IHistory;
      document = await HistoryModel.findById(user.getId(), lesson.getId());
      if (!document) {
        document = await HistoryModel.create(user.getId(), lesson.getId());
      }
      res.locals.videx.history = document;

      return next();
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }
}
