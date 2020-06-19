import { ServerError } from 'videx/server/core/error';
import { ICourse } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const course: ICourse = res.locals.videx.course;
    const courseId = course.getId();

    await course.remove();

    res.status(200);
    res.json({ id: courseId });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
