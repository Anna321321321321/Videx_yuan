import { ServerError } from 'videx/server/core/error';
import { ICourse, IUser, LessonModel } from 'videx/server/entities';

// Lesson IAM should be put behind Course IAM
export default class Lesson {
  public static async rudAccess(req, res, next) {
    try {
      const lessonId = req.params.lessonId;
      const user: IUser = res.locals.videx.user;
      const course: ICourse = res.locals.videx.course;
      const lesson = await LessonModel.findById(lessonId);
      if (!lesson) {
        return next(new ServerError(404, new Error('Not Found')));
      }
      // if lesson status is not finished, reject access
      if (lesson.getStatus() !== 4) {
        return next(new ServerError(403, new Error('Forbidden')));
      }
      // if a non-global admin and non-owner tries to access an unpublished lesson, return 403
      if (
        !user.isGlobalAdministrator() &&
        !course.isOwner(user.getId()) &&
        !lesson.getPublish()
      ) {
        return next(new ServerError(403, new Error('Forbidden')));
      }
      res.locals.videx.lesson = lesson;
      return next();
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }
}
