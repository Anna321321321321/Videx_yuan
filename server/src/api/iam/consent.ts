import { ServerError } from 'videx/server/core/error';
import { ConsentModel } from 'videx/server/entities';

export default class Consent {
  public static async udAccess(req, res, next) {
    try {
      const consentId = req.params.consentId;
      const document = await ConsentModel.findById(consentId);
      if (!document) {
        return next(new ServerError(400, new Error('Bad Request')));
      }
      res.locals.videx.consent = document;
      return next();
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }
}
