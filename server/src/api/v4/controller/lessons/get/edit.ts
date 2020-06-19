import { ServerError } from 'videx/server/core/error';
import { ILesson } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const lesson: ILesson = res.locals.videx.lesson;
    const obj = lesson.toObject();
    res.status(200);
    res.json({
      name: obj.name,
      summary: obj.summary,
      transcript: lesson.getTranscriptText(),
      category: obj.category,
      releaseDate: obj.releaseDate
    });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
