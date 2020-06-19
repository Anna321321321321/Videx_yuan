import { ServerError } from 'videx/server/core/error';
import { ICourse, ILesson, ILink, LinkModel } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const course: ICourse = res.locals.videx.course;
    const lesson: ILesson = res.locals.videx.lesson;
    const { start, end } = req.body;

    // return error if parameter is empty
    if (!start || !end) {
      return next(new ServerError(400, new Error('Bad Request')));
    }

    // search MongoDB by using the query id
    const link: ILink = await LinkModel.findOne(
      course.getId(),
      lesson.getId(),
      start,
      end
    );
    if (link) {
      // return result
      res.status(200);
      res.json({ token: link.getToken() });
      return;
    } else {
      const link: ILink = await LinkModel.create(
        course.getId(),
        lesson.getId(),
        start,
        end
      );
      // return result
      res.status(200);
      res.json({ token: link.getToken() });
    }
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
