import { ServerError } from 'videx/server/core/error';
import { ICourse, UserModel } from 'videx/server/entities';
import { string2date } from './helpers';

export default async (req, res, next) => {
  try {
    const course: ICourse = res.locals.videx.course;
    for (const entry in req.body) {
      if (req.body.hasOwnProperty(entry)) {
        switch (entry) {
          case 'name':
            await course.setName(req.body.name);
            break;
          case 'releaseDate':
            await course.setReleaseDate(string2date(req.body.releaseDate));
            break;
          case 'userId':
            const user = await UserModel.findById(req.body.userId);
            if (!user) {
              return next(new ServerError(400, new Error('Bad Request')));
            }
            if (user.isStudent()) {
              return next(new ServerError(403, new Error('Forbidden')));
            }
            await course.setUserId(user.getId());
            break;
          default:
            return next(new ServerError(400, new Error('Bad Request')));
        }
      }
    }
    res.status(200);
    res.json({ id: course.getId() });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
