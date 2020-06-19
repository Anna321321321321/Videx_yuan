import * as uuid from 'uuid';
import { LessonManager } from 'videx/server/cloud/lesson-manager';
import { ServerError } from 'videx/server/core/error';
import { ICourse } from 'videx/server/entities';
import { string2date } from './helpers';

export default async (req, res, next) => {
  try {
    const { file } = req;
    const course: ICourse = res.locals.videx.course;
    const {
      name,
      summary,
      transcript,
      duration,
      releaseDate,
      category
    } = req.body;

    if (
      !name ||
      !summary ||
      !duration ||
      !releaseDate ||
      !category ||
      !file.mimetype.startsWith('video/') ||
      file.size > 1073741824
    ) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    const id = uuid.v4();
    const lessonManager = await LessonManager.create(id);
    await lessonManager.create(
      name,
      course.getId(),
      summary,
      duration,
      transcript,
      req.file,
      string2date(releaseDate),
      category
    );
    res.status(200);
    res.json({
      id
    });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
