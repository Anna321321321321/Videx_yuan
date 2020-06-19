import { LessonManager } from 'videx/server/cloud/lesson-manager';
import { ServerError } from 'videx/server/core/error';
import { ILesson } from 'videx/server/entities';
import { LessonStatus } from 'videx/server/mongodb';

export default async (req, res, next) => {
  try {
    const lesson: ILesson = res.locals.videx.lesson;
    if (lesson.getStatus() !== LessonStatus.Finished) {
      return next(new ServerError(403, new Error('Forbidden')));
    }
    await (await LessonManager.create(lesson.getId())).del();
    res.status(200);
    res.json({ id: lesson.getId() });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
