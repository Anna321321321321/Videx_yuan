import { ServerError } from 'videx/server/core/error';
import { CourseModel, ICourse } from 'videx/server/entities';
import { IUser } from 'videx/server/entities';

export default class Course {
  // Create Access
  public static async cAccess(req, res, next) {
    try {
      const user: IUser = res.locals.videx.user;
      if (user.isTeacher() || user.isGlobalAdministrator()) {
        return next();
      } else {
        return next(new ServerError(401, new Error('Unauthorized Access')));
      }
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }

  // Read Access
  public static async rAccess(req, res, next) {
    try {
      const courseId = req.params.courseId;
      const user: IUser = res.locals.videx.user;
      const course: ICourse = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ServerError(404, new Error('Not Found')));
      }
      if (
        course.isOwner(user.getId()) ||
        course.isSubscriber(user.getId()) ||
        user.isGlobalAdministrator()
      ) {
        res.locals.videx.course = course;
        return next();
      } else {
        return res.redirect('/register');
      }
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }

  // Update Access
  public static async udAccess(req, res, next) {
    try {
      const courseId = req.params.courseId;
      const user: IUser = res.locals.videx.user;
      const course: ICourse = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ServerError(404, new Error('Not Found')));
      }
      if (course.isOwner(user.getId()) || user.isGlobalAdministrator()) {
        res.locals.videx.course = course;
        return next();
      } else {
        return next(new ServerError(401, new Error('Unauthorized Access')));
      }
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }
}
