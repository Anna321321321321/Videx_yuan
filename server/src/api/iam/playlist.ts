import { ServerError } from 'videx/server/core/error';
import { PlaylistModel, ICourse } from 'videx/server/entities';

export default class Playlist {
  public static async udAccess(req, res, next) {
    try {
      const playlistId = req.body._id;
      const document = await PlaylistModel.findById(playlistId);
      if (!document) {
        return next(new ServerError(400, new Error('Bad Request')));
      }
      res.locals.videx.playlist = document;
      return next();
    } catch (e) {
      return next(new ServerError(500, e));
    }
  }
}
