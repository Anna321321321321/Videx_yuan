import { ServerError } from 'videx/server/core/error';
import {
  AnnotationModel,
  IAnnotation,
  ICourse,
  ILesson,
  IUser
} from 'videx/server/entities';

// Lesson IAM should be put behind Course IAM
export default class Reaction {
  public static async cdAccess(req, res, next) {
    try {
      const annotationId = req.params.annotationId;
      const user: IUser = res.locals.videx.user;
      const lesson: ILesson = res.locals.videx.lesson;
      const course: ICourse = res.locals.videx.course;
      const annotation: IAnnotation = await AnnotationModel.findById(
        annotationId
      );

      if (annotation.getLessonId() !== lesson.getId()) {
        return next(new ServerError(404, new Error('Not Found')));
      }
      if (
        !course.isOwner(annotation.getUserId()) ||
        !course.isSubscriber(user.getId())
      ) {
        return next(new ServerError(403, new Error('Forbidden')));
      }

      res.locals.videx.annotation = annotation;
      return next();
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }
}
