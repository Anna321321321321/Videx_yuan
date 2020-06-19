import { ServerError } from 'videx/server/core/error';
import { ICourse, ILesson } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const lesson: ILesson = res.locals.videx.lesson;
    const course: ICourse = res.locals.videx.course;
    const obj = lesson.toObject();
    res.status(200);
    res.json({
      metadata: {
        courseId: course.getId(),
        lessonId: lesson.getId()
      },
      category: obj.category,
      name: lesson.getName(),
      duration: obj.duration,
      transcript: {
        text: obj.transcript.text,
        file: obj.transcript.file
      },
      video: {
        streaming: obj.video.streaming,
        download: obj.video.download
      },
      thumbnail: {
        url: obj.thumbnail.url,
        height: obj.thumbnail.height,
        width: obj.thumbnail.width,
        sas: obj.thumbnail.sas
      }
    });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
