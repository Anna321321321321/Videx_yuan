import { ServerError } from 'videx/server/core/error';
import {
  AnnotationModel,
  IAnnotation,
  ILesson,
  IUser
} from 'videx/server/entities';

export default class Annotation {
  public static async cAccess(req, res, next) {
    try {
      return next();
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }

  public static async udAccess(req, res, next) {
    try {
      const annotationId = req.params.annotationId;
      const user: IUser = res.locals.videx.user;
      const lesson: ILesson = res.locals.videx.lesson;

      const document: IAnnotation = await AnnotationModel.findById(
        annotationId
      );

      if (
        !document ||
        document.getUserId() !== user.getId() ||
        document.getLessonId() !== lesson.getId()
      ) {
        return next(new ServerError(400, new Error('Bad Request')));
      }

      res.locals.videx.annotation = document;
      return next();
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }
}
