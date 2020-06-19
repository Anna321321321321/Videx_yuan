import { ServerError } from 'videx/server/core/error';
import { ICourse, LessonModel } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const value = req.query.search;
    if (!value) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    const course: ICourse = res.locals.videx.course;
    const result = (await LessonModel.find({
      $and: [
        {
          courseId: {
            $eq: course.getId()
          }
        },
        {
          $text: {
            $search: value
          }
        }
      ]
    })).map(lesson => lesson.getId());
    res.status(200);
    res.json(result);
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
