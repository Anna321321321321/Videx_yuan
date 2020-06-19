import { ServerError } from 'videx/server/core/error';
import {
  PlaylistModel,
  IConsent,
  LessonModel,
  IPlaylist,
  ILesson,
  ICourse
} from 'videx/server/entities';
import _ from 'lodash';

export default async (req, res, next) => {
  try {
    const course: ICourse = res.locals.videx.course;
    const document: IPlaylist = await PlaylistModel.create(
      req.body.playlist.lessons,
      course.getId(),
      req.body.playlist.name
    );
    res.status(200);
    res.json({ id: document });
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
