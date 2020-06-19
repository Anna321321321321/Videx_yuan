import { LessonManager } from 'videx/server/cloud/lesson-manager';
import { ServerError } from 'videx/server/core/error';
import { ILesson } from 'videx/server/entities';
import { string2date } from './helpers';

export default async (req, res, next) => {
  try {
    const lesson: ILesson = res.locals.videx.lesson;

    if (!lesson) {
      return next(new ServerError(404, new Error('Not Found')));
    }

    for (const entry in req.body) {
      if (req.body.hasOwnProperty(entry)) {
        switch (entry) {
          case 'name':
            await lesson.setName(req.body.name);
            break;
          case 'summary':
            await lesson.setSummary(req.body.summary);
            break;
          case 'transcript':
            await (await LessonManager.create(
              lesson.getId()
            )).transcriptSaveSync(req.body.transcript, true, true);
            break;
          case 'releaseDate':
            await lesson.setReleaseDate(string2date(req.body.releaseDate));
            break;
          case 'publish':
            await lesson.setPublish(req.body.publish);
            break;
          case 'category':
            await lesson.setCategory(req.body.category);
            break;
          default:
            return next(new ServerError(400, new Error('Bad Request')));
        }
      }
    }
    res.status(200);
    res.json({ id: lesson.getId() });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
