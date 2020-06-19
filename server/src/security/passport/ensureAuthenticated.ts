import { ServerError } from 'videx/server/core/error';
import { IUser, UserModel } from 'videx/server/entities';

// Use this route middleware on any resource that needs to be protected.  If
// the request is authenticated (typically via a persistent login session),
// the request will proceed. Otherwise, try authenticating using Bearer strategy.
export default async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const { id, name, token, userPrincipalName } = req.user;
      const user: IUser = await UserModel.findById(id);
      user.setName(name);
      user.setToken(token);
      user.setUserPrincipalName(userPrincipalName);
      res.locals = {
        ...res.locals,
        videx: {
          user,
          lesson: null,
          course: null,
          userLesson: null,
          aggregatedLesson: null
        }
      };
      return next();
    } else {
      res.redirect(303, '/login');
      return;
    }
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
