import { ServerError } from 'videx/server/core/error';
import {
  AnnotationModel,
  IAnnotation,
  ILesson,
  IUser
} from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const { color, text, start, end } = req.body;

    if (!start || !end || !AnnotationModel.validateColor(color)) {
      return next(new ServerError(400, new Error('Bad Request')));
    }

    const user: IUser = res.locals.videx.user;
    const lesson: ILesson = res.locals.videx.lesson;

    const document: IAnnotation = await AnnotationModel.create(
      user.getId(),
      lesson.getId(),
      color,
      text,
      start,
      end
    );

    res.status(200);
    res.json({ id: document.getId() });
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
