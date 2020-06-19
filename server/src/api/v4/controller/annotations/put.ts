import { ServerError } from 'videx/server/core/error';
import { AnnotationModel, IAnnotation } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const annotation: IAnnotation = res.locals.videx.annotation;
    for (const property in req.body) {
      switch (property) {
        case 'color':
          if (!AnnotationModel.validateColor(req.body[property])) {
            return next(new ServerError(400, new Error('Bad Request')));
          }
          await annotation.setColor(req.body[property]);
          break;
        case 'text':
          await annotation.setText(req.body[property]);
          break;
        case 'share':
          await annotation.setShare(req.body[property]);
          break;
      }
    }
    res.status(200);
    res.json({ id: annotation.getId() });
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
