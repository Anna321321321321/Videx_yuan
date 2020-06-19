import * as uuid from 'uuid';
import { ServerError } from 'videx/server/core/error';
import { CourseModel, ICourse, IUser } from 'videx/server/entities';
import { string2date } from './helpers';

export default async (req, res, next) => {
  try {
    const { name, releaseDate } = req.body;
    const user: IUser = res.locals.videx.user;

    if (!name || !releaseDate) {
      return next(new ServerError(400, new Error('Bad Request')));
    }

    const id = uuid.v4();
    const course: ICourse = await CourseModel.create(
      id,
      user.getId(),
      name,
      string2date(releaseDate)
    );

    res.status(200);
    res.json({
      id: course.getId()
    });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
