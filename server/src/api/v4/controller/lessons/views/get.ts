import { ServerError } from 'videx/server/core/error';
import { ILesson } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const lesson: ILesson = res.locals.videx.lesson;
    res.status(200);
    res.json(lesson.getViews());
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
