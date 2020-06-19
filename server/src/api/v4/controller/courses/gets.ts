import { ServerError } from 'videx/server/core/error';
import { CourseModel } from 'videx/server/entities';
import { IUser } from 'videx/server/entities';

// Get a list of Courses
export default async (req, res, next) => {
  try {
    const user: IUser = res.locals.videx.user;

    const courses = await CourseModel.find({
      $or: [
        {
          userId: {
            $eq: user.getId()
          }
        },
        {
          subscribers: user.getId()
        }
      ]
    });

    if (
      !user.isGlobalAdministrator() &&
      !user.isTeacher() &&
      courses.length == 0
    ) {
      res.redirect('/register');
      return;
    }

    const response = {
      metadata: {
        adminAccess: user.isGlobalAdministrator() || user.isTeacher()
      },
      courses: []
    };

    // For GlobalAdministrator return all the courses
    if (user.isGlobalAdministrator()) {
      const courses = await CourseModel.find({});
      response.courses = await Promise.all(
        courses.map(course => ({
          ...course.toObject(),
          metadata: {
            token: course.getToken(),
            ownerAccess: true
          }
        }))
      );
    } else {
      // normally we would return { metadata: {...}, id: string, name: string }
      // however, if a course is deleted, we will unlink it from user
      response.courses = (await Promise.all(
        courses.map(async course => {
          return {
            ...course.toObject(),
            metadata: {
              token: course.isOwner(user.getId()) ? course.getToken() : null,
              ownerAccess: course.isOwner(user.getId())
            }
          };
        })
      )).filter(course => course !== null);
    }
    res.status(200);
    res.json(response);
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
