import { ServerError } from 'videx/server/core/error';
import { ICourse, LessonModel } from 'videx/server/entities';
import { IUser } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const user: IUser = res.locals.videx.user;
    const course: ICourse = res.locals.videx.course;

    if (!user.isGlobalAdministrator() && !user.isTeacher()) {
      return next(new ServerError(500, new Error('Invalid Access')));
    }

    const response = {
      releaseDate: course.getReleaseDate(),
      lessonData: []
    };

    response.lessonData = (await Promise.all(
      (await LessonModel.find({ courseId: course.getId() })).map(
        async lesson => {
          if (
            !user.isGlobalAdministrator() &&
            course.isSubscriber(user.getId()) &&
            (!lesson.getPublish() || lesson.getStatus() !== 4)
          ) {
            return null;
          }

          return {
            id: lesson.getId(),
            name: lesson.getName(),
            publish: lesson.getPublish()
          };
        }
      )
    )).filter(lesson => lesson != null);

    res.json(response);
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
