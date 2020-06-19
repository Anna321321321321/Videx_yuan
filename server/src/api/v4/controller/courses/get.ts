import { ServerError } from 'videx/server/core/error';
import { ICourse } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const course: ICourse = res.locals.videx.course;
    res.status(200);
    res.json(course.toObject());
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
