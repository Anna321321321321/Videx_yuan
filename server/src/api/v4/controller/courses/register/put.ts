import { ServerError } from 'videx/server/core/error';
import { CourseModel, ICourse } from 'videx/server/entities';
import { IUser } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    const user: IUser = res.locals.videx.user;
    const course: ICourse = await CourseModel.findByToken(token);
    if (!course) {
      return next(new ServerError(404, new Error('Not Found')));
    }
    if (course.isOwner(user.getId())) {
      return next(new ServerError(403, new Error('Forbidden')));
    }
    await course.addSubscriber(user.getId());
    res.status(200);
    res.json({ id: course.getId() });
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
