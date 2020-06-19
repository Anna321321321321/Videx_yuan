import { ServerError } from 'videx/server/core/error';
import { IAnnotation } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const annotation: IAnnotation = res.locals.videx.annotation;
    const id = annotation.getId();
    await annotation.remove();
    res.status(200);
    res.json({ id: id });
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
