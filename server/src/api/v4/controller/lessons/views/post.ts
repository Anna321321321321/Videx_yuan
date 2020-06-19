import { ServerError } from 'videx/server/core/error';
import { ILesson } from 'videx/server/entities';

// this should be put behind LessonHistory/uAccess & in front of view/postView controller
export default async (req, res, next) => {
  try {
    const { views } = req.body;
    const lesson: ILesson = res.locals.videx.lesson;
    if (!views || views.length === 0) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    await lesson.setViews(views);
    return next();
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
