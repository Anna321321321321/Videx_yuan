import { ServerError } from 'videx/server/core/error';
import {
  ICourse,
  ILesson,
  IPlaylist,
  PlaylistModel
} from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const course: ICourse = res.locals.videx.course;
    const playlist: IPlaylist[] = await PlaylistModel.findByCourseId(
      course.getId()
    );
    res.status(200);
    res.json({ playlist: playlist });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
