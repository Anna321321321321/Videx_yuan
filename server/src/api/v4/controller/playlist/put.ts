import { ServerError } from 'videx/server/core/error';
import { IPlaylist } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const playlist: IPlaylist = res.locals.videx.playlist;
    playlist.setLessons(req.body.lessons);
    res.status(200);
    res.json({ id: playlist.getId() });
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
