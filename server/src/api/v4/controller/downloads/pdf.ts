import { ServerError } from 'videx/server/core/error';
import {
  AnnotationModel,
  IAnnotation,
  ICourse,
  ILesson,
  IUser
} from 'videx/server/entities';
import { IExport, PDF } from 'videx/server/exports';

export default async (req, res, next) => {
  try {
    const user: IUser = res.locals.videx.user;
    const course: ICourse = res.locals.videx.course;
    const lesson: ILesson = res.locals.videx.lesson;

    const courseObj = course.toObject();
    const lessonObj = lesson.toObject();

    const helper: IExport = new PDF(
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

    if (!result) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    res.status(200);
    res.contentType('application/pdf');
    res.send(helper.get());
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
