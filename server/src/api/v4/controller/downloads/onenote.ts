import { ServerError } from 'videx/server/core/error';
import {
  AnnotationModel,
  IAnnotation,
  ICourse,
  ILesson,
  IUser
} from 'videx/server/entities';
import { IExport, OneNote } from 'videx/server/exports';
import log from 'videx/server/log';

export default async (req, res, next) => {
  try {
    const user: IUser = res.locals.videx.user;
    const course: ICourse = res.locals.videx.course;
    const lesson: ILesson = res.locals.videx.lesson;

    const courseObj = course.toObject();
    const lessonObj = lesson.toObject();

    const helper: IExport = new OneNote(
      user.getToken(),
      courseObj.id,
      lessonObj.id,
      lessonObj.name,
      lesson.getPreview(),
      lessonObj.transcript.text
    );
    const annotations: IAnnotation[] = await AnnotationModel.find(
      user.getId(),
      lesson.getId()
    );

    await helper.build(annotations.map(annotation => annotation.toObject()));
    const result = await helper.send();

    if (!result.ok) {
      log.exception(new Error('Request Failed'), result);
      return next(new ServerError(400, new Error('Request Failed')));
    }
    res.status(200);
    res.json({ id: lesson.getId() });
    return;
  } catch (e) {
    log.exception(new Error('Export Failed'), e);
    return next(new ServerError(500, e));
  }
};
